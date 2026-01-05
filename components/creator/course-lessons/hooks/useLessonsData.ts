import { useState, useCallback } from 'react';
import type { Lesson, LessonStats } from '../types';
import { MOCK_LESSONS } from '../data';

export function useLessonsData() {
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_LESSONS);

  // Get unique modules for filter
  const modules = Array.from(new Set(lessons.map((l) => l.moduleName)));

  // Calculate statistics
  const stats: LessonStats = {
    total: lessons.length,
    completed: lessons.filter((l) => l.status === 'completed').length,
    review: lessons.filter((l) => l.status === 'review').length,
    generating: lessons.filter((l) => l.status === 'generating').length,
    draft: lessons.filter((l) => l.status === 'draft').length,
  };

  const progressPercent = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const updateLessonsStatus = useCallback((lessonIds: string[], newStatus: Lesson['status']) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lessonIds.includes(lesson.id) && lesson.status === 'draft'
          ? { ...lesson, status: newStatus }
          : lesson
      )
    );
  }, []);

  return {
    lessons,
    modules,
    stats,
    progressPercent,
    updateLessonsStatus,
  };
}
