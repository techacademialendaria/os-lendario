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
  'primary-color': string;        // HSL - Main color
  'primary-dark': string;         // HSL - For hover/active
  'primary-light': string;        // HSL - For backgrounds
  'primary-lighter': string;      // HSL - For subtle backgrounds

  // Secondary Color System
  'secondary-color': string;      // HSL - Secondary accent
  'secondary-dark': string;       // HSL - Secondary dark variant
  'secondary-light': string;      // HSL - Secondary light variant

  // Accent Colors
  'accent-color': string;         // HSL - Call-to-action
  'accent-dark': string;          // HSL - CTA hover

  // Backgrounds
  'studio-bg': string;            // HSL - Studio background
  'studio-card-bg': string;       // HSL - Card background
  'studio-border': string;        // HSL - Border color

  // Text/Foreground
  'text-primary': string;         // HSL - Primary text
  'text-secondary': string;       // HSL - Secondary text
  'text-muted': string;           // HSL - Muted text

  // Status Colors
  'status-success': string;       // HSL - Success/complete
  'status-warning': string;       // HSL - Warning/attention
  'status-error': string;         // HSL - Error/danger
  'status-info': string;          // HSL - Info/neutral
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

    'primary-color': '32 27% 69%',      // #C9B298 Gold
    'primary-dark': '33 27% 50%',       // Darker gold for hover
    'primary-light': '32 27% 85%',      // Lighter gold
    'primary-lighter': '32 27% 95%',    // Very light gold

    'secondary-color': '33 27% 50%',    // Dark gold
    'secondary-dark': '33 27% 40%',     // Darker gold
    'secondary-light': '32 27% 70%',    // Light gold

    'accent-color': '32 27% 69%',       // Gold (same as primary)
    'accent-dark': '33 27% 50%',        // Dark gold

    'studio-bg': '240 5% 4%',           // Very dark background
    'studio-card-bg': '240 4% 8%',      // Card background
    'studio-border': '0 0% 16%',        // Border color

    'text-primary': '0 0% 98%',         // White text
    'text-secondary': '0 0% 64%',       // Secondary text
    'text-muted': '0 0% 45%',           // Muted text

    'status-success': '142 76% 51%',    // Green
    'status-warning': '37 100% 52%',    // Amber
    'status-error': '4 100% 62%',       // Red
    'status-info': '211 100% 52%',      // Blue
  },

  // ============================================================================
  // COURSE CREATOR - Indigo Theme
  // ============================================================================
  'app_creator': {
    name: 'app_creator',
    label: 'Course Creator',
    description: 'Indigo theme for Course Creator Studio',

    'primary-color': '241 61% 59%',     // #5856D6 Indigo
    'primary-dark': '241 61% 50%',      // Darker indigo
    'primary-light': '241 61% 80%',     // Lighter indigo
    'primary-lighter': '241 61% 90%',   // Very light indigo

    'secondary-color': '261 61% 55%',   // Purple
    'secondary-dark': '261 61% 45%',    // Dark purple
    'secondary-light': '261 61% 75%',   // Light purple

    'accent-color': '32 27% 69%',       // Gold accent
    'accent-dark': '33 27% 50%',        // Dark gold

    'studio-bg': '240 5% 4%',           // Dark background
    'studio-card-bg': '240 4% 8%',      // Card background
    'studio-border': '241 61% 59% / 0.2', // Indigo border

    'text-primary': '0 0% 98%',         // White text
    'text-secondary': '0 0% 64%',       // Secondary text
    'text-muted': '0 0% 45%',           // Muted text

    'status-success': '142 76% 51%',    // Green
    'status-warning': '37 100% 52%',    // Amber
    'status-error': '4 100% 62%',       // Red
    'status-info': '211 100% 52%',      // Blue
  },

  // ============================================================================
  // PRD STUDIO - Petróleo Blue Theme
  // ============================================================================
  'studio_prd': {
    name: 'studio_prd',
    label: 'PRD Studio',
    description: 'Petróleo Blue theme for Product Requirement Documents',

    'primary-color': '195 28% 45%',     // #538096 Petróleo Blue
    'primary-dark': '195 28% 38%',      // Darker petróleo
    'primary-light': '195 28% 65%',     // Lighter petróleo
    'primary-lighter': '195 28% 80%',   // Very light petróleo

    'secondary-color': '210 40% 55%',   // Light blue
    'secondary-dark': '210 40% 45%',    // Dark light blue
    'secondary-light': '210 40% 75%',   // Light blue variant

    'accent-color': '32 27% 69%',       // Gold accent
    'accent-dark': '33 27% 50%',        // Dark gold

    'studio-bg': '240 5% 4%',           // Dark background
    'studio-card-bg': '240 4% 8%',      // Card background
    'studio-border': '195 28% 45% / 0.2', // Petróleo border

    'text-primary': '0 0% 98%',         // White text
    'text-secondary': '0 0% 64%',       // Secondary text
    'text-muted': '0 0% 45%',           // Muted text

    'status-success': '142 76% 51%',    // Green
    'status-warning': '37 100% 52%',    // Amber
    'status-error': '4 100% 62%',       // Red
    'status-info': '195 28% 45%',       // Petróleo (matching primary)
  },

  // ============================================================================
  // SALES INTELLIGENCE - Red Theme
  // ============================================================================
  'template_sales': {
    name: 'template_sales',
    label: 'Sales Intelligence',
    description: 'Red theme for Sales Intelligence Studio',

    'primary-color': '4 100% 59%',      // #FF3B30 Sales Red
    'primary-dark': '4 100% 50%',       // Darker red
    'primary-light': '4 100% 80%',      // Lighter red
    'primary-lighter': '4 100% 90%',    // Very light red

    'secondary-color': '4 100% 65%',    // Bright red
    'secondary-dark': '4 100% 55%',     // Dark red
    'secondary-light': '4 100% 75%',    // Light red

    'accent-color': '32 27% 69%',       // Gold accent
    'accent-dark': '33 27% 50%',        // Dark gold

    'studio-bg': '240 5% 4%',           // Dark background
    'studio-card-bg': '240 4% 8%',      // Card background
    'studio-border': '4 100% 59% / 0.2', // Red border

    'text-primary': '0 0% 98%',         // White text
    'text-secondary': '0 0% 64%',       // Secondary text
    'text-muted': '0 0% 45%',           // Muted text

    'status-success': '142 76% 51%',    // Green
    'status-warning': '37 100% 52%',    // Amber
    'status-error': '4 100% 62%',       // Red
    'status-info': '211 100% 52%',      // Blue
  },

  // ============================================================================
  // SYNTHETIC MINDS - Teal Theme
  // ============================================================================
  'app_minds': {
    name: 'app_minds',
    label: 'Synthetic Minds',
    description: 'Teal theme for Synthetic Minds Studio',

    'primary-color': '189 61% 48%',     // #30B0C7 Teal
    'primary-dark': '189 61% 40%',      // Darker teal
    'primary-light': '189 61% 75%',     // Lighter teal
    'primary-lighter': '189 61% 85%',   // Very light teal

    'secondary-color': '177 100% 39%',  // Mint green
    'secondary-dark': '177 100% 35%',   // Dark mint
    'secondary-light': '177 100% 70%',  // Light mint

    'accent-color': '32 27% 69%',       // Gold accent
    'accent-dark': '33 27% 50%',        // Dark gold

    'studio-bg': '240 5% 4%',           // Dark background
    'studio-card-bg': '240 4% 8%',      // Card background
    'studio-border': '189 61% 48% / 0.2', // Teal border

    'text-primary': '0 0% 98%',         // White text
    'text-secondary': '0 0% 64%',       // Secondary text
    'text-muted': '0 0% 45%',           // Muted text

    'status-success': '142 76% 51%',    // Green
    'status-warning': '37 100% 52%',    // Amber
    'status-error': '4 100% 62%',       // Red
    'status-info': '189 61% 48%',       // Teal (matching primary)
  },

  // ============================================================================
  // MARKETING - Orange Theme (Novo)
  // ============================================================================
  'template_marketing': {
    name: 'template_marketing',
    label: 'Marketing',
    description: 'Orange theme for Marketing Studio',

    'primary-color': '32 100% 50%',     // #FF8800 Bright Orange
    'primary-dark': '32 100% 42%',      // Darker orange
    'primary-light': '32 100% 70%',     // Lighter orange
    'primary-lighter': '32 100% 85%',   // Very light orange

    'secondary-color': '38 100% 50%',   // Amber orange
    'secondary-dark': '38 100% 42%',    // Dark amber
    'secondary-light': '38 100% 70%',   // Light amber

    'accent-color': '32 27% 69%',       // Gold accent
    'accent-dark': '33 27% 50%',        // Dark gold

    'studio-bg': '240 5% 4%',           // Dark background
    'studio-card-bg': '240 4% 8%',      // Card background
    'studio-border': '32 100% 50% / 0.2', // Orange border

    'text-primary': '0 0% 98%',         // White text
    'text-secondary': '0 0% 64%',       // Secondary text
    'text-muted': '0 0% 45%',           // Muted text

    'status-success': '142 76% 51%',    // Green
    'status-warning': '37 100% 52%',    // Amber
    'status-error': '4 100% 62%',       // Red
    'status-info': '211 100% 52%',      // Blue
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
