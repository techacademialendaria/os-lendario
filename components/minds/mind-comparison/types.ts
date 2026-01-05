import type { Section } from '@/types';

// --- Props Types ---

export interface MindComparisonProps {
  setSection: (s: Section) => void;
}

export type ViewMode = 'grid' | 'list';

// --- Data Types ---

export interface MindArchetypes {
  mbti: string;
  enneagram: string;
  disc: string;
}

export interface DISCScores {
  d: number;
  i: number;
  s: number;
  c: number;
}

export interface DarkTriadScores {
  narc: number;
  mach: number;
  psych: number;
}

export interface RadarDataPoint {
  skillName: string;
  level: number;
}

export interface MindData {
  id: string;
  name: string;
  title: string;
  avatar: string;
  superpower: string;
  kryptonite: string;
  archetypes: MindArchetypes;
  strat: string;
  disc: DISCScores;
  bigFive: number[]; // [Open, Consc, Extro, Agree, Neuro]
  darkTriad: DarkTriadScores;
  radar: RadarDataPoint[];
}

// --- Organism Props ---

export interface ComparisonHeroProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export interface MindCardsGridProps {
  minds: MindData[];
}

export interface DISCComparisonProps {
  minds: MindData[];
}

export interface BigFiveComparisonProps {
  minds: MindData[];
}

export interface DarkTriadSectionProps {
  minds: MindData[];
}

export interface ComparisonListViewProps {
  minds: MindData[];
}

export interface ComparisonGridViewProps {
  minds: MindData[];
}
