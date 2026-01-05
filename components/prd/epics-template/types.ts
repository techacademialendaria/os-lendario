// PRD Epics Template Types
// Extracted from PRDEpicsTemplate.tsx for atomic design

import { Section } from '@/types';
import type { PRDProject, EpicData } from '@/types/prd';

// =============================================================================
// CONSTANTS
// =============================================================================

export const STUDIO_TEAL = '#00C7BE';

export type PipelineStepStatus = 'done' | 'active' | 'pending';

export interface PipelineStep {
  id: string;
  label: string;
  status: PipelineStepStatus;
}

export const PIPELINE_STEPS: PipelineStep[] = [
  { id: 'upload', label: 'Upload', status: 'done' },
  { id: 'brief', label: 'Brief', status: 'done' },
  { id: 'prd', label: 'PRD', status: 'done' },
  { id: 'epics', label: 'Epicos', status: 'active' },
  { id: 'stories', label: 'Stories', status: 'active' },
  { id: 'export', label: 'Export', status: 'pending' },
];

// =============================================================================
// COMPONENT TYPES
// =============================================================================

export interface DetailedStory {
  id: string;
  title: string;
  verb: string;
  complexity: 'P' | 'M' | 'G';
  criteria: number;
}

export interface EpicWithStories {
  id: string;
  sequence_order: number;
  title: string;
  description?: string;
  storiesCount: number;
  status: string;
  stories: string[];
  detailedStories?: DetailedStory[];
}

// =============================================================================
// PROPS TYPES
// =============================================================================

export interface PRDEpicsTemplateProps {
  setSection: (section: Section) => void;
}

export interface EpicsHeaderProps {
  onNavigateToProjects: () => void;
}

export interface PipelineStepperProps {
  steps?: PipelineStep[];
}

export interface EpicsEmptyStateProps {
  onGenerate: () => void;
}

export interface EpicsGeneratingProps {}

export interface EpicsListProps {
  epics: EpicWithStories[];
  onAddStory: (epicId: string) => void;
}

export interface EpicsFooterProps {
  epicsCount: number;
  isAdvancing: boolean;
  onRefine: () => void;
  onValidate: () => void;
}

export interface LoadingStateProps {
  setSection: (s: Section) => void;
}

// =============================================================================
// HOOK RETURN TYPES
// =============================================================================

export interface UseEpicsDataReturn {
  project: PRDProject | null;
  loading: boolean;
  epics: EpicWithStories[];
  setEpics: React.Dispatch<React.SetStateAction<EpicWithStories[]>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  hasGenerated: boolean;
  setHasGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  isAdvancing: boolean;
  setIsAdvancing: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string | undefined;
}

export interface UseEpicsActionsReturn {
  handleGenerate: () => Promise<void>;
  handleRefine: () => void;
  handleAddStory: (epicId: string) => void;
  handleValidate: () => Promise<void>;
  navigateToProjects: () => void;
}

// Re-export EpicData for convenience
export type { EpicData } from '@/types/prd';
