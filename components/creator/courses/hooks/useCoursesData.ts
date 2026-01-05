import { useMemo } from 'react';
import { useCourses } from '../../../../hooks/useCourses';
import { useCourseContents } from '../../../../hooks/useCourseContents';
import { useRecentActivities } from '../../../../hooks/useRecentActivities';
import { mapHookCourseToTemplateCourse } from '../data/course-mapper';
import type { Course } from '../types';

interface InstructorStat {
  name: string;
  avatar: string;
  count: number;
  isMMOS: boolean;
}

interface CoursesStats {
  totalLessons: number;
  totalModules: number;
  totalResearch: number;
  totalAssessments: number;
  avgFidelity: number | null;
  topInstructors: InstructorStat[];
  coursesWithAlerts: Course[];
  lowFidelityCourses: Course[];
  pipelineCounts: {
    briefing: number;
    research: number;
    curriculum: number;
    generation: number;
    validation: number;
    published: number;
  };
}

interface UseCoursesDataReturn {
  courses: Course[];
  loading: boolean;
  error: Error | null;
  isUsingMockData: boolean;
  refetch: () => void;
  stats: CoursesStats;
  // Course contents (for selected course)
  courseContent: ReturnType<typeof useCourseContents>['content'];
  contentLoading: boolean;
  // Recent activities
  recentActivities: ReturnType<typeof useRecentActivities>['activities'];
  activitiesLoading: boolean;
}

/**
 * Hook for fetching and managing courses data
 * Combines useCourses, useCourseContents, and useRecentActivities
 */
export function useCoursesData(selectedCourseSlug: string | null): UseCoursesDataReturn {
  // Fetch courses from Supabase
  const {
    courses: hookCourses,
    loading,
    error,
    isUsingMockData,
    refetch,
  } = useCourses();

  // Convert hook courses to template format
  const courses: Course[] = useMemo(
    () => hookCourses.map(mapHookCourseToTemplateCourse),
    [hookCourses]
  );

  // Fetch course contents when a course is selected
  const { content: courseContent, loading: contentLoading } = useCourseContents(selectedCourseSlug);

  // Fetch recent activities
  const { activities: recentActivities, loading: activitiesLoading } = useRecentActivities(5);

  // Calculate aggregated stats
  const stats = useMemo<CoursesStats>(() => {
    const totalLessons = courses.reduce((acc, c) => acc + c.lessonsCount, 0);
    const totalModules = courses.reduce((acc, c) => acc + c.modulesCount, 0);
    const totalResearch = courses.reduce((acc, c) => acc + c.researchCount, 0);
    const totalAssessments = courses.reduce((acc, c) => acc + c.assessmentsCount, 0);

    const coursesWithFidelity = courses.filter((c) => c.fidelityScore !== null);
    const avgFidelity =
      coursesWithFidelity.length > 0
        ? Math.round(
            coursesWithFidelity.reduce((acc, c) => acc + (c.fidelityScore || 0), 0) /
              coursesWithFidelity.length
          )
        : null;

    // Calculate Top Instructors
    const instructorCounts = courses.reduce(
      (acc, course) => {
        const { name, avatar, isMMOS } = course.instructor;
        if (!acc[name]) acc[name] = { name, avatar, count: 0, isMMOS };
        acc[name].count += 1;
        return acc;
      },
      {} as Record<string, InstructorStat>
    );
    const topInstructors = Object.values(instructorCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Courses needing attention
    const coursesWithAlerts = courses.filter((c) => c.alerts && c.alerts.length > 0);
    const lowFidelityCourses = courses.filter(
      (c) => c.fidelityScore !== null && c.fidelityScore < 80
    );

    // Pipeline counts
    const pipelineCounts = {
      briefing: courses.filter((c) => c.pipeline.brief === 'current').length,
      research: courses.filter((c) => c.pipeline.research === 'current').length,
      curriculum: courses.filter((c) => c.pipeline.curriculum === 'current').length,
      generation: courses.filter((c) => c.pipeline.lessons === 'current').length,
      validation: courses.filter((c) => c.pipeline.validation === 'current').length,
      published: courses.filter((c) => c.progress === 100).length,
    };

    return {
      totalLessons,
      totalModules,
      totalResearch,
      totalAssessments,
      avgFidelity,
      topInstructors,
      coursesWithAlerts,
      lowFidelityCourses,
      pipelineCounts,
    };
  }, [courses]);

  return {
    courses,
    loading,
    error,
    isUsingMockData,
    refetch,
    stats,
    courseContent,
    contentLoading,
    recentActivities,
    activitiesLoading,
  };
}
