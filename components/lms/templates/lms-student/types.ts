import type { VideoProgress } from '../../video-player';

// ============================================================================
// Lesson Types
// ============================================================================

export type LessonType = 'video' | 'text' | 'quiz';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  type: LessonType;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseData {
  title: string;
  progress: number;
  modules: Module[];
}

// ============================================================================
// State Types
// ============================================================================

export interface LessonState {
  activeLessonId: string;
}

export interface UIState {
  sidebarOpen: boolean;
  activeTab: string;
}

export interface LoadingState {
  isMarkingComplete: boolean;
  isTogglingFavorite: boolean;
}

export interface ResumeState {
  resumeTime: number;
  showResumeBanner: boolean;
}

// ============================================================================
// Active Lesson Data
// ============================================================================

export interface ActiveLessonData extends Lesson {
  moduleTitle: string;
}

// ============================================================================
// Hook Options
// ============================================================================

export interface UseLessonDataOptions {
  slug?: string;
  lessonId?: string;
}

export interface UseResumePlaybackOptions {
  lessonId?: string;
  watchProgress?: { currentTime: number; percentage: number } | null;
  isCompleted?: boolean;
}
