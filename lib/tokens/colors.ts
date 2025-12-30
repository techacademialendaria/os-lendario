/**
 * MASTER DESIGN TOKENS
 *
 * Sistema centralizado de tokens para todos os Studios.
 * Cada Studio herda uma paleta de cores consistente que se aplica automaticamente
 * via CSS variables quando o Studio está ativo.
 *
 * Estrutura:
 * - color: cor principal (HSL)
 * - secondary: cor secundária (HSL)
 * - accent: cor de destaque (HSL)
 * - dark: variante escura para hover/active
 * - light: variante clara para backgrounds
 * - foreground: cor do texto em contraste
 *
 * Uso em CSS:
 *   background-color: hsl(var(--primary-color))
 *   border-color: hsl(var(--primary-dark) / 0.3)
 */

export interface StudioPalette {
  name: string;
  label: string;
  description: string;

  // Primary Color System
  'primary-color': string; // HSL - Main color
  'primary-dark': string; // HSL - For hover/active
  'primary-light': string; // HSL - For backgrounds
  'primary-lighter': string; // HSL - For subtle backgrounds

  // Secondary Color System
  'secondary-color': string; // HSL - Secondary accent
  'secondary-dark': string; // HSL - Secondary dark variant
  'secondary-light': string; // HSL - Secondary light variant

  // Accent Colors
  'accent-color': string; // HSL - Call-to-action
  'accent-dark': string; // HSL - CTA hover

  // Backgrounds
  'studio-bg': string; // HSL - Studio background
  'studio-card-bg': string; // HSL - Card background
  'studio-border': string; // HSL - Border color

  // Text/Foreground
  'text-primary': string; // HSL - Primary text
  'text-secondary': string; // HSL - Secondary text
  'text-muted': string; // HSL - Muted text

  // Status Colors
  'status-success': string; // HSL - Success/complete
  'status-warning': string; // HSL - Warning/attention
  'status-error': string; // HSL - Error/danger
  'status-info': string; // HSL - Info/neutral
}

/**
 * STUDIO PALETTES
 *
 * Cada Studio tem sua própria paleta que se aplica automaticamente
 * quando o Studio é ativado no App.tsx
 */

export const STUDIO_TOKENS: Record<string, StudioPalette> = {
  // ============================================================================
  // DESIGN SYSTEM - Gold Theme (Default)
  // ============================================================================
  'design-system': {
    name: 'design-system',
    label: 'Design System',
    description: 'Gold theme for Design System documentation',

    'primary-color': '32 27% 69%', // #C9B298 Gold
    'primary-dark': '33 27% 50%', // Darker gold for hover
    'primary-light': '32 27% 85%', // Lighter gold
    'primary-lighter': '32 27% 95%', // Very light gold

    'secondary-color': '33 27% 50%', // Dark gold
    'secondary-dark': '33 27% 40%', // Darker gold
    'secondary-light': '32 27% 70%', // Light gold

    'accent-color': '32 27% 69%', // Gold (same as primary)
    'accent-dark': '33 27% 50%', // Dark gold

    'studio-bg': '240 5% 4%', // Very dark background
    'studio-card-bg': '240 4% 8%', // Card background
    'studio-border': '0 0% 16%', // Border color

    'text-primary': '0 0% 98%', // White text
    'text-secondary': '0 0% 64%', // Secondary text
    'text-muted': '0 0% 45%', // Muted text

    'status-success': '142 76% 51%', // Green
    'status-warning': '37 100% 52%', // Amber
    'status-error': '4 100% 62%', // Red
    'status-info': '211 100% 52%', // Blue
  },

  // ============================================================================
  // COURSE CREATOR - Indigo Theme
  // ============================================================================
  app_creator: {
    name: 'app_creator',
    label: 'Course Creator',
    description: 'Petróleo Blue & Beige theme for Course Creator Studio',

    'primary-color': '195 28% 45%', // #538096 Petróleo Blue
    'primary-dark': '195 28% 38%', // Darker petróleo
    'primary-light': '195 28% 65%', // Lighter petróleo
    'primary-lighter': '195 28% 80%', // Very light petróleo

    'secondary-color': '27 30% 92%', // #F2EBE4 Beige
    'secondary-dark': '27 30% 85%', // Darker beige
    'secondary-light': '27 30% 96%', // Brighter beige

    'accent-color': '27 30% 92%', // #F2EBE4 Beige
    'accent-dark': '27 30% 85%', // Darker beige

    'studio-bg': '240 5% 4%', // Dark background
    'studio-card-bg': '240 4% 8%', // Card background
    'studio-border': '195 28% 45% / 0.2', // Petróleo border

    'text-primary': '0 0% 98%', // White text
    'text-secondary': '0 0% 64%', // Secondary text
    'text-muted': '0 0% 45%', // Muted text

    'status-success': '142 76% 51%', // Green
    'status-warning': '37 100% 52%', // Amber
    'status-error': '4 100% 62%', // Red
    'status-info': '195 28% 45%', // Petróleo (matching primary)
  },

  // ============================================================================
  // PRD STUDIO - Petróleo Blue Theme
  // ============================================================================
  studio_prd: {
    name: 'studio_prd',
    label: 'PRD Studio',
    description: 'Petróleo Blue theme for Product Requirement Documents',

    'primary-color': '195 28% 45%', // #538096 Petróleo Blue
    'primary-dark': '195 28% 38%', // Darker petróleo
    'primary-light': '195 28% 65%', // Lighter petróleo
    'primary-lighter': '195 28% 80%', // Very light petróleo

    'secondary-color': '210 40% 55%', // Light blue
    'secondary-dark': '210 40% 45%', // Dark light blue
    'secondary-light': '210 40% 75%', // Light blue variant

    'accent-color': '32 27% 69%', // Gold accent
    'accent-dark': '33 27% 50%', // Dark gold

    'studio-bg': '240 5% 4%', // Dark background
    'studio-card-bg': '240 4% 8%', // Card background
    'studio-border': '195 28% 45% / 0.2', // Petróleo border

    'text-primary': '0 0% 98%', // White text
    'text-secondary': '0 0% 64%', // Secondary text
    'text-muted': '0 0% 45%', // Muted text

    'status-success': '142 76% 51%', // Green
    'status-warning': '37 100% 52%', // Amber
    'status-error': '4 100% 62%', // Red
    'status-info': '195 28% 45%', // Petróleo (matching primary)
  },

  // ============================================================================
  // SALES INTELLIGENCE - Red Theme
  // ============================================================================
  template_sales: {
    name: 'template_sales',
    label: 'Sales Intelligence',
    description: 'Red theme for Sales Intelligence Studio',

    'primary-color': '4 100% 59%', // #FF3B30 Sales Red
    'primary-dark': '4 100% 50%', // Darker red
    'primary-light': '4 100% 80%', // Lighter red
    'primary-lighter': '4 100% 90%', // Very light red

    'secondary-color': '4 100% 65%', // Bright red
    'secondary-dark': '4 100% 55%', // Dark red
    'secondary-light': '4 100% 75%', // Light red

    'accent-color': '32 27% 69%', // Gold accent
    'accent-dark': '33 27% 50%', // Dark gold

    'studio-bg': '240 5% 4%', // Dark background
    'studio-card-bg': '240 4% 8%', // Card background
    'studio-border': '4 100% 59% / 0.2', // Red border

    'text-primary': '0 0% 98%', // White text
    'text-secondary': '0 0% 64%', // Secondary text
    'text-muted': '0 0% 45%', // Muted text

    'status-success': '142 76% 51%', // Green
    'status-warning': '37 100% 52%', // Amber
    'status-error': '4 100% 62%', // Red
    'status-info': '211 100% 52%', // Blue
  },

  // ============================================================================
  // SYNTHETIC MINDS - Teal Theme
  // ============================================================================
  app_minds: {
    name: 'app_minds',
    label: 'Synthetic Minds',
    description: 'Teal theme for Synthetic Minds Studio',

    'primary-color': '189 61% 48%', // #30B0C7 Teal
    'primary-dark': '189 61% 40%', // Darker teal
    'primary-light': '189 61% 75%', // Lighter teal
    'primary-lighter': '189 61% 85%', // Very light teal

    'secondary-color': '177 100% 39%', // Mint green
    'secondary-dark': '177 100% 35%', // Dark mint
    'secondary-light': '177 100% 70%', // Light mint

    'accent-color': '32 27% 69%', // Gold accent
    'accent-dark': '33 27% 50%', // Dark gold

    'studio-bg': '240 5% 4%', // Dark background
    'studio-card-bg': '240 4% 8%', // Card background
    'studio-border': '189 61% 48% / 0.2', // Teal border

    'text-primary': '0 0% 98%', // White text
    'text-secondary': '0 0% 64%', // Secondary text
    'text-muted': '0 0% 45%', // Muted text

    'status-success': '142 76% 51%', // Green
    'status-warning': '37 100% 52%', // Amber
    'status-error': '4 100% 62%', // Red
    'status-info': '189 61% 48%', // Teal (matching primary)
  },

  // ============================================================================
  // MARKETING - Orange Theme (Novo)
  // ============================================================================
  template_marketing: {
    name: 'template_marketing',
    label: 'Marketing',
    description: 'Orange theme for Marketing Studio',

    'primary-color': '32 100% 50%', // #FF8800 Bright Orange
    'primary-dark': '32 100% 42%', // Darker orange
    'primary-light': '32 100% 70%', // Lighter orange
    'primary-lighter': '32 100% 85%', // Very light orange

    'secondary-color': '38 100% 50%', // Amber orange
    'secondary-dark': '38 100% 42%', // Dark amber
    'secondary-light': '38 100% 70%', // Light amber

    'accent-color': '32 27% 69%', // Gold accent
    'accent-dark': '33 27% 50%', // Dark gold

    'studio-bg': '240 5% 4%', // Dark background
    'studio-card-bg': '240 4% 8%', // Card background
    'studio-border': '32 100% 50% / 0.2', // Orange border

    'text-primary': '0 0% 98%', // White text
    'text-secondary': '0 0% 64%', // Secondary text
    'text-muted': '0 0% 45%', // Muted text

    'status-success': '142 76% 51%', // Green
    'status-warning': '37 100% 52%', // Amber
    'status-error': '4 100% 62%', // Red
    'status-info': '211 100% 52%', // Blue
  },
};

/**
 * Obter paleta por seção
 * Mapeia Section para Studio token
 */
export function getStudioTokensForSection(section: string): StudioPalette | null {
  if (section.startsWith('app_creator')) return STUDIO_TOKENS['app_creator'];
  if (section.startsWith('studio_prd')) return STUDIO_TOKENS['studio_prd'];
  if (section.startsWith('template_sales')) return STUDIO_TOKENS['template_sales'];
  if (section.startsWith('app_minds')) return STUDIO_TOKENS['app_minds'];
  if (section.startsWith('template_marketing')) return STUDIO_TOKENS['template_marketing'];
  return STUDIO_TOKENS['design-system']; // Default
}

/**
 * Aplicar tokens como variáveis CSS
 * Chamado no App.tsx quando o tema muda
 */
export function applyStudioTokens(palette: StudioPalette): void {
  const root = document.documentElement;

  Object.entries(palette).forEach(([key, value]) => {
    if (key !== 'name' && key !== 'label' && key !== 'description') {
      root.style.setProperty(`--${key}`, value);
    }
  });
}

// ============================================================================
// SEMANTIC COLOR SYSTEM (Consolidated from app/tokens/colors.ts)
// ============================================================================

export const colors = {
  // ===== BRAND COLORS =====
  brand: {
    primary: '#0066CC', // Blue (interactive, buttons, links)
    secondary: '#6B7280', // Gray (supporting actions)
    accent: '#C9B298', // Warm (highlights, emphasis)
    gold: '#C9B298', // Warm gold tone
  },

  // ===== SEMANTIC COLORS =====
  semantic: {
    success: '#10B981', // Green (confirmations, positive)
    warning: '#F59E0B', // Amber (cautions, warnings)
    error: '#EF4444', // Red (errors, destructive)
    info: '#3B82F6', // Blue (informational)
  },

  // ===== NEUTRAL COLORS =====
  neutral: {
    background: '#FFFFFF', // Page background
    surface: '#F9FAFB', // Card/component background
    border: '#E5E7EB', // Borders, dividers
    textPrimary: '#111827', // Main text (h1-h3, body)
    textSecondary: '#6B7280', // Secondary text (captions, meta)
    textDisabled: '#D1D5DB', // Disabled text
  },

  // ===== STATE COLORS =====
  state: {
    hover: 'rgba(0, 102, 204, 0.08)', // Hover background
    focus: 'rgba(0, 102, 204, 0.2)', // Focus ring
    disabled: '#D1D5DB', // Disabled state
    active: 'rgba(0, 102, 204, 0.15)', // Active state
  },

  // ===== EXTENDED BRAND PALETTE =====
  // Apple-style extended palette for visual richness
  palette: {
    red: { DEFAULT: '#FF3B30', dark: '#FF453A' },
    orange: { DEFAULT: '#FF9500', dark: '#FF9F0A' },
    yellow: { DEFAULT: '#FFCC00', dark: '#FFD60A' },
    green: { DEFAULT: '#34C759', dark: '#30D158' },
    mint: { DEFAULT: '#00C7BE', dark: '#63E6E2' },
    teal: { DEFAULT: '#30B0C7', dark: '#40C8E0' },
    cyan: { DEFAULT: '#32ADE6', dark: '#64D2FF' },
    blue: { DEFAULT: '#007AFF', dark: '#0A84FF' },
    indigo: { DEFAULT: '#5856D6', dark: '#5E5CE6' },
    pink: { DEFAULT: '#FF2D55', dark: '#FF375F' },
    brown: { DEFAULT: '#A2845E', dark: '#AC8E68' },
  },

  // ===== DARK MODE =====
  dark: {
    background: '#1F2937',
    surface: '#111827',
    textPrimary: '#F9FAFB',
    textSecondary: '#D1D5DB',
    border: '#374151',
  },
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM (Consolidated from app/tokens/typography.ts)
// ============================================================================

export const typography = {
  // ===== FONT FAMILIES =====
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    secondary: '"JetBrains Mono", "Courier New", monospace',
    serif: '"Source Serif 4", serif',
    display: 'Rajdhani, sans-serif',
  },

  // ===== FONT SIZES (in rem, base = 16px) =====
  fontSize: {
    xs: '0.75rem', // 12px (captions, small text)
    sm: '0.875rem', // 14px (labels, secondary text)
    base: '1rem', // 16px (body text, default)
    lg: '1.125rem', // 18px (body emphasis)
    xl: '1.25rem', // 20px (subheadings)
    '2xl': '1.5rem', // 24px (headings, h3)
    '3xl': '1.875rem', // 30px (section heading, h2)
    '4xl': '2.25rem', // 36px (page heading, h1)
  },

  // ===== FONT WEIGHTS =====
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // ===== LINE HEIGHTS (unitless) =====
  lineHeight: {
    tight: 1.2, // Headings
    normal: 1.5, // Body text (best for readability)
    relaxed: 1.75, // Longer paragraphs
  },

  // ===== LETTER SPACING (in em) =====
  letterSpacing: {
    tight: '-0.01em', // Tight (headings)
    normal: '0em', // Standard
    wide: '0.02em', // Wide (all-caps)
  },

  // ===== PREDEFINED STYLES (utility) =====
  styles: {
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
  },
} as const;
