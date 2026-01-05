/**
 * Lendario Luxe Section Types
 */

// Reader mode theme style (for demo components)
export interface ReaderModeStyle {
  bg: string;
  text: string;
  textMuted: string;
  textDimmed: string;
  border: string;
  selection: string;
  headerBg: string;
  accent: string;
  aside: { bg: string; text: string };
  button: { bg: string; text: string; hover: string };
  texture: string;
}

// Mock book type (subset of full Book)
export interface MockBook {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorSlug: string;
  coverUrl: string | null;
  content: null;
  summary: null;
  category: string;
  categorySlug: string;
  tags: string[];
  hasAudio: boolean;
  duration: null;
  pageCount: number;
  publishedYear: number;
  isbn: null;
  rating: number;
  status: 'published' | 'draft';
  createdAt: string;
  readingTime: number;
  wordCount: null;
}

// Mock author type
export interface MockAuthor {
  id: string;
  slug: string;
  name: string;
  avatar_url: string | null;
  book_count: number;
}

// Mock collection type
export interface MockCollection {
  id: string;
  title: string;
  bookCount: number;
  icon: 'calendar' | 'user' | 'apps' | 'flame';
  color: string;
}

// Mock highlight type (for HighlightsShowcase)
export interface MockHighlight {
  id: string;
  text: string;
  note?: string;
  chapter?: string;
  position?: number;
  createdAt: string;
}

// Mock category type
export interface MockCategory {
  name: string;
  slug: string;
}

// Mock batch book type
export interface MockBatchBook {
  slug: string;
  title: string;
  author: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  current_phase: number;
  phases_completed?: string;
  error_message?: string;
}

// Mock book list stats
export interface MockBookListStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  collectionsCount: number;
}

// Mock admin book (for book-list showcase)
export interface MockAdminBook {
  id: string;
  slug: string;
  title: string;
  author_name: string | null;
  status: 'published' | 'draft' | 'archived';
  cover_url: string | null;
  category: string | null;
  updated_at: string;
  has_pt: boolean;
  has_en: boolean;
}
