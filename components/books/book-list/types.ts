/**
 * Book List Types
 * Type definitions for the Book List feature
 */

import type { AdminBook } from '@/hooks/useAdminBooks';

/**
 * Stats for the book list header
 */
export interface BookListStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  collectionsCount: number;
}

/**
 * Category for filtering
 */
export interface BookCategory {
  name: string;
  slug: string;
}

/**
 * Layout mode for display
 */
export type LayoutMode = 'grid' | 'list';

/**
 * Props for BookListTemplate (orchestrator)
 */
export interface BookListTemplateProps {
  // Data
  books: AdminBook[];
  stats: BookListStats;
  categories: BookCategory[];

  // Selection
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;

  // Filters
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  layoutMode: LayoutMode;
  onLayoutModeChange: (mode: LayoutMode) => void;

  // Actions
  onCreate: () => void;
  onEdit: (book: AdminBook) => void;
  onDelete: (bookId: string, bookTitle: string) => void;
  onBulkPublish: () => void;
  onBulkArchive: () => void;
  onClearSelection: () => void;
}

/**
 * Props for StatsCards organism
 */
export interface StatsCardsProps {
  stats: BookListStats;
}

/**
 * Props for Toolbar organism
 */
export interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  categories: BookCategory[];
  layoutMode: LayoutMode;
  onLayoutModeChange: (mode: LayoutMode) => void;
}

/**
 * Props for EmptyState organism
 */
export interface EmptyStateProps {
  hasFilters: boolean;
  onCreate: () => void;
}

/**
 * Props for TableView organism
 */
export interface TableViewProps {
  books: AdminBook[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onEdit: (book: AdminBook) => void;
  onDelete: (bookId: string, bookTitle: string) => void;
}

/**
 * Props for GridView organism
 */
export interface GridViewProps {
  books: AdminBook[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onEdit: (book: AdminBook) => void;
}

/**
 * Props for BulkActionsBar organism
 */
export interface BulkActionsBarProps {
  selectedCount: number;
  onBulkPublish: () => void;
  onBulkArchive: () => void;
  onClearSelection: () => void;
}

/**
 * Props for LanguageIndicator molecule
 */
export interface LanguageIndicatorProps {
  book: AdminBook;
}

/**
 * Status filter options
 */
export const STATUS_OPTIONS = [
  { label: 'Todos', value: 'all' },
  { label: 'Publicados', value: 'published' },
  { label: 'Rascunhos', value: 'draft' },
  { label: 'Arquivados', value: 'archived' },
] as const;

/**
 * Status badge config
 */
export const STATUS_CONFIG = {
  published: { variant: 'success' as const, label: 'No Ar' },
  draft: { variant: 'warning' as const, label: 'Rascunho' },
  archived: { variant: 'secondary' as const, label: 'Arquivado' },
} as const;

/**
 * Stats card config
 */
export const STATS_CONFIG = [
  {
    key: 'total' as const,
    label: 'Total de Livros',
    icon: 'book',
    colorClass: 'text-brand-gold',
    bgClass: 'bg-brand-gold/10',
  },
  {
    key: 'published' as const,
    label: 'Publicados',
    icon: 'check-circle',
    colorClass: 'text-brand-green',
    bgClass: 'bg-brand-green/10',
  },
  {
    key: 'draft' as const,
    label: 'Rascunhos',
    icon: 'pencil',
    colorClass: 'text-brand-orange',
    bgClass: 'bg-brand-orange/10',
  },
  {
    key: 'collectionsCount' as const,
    label: 'Coleções',
    icon: 'layers',
    colorClass: 'text-brand-blue',
    bgClass: 'bg-brand-blue/10',
  },
] as const;
