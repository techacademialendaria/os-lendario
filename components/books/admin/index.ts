// Admin components - re-export from new location
export { BatchProgressPanel } from '../batch-progress';
export { LogsViewer } from './LogsViewer';

// Re-export BookEditorView from new location for backwards compatibility
export { BookEditorView } from '../book-editor';

// Re-export BookListView from new location for backwards compatibility
export { BookListView, BookListTemplate } from '../book-list';

// Batch sub-components
export { BatchStatsCards } from './BatchStatsCards';
export { BatchActiveIndicator } from './BatchActiveIndicator';
export { BatchBookRow } from './BatchBookRow';
export { AddBookDialog, RemoveDialog } from './BatchDialogs';

// Types and utilities
export * from './types';
export * from './utils';
