/**
 * Mock data for Lendario Luxe showcase
 */

import type {
  MockBook,
  MockAuthor,
  MockCollection,
  ReaderModeStyle,
  MockHighlight,
  MockCategory,
  MockBatchBook,
  MockBookListStats,
  MockAdminBook,
} from '../types';

export const MOCK_BOOK: MockBook = {
  id: '1',
  slug: 'atomic-habits',
  title: 'Atomic Habits',
  author: 'James Clear',
  authorSlug: 'james-clear',
  coverUrl: 'https://m.media-amazon.com/images/I/81bGKUa1e0L._SY466_.jpg',
  content: null,
  summary: null,
  category: 'Produtividade',
  categorySlug: 'produtividade',
  tags: [],
  hasAudio: false,
  duration: null,
  pageCount: 320,
  publishedYear: 2018,
  isbn: null,
  rating: 4.8,
  status: 'published',
  createdAt: '2024-01-01',
  readingTime: 180,
  wordCount: null,
};

export const MOCK_BOOK_2: MockBook = {
  ...MOCK_BOOK,
  id: '2',
  slug: 'deep-work',
  title: 'Deep Work',
  author: 'Cal Newport',
  coverUrl: 'https://m.media-amazon.com/images/I/81JJ7fyyKyS._SY466_.jpg',
  category: 'Foco',
};

export const MOCK_AUTHOR: MockAuthor = {
  id: '1',
  slug: 'james-clear',
  name: 'James Clear',
  avatar_url: '/minds/james_clear.jpg',
  book_count: 3,
};

export const MOCK_AUTHOR_2: MockAuthor = {
  id: '2',
  slug: 'cal-newport',
  name: 'Cal Newport',
  avatar_url: '/minds/cal_newport.jpg',
  book_count: 5,
};

export const MOCK_COLLECTION: MockCollection = {
  id: '1',
  title: 'Hábitos & Rotinas',
  bookCount: 12,
  icon: 'calendar',
  color: 'bg-primary',
};

export const MOCK_COLLECTION_2: MockCollection = {
  id: '2',
  title: 'Biografias',
  bookCount: 8,
  icon: 'user',
  color: 'bg-blue-500',
};

// Reader mode colors (full ThemeStyle interface)
export const READER_MODE: ReaderModeStyle = {
  bg: '#FDFCFB',
  text: '#1A1A1A',
  textMuted: 'rgba(26, 26, 26, 0.6)',
  textDimmed: 'rgba(26, 26, 26, 0.4)',
  border: 'rgba(0, 0, 0, 0.05)',
  selection: 'selection:bg-[#C9B298]/30',
  headerBg: 'rgba(255, 255, 255, 0.8)',
  accent: '#C9B298',
  aside: { bg: '#18181B', text: '#FAFAFA' },
  button: { bg: '#1A1A1A', text: '#FAFAFA', hover: '#27272A' },
  texture: 'opacity-[0.03] mix-blend-multiply',
};

// ============================================================================
// HIGHLIGHTS MOCK DATA
// ============================================================================

export const MOCK_HIGHLIGHTS: MockHighlight[] = [
  {
    id: 'h1',
    text: 'You do not rise to the level of your goals. You fall to the level of your systems.',
    note: 'Foco em sistemas, não apenas objetivos.',
    chapter: 'Introduction',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'h2',
    text: 'Every action you take is a vote for the type of person you wish to become.',
    chapter: 'Chapter 2: How Your Habits Shape Your Identity',
    createdAt: '2024-01-16T14:20:00Z',
  },
  {
    id: 'h3',
    text: 'The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.',
    note: 'Identidade > Resultados',
    chapter: 'Chapter 2',
    createdAt: '2024-01-17T09:15:00Z',
  },
];

// ============================================================================
// CATEGORIES MOCK DATA
// ============================================================================

export const MOCK_CATEGORIES: MockCategory[] = [
  { name: 'Produtividade', slug: 'produtividade' },
  { name: 'Negócios', slug: 'negocios' },
  { name: 'Psicologia', slug: 'psicologia' },
  { name: 'Filosofia', slug: 'filosofia' },
  { name: 'Biografias', slug: 'biografias' },
  { name: 'Ciência', slug: 'ciencia' },
];

// ============================================================================
// BATCH PROGRESS MOCK DATA
// ============================================================================

export const MOCK_BATCH_BOOKS: MockBatchBook[] = [
  {
    slug: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    status: 'completed',
    current_phase: 11,
    phases_completed: '1-11',
  },
  {
    slug: 'the-psychology-of-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    status: 'in_progress',
    current_phase: 6,
    phases_completed: '1-5',
  },
  {
    slug: 'never-split-the-difference',
    title: 'Never Split the Difference',
    author: 'Chris Voss',
    status: 'failed',
    current_phase: 4,
    phases_completed: '1-3',
    error_message: 'API timeout on extraction phase',
  },
  {
    slug: 'influence',
    title: 'Influence: The Psychology of Persuasion',
    author: 'Robert Cialdini',
    status: 'pending',
    current_phase: 0,
  },
];

export const MOCK_BATCH_STATS = {
  total: 100,
  completed: 65,
  inProgress: 12,
  pending: 20,
  failed: 3,
};

// ============================================================================
// BOOK LIST MOCK DATA
// ============================================================================

export const MOCK_BOOK_LIST_STATS: MockBookListStats = {
  total: 1234,
  published: 892,
  draft: 234,
  archived: 108,
  collectionsCount: 24,
};

export const MOCK_ADMIN_BOOKS: MockAdminBook[] = [
  {
    id: '1',
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author_name: 'James Clear',
    status: 'published',
    cover_url: 'https://m.media-amazon.com/images/I/81bGKUa1e0L._SY466_.jpg',
    category: 'Produtividade',
    updated_at: '2024-01-20T10:00:00Z',
    has_pt: true,
    has_en: true,
  },
  {
    id: '2',
    slug: 'deep-work',
    title: 'Deep Work',
    author_name: 'Cal Newport',
    status: 'published',
    cover_url: 'https://m.media-amazon.com/images/I/81JJ7fyyKyS._SY466_.jpg',
    category: 'Foco',
    updated_at: '2024-01-19T15:30:00Z',
    has_pt: true,
    has_en: false,
  },
  {
    id: '3',
    slug: 'the-lean-startup',
    title: 'The Lean Startup',
    author_name: 'Eric Ries',
    status: 'draft',
    cover_url: null,
    category: 'Negócios',
    updated_at: '2024-01-18T09:00:00Z',
    has_pt: false,
    has_en: true,
  },
  {
    id: '4',
    slug: 'zero-to-one',
    title: 'Zero to One',
    author_name: 'Peter Thiel',
    status: 'archived',
    cover_url: null,
    category: 'Startups',
    updated_at: '2024-01-10T12:00:00Z',
    has_pt: true,
    has_en: true,
  },
];
