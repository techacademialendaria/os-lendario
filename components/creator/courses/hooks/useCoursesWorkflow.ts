import { useState, useCallback } from 'react';
import type { ViewState, Course } from '../types';

interface UseCoursesWorkflowReturn {
  view: ViewState;
  setView: (view: ViewState) => void;
  selectedCourseSlug: string | null;
  setSelectedCourseSlug: (slug: string | null) => void;
  selectedCourse: Course | undefined;
  // Navigation helpers
  goBack: () => void;
  goToBrief: () => void;
  startResearch: () => void;
  goToReformulation: () => void;
  goToCurriculum: () => void;
  startGeneration: () => void;
  goToLesson: () => void;
  goToValidation: () => void;
}

/**
 * Hook for managing course workflow navigation
 * Handles view state transitions and course selection
 */
export function useCoursesWorkflow(courses: Course[]): UseCoursesWorkflowReturn {
  const [view, setView] = useState<ViewState>('list');
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string | null>(null);

  // Get selected course info
  const selectedCourse = courses.find((c) => c.slug === selectedCourseSlug);

  // Navigation helpers
  const goBack = useCallback(() => {
    setView('list');
    setSelectedCourseSlug(null);
  }, []);

  const goToBrief = useCallback(() => {
    setView('brief');
  }, []);

  const startResearch = useCallback(() => {
    setView('research_loading');
    // Simulate Agent Work
    setTimeout(() => setView('research_results'), 3500);
  }, []);

  const goToReformulation = useCallback(() => {
    setView('reformulation');
  }, []);

  const goToCurriculum = useCallback(() => {
    setView('curriculum');
  }, []);

  const startGeneration = useCallback(() => {
    setView('generation');
    // Simulate Generation
    setTimeout(() => setView('lesson'), 5000);
  }, []);

  const goToLesson = useCallback(() => {
    setView('lesson');
  }, []);

  const goToValidation = useCallback(() => {
    setView('validation');
  }, []);

  return {
    view,
    setView,
    selectedCourseSlug,
    setSelectedCourseSlug,
    selectedCourse,
    goBack,
    goToBrief,
    startResearch,
    goToReformulation,
    goToCurriculum,
    startGeneration,
    goToLesson,
    goToValidation,
  };
}
