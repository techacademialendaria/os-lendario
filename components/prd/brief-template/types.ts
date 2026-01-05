// PRD Brief Template Types
// Types and configurations for the Brief Builder phase

import { Section } from '@/types';

// =============================================================================
// CONSTANTS
// =============================================================================

export const STUDIO_TEAL = '#00C7BE';
export const MIN_CHARS_REQUIRED = 50;

export const PIPELINE_STEPS = [
  { id: 'upload', label: 'Upload', status: 'done' as const },
  { id: 'brief', label: 'Brief', status: 'active' as const },
  { id: 'prd', label: 'PRD', status: 'pending' as const },
  { id: 'epics', label: 'Épicos', status: 'pending' as const },
  { id: 'stories', label: 'Stories', status: 'pending' as const },
  { id: 'export', label: 'Export', status: 'pending' as const },
] as const;

// =============================================================================
// TYPES
// =============================================================================

export interface PRDBriefTemplateProps {
  setSection: (section: Section) => void;
}

export type EditorMode = 'edit' | 'preview';
export type ProjectDecision = 'task' | 'project' | null;

export interface BriefFormState {
  problem: string;
  solution: string;
  differentials: string;
  scopeIn: string;
  scopeOut: string;
  metrics: string;
}

export interface BriefUIState {
  viewMode: EditorMode;
  decision: ProjectDecision;
  showTaskDialog: boolean;
  isGenerating: string | null;
  isAdvancing: boolean;
}

export type PipelineStep = typeof PIPELINE_STEPS[number];
