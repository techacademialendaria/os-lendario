// Component Section Types

export interface ComponentSectionProps {
  // Currently no props, but added for future extensibility
}

// FAQ Accordion Item
export interface FaqItem {
  value: string;
  question: string;
  answer: string;
}

// Course Module for Accordion
export interface CourseModuleLesson {
  icon: string;
  label: string;
  locked?: boolean;
}

export interface CourseModule {
  value: string;
  number: string;
  title: string;
  lessons: CourseModuleLesson[];
}

// Guideline Item for Do/Don't sections
export interface GuidelineItem {
  title: string;
  description: string;
}

// Tag Item for Badge showcase
export interface TagItem {
  id: number;
  label: string;
  count: number;
}
