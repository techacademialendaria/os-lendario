import { Section } from '../../../../types';

export interface CourseLessonProps {
  setSection: (s: Section) => void;
}

export type EditorTab = 'script' | 'media' | 'exercises' | 'settings';
export type SidebarTab = 'index' | 'audit';

export interface LessonFormState {
  title: string;
  script: string;
  videoUrl: string | null;
  isPublished: boolean;
}

export interface LessonSidebarState {
  collapsed: boolean;
  tab: SidebarTab;
}
