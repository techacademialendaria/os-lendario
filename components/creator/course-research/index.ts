// Course Research - Atomic Design Refactored
// Orchestrator + Organisms + Hooks + Types

export { default as CourseResearchTemplate } from './CourseResearchTemplate';
export type { CourseResearchTemplateProps } from './types';

// Re-export organisms for external use if needed
export {
  CourseSidebar,
  ResearchHeader,
  CompetitorsTab,
  MarketGapsTab,
  SourcesTab,
  AIInsightAlert,
} from './organisms';

// Re-export hooks
export { useCourseResearchData } from './hooks';

// Re-export types
export type {
  Competitor,
  MarketGap,
  Source,
  PipelineStep,
  CourseSidebarProps,
  ResearchHeaderProps,
  CompetitorsTabProps,
  MarketGapsTabProps,
  SourcesTabProps,
} from './types';
