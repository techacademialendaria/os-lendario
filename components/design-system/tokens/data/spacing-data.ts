import type { SpacingToken } from '../types';

export const spacingScale: SpacingToken[] = [
  { token: '1', px: '4px', use: 'Gap ícone' },
  { token: '2', px: '8px', use: 'Padding sm' },
  { token: '3', px: '12px', use: 'Input pad' },
  { token: '4', px: '16px', use: 'Padding md' },
  { token: '6', px: '24px', use: 'Padding lg' },
  { token: '8', px: '32px', use: 'Gap sections' },
  { token: '12', px: '48px', use: 'Margin lg' },
  { token: '16', px: '64px', use: 'Hero pad' },
];

export const classOrderRules = [
  '1. Layout (display, position, grid)',
  '2. Sizing (width, height)',
  '3. Spacing (margin, padding)',
  '4. Typography (font, text)',
  '5. Colors (bg, text, border)',
  '6. Borders (rounded, width)',
  '7. Effects (shadow, opacity)',
  '8. Transitions',
  '9. States (hover, focus)',
  '10. Responsive (sm:, lg:)',
];
