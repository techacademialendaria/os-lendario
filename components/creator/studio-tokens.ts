/**
 * Course Creator Studio - Design Tokens
 *
 * Refatorado para usar classes dinâmicas (CSS variables).
 * Quando o Studio muda, as cores mudam automaticamente.
 *
 * Uso consistente em todo o módulo Creator:
 * - CoursesTemplate (lista de cursos)
 * - CourseOverview (dashboard do curso)
 * - CourseCurriculum (editor de currículo)
 * - CourseLesson (editor de aula)
 */

// =============================================================================
// CORES PRIMÁRIAS (Dinâmicas via CSS Variables)
// =============================================================================

/**
 * Paleta do Course Creator:
 * - Primary: Azul #538096 (Studio color)
 * - Accent: Bege/Cream #F2EBE4 (Cross-studio accent)
 *
 * Estas cores são aplicadas dinamicamente no App.tsx
 * quando o Studio Creator é ativado.
 */

/** HEX Reference: #538096 Azul - Use class: bg-studio-primary */
export const STUDIO_PRIMARY = 'hsl(var(--primary-color))';

/** HEX Reference: #F2EBE4 Bege/Cream - Use class: bg-studio-accent */
export const STUDIO_GOLD = 'hsl(var(--accent-color))';

/** HEX Reference: #F2EBE4 Bege/Cream - Use class: bg-studio-secondary-light */
export const STUDIO_ACCENT = 'hsl(var(--accent-color))';

// =============================================================================
// BACKGROUNDS (Dinâmicas via CSS Variables)
// =============================================================================

/**
 * Fundo principal escuro (#0A0A0F)
 * Use class: bg-studio-bg
 */
export const STUDIO_BG = 'hsl(var(--studio-bg))';

/**
 * Fundo de cards (#111116)
 * Use class: bg-studio-card
 */
export const STUDIO_CARD_BG = 'hsl(var(--studio-card-bg))';

/** Gradiente para KPI cards - Use classes: bg-gradient-to-br + dinâmicas */
export const STUDIO_CARD_GRADIENT = 'from-studio-primary-dark/40 to-studio-bg';

/** Gradiente para cards com destaque gold - Use classes: bg-gradient-to-br + dinâmicas */
export const STUDIO_GOLD_GRADIENT = 'from-studio-accent-dark/40 to-studio-bg';

// =============================================================================
// STATUS COLORS
// =============================================================================

export const STUDIO_STATUS = {
  /** Verde - Completo/Publicado */
  complete: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-500',
  },
  /** Azul - Em progresso/Produzindo */
  progress: {
    bg: 'bg-[#538096]/20',
    text: 'text-[#538096]',
    border: 'border-[#538096]/30',
    dot: 'bg-[#538096]',
  },
  /** Amarelo - Atenção/Validação */
  warning: {
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-500',
  },
  /** Cinza - Rascunho/Pendente */
  draft: {
    bg: 'bg-muted/30',
    text: 'text-muted-foreground',
    border: 'border-border/50',
    dot: 'bg-muted-foreground',
  },
} as const;

// =============================================================================
// PIPELINE STAGES
// =============================================================================

export const PIPELINE_STAGES = [
  { key: 'briefing', label: 'Briefing', icon: 'document' },
  { key: 'pesquisa', label: 'Pesquisa', icon: 'search' },
  { key: 'curriculo', label: 'Currículo', icon: 'list' },
  { key: 'geracao', label: 'Geração', icon: 'magic-wand' },
  { key: 'validacao', label: 'Validação', icon: 'check-circle' },
  { key: 'producao', label: 'Produção', icon: 'copy' },
  { key: 'publicado', label: 'Publicado', icon: 'check' },
] as const;

// =============================================================================
// CATEGORY COLORS (para badges de categoria)
// =============================================================================

export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'dev-no-code': { bg: 'bg-blue-600/20', text: 'text-blue-500' },
  'ia-generativa': { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
  produtividade: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
  'soft-skills': { bg: 'bg-pink-500/20', text: 'text-pink-400' },
  marketing: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  negocios: { bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
  default: { bg: 'bg-muted/30', text: 'text-muted-foreground' },
};

export function getCategoryColor(category: string) {
  const key = category?.toLowerCase().replace(/\s+/g, '-') || 'default';
  return CATEGORY_COLORS[key] || CATEGORY_COLORS.default;
}

// =============================================================================
// CONTENT TYPE ICONS
// =============================================================================

export const CONTENT_TYPE_ICONS: Record<string, string> = {
  aulas: 'play-alt',
  planejamento: 'calendar',
  recursos: 'folder',
  quizzes: 'list-check',
  assessments: 'clipboard-check',
  pesquisas: 'search',
  default: 'document',
};

// =============================================================================
// HELPER CLASSES (Dinâmicas)
// =============================================================================

/**
 * Classes padrão para cards do Studio
 * Dinâmicas: background muda com o Studio via CSS variables
 */
export const STUDIO_CARD_CLASSES = 'bg-studio-card border-studio-primary/20 rounded-xl';

/**
 * Classes padrão para KPI cards
 * Dinâmicas: background e border mudam com o Studio
 */
export const STUDIO_KPI_CLASSES = `bg-gradient-to-br ${STUDIO_CARD_GRADIENT} border-studio-primary/20 rounded-xl`;

/**
 * Classes padrão para botões primários
 * Dinâmicas: cor de fundo muda com o Studio via CSS variables
 */
export const STUDIO_BUTTON_PRIMARY = 'bg-studio-primary hover:bg-studio-primary-dark text-white';

/**
 * Classes padrão para botões com gold
 * Dinâmicas: cor de acento muda com o Studio
 */
export const STUDIO_BUTTON_GOLD = 'bg-studio-accent hover:opacity-90 text-[#0A0A0F] font-medium';

/**
 * Classes padrão para Inputs
 * Fundo escuro, borda sutil, foco com cor do Studio
 */
export const INPUT_CLASSES = 'bg-studio-bg border-studio-primary/20 focus-visible:ring-studio-primary/30 focus-visible:border-studio-primary/40';

/**
 * Classes padrão para Textareas
 * Fundo escuro, borda sutil, foco com cor do Studio
 */
export const TEXTAREA_CLASSES = 'bg-studio-bg border-studio-primary/20 focus-visible:ring-studio-primary/30 focus-visible:border-studio-primary/40 min-h-[120px]';
