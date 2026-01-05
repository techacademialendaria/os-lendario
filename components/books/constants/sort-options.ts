/**
 * Centralized sort configurations for book listings
 *
 * Used by:
 * - BooksByAuthorTemplate
 * - BooksCategoryTemplate
 * - BookCollectionTemplate
 */

export type SortOption = 'recent' | 'title' | 'rating' | 'recommended';

/**
 * Sort option labels in Portuguese
 */
export const SORT_OPTIONS: Record<SortOption, string> = {
  recent: 'Mais Recentes',
  title: 'Título (A-Z)',
  rating: 'Melhor Avaliados',
  recommended: 'Recomendados',
};

/**
 * Default sort option for most views
 */
export const DEFAULT_SORT: SortOption = 'recent';

/**
 * Sort options for collection views (includes recommended)
 */
export const COLLECTION_SORT_OPTIONS: SortOption[] = ['recommended', 'title', 'rating'];

/**
 * Sort options for category/author views
 */
export const CATEGORY_SORT_OPTIONS: SortOption[] = ['recent', 'title', 'rating'];
