// Main component
export { BookSummarySection, BookSummarySection as default } from './BookSummarySection';

// Types
export type { ViewType, ViewTab } from './types';
export { VIEW_TABS } from './types';

// Hooks (re-exported for external use)
export { useTabs, useExpandable } from './hooks';
export { useSchemaSelection } from './hooks/useSchemaSelection';
export { useGlossaryFilters } from './hooks/useGlossaryFilters';

// Molecules
export { ViewTabs } from './molecules';

// Organisms
export {
  IntroView,
  DecisionsView,
  OverviewView,
  DatabaseView,
  PipelineView,
  DiagramsView,
  GlossaryView,
  KeyTakeawayCard,
} from './organisms';
