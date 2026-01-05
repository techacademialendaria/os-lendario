// Color mapping for ListItem check icons
// Used across all ListItem styles and components

import type { ColorMap } from '../types';

export const colorMap: ColorMap = {
  dark: {
    text: 'text-foreground',
    bg: 'bg-foreground/10',
    border: 'border-foreground',
    iconColor: 'text-foreground',
    bgSolid: 'bg-foreground',
  },
  gray: {
    text: 'text-muted-foreground',
    bg: 'bg-muted',
    border: 'border-muted-foreground/30',
    iconColor: 'text-muted-foreground',
    bgSolid: 'bg-muted-foreground',
  },
  green: {
    text: 'text-brand-green',
    bg: 'bg-brand-green/10',
    border: 'border-brand-green',
    iconColor: 'text-brand-green',
    bgSolid: 'bg-brand-green',
  },
  blue: {
    text: 'text-brand-blue',
    bg: 'bg-brand-blue/10',
    border: 'border-brand-blue',
    iconColor: 'text-brand-blue',
    bgSolid: 'bg-brand-blue',
  },
  red: {
    text: 'text-brand-red',
    bg: 'bg-brand-red/10',
    border: 'border-brand-red',
    iconColor: 'text-brand-red',
    bgSolid: 'bg-brand-red',
  },
  yellow: {
    text: 'text-brand-yellow',
    bg: 'bg-brand-yellow/10',
    border: 'border-brand-yellow',
    iconColor: 'text-brand-yellow-dark',
    bgSolid: 'bg-brand-yellow',
  },
  light: {
    text: 'text-foreground',
    bg: 'bg-white/10',
    border: 'border-white/30',
    iconColor: 'text-white',
    bgSolid: 'bg-white',
  },
  primary: {
    text: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary',
    iconColor: 'text-primary',
    bgSolid: 'bg-primary',
  },
};
