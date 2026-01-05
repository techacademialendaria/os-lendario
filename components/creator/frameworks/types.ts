import type { Section } from '@/types';
import type { Framework } from '@/hooks/useContentFrameworks';

// =============================================================================
// RE-EXPORTS
// =============================================================================

export type { Framework } from '@/hooks/useContentFrameworks';

// =============================================================================
// CATEGORY TYPES
// =============================================================================

export type FrameworkCategory = 'all' | 'pedagogical' | 'marketing' | 'content_structure' | 'storytelling';

export const CATEGORY_LABELS: Record<string, string> = {
  pedagogical: 'Pedagógico',
  marketing: 'Marketing',
  content_structure: 'Estrutura',
  storytelling: 'Storytelling',
};

export interface CategoryColorConfig {
  bg: string;
  text: string;
  border: string;
}

export const CATEGORY_COLORS: Record<string, CategoryColorConfig> = {
  pedagogical: { bg: 'opacity-20', text: 'text-white', border: 'opacity-30' },
  marketing: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  content_structure: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  storytelling: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
};

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface FrameworksTemplateProps {
  setSection: (s: Section) => void;
}

export interface FrameworkCardProps {
  framework: Framework;
  onClick: () => void;
}

export interface FrameworkDetailProps {
  framework: Framework;
  onBack: () => void;
}

export interface FrameworkStepProps {
  step: {
    name: string;
    description: string;
    duration?: string;
  };
  index: number;
  color: string;
  isPedagogical: boolean;
}
