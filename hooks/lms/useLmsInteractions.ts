/**
 * useLmsInteractions - Hook for managing LMS lesson interactions
 *
 * Reuses the mind_content_interactions system for:
 * - Marking lessons as complete (read status)
 * - Favorites
 * - Ratings
 *
 * Works with the same RPCs as useMyBooks:
 * - toggle_favorite
 * - set_reading_status
 * - rate_content
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

// ============================================================================
// Types
// ============================================================================

export type LessonStatus = 'completed' | 'in_progress' | 'not_started';

export interface LessonInteractions {
  isCompleted: boolean;
  isFavorite: boolean;
  rating: number | null;
  watchProgress: WatchProgress | null;
}

export interface WatchProgress {
  currentTime: number;      // seconds watched
  duration: number;         // total duration
  percentage: number;       // 0-100
  lastUpdated: string;      // ISO timestamp
}

export interface CourseProgress {
  completedLessons: number;
  totalLessons: number;
  percentage: number;
}

interface UseLessonInteractionsResult {
  interactions: LessonInteractions | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  toggleFavorite: () => Promise<boolean>;
  markComplete: () => Promise<void>;
  markIncomplete: () => Promise<void>;
  rateLesson: (stars: number) => Promise<void>;
  updateWatchProgress: (currentTime: number, duration: number) => Promise<void>;
}

interface UseCourseProgressResult {
  progress: CourseProgress;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// ============================================================================
// RPC Helper
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
// useLessonInteractions Hook
// ============================================================================

/**
 * Hook to get and manage interactions for a single lesson.
 *
 * @param lessonId - UUID of the lesson content
 *
 * @example
 * const { interactions, markComplete, toggleFavorite } = useLessonInteractions(lesson.id);
 * if (interactions?.isCompleted) { ... }
 * await markComplete();
 */
export function useLessonInteractions(lessonId: string): UseLessonInteractionsResult {
  const [interactions, setInteractions] = useState<LessonInteractions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchInteractions = useCallback(async () => {
    if (!lessonId || !isSupabaseConfigured()) {
      setInteractions(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Type for query result
      type InteractionRow = {
        interaction_type: string;
        value: Record<string, unknown> | null;
      };

      // Fetch all interactions for this lesson in one query
      const { data, error: queryError } = await supabase
        .from('mind_content_interactions')
        .select('interaction_type, value')
        .eq('content_id', lessonId) as { data: InteractionRow[] | null; error: Error | null };

      if (queryError) throw queryError;

      // Parse interactions
      let isCompleted = false;
      let isFavorite = false;
      let rating: number | null = null;
      let watchProgress: WatchProgress | null = null;

      for (const row of data || []) {
        if (row.interaction_type === 'read') {
          isCompleted = true;
        } else if (row.interaction_type === 'favorite') {
          isFavorite = true;
        } else if (row.interaction_type === 'rating') {
          rating = (row.value as { stars?: number })?.stars ?? null;
        } else if (row.interaction_type === 'watch_progress') {
          const val = row.value as {
            current_time?: number;
            duration?: number;
            percentage?: number;
            last_updated?: string;
          };
          if (val) {
            watchProgress = {
              currentTime: val.current_time ?? 0,
              duration: val.duration ?? 0,
              percentage: val.percentage ?? 0,
              lastUpdated: val.last_updated ?? new Date().toISOString(),
            };
          }
        }
      }

      setInteractions({ isCompleted, isFavorite, rating, watchProgress });
    } catch (err) {
      console.error('[useLessonInteractions] Error:', err);
      setError(err as Error);
      setInteractions(null);
    } finally {
      setIsLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchInteractions();
  }, [fetchInteractions]);

  const toggleFavorite = useCallback(async (): Promise<boolean> => {
    try {
      const { data, error: rpcError } = await callRpc<{ is_favorite: boolean }>(
        'toggle_favorite',
        { p_content_id: lessonId }
      );

      if (rpcError) throw rpcError;

      const isFavorite = data?.is_favorite ?? false;

      setInteractions((prev) =>
        prev ? { ...prev, isFavorite } : { isCompleted: false, isFavorite, rating: null, watchProgress: null }
      );

      return isFavorite;
    } catch (err) {
      console.error('[useLessonInteractions] toggleFavorite error:', err);
      throw err;
    }
  }, [lessonId]);

  const markComplete = useCallback(async (): Promise<void> => {
    try {
      const { error: rpcError } = await callRpc('set_reading_status', {
        p_content_id: lessonId,
        p_status: 'read',
        p_metadata: { completed_at: new Date().toISOString() },
      });

      if (rpcError) throw rpcError;

      setInteractions((prev) =>
        prev ? { ...prev, isCompleted: true } : { isCompleted: true, isFavorite: false, rating: null, watchProgress: null }
      );
    } catch (err) {
      console.error('[useLessonInteractions] markComplete error:', err);
      throw err;
    }
  }, [lessonId]);

  const markIncomplete = useCallback(async (): Promise<void> => {
    try {
      const { error: rpcError } = await callRpc('set_reading_status', {
        p_content_id: lessonId,
        p_status: 'none',
        p_metadata: {},
      });

      if (rpcError) throw rpcError;

      setInteractions((prev) =>
        prev ? { ...prev, isCompleted: false } : { isCompleted: false, isFavorite: false, rating: null, watchProgress: null }
      );
    } catch (err) {
      console.error('[useLessonInteractions] markIncomplete error:', err);
      throw err;
    }
  }, [lessonId]);

  const rateLesson = useCallback(
    async (stars: number): Promise<void> => {
      try {
        const { error: rpcError } = await callRpc('rate_content', {
          p_content_id: lessonId,
          p_stars: stars,
        });

        if (rpcError) throw rpcError;

        setInteractions((prev) =>
          prev ? { ...prev, rating: stars } : { isCompleted: false, isFavorite: false, rating: stars, watchProgress: null }
        );
      } catch (err) {
        console.error('[useLessonInteractions] rateLesson error:', err);
        throw err;
      }
    },
    [lessonId]
  );

  // Debounce ref for updateWatchProgress
  const lastProgressUpdateRef = useRef<number>(0);
  const PROGRESS_UPDATE_INTERVAL = 5000; // Update at most every 5 seconds

  const updateWatchProgress = useCallback(
    async (currentTime: number, duration: number): Promise<void> => {
      // Debounce: skip if less than 5 seconds since last update
      const now = Date.now();
      if (now - lastProgressUpdateRef.current < PROGRESS_UPDATE_INTERVAL) {
        return;
      }
      lastProgressUpdateRef.current = now;

      try {
        const percentage = duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
        const lastUpdated = new Date().toISOString();

        // Use RPC function for watch_progress (handles mind_id automatically)
        const { data, error: rpcError } = await callRpc<{
          content_id: string;
          current_time: number;
          duration: number;
          percentage: number;
          auto_completed: boolean;
        }>('update_watch_progress', {
          p_content_id: lessonId,
          p_current_time: Math.round(currentTime),
          p_duration: Math.round(duration),
          p_percentage: percentage,
        });

        if (rpcError) {
          console.error('[useLessonInteractions] updateWatchProgress error:', rpcError);
          return;
        }

        // Update local state
        setInteractions((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            watchProgress: {
              currentTime: Math.round(currentTime),
              duration: Math.round(duration),
              percentage,
              lastUpdated,
            },
            // Auto-complete if RPC returned auto_completed
            isCompleted: data?.auto_completed ? true : prev.isCompleted,
          };
        });
      } catch (err) {
        console.error('[useLessonInteractions] updateWatchProgress error:', err);
      }
    },
    [lessonId]
  );

  return {
    interactions,
    isLoading,
    error,
    refetch: fetchInteractions,
    toggleFavorite,
    markComplete,
    markIncomplete,
    rateLesson,
    updateWatchProgress,
  };
}

// ============================================================================
// useCourseProgress Hook
// ============================================================================

/**
 * Hook to get course progress based on completed lessons.
 *
 * @param courseProjectId - UUID of the course project
 *
 * @example
 * const { progress } = useCourseProgress(course.id);
 * console.log(`${progress.percentage}% complete`);
 */
export function useCourseProgress(courseProjectId: string): UseCourseProgressResult {
  const [progress, setProgress] = useState<CourseProgress>({
    completedLessons: 0,
    totalLessons: 0,
    percentage: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!courseProjectId || !isSupabaseConfigured()) {
      setProgress({ completedLessons: 0, totalLessons: 0, percentage: 0 });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Type for lessons query
      type LessonRow = { id: string };

      // Get all lessons for this course
      const { data: lessons, error: lessonsError } = await supabase
        .from('contents')
        .select('id')
        .eq('project_id', courseProjectId)
        .eq('content_type', 'course_lesson')
        .is('deleted_at', null) as { data: LessonRow[] | null; error: Error | null };

      if (lessonsError) throw lessonsError;

      const totalLessons = lessons?.length || 0;

      if (totalLessons === 0) {
        setProgress({ completedLessons: 0, totalLessons: 0, percentage: 0 });
        setIsLoading(false);
        return;
      }

      const lessonIds = lessons!.map((l) => l.id);

      // Get completed lessons (those with 'read' interaction)
      const { data: completed, error: completedError } = await supabase
        .from('mind_content_interactions')
        .select('content_id')
        .in('content_id', lessonIds)
        .eq('interaction_type', 'read');

      if (completedError) throw completedError;

      const completedLessons = completed?.length || 0;
      const percentage = Math.round((completedLessons / totalLessons) * 100);

      setProgress({ completedLessons, totalLessons, percentage });
    } catch (err) {
      console.error('[useCourseProgress] Error:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [courseProjectId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return {
    progress,
    isLoading,
    error,
    refetch: fetchProgress,
  };
}

export default useLessonInteractions;
