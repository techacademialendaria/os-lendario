// =============================================================================
// WOWS INPUT VIEW TYPES
// =============================================================================

import { PRDProject, WOW, WOWCategory } from '../../../../types/prd';

export interface WOWsInputViewProps {
  project: PRDProject;
  onUpdate: (wows: WOW[]) => Promise<void>;
  onNext: () => void;
}

export interface WOWCardProps {
  wow: WOW;
  onEdit: (text: string) => void;
  onDelete: () => void;
}

export interface CategorySelectorProps {
  selected: WOWCategory;
  onSelect: (category: WOWCategory) => void;
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const MAX_WOWS = 10;
export const MIN_WOWS = 1;

export const CATEGORY_CONFIG: Record<
  WOWCategory,
  { icon: string; label: string; color: string; bgColor: string }
> = {
  insight: {
    icon: 'lightbulb',
    label: 'Insight',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  question: {
    icon: 'question',
    label: 'Duvida',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  idea: { icon: 'chat-alt', label: 'Ideia', color: 'text-blue-600', bgColor: 'bg-blue-600/10' },
  risk: {
    icon: 'exclamation-triangle',
    label: 'Risco',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
};

export const PROMPT_SUGGESTIONS = [
  'O que te surpreendeu na pesquisa?',
  'Que problema voce nao tinha considerado?',
  'Que oportunidade voce descobriu?',
  'O que os concorrentes estao fazendo de errado?',
  'Que pergunta surgiu que voce nao sabe responder?',
];

// Re-export types from prd for convenience
export type { WOW, WOWCategory } from '../../../../types/prd';
