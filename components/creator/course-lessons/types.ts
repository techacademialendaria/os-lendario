import { Section } from '../../../types';

// --- Lesson Types ---
export type LessonType = 'video' | 'text' | 'quiz' | 'practice';
export type LessonStatus = 'draft' | 'generating' | 'review' | 'completed';

export interface Lesson {
  id: string;
  moduleId: number;
  moduleName: string;
  title: string;
  duration: string;
  type: LessonType;
  status: LessonStatus;
  gpsScore?: number;
  dlScore?: number;
  wordCount?: number;
  lastUpdated: string;
}

// --- Pipeline Types ---
export type PipelineStepStatus = 'completed' | 'current' | 'pending';
export type PipelineStepKey = 'overview' | 'brief' | 'research' | 'curriculum' | 'lessons' | 'validation';

export interface PipelineStep {
  key: PipelineStepKey;
  label: string;
  status: PipelineStepStatus;
}

// --- Stats Types ---
export interface LessonStats {
  total: number;
  completed: number;
  review: number;
  generating: number;
  draft: number;
}

// --- Filter Types ---
export interface StatusFilterOption {
  label: string;
  value: string;
}

export interface ModuleFilterOption {
  label: string;
  value: string;
}

// --- Navigation Types ---
export type CourseView = 'overview' | 'brief' | 'research' | 'curriculum' | 'lessons' | 'validation';

// --- Component Props ---
export interface CourseLessonsTemplateProps {
  setSection: (s: Section) => void;
  courseSlug: string;
  courseTitle: string;
  onBack: () => void;
  onNavigate: (view: CourseView) => void;
  onEditLesson?: (lessonId: string) => void;
}

export interface CourseSidebarProps {
  courseTitle: string;
  currentStep: string;
  pipeline: PipelineStep[];
  onNavigate: (view: CourseView) => void;
}

export interface LessonsHeaderProps {
  selectedCount: number;
  isGenerating: boolean;
  canProceed: boolean;
  onGenerateSelected: () => void;
  onNavigateValidation: () => void;
}

export interface StatsBarProps {
  stats: LessonStats;
  progressPercent: number;
}

export interface FiltersBarProps {
  searchQuery: string;
  filterStatus: string;
  filterModule: string;
  modules: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onModuleChange: (value: string) => void;
}

export interface LessonsTableProps {
  lessons: Lesson[];
  selectedLessons: string[];
  allSelected: boolean;
  onToggleSelectAll: () => void;
  onToggleSelect: (lessonId: string) => void;
  onEditLesson?: (lessonId: string) => void;
}

// --- Config Types ---
export const STATUS_FILTER_OPTIONS: StatusFilterOption[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Concluido', value: 'completed' },
  { label: 'Revisao', value: 'review' },
  { label: 'Gerando', value: 'generating' },
  { label: 'Rascunho', value: 'draft' },
];

export const LESSON_TYPE_ICONS: Record<LessonType, string> = {
  video: 'video',
  text: 'document',
  quiz: 'question',
  practice: 'laptop-code',
};
