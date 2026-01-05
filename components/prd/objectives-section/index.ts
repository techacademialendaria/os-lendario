/**
 * ObjectivesSection module barrel export
 * Atomic Design Refactoring
 */

// Main component
export { ObjectivesSection, default } from './ObjectivesSection';

// Types
export type {
  ObjectivesContent,
  ObjectivesSectionProps,
  ApprovalStatus,
  ObjectiveItem,
  ObjectiveType,
} from './types';

// Re-export hooks for external use if needed
export { useObjectivesState, useObjectivesAI } from './hooks';

// Re-export organisms for composition
export {
  ObjectiveItemCard,
  ObjectivesHeader,
  ObjectivesEmptyState,
  ObjectivesLoadingState,
  ObjectivesListView,
} from './organisms';
