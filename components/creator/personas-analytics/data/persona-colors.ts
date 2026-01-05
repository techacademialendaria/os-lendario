import type { PersonaColorInfo } from '../types';

export const PERSONA_COLORS: PersonaColorInfo[] = [
  {
    bg: 'bg-studio-accent',
    bgLight: 'bg-studio-accent/10',
    border: 'border-studio-accent/20',
    text: 'text-studio-accent',
  },
  {
    bg: 'bg-[#C9B298]',
    bgLight: 'bg-[#C9B298]/10',
    border: 'border-[#C9B298]/20',
    text: 'text-[#C9B298]',
  },
  {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-500',
  },
  {
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-500',
  },
  {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-500',
  },
];

export const PERIOD_OPTIONS = [
  { value: '30d', label: 'Ultimos 30 dias' },
  { value: 'quarter', label: 'Este Trimestre' },
  { value: 'year', label: 'Este Ano' },
];

export const getPersonaColor = (index: number): PersonaColorInfo => {
  return PERSONA_COLORS[index % PERSONA_COLORS.length];
};
