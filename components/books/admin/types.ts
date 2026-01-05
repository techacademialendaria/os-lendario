/**
 * Admin Types
 * Type definitions for the Books Admin module
 */

import type { BookLanguage } from '../../../hooks/useAdminBooks';

/**
 * Form state for version (language-specific content)
 */
export interface VersionFormState {
  id?: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  status: 'published' | 'draft' | 'archived';
}

/**
 * Complete form state for book editor
 */
export interface BookFormState {
  originalTitle: string;
  authorId: string | null;
  authorName: string;
  categorySlug: string | null;
  collectionSlugs: string[];
  coverUrl: string | null;
  coverFile: File | null;
  versions: {
    pt: VersionFormState | null;
    en: VersionFormState | null;
    es: VersionFormState | null;
  };
  metadata: {
    isbn: string;
    year: string;
    pageCount: string;
    readingTime: string;
    hasAudio: boolean;
  };
  isPublished: boolean;
  isFeatured: boolean;
}

/**
 * Form validation errors
 */
export interface BookFormErrors {
  originalTitle?: string;
  authorName?: string;
  versions?: string;
  versionTitle?: { [key in BookLanguage]?: string };
  versionSlug?: { [key in BookLanguage]?: string };
}

/**
 * Delete target for confirmation dialog
 */
export interface DeleteTarget {
  id: string;
  title: string;
}
