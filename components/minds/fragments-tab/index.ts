// Main component
export { FragmentsTab, FragmentsTab as default } from './FragmentsTab';

// Types
export type {
  FragmentsTabProps,
  ContentGroup,
  RelevanceFilter,
  MindFragment,
  MindFragmentsResult,
  FragmentUpdate,
  FragmentCreate,
} from './types';

// Hooks (for custom compositions)
export { useFragmentsState, useFragmentDialogs } from './hooks';

// Organisms (for custom layouts)
export { FragmentsStatsGrid, FragmentsFilters, FragmentsSidebar } from './organisms';
