import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface Framework {
  id: string;
  name: string;
  slug: string;
}

export interface CourseData {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  status: string;
  project_type: string;
  project_metadata: Record<string, unknown> | null;
  default_frameworks: string[] | null;
  persona_mind_id: string | null;
  creator_mind_id: string | null;
  target_audience_id: string | null;
  created_at: string;
  updated_at: string;
  persona_mind?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  creator_mind?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  // Resolved framework names
  frameworks?: Framework[];
}

interface UseCourseResult {
  course: CourseData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCourse(slug: string | undefined): UseCourseResult {
  const [course, setCourse] = useState<CourseData | null>(null);
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
      setLoading(false);
      return;
    }

    try {
      // Fetch course data
      const { data, error: queryError } = await supabase
        .from('content_projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (queryError) throw queryError;

      // If course has framework IDs, fetch their names
      let frameworks: Framework[] = [];
      if (data.default_frameworks && data.default_frameworks.length > 0) {
        const { data: frameworkData, error: fwError } = await supabase
          .from('content_frameworks')
          .select('id, name, slug')
          .in('id', data.default_frameworks);

        if (!fwError && frameworkData) {
          frameworks = frameworkData;
        }
      }

      setCourse({
        ...data,
        frameworks,
      });
    } catch (err) {
      console.error('Error fetching course:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return { course, loading, error, refetch: fetchCourse };
}

export default useCourse;
