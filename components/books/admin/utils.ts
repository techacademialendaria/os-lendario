/**
 * Admin Utilities
 * Helper functions for the Books Admin module
 */

import type { AdminBook } from '../../../hooks/useAdminBooks';
import type { BookFormState, VersionFormState } from './types';

/**
 * Format date to relative string (e.g., "Hoje", "Ontem", "3 dias atrás")
 */
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays < 7) return `${diffDays} dias atrás`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} sem atrás`;

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
};

/**
 * Create empty form state for new book
 */
export const createEmptyFormState = (): BookFormState => ({
  originalTitle: '',
  authorId: null,
  authorName: '',
  categorySlug: null,
  collectionSlugs: [],
  coverUrl: null,
  coverFile: null,
  versions: { pt: null, en: null, es: null },
  metadata: { isbn: '', year: '', pageCount: '', readingTime: '', hasAudio: false },
  isPublished: false,
  isFeatured: false,
});

/**
 * Create form state from existing book for editing
 */
export const createFormStateFromBook = (book: AdminBook): BookFormState => ({
  originalTitle: book.originalTitle,
  authorId: book.author?.id || null,
  authorName: book.author?.name || '',
  categorySlug: book.category?.slug || null,
  collectionSlugs: book.collections.map((c) => c.slug),
  coverUrl: book.coverUrl,
  coverFile: null,
  versions: {
    pt: book.languages.pt
      ? {
          id: book.languages.pt.id,
          title: book.languages.pt.title,
          slug: book.languages.pt.slug,
          content: book.languages.pt.content || '',
          summary: book.languages.pt.summary || '',
          status: book.languages.pt.status,
        }
      : null,
    en: book.languages.en
      ? {
          id: book.languages.en.id,
          title: book.languages.en.title,
          slug: book.languages.en.slug,
          content: book.languages.en.content || '',
          summary: book.languages.en.summary || '',
          status: book.languages.en.status,
        }
      : null,
    es: book.languages.es
      ? {
          id: book.languages.es.id,
          title: book.languages.es.title,
          slug: book.languages.es.slug,
          content: book.languages.es.content || '',
          summary: book.languages.es.summary || '',
          status: book.languages.es.status,
        }
      : null,
  },
  metadata: {
    isbn: book.languages.pt?.isbn || book.languages.en?.isbn || '',
    year: book.languages.pt?.year || book.languages.en?.year || '',
    pageCount: String(book.languages.pt?.pageCount || book.languages.en?.pageCount || ''),
    readingTime: String(book.languages.pt?.readingTime || book.languages.en?.readingTime || ''),
    hasAudio: book.languages.pt?.hasAudio || book.languages.en?.hasAudio || false,
  },
  isPublished: book.status === 'published',
  isFeatured: false,
});
