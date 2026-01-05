/**
 * Design Tokens para Email Templates
 * Academia Lendária - Luxury Premium Design System
 */

export const EMAIL_DESIGN = {
  // Brand Colors
  gold: '#C9B298',
  goldDark: '#8D7556',
  goldLight: '#E4D8CA',

  // Backgrounds
  bgDark: '#0A0A0A',
  bgCard: '#141414',
  bgElevated: '#1A1A1A',

  // Text
  textPrimary: '#FAFAFA',
  textSecondary: '#A0A0A0',
  textMuted: '#6B6B6B',

  // Accents
  border: '#2A2A2A',
  borderGold: 'rgba(201, 178, 152, 0.3)',

  // Shadows
  shadowGold: 'rgba(201, 178, 152, 0.15)',
  shadowDark: 'rgba(0, 0, 0, 0.4)',

  // Status Colors
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

// Role badge colors
export const ROLE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Proprietário': { bg: '#581c87', text: '#d8b4fe', border: '#7c3aed' },
  'Administrador': { bg: '#1e3a8a', text: '#93c5fd', border: '#3b82f6' },
  'Colaborador': { bg: '#14532d', text: '#86efac', border: '#22c55e' },
  'Aluno': { bg: '#78350f', text: '#fcd34d', border: '#f59e0b' },
  'Usuário Free': { bg: '#374151', text: '#d1d5db', border: '#6b7280' },
};

// Area labels
export const AREA_LABELS: Record<string, string> = {
  mkt: 'Marketing',
  pedagogico: 'Pedagógico',
  financeiro: 'Financeiro',
  conteudo: 'Conteúdo',
  suporte: 'Suporte',
  tech: 'Tecnologia',
};

// Site defaults
export const SITE_DEFAULTS = {
  name: 'Academia Lendária',
  url: 'https://academialendaria.com.br',
  logoUrl: 'https://academialendaria.ai/wp-content/uploads/2025/11/Silhueta-AL-32.svg',
  tagline: 'Conhecimento Lendário',
  fromEmail: 'noreply@academialendaria.com.br',
};
