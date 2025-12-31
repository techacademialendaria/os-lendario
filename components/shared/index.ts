// Shared Components Index
// Export all shared components from this file for easy imports

// Error Handling
export {
  ErrorBoundary,
  ErrorFallback,
  ErrorFallbackCompact,
  withErrorBoundary,
  type ErrorBoundaryProps,
  type ErrorFallbackProps,
} from './ErrorBoundary';

// Media Components
export {
  MediaCover,
  getSimpleGradient,
  getLiquidPalette,
  type MediaCoverProps,
} from './MediaCover';

// Interactive Components
export { StarRating, type StarRatingProps } from './StarRating';
export { FavoriteButton, type FavoriteButtonProps } from './FavoriteButton';
export { CircularProgressScore, type CircularProgressScoreProps } from './CircularProgressScore';

// Layout Components
export * from './layout';

// Module Components
export * from './module';

// Markdown
export { MarkdownRenderer } from './MarkdownRenderer';

// Module Topbar
export { default as ModuleTopbar } from './ModuleTopbar';
export type { ModuleTopbarProps, ModuleTopbarNavItem } from './ModuleTopbar';
