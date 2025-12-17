import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { ContentProjectWithRelations, CourseMetadata } from '../types/database';

// Course UI type that maps to CoursesTemplate expectations
export interface CourseContentCounts {
  modules: number;
  lessons: number;
  research: number;
  assessments: number;
  resources: number;
  reports: number;
  total: number;
  avgFidelityScore: number | null;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: 'planning' | 'brief' | 'research' | 'curriculum' | 'generation' | 'validation' | 'published';
  progress: number;
  modules: number;
  lessons: number;
  lessonsGenerated: number;
  duration: string;
  instructor: string;
  instructorAvatar: string;
  updatedAt: string;
  createdAt: string;
  thumbnail?: string;
  metadata?: CourseMetadata;
  contentCounts?: CourseContentCounts;
}

// Map database status to UI status
const mapStatus = (dbStatus: string | null): Course['status'] => {
  const statusMap: Record<string, Course['status']> = {
    planning: 'planning',
    brief: 'brief',
    market_research: 'research',
    research: 'research',
    curriculum: 'curriculum',
    generation: 'generation',
    generating: 'generation',
    validation: 'validation',
    published: 'published',
    ready: 'published',
  };
  return statusMap[dbStatus || 'planning'] || 'planning';
};

// Calculate progress based on workflow stage
const calculateProgress = (metadata: CourseMetadata | null, status: string | null): number => {
  if (!metadata) {
    const stageProgress: Record<string, number> = {
      planning: 10,
      brief: 25,
      market_research: 40,
      research: 40,
      curriculum: 60,
      generation: 75,
      generating: 75,
      validation: 90,
      published: 100,
      ready: 100,
    };
    return stageProgress[status || 'planning'] || 10;
  }

  // Calculate based on actual completion
  let progress = 0;
  if (metadata.brief_complete) progress += 25;
  if (metadata.research_complete) progress += 15;
  if (metadata.curriculum_complete) progress += 20;
  if (metadata.lessons_generated && metadata.lessons_total) {
    progress += Math.round((metadata.lessons_generated / metadata.lessons_total) * 40);
  }
  return Math.min(progress, 100);
};

// Transform database record to UI course
const transformToCourse = (project: ContentProjectWithRelations): Course => {
  const metadata = project.project_metadata as CourseMetadata | null;
  const contentCounts = (project as any).content_counts as CourseContentCounts | undefined;
  const instructorFromJunction = (project as any).instructor_from_junction as { name: string; slug: string } | undefined;

  // Prioritize instructor from project_minds junction, fallback to persona_mind
  const instructorName = instructorFromJunction?.name || project.persona_mind?.name || 'Sem instrutor';
  const instructorSlug = instructorFromJunction?.slug || project.persona_mind?.slug || '';

  return {
    id: project.id,
    slug: project.slug,
    title: project.name,
    description: project.description || '',
    status: mapStatus(project.status),
    progress: calculateProgress(metadata, project.status),
    modules: metadata?.num_modules || project.modules_count || 0,
    lessons: metadata?.num_lessons || project.lessons_count || 0,
    lessonsGenerated: metadata?.lessons_generated || 0,
    duration: metadata?.duration_hours
      ? `${metadata.duration_hours}h`
      : '--',
    instructor: instructorName,
    instructorAvatar: instructorSlug ? `https://i.pravatar.cc/150?u=${instructorSlug}` : '',
    updatedAt: project.updated_at,
    createdAt: project.created_at,
    metadata,
    contentCounts,
  };
};


interface UseCoursesResult {
  courses: Course[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  isUsingMockData: boolean;
  totalContents: number;
  aggregatedCounts: CourseContentCounts;
}

const EMPTY_COUNTS: CourseContentCounts = { modules: 0, lessons: 0, research: 0, assessments: 0, resources: 0, reports: 0, total: 0, avgFidelityScore: null };

export function useCourses(): UseCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [aggregatedCounts, setAggregatedCounts] = useState<CourseContentCounts>(EMPTY_COUNTS);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - no courses available');
      setCourses([]);
      setIsUsingMockData(false);
      setLoading(false);
      return;
    }

    try {
      // Fetch courses (content_projects with type 'course')
      const { data: projects, error: projectsError } = await supabase
        .from('content_projects')
        .select(`
          *,
          persona_mind:minds!content_projects_persona_mind_id_fkey(id, name, slug),
          creator_mind:minds!content_projects_creator_mind_id_fkey(id, name, slug),
          target_audience:audience_profiles(id, name, slug)
        `)
        .eq('project_type', 'course')
        .order('updated_at', { ascending: false });

      if (projectsError) {
        throw projectsError;
      }

      // Fetch content counts for each project
      const projectIds = projects?.map(p => p.id) || [];

      if (projectIds.length > 0) {
        // Fetch instructors via project_minds junction table
        const { data: projectMinds } = await supabase
          .from('project_minds')
          .select(`
            project_id,
            role,
            mind:minds(id, name, slug)
          `)
          .in('project_id', projectIds)
          .eq('role', 'instructor');

        // Map instructors by project_id
        const instructorMap: Record<string, { name: string; slug: string }> = {};
        projectMinds?.forEach(pm => {
          if (pm.mind && pm.project_id) {
            instructorMap[pm.project_id] = {
              name: (pm.mind as any).name || 'Sem instrutor',
              slug: (pm.mind as any).slug || '',
            };
          }
        });

        // Attach instructors to projects
        projects?.forEach(p => {
          (p as any).instructor_from_junction = instructorMap[p.id];
        });

        // Get all content counts by type with fidelity scores
        const { data: contentCounts } = await supabase
          .from('contents')
          .select('project_id, content_type, fidelity_score')
          .in('project_id', projectIds)
          .is('deleted_at', null);

        // Aggregate counts per project with all content types
        const countsMap: Record<string, CourseContentCounts & { fidelityScores: number[] }> = {};
        contentCounts?.forEach(c => {
          if (!countsMap[c.project_id!]) {
            countsMap[c.project_id!] = { modules: 0, lessons: 0, research: 0, assessments: 0, resources: 0, reports: 0, total: 0, avgFidelityScore: null, fidelityScores: [] };
          }
          const counts = countsMap[c.project_id!];
          counts.total++;

          // Match content_type patterns
          if (c.content_type === 'course_module') {
            counts.modules++;
          } else if (c.content_type === 'course_lesson') {
            counts.lessons++;
            // Track fidelity scores for lessons
            if (c.fidelity_score !== null && c.fidelity_score !== undefined) {
              counts.fidelityScores.push(c.fidelity_score);
            }
          } else if (c.content_type?.startsWith('research_')) {
            counts.research++;
          } else if (c.content_type?.startsWith('assessment_')) {
            counts.assessments++;
          } else if (c.content_type?.startsWith('resource_')) {
            counts.resources++;
          } else if (c.content_type?.startsWith('report_')) {
            counts.reports++;
          }
        });

        // Calculate average fidelity scores
        Object.values(countsMap).forEach(counts => {
          if (counts.fidelityScores.length > 0) {
            const sum = counts.fidelityScores.reduce((a, b) => a + b, 0);
            counts.avgFidelityScore = Math.round(sum / counts.fidelityScores.length);
          }
        });

        // Attach counts to projects and aggregate totals
        const aggregated: CourseContentCounts = { modules: 0, lessons: 0, research: 0, assessments: 0, resources: 0, reports: 0, total: 0, avgFidelityScore: null };
        const allFidelityScores: number[] = [];
        projects?.forEach(p => {
          const counts = countsMap[p.id] || { modules: 0, lessons: 0, research: 0, assessments: 0, resources: 0, reports: 0, total: 0, avgFidelityScore: null, fidelityScores: [] };
          if (counts.avgFidelityScore !== null) {
            allFidelityScores.push(counts.avgFidelityScore);
          }
          (p as ContentProjectWithRelations).modules_count = counts.modules;
          (p as ContentProjectWithRelations).lessons_count = counts.lessons;
          (p as any).content_counts = counts;

          // Aggregate across all courses
          aggregated.modules += counts.modules;
          aggregated.lessons += counts.lessons;
          aggregated.research += counts.research;
          aggregated.assessments += counts.assessments;
          aggregated.resources += counts.resources;
          aggregated.reports += counts.reports;
          aggregated.total += counts.total;
        });
        // Calculate global average fidelity
        if (allFidelityScores.length > 0) {
          aggregated.avgFidelityScore = Math.round(allFidelityScores.reduce((a, b) => a + b, 0) / allFidelityScores.length);
        }
        setAggregatedCounts(aggregated);
      }

      const transformedCourses = (projects || []).map(transformToCourse);
      setCourses(transformedCourses);
      setIsUsingMockData(false);
    } catch (err) {
      console.error('Error fetching courses:', err);
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
    isUsingMockData,
    totalContents: aggregatedCounts.total,
    aggregatedCounts,
  };
}

export default useCourses;
