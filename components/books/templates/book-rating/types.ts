import { Section } from '../../../../types';

// ============================================================================
// Feedback Types
// ============================================================================

export interface BookFeedback {
  rating: number;
  tags: string[];
  comment: string;
  learnedSomething: boolean | null;
}

// ============================================================================
// Rating Constants
// ============================================================================

export const RATING_LABELS = [
  { value: 1, label: 'Pessimo' },
  { value: 2, label: 'Ruim' },
  { value: 3, label: 'Ok' },
  { value: 4, label: 'Bom' },
  { value: 5, label: 'Incrivel' },
] as const;

export const NEGATIVE_TAGS = [
  'Muito curto',
  'Chato / Perdi interesse',
  'Dificil de acompanhar',
  'Visoes tendenciosas',
  'Nao reflete o livro',
  'Narracao ruim',
  'Pontos-chave confusos',
  'Outro',
] as const;

export const POSITIVE_TAGS = [
  'Nivel de detalhe ideal',
  'Parece confiavel',
  'Interessante / Envolvente',
  'Facil de acompanhar',
  'Alinhado com minhas visoes',
  'Boa narracao',
  'Pontos-chave claros',
  'Outro',
] as const;

// ============================================================================
// State Types
// ============================================================================

export interface RatingState {
  selectedRating: number | null;
  hoveredRating: number | null;
}

export interface FeedbackState {
  selectedTags: string[];
  comment: string;
  learnedSomething: boolean | null;
}

export interface SubmissionState {
  isSubmitting: boolean;
}

// ============================================================================
// Component Props
// ============================================================================

export interface BookRatingTemplateProps {
  setSection: (s: Section) => void;
}

export interface RatingStarsProps {
  selectedRating: number | null;
  hoveredRating: number | null;
  onSelect: (value: number) => void;
  onHover: (value: number | null) => void;
}

export interface FeedbackTagsProps {
  isNegative: boolean;
  selectedTags: string[];
  onToggle: (tag: string) => void;
}

export interface LearnedSectionProps {
  learnedSomething: boolean | null;
  onChange: (value: boolean) => void;
}
