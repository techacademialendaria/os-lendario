// CreatePersona Types and Configuration
// Extracted from views/CreatePersona.tsx for atomic design pattern

// ============================================================================
// CORE TYPES
// ============================================================================

/**
 * PersonaData type for AI-generated personas (before saving to DB)
 */
export interface PersonaData {
  id: string;
  name: string;
  icon: string;
  demographics: PersonaDemographics;
  psychographics: PersonaPsychographics;
  painPoints: PainPoint[];
  desires: Desire[];
  redFlags: string[];
  greenFlags: string[];
  definingQuote: string;
  createdAt: string;
}

export interface PersonaDemographics {
  age: string;
  role: string;
  income: string;
  location: string;
}

export interface PersonaPsychographics {
  mindset: string;
  values: string[];
  fears: string[];
}

export interface PainPoint {
  superficial: string;
  deep: string;
}

export interface Desire {
  surface: string;
  hidden: string;
}

// ============================================================================
// WIZARD TYPES
// ============================================================================

export type WizardStep = 'input' | 'processing' | 'review';

export interface CreatePersonaProps {
  onCancel: () => void;
  onSave: (persona: PersonaData) => void;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface StepProps {
  number: string;
  label: string;
  active: boolean;
  completed: boolean;
}

export interface InputStepProps {
  inputText: string;
  onInputChange: (value: string) => void;
  onGenerate: () => void;
  onCancel: () => void;
  isGenerating: boolean;
}

export interface ProcessingStepProps {
  // No props needed - purely visual
}

export interface ReviewStepProps {
  persona: PersonaData;
  onEditField: (path: string, value: unknown) => void;
  onSave: () => void;
  onRegenerate: () => void;
  onCancel: () => void;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

export const QUICK_TAGS = [
  'Executivos',
  'Maes Solo',
  'Freelancers',
  'Gamers',
  'Startups',
  'Professores',
] as const;

export const AVAILABLE_ICONS = [
  'user',
  'rocket',
  'chart-line',
  'laptop-code',
  'sparkles',
  'brain',
  'briefcase',
  'graduation-cap',
  'lightbulb',
  'target',
  'star',
  'users-alt',
] as const;

export type PersonaIconName = (typeof AVAILABLE_ICONS)[number];
