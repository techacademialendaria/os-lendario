/**
 * useBooksLibraryData - Aggregates all data fetching for Books Library
 * Combines featured books, categories, collections, and user's books data
 */

import { useMemo } from 'react';
import { useBooks, useBookCategories, useFeaturedBooks, useBookCount, type BookData } from '@/hooks/useBooks';
import { useBookCollections } from '@/hooks/useBookCollections';
import { useMyBooks, type ReadingStatus } from '@/hooks/useMyBooks';
import { useAuth } from '@/lib/AuthContext';
import type { BooksLibraryData } from '../types';

export function useBooksLibraryData(): BooksLibraryData {
  const { isAuthenticated } = useAuth();

  // Featured sections (with limits)
  const { recentBooks, popularBooks, audiobookBooks, loading: featuredLoading } = useFeaturedBooks();

  // All books (paginated)
  const { books, loading, loadingMore, error, loadMore, hasMore } = useBooks({ limit: 12 });

  // Metadata
  const { count: totalBookCount } = useBookCount();
  const { categories, loading: categoriesLoading } = useBookCategories();
  const { collections, loading: collectionsLoading } = useBookCollections();

  // User's books
  const { books: myBooks, toggleFavorite, isLoading: myBooksLoading } = useMyBooks();

  // Currently reading book
  const currentlyReadingBook = useMemo(() => {
    if (!isAuthenticated || myBooksLoading) return null;
    const readingBooks = myBooks.filter(b => b.readingStatus === 'reading');
    return readingBooks.length > 0 ? readingBooks[0] as unknown as BookData : null;
  }, [isAuthenticated, myBooks, myBooksLoading]);

  // Visible book IDs for search exclusion
  const visibleBookIds = useMemo(() => new Set([
    ...recentBooks.map(b => b.id),
    ...popularBooks.map(b => b.id),
    ...audiobookBooks.map(b => b.id),
    ...books.map(b => b.id),
  ]), [recentBooks, popularBooks, audiobookBooks, books]);

  return {
    // Featured sections
    recentBooks,
    popularBooks,
    audiobookBooks,
    featuredLoading,

    // All books
    books,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,

    // Metadata
    totalBookCount,
    categories,
    categoriesLoading,
    collections,
    collectionsLoading,

    // User's books
    myBooks: myBooks as unknown as BooksLibraryData['myBooks'],
    myBooksLoading,
    toggleFavorite,

    // Currently reading
    currentlyReadingBook,

    // Visible book IDs
    visibleBookIds,
  };
}
