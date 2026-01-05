import { useState, useEffect, useCallback } from 'react';
import {
  useLmsCourse,
  useLmsLesson,
  useLessonInteractions,
  useCourseProgress,
} from '../../../../../hooks/lms';
import type { VideoProgress } from '../../../video-player';
import type { CourseData, ActiveLessonData, LessonType, UseLessonDataOptions } from '../types';

// Fallback mock data
const FALLBACK_COURSE_DATA: CourseData = {
  title: 'Vibecoding - Apps Sem Codigo',
  progress: 35,
  modules: [
    {
      id: 'm1',
      title: 'Modulo 1: Fundamentos',
      lessons: [
        { id: 'l1', title: 'Boas Vindas & Mindset', duration: '10:05', status: 'completed', type: 'video' },
        { id: 'l2', title: 'Manifesto No-Code (Leitura)', duration: '5 min', status: 'completed', type: 'text' },
        { id: 'l3', title: 'Configurando o Ambiente', duration: '12:10', status: 'completed', type: 'video' },
      ],
    },
    {
      id: 'm2',
      title: 'Modulo 2: Banco de Dados',
      lessons: [
        { id: 'l4', title: 'Estrutura Relacional', duration: '25:00', status: 'current', type: 'video' },
        { id: 'l5', title: 'Guia de Tipos de Dados', duration: '10 min', status: 'locked', type: 'text' },
        { id: 'l6', title: 'Tabelas e Conexoes', duration: '32:10', status: 'locked', type: 'video' },
      ],
    },
  ],
};

interface UseLessonDataResult {
  // Course data
  realCourse: ReturnType<typeof useLmsCourse>['course'];
  courseData: CourseData;
  courseProgress: ReturnType<typeof useCourseProgress>['progress'];
  refetchProgress: () => void;

  // Lesson data
  realLesson: ReturnType<typeof useLmsLesson>['lesson'];
  lessonLoading: boolean;
  activeLessonId: string;
  setActiveLessonId: (id: string) => void;
  activeLesson: ActiveLessonData;

  // Interactions
  lessonInteractions: ReturnType<typeof useLessonInteractions>['interactions'];
  interactionsLoading: boolean;
  toggleFavorite: () => Promise<boolean>;
  markComplete: () => Promise<void>;
  markIncomplete: () => Promise<void>;
  rateLesson: (stars: number) => Promise<void>;
  updateWatchProgress: (currentTime: number, duration: number) => Promise<void>;

  // Handlers
  handleVideoProgress: (progress: VideoProgress) => void;
  handleVideoEnded: () => Promise<void>;
  handleToggleFavorite: () => Promise<void>;
  handleMarkComplete: () => Promise<void>;
  handleRate: (stars: number) => Promise<void>;

  // Loading states
  isMarkingComplete: boolean;
  isTogglingFavorite: boolean;
}

export function useLessonData({ slug, lessonId }: UseLessonDataOptions): UseLessonDataResult {
  // Fetch real data
  const { course: realCourse } = useLmsCourse(slug);
  const { lesson: realLesson, loading: lessonLoading } = useLmsLesson(slug, lessonId);

  // Lesson interactions
  const {
    interactions: lessonInteractions,
    isLoading: interactionsLoading,
    toggleFavorite,
    markComplete,
    markIncomplete,
    rateLesson,
    updateWatchProgress,
  } = useLessonInteractions(realLesson?.id || '');

  // Course progress
  const { progress: courseProgress, refetch: refetchProgress } = useCourseProgress(
    realCourse?.id || ''
  );

  // State
  const [activeLessonId, setActiveLessonId] = useState(lessonId || '');
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  // Update activeLessonId when lessonId from URL changes
  useEffect(() => {
    if (lessonId) setActiveLessonId(lessonId);
  }, [lessonId]);

  // Transform real data or use fallback
  const courseData: CourseData = realCourse
    ? {
        title: realCourse.title,
        progress: realCourse.progress.percentage,
        modules: realCourse.modules.map((m: { id: string; title: string; lessons: Array<{ id: string; title: string; duration: string; status: 'completed' | 'current' | 'locked'; type: 'video' | 'text' | 'quiz' }> }) => ({
          id: m.id,
          title: m.title,
          lessons: m.lessons.map((l: { id: string; title: string; duration: string; status: 'completed' | 'current' | 'locked'; type: 'video' | 'text' | 'quiz' }) => ({
            id: l.id,
            title: l.title,
            duration: l.duration,
            status: l.status,
            type: l.type,
          })),
        })),
      }
    : FALLBACK_COURSE_DATA;

  // Set initial activeLessonId if not set
  useEffect(() => {
    if (!activeLessonId && courseData.modules.length > 0) {
      const firstLesson = courseData.modules[0]?.lessons[0];
      if (firstLesson) setActiveLessonId(firstLesson.id);
    }
  }, [courseData, activeLessonId]);

  // Find active lesson data
  const getActiveLessonData = useCallback((): ActiveLessonData => {
    for (const mod of courseData.modules) {
      const lesson = mod.lessons.find((l) => l.id === activeLessonId);
      if (lesson) return { ...lesson, moduleTitle: mod.title };
    }
    return {
      id: 'l4',
      title: 'Estrutura Relacional',
      duration: '25:00',
      status: 'current',
      type: 'video' as LessonType,
      moduleTitle: 'Modulo 2',
    };
  }, [courseData.modules, activeLessonId]);

  // Video progress handler
  const handleVideoProgress = useCallback(
    (progress: VideoProgress) => {
      updateWatchProgress(progress.currentTime, progress.duration);
    },
    [updateWatchProgress]
  );

  // Video ended handler
  const handleVideoEnded = useCallback(async () => {
    if (!lessonInteractions?.isCompleted) {
      setIsMarkingComplete(true);
      try {
        await markComplete();
        refetchProgress();
      } catch (error) {
        console.error('Failed to mark lesson complete:', error);
      } finally {
        setIsMarkingComplete(false);
      }
    }
  }, [lessonInteractions?.isCompleted, markComplete, refetchProgress]);

  // Toggle favorite handler
  const handleToggleFavorite = useCallback(async () => {
    if (isTogglingFavorite || interactionsLoading) return;
    setIsTogglingFavorite(true);
    try {
      await toggleFavorite();
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    } finally {
      setIsTogglingFavorite(false);
    }
  }, [isTogglingFavorite, interactionsLoading, toggleFavorite]);

  // Mark complete handler
  const handleMarkComplete = useCallback(async () => {
    if (isMarkingComplete || interactionsLoading) return;
    setIsMarkingComplete(true);
    try {
      if (lessonInteractions?.isCompleted) {
        await markIncomplete();
      } else {
        await markComplete();
      }
      await refetchProgress();
    } catch (err) {
      console.error('Failed to mark complete:', err);
    } finally {
      setIsMarkingComplete(false);
    }
  }, [isMarkingComplete, interactionsLoading, lessonInteractions?.isCompleted, markIncomplete, markComplete, refetchProgress]);

  // Rate handler
  const handleRate = useCallback(
    async (stars: number) => {
      try {
        await rateLesson(stars);
      } catch (err) {
        console.error('Failed to rate lesson:', err);
      }
    },
    [rateLesson]
  );

  return {
    realCourse,
    courseData,
    courseProgress,
    refetchProgress,
    realLesson,
    lessonLoading,
    activeLessonId,
    setActiveLessonId,
    activeLesson: getActiveLessonData(),
    lessonInteractions,
    interactionsLoading,
    toggleFavorite,
    markComplete,
    markIncomplete,
    rateLesson,
    updateWatchProgress,
    handleVideoProgress,
    handleVideoEnded,
    handleToggleFavorite,
    handleMarkComplete,
    handleRate,
    isMarkingComplete,
    isTogglingFavorite,
  };
}
