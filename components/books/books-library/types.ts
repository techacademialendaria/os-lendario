/**
 * Types for BooksLibrary feature
 * Extracted from BooksLibraryTemplate.tsx
 */

import type { Section } from '@/types';
import type { BookData } from '@/hooks/useBooks';
import type { ReadingStatus } from '@/hooks/useMyBooks';

// =============================================================================
// Props Types
// =============================================================================

export interface BooksLibraryProps {
  setSection: (s: Section) => void;
  onSelectBook?: (slug: string) => void;
}

export interface HeroSectionProps {
  totalBookCount: number;
  isAuthenticated: boolean;
  currentlyReadingBook: BookData | null;
  recentBooks: BookData[];
  popularBooks: BookData[];
  onContinueReading: () => void;
  onMyLibrary: () => void;
  onExploreLibrary: () => void;
  isLoading: boolean;
}

export interface CategoriesBarProps {
  categories: Array<{ slug: string; name: string }>;
  onCategoryClick: (slug: string) => void;
  onAllClick: () => void;
  isLoading: boolean;
}

export interface BookSectionProps {
  title: string;
  subtitle: string;
  books: BookData[];
  localFavorites: Set<string>;
  readingStatusMap: Map<string, ReadingStatus>;
  onBookClick: (book: BookData) => void;
  onToggleFavorite: (book: BookData) => void;
  isLoading: boolean;
  variant?: 'horizontal' | 'carousel';
  icon?: string;
}

export interface CollectionsSectionProps {
  collections: Array<{
    id: string;
    slug: string;
    name: string;
    bookCount: number;
  }>;
  onCollectionClick: (slug: string) => void;
  onViewAll: () => void;
  isLoading: boolean;
}

export interface CategoriesSectionProps {
  categories: Array<{
    slug: string;
    name: string;
    count: number;
  }>;
  onCategoryClick: (slug: string) => void;
  onViewAll: () => void;
  isLoading: boolean;
}

export interface AllBooksSectionProps {
  books: BookData[];
  totalBookCount: number;
  localFavorites: Set<string>;
  readingStatusMap: Map<string, ReadingStatus>;
  onBookClick: (book: BookData) => void;
  onToggleFavorite: (book: BookData) => void;
  isLoading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement>;
  onViewAllBooks: () => void;
}

export interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

// =============================================================================
// Data Types
// =============================================================================

export interface LocalFavoritesState {
  localFavorites: Set<string>;
  isInitialized: boolean;
}

export interface BooksLibraryData {
  // Featured sections
  recentBooks: BookData[];
  popularBooks: BookData[];
  audiobookBooks: BookData[];
  featuredLoading: boolean;

  // All books (paginated)
  books: BookData[];
  loading: boolean;
  loadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;

  // Metadata
  totalBookCount: number;
  categories: Array<{ slug: string; name: string; count: number }>;
  categoriesLoading: boolean;
  collections: Array<{ id: string; slug: string; name: string; bookCount: number }>;
  collectionsLoading: boolean;

  // User's books
  myBooks: Array<{ contentId: string; isFavorite: boolean; readingStatus: ReadingStatus; slug: string }>;
  myBooksLoading: boolean;
  toggleFavorite: (contentId: string) => Promise<boolean>;

  // Currently reading
  currentlyReadingBook: BookData | null;

  // Visible book IDs for search exclusion
  visibleBookIds: Set<string>;
}

// Re-export types from hooks for convenience
export type { BookData, ReadingStatus };
