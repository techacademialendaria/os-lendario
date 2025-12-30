/**
 * useLmsCourse Hook
 *
 * Fetch a single course with its modules and lessons for the LMS.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import type { CourseMetadata } from '../../types/database';

export interface LmsLesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz';
  status: 'completed' | 'current' | 'locked';
  sequenceOrder: number;
}

export interface LmsModule {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  lessons: LmsLesson[];
  sequenceOrder: number;
}

export interface LmsCourseDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string | null;
  instructor: {
    name: string;
    slug: string;
    avatar: string;
    bio?: string;
  };
  stats: {
    totalModules: number;
    totalLessons: number;
    duration: string;
    students: number;
    rating: number;
    lastUpdated: string;
  };
  progress: {
    completedLessons: number;
    percentage: number;
    currentLessonId: string | null;
  };
  modules: LmsModule[];
  resources: {
    id: string;
    title: string;
    type: string;
    url: string;
  }[];
}

interface UseLmsCourseResult {
  course: LmsCourseDetail | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useLmsCourse(slug: string | undefined): UseLmsCourseResult {
  const [course, setCourse] = useState<LmsCourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourse = useCallback(async () => {
    if (!slug) {
      setCourse(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured');
      setCourse(null);
      setLoading(false);
      return;
    }

    try {
      // Fetch course project
      type ProjectResult = {
        id: string;
        slug: string;
        name: string;
        description: string | null;
        image_url: string | null;
        project_metadata: any;
        updated_at: string;
        persona_mind: { id: string; name: string; slug: string } | null;
      };

      const { data: project, error: projectError } = (await supabase
        .from('content_projects')
        .select(
          `
          id,
          slug,
          name,
          description,
          image_url,
          project_metadata,
          updated_at,
          persona_mind:minds!content_projects_persona_mind_id_fkey(id, name, slug)
        `
        )
        .eq('slug', slug)
        .eq('project_type', 'course')
        .single()) as { data: ProjectResult | null; error: any };

      if (projectError) throw projectError;
      if (!project) throw new Error('Course not found');

      // Fetch modules and lessons
      type ContentResult = {
        id: string;
        slug: string;
        title: string;
        content_type: string;
        parent_content_id: string | null;
        sequence_order: number | null;
        metadata: any;
      };

      const { data: contents, error: contentsError } = (await supabase
        .from('contents')
        .select(
          `
          id,
          slug,
          title,
          content_type,
          parent_content_id,
          sequence_order,
          metadata
        `
        )
        .eq('project_id', project.id)
        .is('deleted_at', null)
        .in('content_type', ['course_module', 'course_lesson'])
        .order('sequence_order', { ascending: true })) as {
        data: ContentResult[] | null;
        error: any;
      };

      if (contentsError) throw contentsError;

      // Organize into modules with lessons
      const modulesMap = new Map<string, LmsModule>();
      const lessonsList: (LmsLesson & { parentId: string | null })[] = [];

      (contents || []).forEach((content) => {
        if (content.content_type === 'course_module') {
          modulesMap.set(content.id, {
            id: content.id,
            slug: content.slug,
            title: content.title,
            description: null,
            lessons: [],
            sequenceOrder: content.sequence_order || 0,
          });
        } else if (content.content_type === 'course_lesson') {
          const metadata = content.metadata as Record<string, any> | null;
          lessonsList.push({
            id: content.id,
            slug: content.slug,
            title: content.title,
            duration: metadata?.duration || '10:00',
            type: metadata?.lesson_type || 'video',
            status: 'locked', // TODO: Calculate from user progress
            sequenceOrder: content.sequence_order || 0,
            parentId: content.parent_content_id,
          });
        }
      });

      // Attach lessons to modules
      lessonsList.forEach((lesson) => {
        if (lesson.parentId && modulesMap.has(lesson.parentId)) {
          modulesMap.get(lesson.parentId)!.lessons.push({
            id: lesson.id,
            slug: lesson.slug,
            title: lesson.title,
            duration: lesson.duration,
            type: lesson.type,
            status: lesson.status,
            sequenceOrder: lesson.sequenceOrder,
          });
        }
      });

      // Sort lessons within modules
      modulesMap.forEach((module) => {
        module.lessons.sort((a, b) => a.sequenceOrder - b.sequenceOrder);
      });

      // Convert to array and sort modules
      const modules = Array.from(modulesMap.values()).sort(
        (a, b) => a.sequenceOrder - b.sequenceOrder
      );

      // Mark first incomplete lesson as current
      let foundCurrent = false;
      modules.forEach((module) => {
        module.lessons.forEach((lesson, idx) => {
          if (!foundCurrent) {
            if (idx === 0 && module === modules[0]) {
              lesson.status = 'current';
              foundCurrent = true;
            }
          }
        });
      });

      const metadata = project.project_metadata as CourseMetadata | null;
      const instructor = project.persona_mind as { id: string; name: string; slug: string } | null;
      const totalLessons = lessonsList.length;

      const courseDetail: LmsCourseDetail = {
        id: project.id,
        slug: project.slug,
        title: project.name,
        description: project.description || '',
        thumbnail: project.image_url,
        instructor: {
          name: instructor?.name || 'Instrutor',
          slug: instructor?.slug || '',
          avatar: instructor?.slug ? `https://i.pravatar.cc/150?u=${instructor.slug}` : '',
        },
        stats: {
          totalModules: modules.length,
          totalLessons,
          duration: metadata?.duration_hours ? `${metadata.duration_hours}h` : '--',
          students: Math.floor(Math.random() * 1000) + 100,
          rating: 4.5 + Math.random() * 0.5,
          lastUpdated: new Date(project.updated_at).toLocaleDateString('pt-BR', {
            month: 'short',
            year: 'numeric',
          }),
        },
        progress: {
          completedLessons: 0,
          percentage: 0,
          currentLessonId: lessonsList[0]?.id || null,
        },
        modules,
        resources: [], // TODO: Fetch resources
      };

      setCourse(courseDetail);
    } catch (err) {
      console.error('Error fetching LMS course:', err);
      setError(err as Error);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return {
    course,
    loading,
    error,
    refetch: fetchCourse,
  };
}

export default useLmsCourse;
