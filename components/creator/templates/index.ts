// @ts-nocheck
// Course Creator Templates
// Export all course-related templates for easy importing

export { default as CoursesTemplate } from './CoursesTemplate';
// CourseOverview moved to ./creator/course-overview/CourseOverview.tsx
export { CourseBriefTemplate } from '../course-brief';
export { CourseResearchTemplate } from '../course-research';
export { CourseCurriculumTemplate } from '../course-curriculum';
export { CourseLessonsTemplate } from '../course-lessons';
export { default as CourseValidationTemplate } from './CourseValidationTemplate';
export { default as LessonEditor } from '../lesson-editor';
// PersonasTemplate moved to ./creator/personas/PersonasTemplate
export { default as FrameworksTemplate } from './FrameworksTemplate';

// Types - CourseData is now in hooks/useCourse.ts
