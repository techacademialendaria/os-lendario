// BriefStructure View Types
// Types, interfaces and configurations for the Brief Structure view

import type {
  PRDProject,
  BriefStructure,
  BriefClassification,
  BriefComplexity,
} from '@/types/prd';

// =============================================================================
// SECTION TYPES
// =============================================================================

export type SectionKey = keyof Pick<
  BriefStructure,
  'problem' | 'solution' | 'targetAudience' | 'differentials' | 'risks' | 'successMetrics'
>;

export interface SectionConfig {
  key: SectionKey;
  label: string;
  icon: string;
  required: boolean;
  isArray: boolean;
  placeholder: string;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface BriefStructureViewProps {
  project: PRDProject;
  onUpdate: (structure: BriefStructure) => Promise<void>;
  onNext: () => void;
}

export interface BriefSectionProps {
  config: SectionConfig;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export interface HeaderActionsProps {
  onPreview: () => void;
  onRegenerate: () => void;
  isGenerating: boolean;
}

export interface InitialStateProps {
  onGenerate: () => void;
}

export interface LoadingStateProps {
  progress: number;
}

export interface ErrorStateProps {
  error: Error;
  onRetry: () => void;
}

export interface ClassificationCardProps {
  classification: BriefClassification;
  complexity: BriefComplexity;
}

export interface ProgressFooterProps {
  isComplete: boolean;
  onNext: () => void;
}

export interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preview: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const SECTIONS: SectionConfig[] = [
  {
    key: 'problem',
    label: 'Problema',
    icon: 'exclamation-circle',
    required: true,
    isArray: false,
    placeholder: 'Descreva o problema que voce esta resolvendo...',
  },
  {
    key: 'solution',
    label: 'Solucao',
    icon: 'lightbulb',
    required: true,
    isArray: false,
    placeholder: 'Descreva a solucao proposta...',
  },
  {
    key: 'targetAudience',
    label: 'Publico-Alvo',
    icon: 'users',
    required: true,
    isArray: false,
    placeholder: 'Descreva o publico-alvo...',
  },
  {
    key: 'differentials',
    label: 'Diferenciais',
    icon: 'star',
    required: false,
    isArray: true,
    placeholder: 'Adicionar diferencial...',
  },
  {
    key: 'risks',
    label: 'Riscos',
    icon: 'exclamation-triangle',
    required: false,
    isArray: true,
    placeholder: 'Adicionar risco...',
  },
  {
    key: 'successMetrics',
    label: 'Metricas de Sucesso',
    icon: 'chart-line',
    required: true,
    isArray: true,
    placeholder: 'Adicionar metrica...',
  },
];

export const COMPLEXITY_LABELS: Record<BriefComplexity, { label: string; color: string }> = {
  low: { label: 'Baixa', color: 'text-emerald-500' },
  medium: { label: 'Media', color: 'text-amber-500' },
  high: { label: 'Alta', color: 'text-red-500' },
};

// =============================================================================
// AI PROMPTS
// =============================================================================

export const BRIEF_SYSTEM = `Voce e um product manager experiente que estrutura ideias de produtos em briefs claros e acionaveis.
Seja direto, focado e use linguagem profissional.`;

export const BRIEF_PROMPT = `Analise o seguinte contexto de produto e gere um brief estruturado:

IDEIA ORIGINAL:
{uploadContent}

PONTOS CEGOS IDENTIFICADOS:
{blindSpots}

PESQUISA REALIZADA:
{research}

WOWs E INSIGHTS:
{wows}

Responda APENAS com um JSON (sem markdown, sem explicacoes) no seguinte formato:
{
  "problem": "Descricao clara do problema em 2-3 paragrafos",
  "solution": "Descricao da solucao proposta em 2-3 paragrafos",
  "targetAudience": "Descricao do publico-alvo em 1-2 paragrafos",
  "differentials": ["Diferencial 1", "Diferencial 2", "Diferencial 3"],
  "risks": ["Risco 1", "Risco 2", "Risco 3"],
  "successMetrics": ["Metrica 1", "Metrica 2", "Metrica 3"],
  "classification": "task" ou "project",
  "estimatedComplexity": "low", "medium" ou "high"
}

Classificacao:
- "task": Tarefa simples que pode ser feita em horas/dias
- "project": Projeto completo que requer semanas/meses

Complexidade:
- "low": Poucas funcionalidades, tecnologia simples
- "medium": Multiplas funcionalidades, integracoes
- "high": Sistema complexo, multiplos componentes`;

export const SECTION_PROMPTS: Record<SectionKey, string> = {
  problem:
    'Reescreva a secao PROBLEMA do brief de forma mais clara e detalhada, mantendo o contexto original.',
  solution:
    'Reescreva a secao SOLUCAO do brief de forma mais clara e detalhada, mantendo o contexto original.',
  targetAudience:
    'Reescreva a secao PUBLICO-ALVO do brief de forma mais clara e detalhada, mantendo o contexto original.',
  differentials: 'Gere 3-5 diferenciais competitivos para este produto.',
  risks: 'Identifique 3-5 riscos principais para este projeto.',
  successMetrics: 'Defina 3-5 metricas de sucesso mensuraveis para este produto.',
};

// =============================================================================
// RE-EXPORTS
// =============================================================================

export type { PRDProject, BriefStructure, BriefClassification, BriefComplexity };
