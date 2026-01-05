// LMS Course Detail Types
// Extracted from LmsCourseDetailTemplate.tsx

export type LessonStatus = 'completed' | 'current' | 'locked';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: LessonStatus;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Course {
  title: string;
  author: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  rating: number;
  students: number;
  lastUpdated: string;
  cover: string | null;
  modules: Module[];
}

export interface Resource {
  id: number;
  title: string;
  type: string;
  size: string;
  icon: string;
  color: string;
}

export type StudentStatus = 'active' | 'risk' | 'completed' | 'inactive';

export interface Student {
  id: number;
  name: string;
  email: string;
  status: StudentStatus;
  progress: number;
  lastAccess: string;
  avatar: string;
}

export interface StatusStyle {
  label: string;
  class: string;
}

// Component Props
export interface CourseHeaderProps {
  course: Course;
  onBack: () => void;
}

export interface CourseProgressCardProps {
  course: Course;
  onContinue: () => void;
  disabled: boolean;
}

export interface CourseContentTabProps {
  modules: Module[];
  onLessonClick: (lessonId: string, status: LessonStatus) => void;
}

export interface ResourcesTabProps {
  resources: Resource[];
}

export interface StudentsTabProps {
  students: Student[];
  totalStudents: number;
}

export interface CourseSidebarProps {
  course: Course;
  onPlay: () => void;
}
