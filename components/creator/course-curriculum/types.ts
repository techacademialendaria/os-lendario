import type { Section } from '@/types';

// =============================================================================
// LESSON & MODULE TYPES
// =============================================================================

export type LessonType = 'video' | 'text' | 'quiz' | 'practice';
export type LessonStatus = 'draft' | 'in_progress' | 'completed';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: LessonType;
  status: LessonStatus;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

// =============================================================================
// PIPELINE TYPES
// =============================================================================

export type PipelineStatus = 'completed' | 'current' | 'pending';

export interface PipelineStep {
  key: CurriculumView;
  label: string;
  status: PipelineStatus;
}

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

export type CurriculumView = 'overview' | 'brief' | 'research' | 'curriculum' | 'lessons' | 'validation';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface CourseCurriculumTemplateProps {
  setSection: (s: Section) => void;
}

export interface CourseSidebarProps {
  courseTitle: string;
  currentStep: string;
  pipeline: PipelineStep[];
  onNavigate: (view: CurriculumView) => void;
}

export interface CurriculumHeaderProps {
  modulesCount: number;
  totalLessons: number;
  totalDuration: number;
  onAddModule: () => void;
  onNavigate: (view: CurriculumView) => void;
}

export interface ModuleCardProps {
  module: Module;
  moduleIndex: number;
  onToggle: (moduleId: number) => void;
  onAddLesson: (moduleId: number) => void;
  onDeleteModule: (moduleId: number) => void;
  onDeleteLesson: (moduleId: number, lessonId: string) => void;
  onEditLesson?: (lessonId: string) => void;
}

export interface AddModuleSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
}

export interface AddLessonSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  duration: string;
  type: LessonType;
  onTitleChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onTypeChange: (value: LessonType) => void;
  onSubmit: () => void;
}

// =============================================================================
// ICON/STATUS HELPERS
// =============================================================================

export interface StatusIconInfo {
  icon: string;
  color: string;
}
