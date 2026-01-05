/**
 * PRD Studio - Design Tokens
 *
 * Uso consistente em todo o módulo PRD:
 * - PRDRouter (navegação)
 * - PRDTopbar (header)
 * - PRDDashboard (lista de projetos)
 * - PRDEditor (wizard de fases)
 */

import { PRDStatus } from '../../types/prd';

// =============================================================================
// CORES PRIMÁRIAS
// =============================================================================

/** Azul Petróleo - Cor principal do PRD Studio */
export const PRD_PRIMARY = '#538096';

/** Azul escuro - Cor secundária para hover/borders */
export const PRD_SECONDARY = '#3D5A6C';

/** Dourado - Cor de acento para destaques (compartilhado) */
export const PRD_ACCENT = '#C9B298';

/** Fundo escuro - Background principal */
export const PRD_BACKGROUND = '#1A1F2C';

// =============================================================================
// CORES SEMÂNTICAS
// =============================================================================

/** Azul - In Progress / Secondary items */
export const PRD_BLUE = '#3B82F6';

/** Verde - Success / Completed */
export const PRD_GREEN = '#10B981';

/** Cinza - Inactive / Non-objectives */
export const PRD_GRAY = '#6B7280';

/** Teal - Studio theme color */
export const PRD_TEAL = '#00C7BE';

// =============================================================================
// BACKGROUNDS
// =============================================================================

/** Fundo principal escuro */
export const PRD_BG = '#0A0A0F';

/** Fundo de cards */
export const PRD_CARD_BG = '#111116';

/** Gradiente para cards */
export const PRD_CARD_GRADIENT = 'from-[#1a2e35] to-[#0f1a1d]';

// =============================================================================
// STATUS COLORS (por fase do pipeline)
// =============================================================================

export const PRD_STATUS = {
  /** Âmbar - Upload (início, atenção) */
  upload: {
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-500',
    icon: 'upload',
  },
  /** Azul - Brief (processamento) */
  brief: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    dot: 'bg-blue-500',
    icon: 'file-text',
  },
  /** Roxo - PRD (documentação) */
  prd: {
    bg: 'bg-blue-600/20',
    text: 'text-blue-500',
    border: 'border-blue-600/30',
    dot: 'bg-blue-600',
    icon: 'clipboard-list',
  },
  /** Ciano - Épicos (estruturação) */
  epics: {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-500',
    icon: 'milestone',
  },
  /** Esmeralda - Stories (granularidade) */
  stories: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-500',
    icon: 'list-checks',
  },
  /** Verde - Exported (sucesso) */
  exported: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    border: 'border-green-500/30',
    dot: 'bg-green-500',
    icon: 'download',
  },
} as const;

// =============================================================================
// EFFORT INDICATORS (% humano vs IA por fase)
// =============================================================================

export const PRD_EFFORT = {
  upload: { human: 90, ai: 10 },
  brief: { human: 90, ai: 10 },
  prd: { human: 70, ai: 30 },
  epics: { human: 30, ai: 70 },
  stories: { human: 10, ai: 90 },
  exported: { human: 0, ai: 0 },
} as const;

// =============================================================================
// PIPELINE STAGES
// =============================================================================

export const PRD_PIPELINE_STAGES = [
  { key: 'upload' as PRDStatus, label: 'Upload', icon: 'upload', effort: PRD_EFFORT.upload },
  { key: 'brief' as PRDStatus, label: 'Brief', icon: 'file-text', effort: PRD_EFFORT.brief },
  { key: 'prd' as PRDStatus, label: 'PRD', icon: 'clipboard-list', effort: PRD_EFFORT.prd },
  { key: 'epics' as PRDStatus, label: 'Épicos', icon: 'milestone', effort: PRD_EFFORT.epics },
  {
    key: 'stories' as PRDStatus,
    label: 'Stories',
    icon: 'list-checks',
    effort: PRD_EFFORT.stories,
  },
  {
    key: 'exported' as PRDStatus,
    label: 'Exportar',
    icon: 'download',
    effort: PRD_EFFORT.exported,
  },
] as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/** Retorna as cores de status para uma fase */
export function getStatusColors(status: PRDStatus) {
  return PRD_STATUS[status] || PRD_STATUS.upload;
}

/** Retorna o esforço humano/IA para uma fase */
export function getEffort(status: PRDStatus) {
  return PRD_EFFORT[status] || PRD_EFFORT.upload;
}

/** Retorna o índice da fase no pipeline (0-5) */
export function getStageIndex(status: PRDStatus): number {
  return PRD_PIPELINE_STAGES.findIndex((stage) => stage.key === status);
}

/** Retorna a porcentagem de progresso (0-100) */
export function getProgressPercentage(status: PRDStatus): number {
  const index = getStageIndex(status);
  if (index === -1) return 0;
  return Math.round((index / (PRD_PIPELINE_STAGES.length - 1)) * 100);
}

// =============================================================================
// HELPER CLASSES
// =============================================================================

/** Classes padrão para cards do PRD Studio */
export const PRD_CARD_CLASSES = 'bg-[#111116] border-border/30 rounded-xl';

/** Classes padrão para KPI cards */
export const PRD_KPI_CLASSES = `bg-gradient-to-br ${PRD_CARD_GRADIENT} border-[#538096]/20 rounded-xl`;

/** Classes padrão para botões primários */
export const PRD_BUTTON_PRIMARY = 'bg-[#538096] hover:bg-[#4a7285] text-white';

/** Classes padrão para botões com gold */
export const PRD_BUTTON_GOLD = 'bg-[#C9B298] hover:bg-[#b8a189] text-[#0A0A0F]';
