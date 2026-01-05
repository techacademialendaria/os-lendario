// PRD Document Template Types
// Types and configurations for the PRD Document phase

import { Section } from '@/types';

// =============================================================================
// CONSTANTS
// =============================================================================

export const STUDIO_TEAL = '#00C7BE';

export const PIPELINE_STEPS = [
  { id: 'upload', label: 'Upload', status: 'done' as const },
  { id: 'brief', label: 'Brief', status: 'done' as const },
  { id: 'prd', label: 'PRD', status: 'active' as const },
  { id: 'epics', label: 'Épicos', status: 'pending' as const },
  { id: 'stories', label: 'Stories', status: 'pending' as const },
  { id: 'export', label: 'Export', status: 'pending' as const },
] as const;

export const CATEGORY_CONFIG = {
  must: { label: 'Must Have', color: 'bg-red-500/10 text-red-600 border-red-500/20' },
  should: { label: 'Should Have', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  nice: { label: 'Nice to Have', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
} as const;

export const DEFAULT_REQUIREMENTS: Requirement[] = [
  { id: 'req1', text: 'Login social com Google e Apple.', status: 'pending', category: 'must' },
  { id: 'req2', text: 'Dashboard inicial com metricas de vendas e graficos.', status: 'pending', category: 'must' },
  { id: 'req3', text: 'Sistema de gamificacao com badges.', status: 'pending', category: 'nice' },
  { id: 'req4', text: 'Exportacao de relatorios em PDF e CSV.', status: 'pending', category: 'should' },
  { id: 'req5', text: 'Modo escuro automatico.', status: 'pending', category: 'should' },
];

export const DEFAULT_TECH_STACK: TechStack = {
  frontend: 'React + Vite + Tailwind',
  backend: 'Supabase (Postgres + Auth)',
  ai: 'OpenAI API (GPT-4o)',
  hosting: 'Vercel',
};

export const DEFAULT_SCOPE_LIMITS = '- Nao teremos app nativo (apenas PWA)\n- Sem suporte a multiplos idiomas no MVP\n- Pagamentos apenas via Stripe inicialmente';

// =============================================================================
// TYPES
// =============================================================================

export interface PRDDocumentTemplateProps {
  setSection: (section: Section) => void;
}

export interface Requirement {
  id: string;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  category: 'must' | 'should' | 'nice';
}

export interface TechStack {
  frontend: string;
  backend: string;
  ai: string;
  hosting: string;
}

export interface DesignState {
  screens: string;
  vibe: string;
}

export type PipelineStep = typeof PIPELINE_STEPS[number];
export type RequirementCategory = keyof typeof CATEGORY_CONFIG;
