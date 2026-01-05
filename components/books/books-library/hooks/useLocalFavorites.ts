/**
 * useLocalFavorites - Manages local favorite state with optimistic updates
 * Handles syncing with server and rollback on errors
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { toast } from '@/hooks/use-toast';
import type { BookData, ReadingStatus } from '../types';

interface UseLocalFavoritesParams {
  myBooks: Array<{ contentId: string; isFavorite: boolean; readingStatus: ReadingStatus }>;
  myBooksLoading: boolean;
  toggleFavorite: (contentId: string) => Promise<boolean>;
}

interface UseLocalFavoritesReturn {
  localFavorites: Set<string>;
  readingStatusMap: Map<string, ReadingStatus>;
  handleToggleFavorite: (book: BookData) => Promise<void>;
}

export function useLocalFavorites({
  myBooks,
  myBooksLoading,
  toggleFavorite,
}: UseLocalFavoritesParams): UseLocalFavoritesReturn {
  const [localFavorites, setLocalFavorites] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync local favorites with server data ONLY on initial load
  useEffect(() => {
    if (!myBooksLoading && !isInitialized) {
      const ids = new Set(myBooks.filter(b => b.isFavorite).map((b) => b.contentId));
      setLocalFavorites(ids);
      setIsInitialized(true);
    }
  }, [myBooks, myBooksLoading, isInitialized]);

  // Map contentId -> readingStatus for quick lookup
  const readingStatusMap = useMemo(() => {
    const map = new Map<string, ReadingStatus>();
    myBooks.forEach(b => {
      if (b.readingStatus && b.readingStatus !== 'none') {
        map.set(b.contentId, b.readingStatus);
      }
    });
    return map;
  }, [myBooks]);

  // Handle favorite toggle with immediate UI update
  const handleToggleFavorite = useCallback(
    async (book: BookData) => {
      // Optimistic update
      const wasBookmarked = localFavorites.has(book.id);
      setLocalFavorites(prev => {
        const newSet = new Set(prev);
        if (wasBookmarked) {
          newSet.delete(book.id);
        } else {
          newSet.add(book.id);
        }
        return newSet;
      });

      try {
        const isFavorite = await toggleFavorite(book.id);
        // Confirm state from server response
        setLocalFavorites(prev => {
          const newSet = new Set(prev);
          if (isFavorite) {
            newSet.add(book.id);
          } else {
            newSet.delete(book.id);
          }
          return newSet;
        });
      } catch (err) {
        // Revert on error
        setLocalFavorites(prev => {
          const newSet = new Set(prev);
          if (wasBookmarked) {
            newSet.add(book.id);
          } else {
            newSet.delete(book.id);
          }
          return newSet;
        });
        console.error('Failed to toggle favorite:', err);
        toast({
          title: 'Erro ao favoritar',
          description: 'Nao foi possivel salvar. Tente novamente.',
          variant: 'destructive',
        });
      }
    },
    [toggleFavorite, localFavorites]
  );

  return {
    localFavorites,
    readingStatusMap,
    handleToggleFavorite,
  };
}
