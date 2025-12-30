/**
 * useLmsLesson Hook
 *
 * Fetch a single lesson content for the LMS player.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export interface LmsLessonDetail {
  id: string;
  slug: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  content: string | null;
  duration: string;
  videoUrl: string | null;
  moduleId: string | null;
  moduleTitle: string | null;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  sequenceOrder: number;
  previousLessonId: string | null;
  nextLessonId: string | null;
  materials: {
    id: string;
    title: string;
    type: string;
    url: string;
    size: string;
  }[];
}

interface UseLmsLessonResult {
  lesson: LmsLessonDetail | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useLmsLesson(
  courseSlug: string | undefined,
  lessonId: string | undefined
): UseLmsLessonResult {
  const [lesson, setLesson] = useState<LmsLessonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLesson = useCallback(async () => {
    if (!courseSlug || !lessonId) {
      setLesson(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured');
      setLesson(null);
      setLoading(false);
      return;
    }

    try {
      // Type definitions for query results
      type ProjectResult = { id: string; slug: string; name: string };
      type LessonResult = {
        id: string;
        slug: string;
        title: string;
        content: string | null;
        content_type: string;
        parent_content_id: string | null;
        sequence_order: number | null;
        metadata: any;
        project_id: string | null;
      };
      type ModuleResult = { id: string; title: string };
      type LessonNavResult = { id: string; sequence_order: number | null };

      // First get the course to verify access
      const { data: project, error: projectError } = (await supabase
        .from('content_projects')
        .select('id, slug, name')
        .eq('slug', courseSlug)
        .eq('project_type', 'course')
        .single()) as { data: ProjectResult | null; error: any };

      if (projectError) throw projectError;
      if (!project) throw new Error('Course not found');

      // Fetch the lesson
      const { data: lessonData, error: lessonError } = (await supabase
        .from('contents')
        .select(
          `
          id,
          slug,
          title,
          content,
          content_type,
          parent_content_id,
          sequence_order,
          metadata,
          project_id
        `
        )
        .eq('id', lessonId)
        .eq('project_id', project.id)
        .eq('content_type', 'course_lesson')
        .single()) as { data: LessonResult | null; error: any };

      if (lessonError) throw lessonError;
      if (!lessonData) throw new Error('Lesson not found');

      // Fetch module info if has parent
      let moduleTitle: string | null = null;
      if (lessonData.parent_content_id) {
        const { data: moduleData } = (await supabase
          .from('contents')
          .select('id, title')
          .eq('id', lessonData.parent_content_id)
          .single()) as { data: ModuleResult | null; error: any };
        moduleTitle = moduleData?.title || null;
      }

      // Get all lessons to find prev/next
      const { data: allLessons } = (await supabase
        .from('contents')
        .select('id, sequence_order')
        .eq('project_id', project.id)
        .eq('content_type', 'course_lesson')
        .is('deleted_at', null)
        .order('sequence_order', { ascending: true })) as {
        data: LessonNavResult[] | null;
        error: any;
      };

      const currentIndex = allLessons?.findIndex((l) => l.id === lessonId) ?? -1;
      const previousLessonId = currentIndex > 0 ? allLessons![currentIndex - 1].id : null;
      const nextLessonId =
        currentIndex < (allLessons?.length || 0) - 1 ? allLessons![currentIndex + 1].id : null;

      const metadata = lessonData.metadata as Record<string, any> | null;

      const lessonDetail: LmsLessonDetail = {
        id: lessonData.id,
        slug: lessonData.slug,
        title: lessonData.title,
        type: metadata?.lesson_type || 'video',
        content: lessonData.content,
        duration: metadata?.duration || '10:00',
        videoUrl: metadata?.video_url || null,
        moduleId: lessonData.parent_content_id,
        moduleTitle,
        courseId: project.id,
        courseSlug: project.slug,
        courseTitle: project.name,
        sequenceOrder: lessonData.sequence_order || 0,
        previousLessonId,
        nextLessonId,
        materials: [], // TODO: Fetch materials associated with this lesson
      };

      setLesson(lessonDetail);
    } catch (err) {
      console.error('Error fetching LMS lesson:', err);
      setError(err as Error);
      setLesson(null);
    } finally {
      setLoading(false);
    }
  }, [courseSlug, lessonId]);

  useEffect(() => {
    fetchLesson();
  }, [fetchLesson]);

  return {
    lesson,
    loading,
    error,
    refetch: fetchLesson,
  };
}

export default useLmsLesson;
