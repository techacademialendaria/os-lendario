import { useLmsCourse } from '@/hooks/lms';
import { fallbackCourse } from '../data';
import type { Course, LessonStatus, Lesson } from '../types';

export function useCourseData(slug: string | undefined) {
  const { course: realCourse, loading, error } = useLmsCourse(slug);

  const course: Course = realCourse
    ? {
        title: realCourse.title,
        author: realCourse.instructor.name,
        description: realCourse.description,
        progress: realCourse.progress.percentage,
        totalLessons: realCourse.stats.totalLessons,
        completedLessons: realCourse.progress.completedLessons,
        rating: realCourse.stats.rating,
        students: realCourse.stats.students,
        lastUpdated: realCourse.stats.lastUpdated,
        cover: realCourse.thumbnail,
        modules: realCourse.modules.map((m) => ({
          id: m.id,
          title: m.title,
          duration: `${m.lessons.length * 15}m`,
          lessons: m.lessons.map((l) => ({
            id: l.id,
            title: l.title,
            duration: l.duration,
            status: l.status as LessonStatus,
          })),
        })),
      }
    : fallbackCourse;

  const firstAvailableLesson: Lesson | undefined =
    course.modules.flatMap((m) => m.lessons).find((l) => l.status !== 'completed') ||
    course.modules[0]?.lessons[0];

  return { course, loading, error, firstAvailableLesson };
}
