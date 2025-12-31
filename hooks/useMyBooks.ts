/**
 * useMyBooks - Hook for managing user's book interactions
 *
 * Uses the mind_content_interactions system to track:
 * - Reading status (want_to_read, reading, read)
 * - Favorites
 * - Ratings
 * - Notes and highlights
 *
 * Requires authenticated user with associated mind_id.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// ============================================================================
// Types
// ============================================================================

export type ReadingStatus = 'want_to_read' | 'reading' | 'read' | 'none';

export interface MyBook {
  contentId: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  readingStatus: ReadingStatus;
  isFavorite: boolean;
  rating: number | null;
  readAt: string | null;
  addedAt: string;
}

export interface ReadingStats {
  booksRead: number;
  booksReading: number;
  booksWantToRead: number;
  booksFavorited: number;
  booksRated: number;
  totalComments: number;
  totalNotes: number;
  avgRating: number | null;
}

export interface BookInteractions {
  readingStatus: ReadingStatus;
  isFavorite: boolean;
  rating: number | null;
}

interface UseMyBooksResult {
  books: MyBook[];
  stats: ReadingStats | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  toggleFavorite: (contentId: string) => Promise<boolean>;
  setReadingStatus: (contentId: string, status: ReadingStatus) => Promise<void>;
  rateBook: (contentId: string, stars: number) => Promise<void>;
}

interface UseBookInteractionsResult {
  interactions: BookInteractions | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  toggleFavorite: () => Promise<boolean>;
  setReadingStatus: (status: ReadingStatus) => Promise<void>;
  rateBook: (stars: number) => Promise<void>;
}

// ============================================================================
// RPC Helper - untyped RPC calls with manual casting
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function callRpc<T>(fnName: string, params?: Record<string, unknown>): Promise<{ data: T | null; error: Error | null }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (supabase.rpc as any)(fnName, params);
  return {
    data: result.data as T | null,
    error: result.error as Error | null,
  };
}

// ============================================================================
// Transform Functions
// ============================================================================

interface RpcMyBook {
  content_id: string;
  title: string;
  slug: string;
  image_url: string | null;
  reading_status: string;
  is_favorite: boolean;
  rating: number | null;
  read_at: string | null;
  added_at: string;
}

interface RpcReadingStats {
  books_read: number;
  books_reading: number;
  books_want_to_read: number;
  books_favorited: number;
  books_rated: number;
  total_comments: number;
  total_notes: number;
  avg_rating: number | null;
}

const transformMyBook = (row: RpcMyBook): MyBook => ({
  contentId: row.content_id,
  title: row.title,
  slug: row.slug,
  imageUrl: row.image_url,
  readingStatus: (row.reading_status || 'none') as ReadingStatus,
  isFavorite: row.is_favorite,
  rating: row.rating,
  readAt: row.read_at,
  addedAt: row.added_at,
});

const transformStats = (data: RpcReadingStats): ReadingStats => ({
  booksRead: data.books_read,
  booksReading: data.books_reading,
  booksWantToRead: data.books_want_to_read,
  booksFavorited: data.books_favorited,
  booksRated: data.books_rated,
  totalComments: data.total_comments,
  totalNotes: data.total_notes,
  avgRating: data.avg_rating,
});

// ============================================================================
// useMyBooks Hook
// ============================================================================

/**
 * Hook to fetch and manage user's books with interactions.
 *
 * @param statusFilter - Optional filter: 'read' | 'reading' | 'want_to_read' | 'favorite'
 *
 * @example
 * const { books, stats, toggleFavorite } = useMyBooks();
 * const { books } = useMyBooks('read');
 * await toggleFavorite(book.contentId);
 */
export function useMyBooks(
  statusFilter?: 'read' | 'reading' | 'want_to_read' | 'favorite'
): UseMyBooksResult {
  const [books, setBooks] = useState<MyBook[]>([]);
  const [stats, setStats] = useState<ReadingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setBooks([]);
      setStats(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [booksResult, statsResult] = await Promise.all([
        callRpc<RpcMyBook[]>('get_my_books', {
          p_status: statusFilter || null,
          p_limit: 100,
          p_offset: 0,
        }),
        callRpc<RpcReadingStats>('get_my_reading_stats'),
      ]);

      if (booksResult.error) throw booksResult.error;
      if (statsResult.error) throw statsResult.error;

      const transformedBooks = (booksResult.data || []).map(transformMyBook);
      setBooks(transformedBooks);

      if (statsResult.data) {
        setStats(transformStats(statsResult.data));
      }
    } catch (err) {
      console.error('[useMyBooks] Error:', err);
      setError(err as Error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const toggleFavorite = useCallback(
    async (contentId: string): Promise<boolean> => {
      try {
        const { data, error: rpcError } = await callRpc<{ is_favorite: boolean }>(
          'toggle_favorite',
          { p_content_id: contentId }
        );

        if (rpcError) throw rpcError;

        const isFavorite = data?.is_favorite ?? false;

        setBooks((prev) =>
          prev.map((book) =>
            book.contentId === contentId ? { ...book, isFavorite } : book
          )
        );

        if (stats) {
          setStats({
            ...stats,
            booksFavorited: isFavorite
              ? stats.booksFavorited + 1
              : stats.booksFavorited - 1,
          });
        }

        return isFavorite;
      } catch (err) {
        console.error('[useMyBooks] toggleFavorite error:', err);
        throw err;
      }
    },
    [stats]
  );

  const setReadingStatus = useCallback(
    async (contentId: string, status: ReadingStatus): Promise<void> => {
      try {
        const { error: rpcError } = await callRpc('set_reading_status', {
          p_content_id: contentId,
          p_status: status,
          p_metadata: status === 'read' ? { finished_at: new Date().toISOString() } : {},
        });

        if (rpcError) throw rpcError;

        setBooks((prev) =>
          prev.map((book) =>
            book.contentId === contentId
              ? {
                  ...book,
                  readingStatus: status,
                  readAt: status === 'read' ? new Date().toISOString() : book.readAt,
                }
              : book
          )
        );

        const { data: newStats } = await callRpc<RpcReadingStats>('get_my_reading_stats');
        if (newStats) {
          setStats(transformStats(newStats));
        }
      } catch (err) {
        console.error('[useMyBooks] setReadingStatus error:', err);
        throw err;
      }
    },
    []
  );

  const rateBook = useCallback(
    async (contentId: string, stars: number): Promise<void> => {
      try {
        const { error: rpcError } = await callRpc('rate_content', {
          p_content_id: contentId,
          p_stars: stars,
        });

        if (rpcError) throw rpcError;

        setBooks((prev) =>
          prev.map((book) =>
            book.contentId === contentId ? { ...book, rating: stars } : book
          )
        );

        if (stats) {
          const { data: newStats } = await callRpc<RpcReadingStats>('get_my_reading_stats');
          if (newStats) {
            setStats(transformStats(newStats));
          }
        }
      } catch (err) {
        console.error('[useMyBooks] rateBook error:', err);
        throw err;
      }
    },
    [stats]
  );

  return {
    books,
    stats,
    isLoading,
    error,
    refetch: fetchBooks,
    toggleFavorite,
    setReadingStatus,
    rateBook,
  };
}

// ============================================================================
// useBookInteractions Hook
// ============================================================================

interface RpcBookDetails {
  my_interactions: {
    reading_status: string;
    is_favorite: boolean;
    rating: number | null;
  } | null;
}

/**
 * Hook to get and manage interactions for a single book.
 *
 * @param contentId - UUID of the book content
 *
 * @example
 * const { interactions, toggleFavorite, setReadingStatus } = useBookInteractions(book.id);
 * if (interactions?.isFavorite) { ... }
 * await setReadingStatus('read');
 */
export function useBookInteractions(contentId: string): UseBookInteractionsResult {
  const [interactions, setInteractions] = useState<BookInteractions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchInteractions = useCallback(async () => {
    if (!contentId || !isSupabaseConfigured()) {
      setInteractions(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: rpcError } = await callRpc<RpcBookDetails>(
        'get_book_details',
        { p_content_id: contentId }
      );

      if (rpcError) throw rpcError;

      if (data?.my_interactions) {
        setInteractions({
          readingStatus: (data.my_interactions.reading_status || 'none') as ReadingStatus,
          isFavorite: data.my_interactions.is_favorite ?? false,
          rating: data.my_interactions.rating ?? null,
        });
      } else {
        setInteractions({
          readingStatus: 'none',
          isFavorite: false,
          rating: null,
        });
      }
    } catch (err) {
      console.error('[useBookInteractions] Error:', err);
      setError(err as Error);
      setInteractions(null);
    } finally {
      setIsLoading(false);
    }
  }, [contentId]);

  useEffect(() => {
    fetchInteractions();
  }, [fetchInteractions]);

  const toggleFavorite = useCallback(async (): Promise<boolean> => {
    try {
      const { data, error: rpcError } = await callRpc<{ is_favorite: boolean }>(
        'toggle_favorite',
        { p_content_id: contentId }
      );

      if (rpcError) throw rpcError;

      const isFavorite = data?.is_favorite ?? false;

      setInteractions((prev) =>
        prev ? { ...prev, isFavorite } : { readingStatus: 'none', isFavorite, rating: null }
      );

      return isFavorite;
    } catch (err) {
      console.error('[useBookInteractions] toggleFavorite error:', err);
      throw err;
    }
  }, [contentId]);

  const setReadingStatus = useCallback(
    async (status: ReadingStatus): Promise<void> => {
      try {
        const { error: rpcError } = await callRpc('set_reading_status', {
          p_content_id: contentId,
          p_status: status,
          p_metadata: status === 'read' ? { finished_at: new Date().toISOString() } : {},
        });

        if (rpcError) throw rpcError;

        setInteractions((prev) =>
          prev ? { ...prev, readingStatus: status } : { readingStatus: status, isFavorite: false, rating: null }
        );
      } catch (err) {
        console.error('[useBookInteractions] setReadingStatus error:', err);
        throw err;
      }
    },
    [contentId]
  );

  const rateBook = useCallback(
    async (stars: number): Promise<void> => {
      try {
        const { error: rpcError } = await callRpc('rate_content', {
          p_content_id: contentId,
          p_stars: stars,
        });

        if (rpcError) throw rpcError;

        setInteractions((prev) =>
          prev ? { ...prev, rating: stars } : { readingStatus: 'none', isFavorite: false, rating: stars }
        );
      } catch (err) {
        console.error('[useBookInteractions] rateBook error:', err);
        throw err;
      }
    },
    [contentId]
  );

  return {
    interactions,
    isLoading,
    error,
    refetch: fetchInteractions,
    toggleFavorite,
    setReadingStatus,
    rateBook,
  };
}

export default useMyBooks;
