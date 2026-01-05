// Main exports
export { BookListTemplate, BookListTemplate as default } from './BookListTemplate';

// Re-export for backwards compatibility
export { BookListTemplate as BookListView } from './BookListTemplate';

// Types
export type {
  BookListTemplateProps,
  BookListStats,
  BookCategory,
  LayoutMode,
  StatsCardsProps,
  ToolbarProps,
  EmptyStateProps,
  TableViewProps,
  GridViewProps,
  BulkActionsBarProps,
  LanguageIndicatorProps,
} from './types';

// Constants
export { STATUS_OPTIONS, STATUS_CONFIG, STATS_CONFIG } from './types';

// Organisms (for granular imports)
export * from './organisms';

// Molecules (for reuse)
export * from './molecules';
