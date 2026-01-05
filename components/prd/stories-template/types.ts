// PRD Stories Template Types
// Types and configurations for the Stories Builder phase

import { Section } from '@/types';
import { EpicSummary, StorySummary, Complexity } from '@/types/prd';

// =============================================================================
// CONSTANTS
// =============================================================================

export const STUDIO_TEAL = '#00C7BE';

export const PIPELINE_STEPS = [
  { id: 'upload', label: 'Upload', status: 'done' as const },
  { id: 'brief', label: 'Brief', status: 'done' as const },
  { id: 'prd', label: 'PRD', status: 'done' as const },
  { id: 'epics', label: 'Epicos', status: 'done' as const },
  { id: 'stories', label: 'Stories', status: 'active' as const },
  { id: 'export', label: 'Export', status: 'pending' as const },
] as const;

export const COMPLEXITY_CONFIG: Record<Complexity, { label: string; color: string; bg: string }> = {
  P: { label: 'Pequena', color: 'text-green-600', bg: 'bg-green-500/10' },
  M: { label: 'Media', color: 'text-amber-600', bg: 'bg-amber-500/10' },
  G: { label: 'Grande', color: 'text-red-600', bg: 'bg-red-500/10' },
};

// =============================================================================
// TYPES
// =============================================================================

export interface PRDStoriesTemplateProps {
  setSection: (section: Section) => void;
}

export type PipelineStep = (typeof PIPELINE_STEPS)[number];

// State interfaces for hooks
export interface StoriesDataState {
  epics: EpicSummary[];
  stories: StorySummary[];
  selectedEpicId: string | null;
  selectedStoryId: string | null;
  isGenerating: boolean;
  isAdvancing: boolean;
}

// Organisms props
export interface LoadingStateProps {
  setSection: (section: Section) => void;
}

export interface StoriesHeaderProps {
  projectName: string;
  slug: string;
  totalStories: number;
}

export interface EpicsListProps {
  epics: EpicSummary[];
  stories: StorySummary[];
  selectedEpicId: string | null;
  onSelectEpic: (epicId: string) => void;
  totalStories: number;
}

export interface StoriesListProps {
  epic: EpicSummary | undefined;
  stories: StorySummary[];
  selectedStoryId: string | null;
  onSelectStory: (storyId: string) => void;
  onGenerateStories: () => void;
  isGenerating: boolean;
}

export interface StoryDetailProps {
  story: StorySummary | null;
  onSave: (story: StorySummary) => void;
  onClose: () => void;
}

export interface StoriesFooterProps {
  totalStories: number;
  hasStories: boolean;
  isAdvancing: boolean;
  onAdvance: () => void;
  onNavigateToEpics: () => void;
}

// Re-export for convenience
export type { EpicSummary, StorySummary, Complexity };
