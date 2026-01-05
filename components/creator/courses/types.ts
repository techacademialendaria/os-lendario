/**
 * Course Creator - Shared Types
 *
 * Types, interfaces, and config constants for course components.
 * Mock data is in data/mock-data.ts
 */

// =============================================================================
// VIEW & MODE STATES
// =============================================================================

export type ViewState =
  | 'list'
  | 'new'
  | 'brief'
  | 'research_loading'
  | 'research_results'
  | 'reformulation'
  | 'curriculum'
  | 'generation'
  | 'lesson'
  | 'validation';

export type ViewMode = 'list' | 'grid';
export type CourseMode = 'greenfield' | 'brownfield';

// =============================================================================
// PIPELINE STATE
// =============================================================================

export type PipelineStepStatus = 'completed' | 'current' | 'pending';

export interface PipelineState {
  brief: PipelineStepStatus;
  research: PipelineStepStatus;
  curriculum: PipelineStepStatus;
  lessons: PipelineStepStatus;
  validation: PipelineStepStatus;
}

// Alias for backwards compatibility
export type CoursePipeline = PipelineState;

// =============================================================================
// COURSE TYPES
// =============================================================================

export interface CourseInstructor {
  name: string;
  avatar: string;
  isMMOS: boolean;
}

export interface CourseAlert {
  type: 'warning' | 'error';
  message: string;
}

export interface Course {
  id: string | number;
  title: string;
  slug: string;
  icon: string;
  category: string;
  instructor: CourseInstructor;
  lessonsCount: number;
  modulesCount: number;
  researchCount: number;
  assessmentsCount: number;
  duration: string;
  type: 'Greenfield' | 'Brownfield';
  frameworks: string[];
  fidelityScore: number | null;
  statusLabel: string;
  progress: number;
  updatedAt: string;
  alerts?: CourseAlert[];
  pipeline: PipelineState;
}

// =============================================================================
// CURRICULUM TYPES
// =============================================================================

export interface CurriculumLesson {
  id: string;
  title: string;
  duration: string;
}

export interface CurriculumModule {
  id: number;
  title: string;
  description: string;
  lessons: CurriculumLesson[];
}

// =============================================================================
// GENERATION LOG TYPES
// =============================================================================

export type GenerationLogStatus = 'success' | 'retrying' | 'pending';

export interface GenerationLogEntry {
  id: string;
  title: string;
  gps: number;
  dl: number;
  status: GenerationLogStatus;
  msg: string;
}

// =============================================================================
// BRIEF EDITOR TYPES
// =============================================================================

export interface PainPoint {
  id: number;
  text: string;
  intensity: number;
}

// =============================================================================
// PIPELINE STAGE CONFIG
// =============================================================================

export interface PipelineStageConfig {
  id: string;
  label: string;
  icon: string;
  status: 'active' | 'done' | 'pending';
  count: number;
}

// =============================================================================
// METRIC CARD CONFIG
// =============================================================================

export interface MetricConfig {
  label: string;
  value: string | number;
  icon: string;
  change: string;
  changeLabel: string;
  trendUp: boolean;
  sparkline: string;
}

// =============================================================================
// CONTENT TYPE CONFIG
// =============================================================================

export interface ContentTypeConfig {
  label: string;
  count: number;
  percent: number;
  icon: string;
}

// =============================================================================
// CONFIG CONSTANTS
// =============================================================================

export const COURSE_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Completo: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600',
    border: 'border-emerald-500/30',
  },
  Produzindo: {
    bg: 'bg-studio-primary/10',
    text: 'text-studio-primary',
    border: 'border-studio-primary/30',
  },
  Validação: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600',
    border: 'border-amber-500/30',
  },
  Planejamento: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
    border: 'border-blue-500/30',
  },
};

export const PIPELINE_STATUS_COLORS: Record<PipelineStepStatus, string> = {
  completed: 'text-studio-primary',
  current: 'text-studio-primary animate-pulse',
  pending: 'text-muted-foreground',
};

export const DEFAULT_CONTENT_TYPES: ContentTypeConfig[] = [
  { label: 'Aulas', count: 161, percent: 55, icon: 'video-camera' },
  { label: 'Planejamento', count: 35, percent: 12, icon: 'calendar' },
  { label: 'Recursos', count: 28, percent: 10, icon: 'folder' },
  { label: 'Quizzes', count: 20, percent: 7, icon: 'list-check' },
  { label: 'Pesquisas', count: 17, percent: 6, icon: 'search' },
  { label: 'Relatórios', count: 14, percent: 5, icon: 'chart-pie' },
  { label: 'Projetos', count: 12, percent: 4, icon: 'rocket' },
  { label: 'Validações', count: 4, percent: 1, icon: 'shield-check' },
];

// =============================================================================
// MOCK DATA (re-exported for backwards compatibility)
// =============================================================================

export const generationLog: GenerationLogEntry[] = [
  { id: '1.1', title: 'Introdução', gps: 92, dl: 85, status: 'success', msg: 'Hook validado' },
  { id: '1.2', title: 'Mindset', gps: 88, dl: 78, status: 'success', msg: 'História adicionada' },
  {
    id: '1.3',
    title: 'Diagnóstico',
    gps: 45,
    dl: 82,
    status: 'retrying',
    msg: 'GPS: Destino pouco claro. Regenerando...',
  },
  { id: '2.1', title: 'Pomodoro', gps: 0, dl: 0, status: 'pending', msg: 'Aguardando...' },
];
