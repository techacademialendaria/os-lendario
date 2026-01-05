import type { Section } from '@/types';

// --- Brief Data Types ---
export interface PainPoint {
  id: number;
  text: string;
  intensity: number;
}

export interface BriefData {
  dreamOutcome: string;
  targetAudience: string;
  painPoints: PainPoint[];
  prerequisites: string;
  uniqueValue: string;
  methodology: string;
  expectedResults: string;
  duration: string;
}

// --- Section Types ---
export interface BriefSection {
  id: number;
  key: keyof BriefData;
  title: string;
  description: string;
  icon: string;
}

export interface PipelineStep {
  key: string;
  label: string;
  status: 'completed' | 'current' | 'pending';
}

// --- Navigation Types ---
export type CourseView = 'overview' | 'research' | 'curriculum' | 'lessons' | 'validation';

// --- Component Props ---
export interface CourseBriefTemplateProps {
  setSection: (s: Section) => void;
  courseSlug: string;
  courseTitle: string;
  onBack: () => void;
  onNavigate: (view: CourseView) => void;
}

export interface CourseSidebarProps {
  courseTitle: string;
  currentStep: string;
  pipeline: PipelineStep[];
  onNavigate: (view: CourseView) => void;
}

export interface BriefHeaderProps {
  progressPercent: number;
  isSaving: boolean;
  onSave: () => void;
}

export interface BriefSectionNavProps {
  sections: BriefSection[];
  activeSection: number;
  onSectionChange: (id: number) => void;
}

export interface BriefFormSectionProps {
  section: BriefSection | undefined;
  activeSection: number;
  briefData: BriefData;
  onInputChange: (key: keyof BriefData, value: unknown) => void;
  onAddPainPoint: () => void;
  onRemovePainPoint: (id: number) => void;
}

export interface BriefNavigationProps {
  activeSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
}

// --- Value Proposition Tags ---
export const VALUE_PROPOSITION_TAGS = [
  'Metodologia Própria',
  'Templates Práticos',
  'Comunidade',
  'Certificado',
  'Suporte 1:1',
  'Case Studies',
] as const;
