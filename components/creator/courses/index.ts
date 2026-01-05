// Courses Module - Barrel Exports
// Following Atomic Design: atoms → molecules → organisms → templates

// Types (includes generationLog for backwards compatibility)
export * from './types';

// Data (coursesMock, didaticaCurriculum, mapHookCourseToTemplateCourse)
export { coursesMock, didaticaCurriculum, mapHookCourseToTemplateCourse } from './data';

// Hooks
export * from './hooks';

// Molecules
export * from './molecules';

// Organisms
export * from './organisms';

// Template (main component)
export { default as CoursesTemplate } from './CoursesTemplate';
