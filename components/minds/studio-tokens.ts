/**
 * Synthetic Minds Studio - Design Tokens
 *
 * Refatorado para usar classes dinâmicas (CSS variables).
 * Quando o Studio muda, as cores mudam automaticamente.
 *
 * Uso consistente em todo o módulo Minds:
 * - MindProfileTemplate (perfil do Mind)
 * - MindComparisonTemplate (comparação de Minds)
 * - HistoryTab (histórico)
 * - WritingStylesTab (estilos de escrita)
 * - ArtifactsTab (artefatos)
 * - ContentsTab (conteúdos)
 * - ArenaTemplate (arena de debate)
 */

// =============================================================================
// CORES PRIMÁRIAS (Dinâmicas via CSS Variables)
// =============================================================================

/**
 * Paleta do Synthetic Minds:
 * - Primary: Teal #30B0C7 (Studio color)
 * - Secondary: Mint Green #00D084 (Secondary accent)
 * - Accent: Gold #C9B298 (Cross-studio accent)
 *
 * Estas cores são aplicadas dinamicamente no App.tsx
 * quando o Studio Minds é ativado.
 */

/** HEX Reference: #30B0C7 Teal - Use class: bg-studio-primary */
export const STUDIO_PRIMARY = 'hsl(var(--primary-color))';

/** HEX Reference: #00D084 Mint Green - Use class: bg-studio-secondary */
export const STUDIO_SECONDARY = 'hsl(var(--accent-color))';

/** HEX Reference: #C9B298 Gold - Use class: bg-studio-accent */
export const STUDIO_ACCENT = 'hsl(var(--accent-color))';

// =============================================================================
// BACKGROUNDS (Dinâmicas via CSS Variables)
// =============================================================================

/**
 * Fundo principal escuro (#0A0A0C)
 * Use class: bg-studio-bg
 */
export const STUDIO_BG = 'hsl(var(--studio-bg))';

/**
 * Fundo de cards (#0F0F13)
 * Use class: bg-studio-card
 */
export const STUDIO_CARD_BG = 'hsl(var(--studio-card-bg))';

/** Gradiente para cards com Teal - Use classes: bg-gradient-to-br + dinâmicas */
export const STUDIO_CARD_GRADIENT = 'from-studio-primary-dark/40 to-studio-bg';

/** Gradiente para cards com destaque teal - Use classes: bg-gradient-to-br + dinâmicas */
export const STUDIO_TEAL_GRADIENT = 'from-studio-secondary-dark/40 to-studio-bg';

// =============================================================================
// STATUS COLORS
// =============================================================================

export const STUDIO_STATUS = {
  /** Verde - Ativo/Online */
  active: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-500',
  },
  /** Teal - Processando/Em análise */
  processing: {
    bg: 'bg-studio-primary/20',
    text: 'text-studio-primary',
    border: 'border-studio-primary/30',
    dot: 'bg-studio-primary',
  },
  /** Verde menta - Completo/Resultados */
  complete: {
    bg: 'bg-studio-secondary/20',
    text: 'text-studio-secondary',
    border: 'border-studio-secondary/30',
    dot: 'bg-studio-secondary',
  },
  /** Amarelo - Atenção/Review */
  warning: {
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-500',
  },
  /** Cinza - Inativo/Draft */
  inactive: {
    bg: 'bg-muted/30',
    text: 'text-muted-foreground',
    border: 'border-border/50',
    dot: 'bg-muted-foreground',
  },
} as const;

// =============================================================================
// MIND PERSONALITY TYPES (Badges)
// =============================================================================

export const MIND_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  analista: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  criativo: { bg: 'bg-blue-600/20', text: 'text-blue-500' },
  estrategista: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
  executor: { bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
  comunicador: { bg: 'bg-pink-500/20', text: 'text-pink-400' },
  inovador: { bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
  default: { bg: 'bg-muted/30', text: 'text-muted-foreground' },
};

export function getMindTypeColor(type: string) {
  const key = type?.toLowerCase().replace(/\s+/g, '-') || 'default';
  return MIND_TYPE_COLORS[key] || MIND_TYPE_COLORS.default;
}

// =============================================================================
// ARTIFACT TYPES
// =============================================================================

export const ARTIFACT_TYPE_ICONS: Record<string, string> = {
  'system-prompt': 'brain',
  framework: 'grid',
  workflow: 'workflow',
  communication: 'message',
  'knowledge-base': 'book',
  default: 'document',
};

// =============================================================================
// OBSESSION RING COLORS (para visualização)
// =============================================================================

export const OBSESSION_RING_COLORS = [
  'hsl(var(--primary-color))', // Teal - Primary
  'hsl(var(--accent-color))', // Mint - Secondary
  '#FFD700', // Gold - Accent
  '#FF6B6B', // Red
  '#4ECDC4', // Turquoise
  '#95E1D3', // Light teal
];

// =============================================================================
// HELPER CLASSES (Dinâmicas)
// =============================================================================

/**
 * Classes padrão para cards do Studio
 * Dinâmicas: background muda com o Studio via CSS variables
 */
export const STUDIO_CARD_CLASSES = 'bg-studio-card border-studio-primary/20 rounded-xl';

/**
 * Classes padrão para cards de Mind
 * Dinâmicas: background e border mudam com o Studio
 */
export const STUDIO_MIND_CARD_CLASSES = `bg-studio-card border-studio-primary/30 rounded-xl hover:border-studio-primary/50 transition-colors`;

/**
 * Classes padrão para botões primários
 * Dinâmicas: cor de fundo muda com o Studio via CSS variables
 */
export const STUDIO_BUTTON_PRIMARY = 'bg-studio-primary hover:bg-studio-primary-dark text-white';

/**
 * Classes padrão para botões com accent teal
 * Dinâmicas: cor de acento muda com o Studio
 */
export const STUDIO_BUTTON_TEAL = 'bg-studio-primary hover:opacity-90 text-white font-medium';

/**
 * Classes padrão para badges
 * Dinâmicas: cor muda com o Studio
 */
export const STUDIO_BADGE_CLASSES = 'bg-studio-primary/20 text-studio-primary';

// =============================================================================
// HERO SECTION STYLES
// =============================================================================

export const HERO_SECTION_CLASSES = 'relative bg-studio-bg border-b border-white/5 overflow-hidden';

export const HERO_GRADIENT_OVERLAY =
  'absolute inset-0 bg-gradient-to-br from-studio-primary/10 to-transparent';

// =============================================================================
// DARK MODE UTILITIES
// =============================================================================

/**
 * Cores para backgrounds em modo escuro (padrão do app)
 * Use estas classes para manter consistência visual
 */
export const DARK_MODE_CLASSES = {
  background: 'bg-[#050507]',
  card: 'bg-[#0a0a0c]',
  cardHover: 'hover:bg-[#0f0f13]',
  border: 'border-white/5',
  borderHover: 'hover:border-white/10',
  text: 'text-white',
  textSecondary: 'text-white/64',
  textMuted: 'text-white/45',
};
