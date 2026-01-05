// Types for Psychometrics Tab components
// Re-export from the main hook for convenience
export type { PsychometricData } from '@/hooks/useMindPsychometrics';

// Props for the main template
export interface PsychometricsTabProps {
  psychometrics: import('@/hooks/useMindPsychometrics').PsychometricData | null;
  loading: boolean;
}

// Props for organism components
export interface ArchetypesCardProps {
  mbtiType: string | null;
  mbtiRole: string | null;
  mbtiStack: string[];
  enneagramType: string | null;
  enneagramWing: string | null;
  enneagramTriad: string | null;
  enneagramVariant: string | null;
  discPattern: string | null;
  discPatternName?: string;
  cognitiveStratum: string | null;
}

export interface BigFiveRadarProps {
  bigFive: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
}

export interface DISCSectionProps {
  disc: {
    d: number;
    i: number;
    s: number;
    c: number;
    patternName?: string;
    specificBehaviors?: string[];
  };
}

export interface BigFiveDetailsProps {
  bigFive: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
}

export interface SuperpowersSectionProps {
  superpowers: string[];
  kryptonite: string[];
  enneagramDetails: {
    coreFear?: string;
    coreDesire?: string;
  } | null;
}

export interface DarkTriadSectionProps {
  darkTriad: {
    narcissism: number;
    machiavellianism: number;
    psychopathy: number;
  };
}

export interface ConvergenceSectionProps {
  powerfulAlignments?: string[];
  productiveTensions?: string[];
}

export interface MetadataFooterProps {
  analysisDate?: string;
  confidence?: string;
}
