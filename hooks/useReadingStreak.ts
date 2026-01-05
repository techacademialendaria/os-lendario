/**
 * useReadingStreak - Hook for fetching user's reading streak data
 *
 * Uses the get_reading_streak() RPC function to get:
 * - Current streak (consecutive days)
 * - Longest streak ever
 * - Week activity (last 7 days)
 * - Total books read
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// ============================================================================
// Types
// ============================================================================

export interface WeekDay {
  date: string;
  completed: boolean;
  isToday: boolean;
}

export interface ReadingStreakData {
  currentStreak: number;
  longestStreak: number;
  weekActivity: WeekDay[];
  totalBooksRead: number;
  lastReadDate: string | null;
}

interface UseReadingStreakResult {
  streak: ReadingStreakData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Default values for week activity
const getDefaultWeekActivity = (): WeekDay[] => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      completed: false,
      isToday: i === dayOfWeek,
    };
  });
};

// ============================================================================
// Hook
// ============================================================================

export function useReadingStreak(): UseReadingStreakResult {
  const [streak, setStreak] = useState<ReadingStreakData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStreak = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setStreak({
        currentStreak: 0,
        longestStreak: 0,
        weekActivity: getDefaultWeekActivity(),
        totalBooksRead: 0,
        lastReadDate: null,
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error: rpcError } = await (supabase.rpc as any)('get_reading_streak');

      if (rpcError) {
        throw rpcError;
      }

      if (data) {
        setStreak({
          currentStreak: data.current_streak || 0,
          longestStreak: data.longest_streak || 0,
          weekActivity: (data.week_activity || []).map((day: { date: string; completed: boolean; is_today: boolean }) => ({
            date: day.date,
            completed: day.completed,
            isToday: day.is_today,
          })),
          totalBooksRead: data.total_books_read || 0,
          lastReadDate: data.last_read_date || null,
        });
      } else {
        setStreak({
          currentStreak: 0,
          longestStreak: 0,
          weekActivity: getDefaultWeekActivity(),
          totalBooksRead: 0,
          lastReadDate: null,
        });
      }
    } catch (err) {
      console.error('[useReadingStreak] Error fetching streak:', err);
      setError(err as Error);
      // Set default values on error
      setStreak({
        currentStreak: 0,
        longestStreak: 0,
        weekActivity: getDefaultWeekActivity(),
        totalBooksRead: 0,
        lastReadDate: null,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  return {
    streak,
    isLoading,
    error,
    refetch: fetchStreak,
  };
}

export default useReadingStreak;
