// Reader theme configuration - scientific contrast optimized
export type ReadingMode = 'paper' | 'night' | 'sepia';

export interface ThemeStyle {
  bg: string;
  text: string;
  textMuted: string;
  textDimmed: string;
  border: string;
  selection: string;
  headerBg: string;
  accent: string;
  aside: { bg: string; text: string };
  button: { bg: string; text: string; hover: string };
  texture: string;
}

export const THEME_STYLES: Record<ReadingMode, ThemeStyle> = {
  paper: {
    bg: 'var(--reading-paper-bg, #FDFCFB)',
    text: 'var(--reading-paper-text, #1A1A1A)',
    textMuted: 'var(--reading-paper-muted, rgba(26, 26, 26, 0.6))',
    textDimmed: 'var(--reading-paper-dimmed, rgba(26, 26, 26, 0.4))',
    border: 'rgba(0, 0, 0, 0.05)',
    selection: 'selection:bg-[#C9B298]/30',
    headerBg: 'rgba(255, 255, 255, 0.8)',
    accent: '#C9B298',
    aside: { bg: '#18181B', text: '#FAFAFA' },
    button: { bg: '#1A1A1A', text: '#FAFAFA', hover: '#27272A' },
    texture: 'opacity-[0.03] mix-blend-multiply',
  },
  night: {
    bg: 'var(--reading-night-bg, #0A0A0A)',
    text: 'var(--reading-night-text, #D8D8D8)',
    textMuted: 'var(--reading-night-muted, rgba(216, 216, 216, 0.7))',
    textDimmed: 'var(--reading-night-dimmed, rgba(255, 255, 255, 0.3))',
    border: 'rgba(255, 255, 255, 0.1)',
    selection: 'selection:bg-primary/20',
    headerBg: 'rgba(10, 10, 10, 0.9)',
    accent: 'var(--brand-gold, #E6B325)',
    aside: { bg: '#18181B', text: '#FAFAFA' },
    button: { bg: '#FAFAFA', text: '#0A0A0A', hover: '#E4E4E7' },
    texture: 'opacity-[0.05] mix-blend-screen',
  },
  sepia: {
    bg: 'var(--reading-sepia-bg, #F5F2E9)',
    text: 'var(--reading-sepia-text, #3E2C1C)',
    textMuted: 'var(--reading-sepia-muted, rgba(62, 44, 28, 0.7))',
    textDimmed: 'var(--reading-sepia-dimmed, rgba(62, 44, 28, 0.4))',
    border: 'rgba(62, 44, 28, 0.1)',
    selection: 'selection:bg-[#AC8E68]/40',
    headerBg: 'rgba(232, 226, 210, 0.9)',
    accent: '#8D7556',
    aside: { bg: '#3E2C1C', text: '#F5F2E9' },
    button: { bg: '#3E2C1C', text: '#F5F2E9', hover: '#4A3828' },
    texture: 'opacity-[0.06] mix-blend-multiply',
  },
};

export const DEFAULT_READING_MODE: ReadingMode = 'night';
export const DEFAULT_FONT_SIZE = 21;
export const MIN_FONT_SIZE = 16;
export const MAX_FONT_SIZE = 36;
export const FONT_SIZE_STEP = 2;

// Cover fallback gradients
export const COVER_GRADIENTS = [
  'from-amber-600 to-orange-800',
  'from-blue-600 to-indigo-800',
  'from-emerald-600 to-teal-800',
  'from-purple-600 to-violet-800',
  'from-rose-600 to-pink-800',
];

export const getCoverGradient = (slug: string): string => {
  const gradientIndex = (slug?.charCodeAt(0) || 0) % COVER_GRADIENTS.length;
  return COVER_GRADIENTS[gradientIndex];
};
