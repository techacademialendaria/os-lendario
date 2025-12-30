/**
 * useLmsCourses Hook
 *
 * Fetch courses available for students in the LMS.
 * Returns published courses with progress tracking.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import type { CourseMetadata } from '../../types/database';

export interface LmsCourseTag {
  id: number; // BIGINT in DB
  name: string;
  slug: string;
}

export interface LmsCourse {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string | null;
  instructor: {
    name: string;
    slug: string;
    avatar: string;
  };
  tags: LmsCourseTag[];
  stats: {
    totalModules: number;
    totalLessons: number;
    duration: string;
    students: number;
    rating: number;
  };
  progress: {
    completedLessons: number;
    percentage: number;
    lastAccessedAt: string | null;
    currentLessonId: string | null;
  };
  metadata: CourseMetadata | null;
  updatedAt: string;
}

interface UseLmsCoursesResult {
  courses: LmsCourse[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useLmsCourses(): UseLmsCoursesResult {
  const [courses, setCourses] = useState<LmsCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured');
      setCourses([]);
      setLoading(false);
      return;
    }

    try {
      // Fetch published courses
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

      // Simplified query - project_tags may not exist yet
      const { data: projects, error: projectsError } = (await supabase
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
        .eq('project_type', 'course')
        .in('status', ['published', 'completed', 'validation'])
        .order('updated_at', { ascending: false })) as { data: ProjectResult[] | null; error: any };

      if (projectsError) throw projectsError;

      // Get content counts for each course
      const projectIds = projects?.map((p) => p.id) || [];

      let contentCounts: Record<string, { modules: number; lessons: number }> = {};
      let projectTags: Record<string, LmsCourseTag[]> = {};

      if (projectIds.length > 0) {
        type ContentResult = { project_id: string | null; content_type: string };

        const { data: contents } = (await supabase
          .from('contents')
          .select('project_id, content_type')
          .in('project_id', projectIds)
          .is('deleted_at', null)) as { data: ContentResult[] | null; error: any };

        contents?.forEach((c) => {
          if (!contentCounts[c.project_id!]) {
            contentCounts[c.project_id!] = { modules: 0, lessons: 0 };
          }
          if (c.content_type === 'course_module') {
            contentCounts[c.project_id!].modules++;
          } else if (c.content_type === 'course_lesson') {
            contentCounts[c.project_id!].lessons++;
          }
        });

        // Fetch tags for courses
        type TagResult = {
          project_id: string;
          tags: { id: number; name: string; slug: string } | null;
        };

        const { data: tagData } = (await supabase
          .from('project_tags')
          .select('project_id, tags(id, name, slug)')
          .in('project_id', projectIds)) as { data: TagResult[] | null; error: any };

        tagData?.forEach((pt) => {
          if (!projectTags[pt.project_id]) {
            projectTags[pt.project_id] = [];
          }
          if (pt.tags) {
            projectTags[pt.project_id].push({
              id: pt.tags.id,
              name: pt.tags.name,
              slug: pt.tags.slug,
            });
          }
        });
      }

      // Transform to LmsCourse
      const transformedCourses: LmsCourse[] = (projects || []).map((project) => {
        const metadata = project.project_metadata as CourseMetadata | null;
        const counts = contentCounts[project.id] || { modules: 0, lessons: 0 };
        const instructor = project.persona_mind as {
          id: string;
          name: string;
          slug: string;
        } | null;
        const tags = projectTags[project.id] || [];

        return {
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
          tags,
          stats: {
            totalModules: metadata?.num_modules || counts.modules,
            totalLessons: metadata?.num_lessons || counts.lessons,
            duration: metadata?.duration_hours ? `${metadata.duration_hours}h` : '--',
            students: Math.floor(Math.random() * 1000) + 100, // TODO: Real enrollment count
            rating: 4.5 + Math.random() * 0.5, // TODO: Real ratings
          },
          progress: {
            completedLessons: 0, // TODO: User progress tracking
            percentage: 0,
            lastAccessedAt: null,
            currentLessonId: null,
          },
          metadata,
          updatedAt: project.updated_at,
        };
      });

      setCourses(transformedCourses);
    } catch (err) {
      console.error('Error fetching LMS courses:', err);
      setError(err as Error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  };
}

export default useLmsCourses;
