/**
 * LessonEditor Module - Barrel Export
 */

// Main Template (default export for backward compatibility)
export { default } from './LessonEditorTemplate';
export { default as LessonEditorTemplate } from './LessonEditorTemplate';

// Types
export type {
  LessonEditorProps,
  EditorHeaderProps,
  EditorSidebarProps,
  EditorContentProps,
  CourseModule,
  CourseLesson,
  AiAuditData,
  AiAuditMetric,
} from './types';

// Hooks (for external use if needed)
export { useLessonEditorState, useLessonContent } from './hooks';

// Organisms (for external use if needed)
export {
  EditorHeader,
  EditorSidebar,
  EditorContent,
  ModuleIndex,
  AuditPanel,
} from './organisms';
