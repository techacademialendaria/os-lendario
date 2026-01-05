import type { Section } from '@/types';

// --- DOMAIN TYPES ---

export interface Competitor {
  id: string;
  name: string;
  platform: string;
  price: string;
  rating: number;
  students: string;
  strengths: string[];
  weaknesses: string[];
}

export interface MarketGap {
  id: string;
  description: string;
  opportunity: 'high' | 'medium' | 'low';
  addressed: boolean;
}

export interface Source {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'book' | 'other';
  notes: string;
}

export type SourceType = Source['type'];
export type OpportunityLevel = MarketGap['opportunity'];

// --- PIPELINE TYPES ---

export interface PipelineStep {
  key: string;
  label: string;
  status: 'completed' | 'current' | 'pending';
}

// --- COMPONENT PROPS ---

export interface CourseResearchTemplateProps {
  setSection: (s: Section) => void;
  courseSlug: string;
  courseTitle: string;
  onBack: () => void;
  onNavigate: (view: 'overview' | 'brief' | 'curriculum' | 'lessons' | 'validation' | 'research') => void;
}

export interface CourseSidebarProps {
  courseTitle: string;
  currentStep: string;
  pipeline: PipelineStep[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNavigate: (view: any) => void;
}

export interface ResearchHeaderProps {
  isRunningAI: boolean;
  onRunAIResearch: () => void;
  onNavigateToCurriculum: () => void;
}

export interface CompetitorsTabProps {
  competitors: Competitor[];
}

export interface MarketGapsTabProps {
  gaps: MarketGap[];
  onToggleGap: (id: string) => void;
}

export interface SourcesTabProps {
  sources: Source[];
}

// --- UTILITY FUNCTIONS ---

export function getOpportunityColor(opp: OpportunityLevel): string {
  switch (opp) {
    case 'high':
      return 'text-success bg-success/10';
    case 'medium':
      return 'text-brand-yellow bg-brand-yellow/10';
    case 'low':
      return 'text-muted-foreground bg-muted/10';
    default:
      return 'text-muted-foreground bg-muted/10';
  }
}

export function getSourceIcon(type: SourceType): string {
  switch (type) {
    case 'article':
      return 'newspaper';
    case 'video':
      return 'video';
    case 'course':
      return 'graduation-cap';
    case 'book':
      return 'book';
    default:
      return 'link';
  }
}
