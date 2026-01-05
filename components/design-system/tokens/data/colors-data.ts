import type { ColorPair, ShadowToken } from '../types';

export const colorPairs: ColorPair[] = [
  { bg: 'bg-background', text: 'text-foreground', label: 'Page Base' },
  { bg: 'bg-card', text: 'text-card-foreground', label: 'Card / Containers' },
  { bg: 'bg-primary', text: 'text-primary-foreground', label: 'Primary Actions' },
  { bg: 'bg-secondary', text: 'text-secondary-foreground', label: 'Secondary Actions' },
  { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Muted / Disabled' },
  { bg: 'bg-accent', text: 'text-accent-foreground', label: 'Hover / Active' },
  { bg: 'bg-destructive', text: 'text-destructive-foreground', label: 'Error / Delete' },
];

export const shadowTokens: ShadowToken[] = [
  { token: 'shadow-sm', use: 'Cards simples, botões secundários' },
  { token: 'shadow-md', use: 'Hover states, dropdowns pequenos' },
  { token: 'shadow-lg', use: 'Popovers, Toasts' },
  { token: 'shadow-xl', use: 'Modais, Dialogs' },
];
