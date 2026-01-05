// PRD Project Detail - Types
import type { Section } from '@/types';
import type { PRDProject, PRDEpic, PRDStory } from '@/types/prd';

// =============================================================================
// CONSTANTS
// =============================================================================

export const STUDIO_TEAL = '#00C7BE';
export const SUCCESS_GREEN = '#10B981';

export const STATUS_TO_PHASE: Record<string, number> = {
  upload: 1,
  brief: 2,
  prd: 3,
  epics: 4,
  stories: 5,
  exported: 6,
  completed: 6,
};

// =============================================================================
// INTERFACES
// =============================================================================

export interface PRDProjectDetailTemplateProps {
  setSection: (s: Section) => void;
}

export interface StatItem {
  label: string;
  value: string;
  subtext: string;
}

export interface PipelineStep {
  id: string;
  label: string;
  status: 'done' | 'active' | 'pending';
}

export interface EpicWithStories extends Omit<PRDEpic, 'stories'> {
  stories: PRDStory[];
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface ProjectHeaderProps {
  project: PRDProject;
  statusLabel: string;
  onBack: () => void;
  onContinue: () => void;
}

export interface ProjectMetricsProps {
  stats: StatItem[];
}

export interface ProjectPipelineProps {
  steps: PipelineStep[];
  progress: number;
  onNavigate: (phase: string) => void;
}

export interface ProjectStructureProps {
  storiesByEpic: EpicWithStories[];
  totalEpics: number;
  totalStories: number;
  slug: string;
  onNavigateToEpics: () => void;
  onNavigateToStories: () => void;
}

export interface QuickActionsProps {
  slug: string;
  onEditBrief: () => void;
  onEditPRD: () => void;
  onViewStories: () => void;
  onDownload: () => void;
  onExport: () => void;
}

export interface ProjectInfoCardProps {
  project: PRDProject;
  statusLabel: string;
}
