import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// SSE connection states
type SSEState = 'disconnected' | 'connecting' | 'connected' | 'error';

// Types for batch progress
export interface BatchBook {
  title: string;
  slug: string;
  author: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  current_phase?: number;
  phases_completed?: string;
  next_action?: string;
  score?: number | null;
  started_at?: string | null;
  completed_at?: string | null;
  paused_at?: string | null;
  last_error?: string;
  output_files?: string[];
  original_en_slug?: string;
}

export interface BatchMetadata {
  description: string;
  last_updated: string;
  pipeline_version: string;
}

export interface BatchSummary {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  failed: number;
}

export interface BatchProgress {
  books: BatchBook[];
  metadata: BatchMetadata;
  summary: BatchSummary;
  sync_timestamp: string;
}

interface UseBatchProgressOptions {
  autoRefreshInterval?: number; // in milliseconds, default 2 minutes
  enabled?: boolean;
}

interface ActionResult {
  success: boolean;
  message: string;
  slug?: string;
}

interface BulkActionResult {
  success: boolean;
  message: string;
  total: number;
  succeeded: number;
  failed: number;
}

interface UseBatchProgressReturn {
  data: BatchProgress | null;
  loading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
  isAutoRefreshing: boolean;
  setAutoRefresh: (enabled: boolean) => void;
  // Pipeline control functions
  serverAvailable: boolean;
  playBook: (slug: string) => Promise<ActionResult>;
  pauseBook: (slug: string) => Promise<ActionResult>;
  retryBook: (slug: string, fromPhase?: number) => Promise<ActionResult>;
  addBook: (title: string, author: string, slug?: string) => Promise<ActionResult>;
  removeBook: (slug: string) => Promise<ActionResult>;
  // Bulk actions
  retryAllFailed: () => Promise<BulkActionResult>;
  pauseAll: () => Promise<BulkActionResult>;
  playAllPending: (limit?: number) => Promise<BulkActionResult>;
  // SSE status
  sseState: SSEState;
  // Computed states
  computed: {
    hasFailedBooks: boolean;
    failedCount: number;
    activeBook: BatchBook | undefined;
    isProcessing: boolean;
    progressPercent: number;
    pendingCount: number;
  };
}

const PIPELINE_API = '/api/pipeline';

const DEFAULT_REFRESH_INTERVAL = 2 * 60 * 1000; // 2 minutes

export function useBatchProgress(
  options: UseBatchProgressOptions = {}
): UseBatchProgressReturn {
  const { autoRefreshInterval = DEFAULT_REFRESH_INTERVAL, enabled = true } = options;

  const [data, setData] = useState<BatchProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(enabled);
  const [serverAvailable, setServerAvailable] = useState(false);
  const [sseState, setSSEState] = useState<SSEState>('disconnected');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const sseRetryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if pipeline server is available
  const checkServer = useCallback(async () => {
    try {
      const response = await fetch(`${PIPELINE_API}/`, { method: 'GET' });
      const isAvailable = response.ok;
      setServerAvailable(isAvailable);
      return isAvailable;
    } catch {
      setServerAvailable(false);
      return false;
    }
  }, []);

  // Process SSE data update
  const handleSSEData = useCallback((eventData: BatchProgress) => {
    // Recalculate summary from books
    if (eventData.books && Array.isArray(eventData.books)) {
      const calculatedSummary: BatchSummary = {
        total: eventData.books.length,
        pending: eventData.books.filter((b) => b.status === 'pending').length,
        in_progress: eventData.books.filter((b) => b.status === 'in_progress').length,
        completed: eventData.books.filter((b) => b.status === 'completed').length,
        failed: eventData.books.filter((b) => b.status === 'failed').length,
      };
      eventData.summary = calculatedSummary;
    }
    setData(eventData);
    setLastUpdated(new Date());
    setLoading(false);
  }, []);

  // Connect to SSE endpoint
  const connectSSE = useCallback(() => {
    // Clean up existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setSSEState('connecting');

    const eventSource = new EventSource(`${PIPELINE_API}/events`);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener('connected', (event) => {
      setSSEState('connected');
      try {
        const eventData = JSON.parse(event.data);
        handleSSEData(eventData);
      } catch (e) {
        console.error('Failed to parse SSE connected data:', e);
      }
    });

    eventSource.addEventListener('update', (event) => {
      try {
        const eventData = JSON.parse(event.data);
        handleSSEData(eventData);
      } catch (e) {
        console.error('Failed to parse SSE update data:', e);
      }
    });

    eventSource.addEventListener('heartbeat', () => {
      // Just keep-alive, no action needed
    });

    eventSource.onerror = () => {
      setSSEState('error');
      eventSource.close();
      eventSourceRef.current = null;

      // Retry connection after 5 seconds
      if (sseRetryTimeoutRef.current) {
        clearTimeout(sseRetryTimeoutRef.current);
      }
      sseRetryTimeoutRef.current = setTimeout(() => {
        if (serverAvailable) {
          connectSSE();
        }
      }, 5000);
    };
  }, [handleSSEData, serverAvailable]);

  // Disconnect SSE
  const disconnectSSE = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (sseRetryTimeoutRef.current) {
      clearTimeout(sseRetryTimeoutRef.current);
      sseRetryTimeoutRef.current = null;
    }
    setSSEState('disconnected');
  }, []);

  // Check server and connect SSE on mount
  useEffect(() => {
    const init = async () => {
      const isAvailable = await checkServer();
      if (isAvailable && enabled) {
        connectSSE();
      }
    };
    init();

    return () => {
      disconnectSSE();
    };
  }, [checkServer, connectSSE, disconnectSSE, enabled]);

  // Reconnect SSE when server becomes available
  useEffect(() => {
    if (serverAvailable && enabled && sseState === 'disconnected') {
      connectSSE();
    } else if (!serverAvailable && sseState !== 'disconnected') {
      disconnectSSE();
    }
  }, [serverAvailable, enabled, sseState, connectSSE, disconnectSSE]);

  const fetchBatchProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Add cache-busting query param
      const response = await fetch(`/batch-progress.json?t=${Date.now()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch batch progress: ${response.status}`);
      }

      const json: BatchProgress = await response.json();

      // Recalculate summary from books if not present or outdated
      if (json.books && Array.isArray(json.books)) {
        const calculatedSummary: BatchSummary = {
          total: json.books.length,
          pending: json.books.filter((b) => b.status === 'pending').length,
          in_progress: json.books.filter((b) => b.status === 'in_progress').length,
          completed: json.books.filter((b) => b.status === 'completed').length,
          failed: json.books.filter((b) => b.status === 'failed').length,
        };

        // Use calculated summary if different from stored
        if (
          !json.summary ||
          json.summary.total !== calculatedSummary.total ||
          json.summary.pending !== calculatedSummary.pending ||
          json.summary.in_progress !== calculatedSummary.in_progress ||
          json.summary.completed !== calculatedSummary.completed ||
          json.summary.failed !== calculatedSummary.failed
        ) {
          json.summary = calculatedSummary;
        }
      }

      setData(json);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch (only if SSE not connected)
  useEffect(() => {
    if (enabled && sseState !== 'connected') {
      fetchBatchProgress();
    }
  }, [enabled, fetchBatchProgress, sseState]);

  // Auto-refresh interval (fallback when SSE not connected)
  useEffect(() => {
    // Only poll if SSE is not connected
    if (isAutoRefreshing && enabled && sseState !== 'connected') {
      intervalRef.current = setInterval(fetchBatchProgress, autoRefreshInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoRefreshing, enabled, autoRefreshInterval, fetchBatchProgress, sseState]);

  const setAutoRefresh = useCallback((value: boolean) => {
    setIsAutoRefreshing(value);
  }, []);

  // Helper for optimistic updates
  const updateBookStatus = useCallback((slug: string, updates: Partial<BatchBook>) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        books: prev.books.map(book =>
          book.slug === slug ? { ...book, ...updates } : book
        ),
        // Recalculate summary
        summary: {
          ...prev.summary,
          pending: prev.books.filter(b => (b.slug === slug ? updates.status : b.status) === 'pending').length,
          in_progress: prev.books.filter(b => (b.slug === slug ? updates.status : b.status) === 'in_progress').length,
          completed: prev.books.filter(b => (b.slug === slug ? updates.status : b.status) === 'completed').length,
          failed: prev.books.filter(b => (b.slug === slug ? updates.status : b.status) === 'failed').length,
        }
      };
    });
  }, []);

  // Pipeline control functions with optimistic updates
  const playBook = useCallback(async (slug: string) => {
    // Optimistic update - immediately show as in_progress
    updateBookStatus(slug, {
      status: 'in_progress',
      started_at: new Date().toISOString(),
      current_phase: 1,
      next_action: 'Iniciando...'
    });

    try {
      const response = await fetch(`${PIPELINE_API}/books/${slug}/play`, {
        method: 'POST',
      });
      const result = await response.json();
      if (response.ok) {
        // Success: keep optimistic state, auto-refresh will sync later
        return { success: true, message: result.message || 'Pipeline started' };
      }
      // Rollback on error
      await fetchBatchProgress();
      return { success: false, message: result.detail || 'Failed to start pipeline' };
    } catch (err) {
      // Rollback on error
      await fetchBatchProgress();
      return { success: false, message: 'Server not available' };
    }
  }, [fetchBatchProgress, updateBookStatus]);

  const pauseBook = useCallback(async (slug: string) => {
    // Optimistic update - immediately show as pending (paused)
    updateBookStatus(slug, {
      status: 'pending',
      paused_at: new Date().toISOString(),
      next_action: 'Pausado'
    });

    try {
      const response = await fetch(`${PIPELINE_API}/books/${slug}/pause`, {
        method: 'POST',
      });
      const result = await response.json();
      if (response.ok) {
        // Success: keep optimistic state, auto-refresh will sync later
        return { success: true, message: result.message || 'Pipeline paused' };
      }
      // Rollback on error
      await fetchBatchProgress();
      return { success: false, message: result.detail || 'Failed to pause pipeline' };
    } catch (err) {
      await fetchBatchProgress();
      return { success: false, message: 'Server not available' };
    }
  }, [fetchBatchProgress, updateBookStatus]);

  const retryBook = useCallback(async (slug: string, fromPhase = 1) => {
    // Optimistic update - immediately show as in_progress
    updateBookStatus(slug, {
      status: 'in_progress',
      current_phase: fromPhase,
      started_at: new Date().toISOString(),
      last_error: undefined,
      next_action: `Reiniciando da fase ${fromPhase}...`
    });

    try {
      const response = await fetch(`${PIPELINE_API}/books/${slug}/retry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from_phase: fromPhase }),
      });
      const result = await response.json();
      if (response.ok) {
        // Success: keep optimistic state, don't refetch immediately
        // The auto-refresh will sync the real state later
        return { success: true, message: result.message || 'Pipeline retrying' };
      }
      // Error: rollback by fetching real state
      await fetchBatchProgress();
      return { success: false, message: result.detail || 'Failed to retry pipeline' };
    } catch (err) {
      // Error: rollback by fetching real state
      await fetchBatchProgress();
      return { success: false, message: 'Server not available' };
    }
  }, [fetchBatchProgress, updateBookStatus]);

  const addBook = useCallback(async (title: string, author: string, slug?: string) => {
    try {
      const response = await fetch(`${PIPELINE_API}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, slug: slug || undefined }),
      });
      const result = await response.json();
      if (response.ok) {
        await fetchBatchProgress();
        return { success: true, slug: result.slug, message: result.message || 'Book added' };
      }
      return { success: false, message: result.detail || 'Failed to add book' };
    } catch (err) {
      return { success: false, message: 'Server not available' };
    }
  }, [fetchBatchProgress]);

  const removeBook = useCallback(async (slug: string) => {
    // Optimistic update - remove from list immediately
    setData(prev => {
      if (!prev) return prev;
      const newBooks = prev.books.filter(b => b.slug !== slug);
      return {
        ...prev,
        books: newBooks,
        summary: {
          total: newBooks.length,
          pending: newBooks.filter(b => b.status === 'pending').length,
          in_progress: newBooks.filter(b => b.status === 'in_progress').length,
          completed: newBooks.filter(b => b.status === 'completed').length,
          failed: newBooks.filter(b => b.status === 'failed').length,
        }
      };
    });

    try {
      const response = await fetch(`${PIPELINE_API}/books/${slug}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        return { success: true, message: result.message || 'Book removed' };
      }
      // Rollback on error
      await fetchBatchProgress();
      return { success: false, message: result.detail || 'Failed to remove book' };
    } catch (err) {
      await fetchBatchProgress();
      return { success: false, message: 'Server not available' };
    }
  }, [fetchBatchProgress]);

  // Bulk action: Retry all failed books
  const retryAllFailed = useCallback(async (): Promise<BulkActionResult> => {
    const failedBooks = data?.books.filter(b => b.status === 'failed') || [];
    if (failedBooks.length === 0) {
      return { success: true, message: 'Nenhum livro com falha', total: 0, succeeded: 0, failed: 0 };
    }

    let succeeded = 0;
    let failedCount = 0;

    for (const book of failedBooks) {
      try {
        const response = await fetch(`${PIPELINE_API}/books/${book.slug}/retry`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ from_phase: 1 }),
        });
        if (response.ok) {
          succeeded++;
        } else {
          failedCount++;
        }
      } catch {
        failedCount++;
      }
    }

    await fetchBatchProgress();

    return {
      success: succeeded > 0,
      message: `${succeeded}/${failedBooks.length} livros reiniciados`,
      total: failedBooks.length,
      succeeded,
      failed: failedCount,
    };
  }, [data?.books, fetchBatchProgress]);

  // Bulk action: Pause all in_progress books
  const pauseAll = useCallback(async (): Promise<BulkActionResult> => {
    const inProgressBooks = data?.books.filter(b => b.status === 'in_progress') || [];
    if (inProgressBooks.length === 0) {
      return { success: true, message: 'Nenhum livro em progresso', total: 0, succeeded: 0, failed: 0 };
    }

    let succeeded = 0;
    let failedCount = 0;

    for (const book of inProgressBooks) {
      try {
        const response = await fetch(`${PIPELINE_API}/books/${book.slug}/pause`, {
          method: 'POST',
        });
        if (response.ok) {
          succeeded++;
        } else {
          failedCount++;
        }
      } catch {
        failedCount++;
      }
    }

    await fetchBatchProgress();

    return {
      success: succeeded > 0,
      message: `${succeeded}/${inProgressBooks.length} livros pausados`,
      total: inProgressBooks.length,
      succeeded,
      failed: failedCount,
    };
  }, [data?.books, fetchBatchProgress]);

  // Bulk action: Play pending books (with optional limit)
  const playAllPending = useCallback(async (limit = 5): Promise<BulkActionResult> => {
    const pendingBooks = (data?.books.filter(b => b.status === 'pending') || []).slice(0, limit);
    if (pendingBooks.length === 0) {
      return { success: true, message: 'Nenhum livro pendente', total: 0, succeeded: 0, failed: 0 };
    }

    let succeeded = 0;
    let failedCount = 0;

    for (const book of pendingBooks) {
      try {
        const response = await fetch(`${PIPELINE_API}/books/${book.slug}/play`, {
          method: 'POST',
        });
        if (response.ok) {
          succeeded++;
        } else {
          failedCount++;
        }
      } catch {
        failedCount++;
      }
    }

    await fetchBatchProgress();

    return {
      success: succeeded > 0,
      message: `${succeeded}/${pendingBooks.length} livros iniciados`,
      total: pendingBooks.length,
      succeeded,
      failed: failedCount,
    };
  }, [data?.books, fetchBatchProgress]);

  // Computed states for UI convenience
  const computed = useMemo(() => ({
    hasFailedBooks: (data?.books.some(b => b.status === 'failed') ?? false),
    failedCount: data?.books.filter(b => b.status === 'failed').length ?? 0,
    activeBook: data?.books.find(b => b.status === 'in_progress'),
    isProcessing: (data?.books.some(b => b.status === 'in_progress') ?? false),
    progressPercent: data?.summary
      ? Math.round((data.summary.completed / Math.max(data.summary.total, 1)) * 100)
      : 0,
    pendingCount: data?.books.filter(b => b.status === 'pending').length ?? 0,
  }), [data]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: fetchBatchProgress,
    isAutoRefreshing,
    setAutoRefresh,
    // Pipeline control
    serverAvailable,
    playBook,
    pauseBook,
    retryBook,
    addBook,
    removeBook,
    // Bulk actions
    retryAllFailed,
    pauseAll,
    playAllPending,
    // SSE status
    sseState,
    // Computed states
    computed,
  };
}

// Helper to get status color
export function getStatusColor(status: BatchBook['status']): string {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in_progress':
      return 'warning';
    case 'failed':
      return 'destructive';
    case 'pending':
    default:
      return 'secondary';
  }
}

// Helper to get status icon
export function getStatusIcon(status: BatchBook['status']): string {
  switch (status) {
    case 'completed':
      return 'check-circle';
    case 'in_progress':
      return 'play';
    case 'failed':
      return 'x-circle';
    case 'pending':
    default:
      return 'clock';
  }
}

// Helper to format phase progress
export function formatPhaseProgress(book: BatchBook): string {
  if (book.status === 'pending') return '-';
  if (book.status === 'completed') return '11/11';
  if (book.status === 'failed') return book.phases_completed || '-';
  if (book.current_phase) return `${book.current_phase}/11`;
  return book.phases_completed || '-';
}

// Helper to calculate progress percentage
export function getProgressPercentage(book: BatchBook): number {
  if (book.status === 'pending') return 0;
  if (book.status === 'completed') return 100;
  if (book.current_phase) return Math.round((book.current_phase / 11) * 100);
  return 0;
}
