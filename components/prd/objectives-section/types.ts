/**
 * Types for ObjectivesSection
 * Atomic Design Refactoring
 */

// =============================================================================
// DOMAIN TYPES
// =============================================================================

export interface ObjectivesContent {
  mainObjective: string;
  secondaryObjectives: string[];
  nonObjectives: string[];
  notes?: string;
}

export type ApprovalStatus = 'pending' | 'approved' | 'adjust' | 'rejected';

export interface ObjectiveItem {
  id: string;
  text: string;
  status: ApprovalStatus;
}

export type ObjectiveType = 'main' | 'secondary' | 'non';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface ObjectivesSectionProps {
  content: ObjectivesContent | null;
  briefProblem: string;
  briefSolution: string;
  onUpdate: (content: ObjectivesContent) => Promise<void>;
}

export interface ObjectiveItemCardProps {
  item: ObjectiveItem;
  type: ObjectiveType;
  onUpdate: (text: string) => void;
  onStatusChange: (status: ApprovalStatus) => void;
  onDelete?: () => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

// =============================================================================
// CONFIGURATION TYPES
// =============================================================================

export interface ApprovalConfig {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface ObjectiveTypeConfig {
  label: string;
  color: string;
  icon: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const APPROVAL_CONFIG: Record<ApprovalStatus, ApprovalConfig> = {
  pending: {
    label: 'Pendente',
    icon: 'clock',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
  },
  approved: {
    label: 'Aprovado',
    icon: 'check',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  adjust: {
    label: 'Ajustar',
    icon: 'edit',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  rejected: {
    label: 'Rejeitado',
    icon: 'cross',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
};

export const EMPTY_CONTENT: ObjectivesContent = {
  mainObjective: '',
  secondaryObjectives: [],
  nonObjectives: [],
  notes: '',
};

// =============================================================================
// AI PROMPTS
// =============================================================================

export const OBJECTIVES_SYSTEM = `Voce eh um product manager experiente definindo objetivos claros e mensuraveis.
Objetivos devem ser SMART: Especificos, Mensuraveis, Alcancaveis, Relevantes e com Prazo definido.`;

export const OBJECTIVES_PROMPT = `Baseado no seguinte problema e solucao, defina os objetivos do projeto:

PROBLEMA:
{problem}

SOLUCAO:
{solution}

Responda em JSON:
{
  "mainObjective": "Objetivo principal claro e mensuravel",
  "secondaryObjectives": ["Objetivo secundario 1", "Objetivo secundario 2", "Objetivo secundario 3"],
  "nonObjectives": ["O que NAO eh objetivo deste projeto 1", "O que NAO eh objetivo 2"]
}`;
