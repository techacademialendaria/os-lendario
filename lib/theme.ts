import { Section } from '../types';

// --- THEME DEFINITIONS ---
// Values must be in HSL format (Hue Sat% Light%) to match CSS variables logic.
// This file serves as the Single Source of Truth for the Design System's color palette.

export interface ThemeConfig {
  label: string;
  primary: string;         // HSL Value
  light: string;           // HSL Value (Lighter variant for gradients)
  foreground: string;      // HSL Value (Contrast text)
  hex: string;             // HEX Value (For color pickers/meta tags)
}

export const THEMES: Record<string, ThemeConfig> = {
  Gold: {
    label: 'Dourado',
    primary: '32 27% 69%',         // #C9B298
    light: '32 27% 85%',           // Lighter Gold for gradients
    foreground: '30 20% 11%',      // Dark Brown
    hex: '#C9B298'
  },
  SalesRed: {
    label: 'Sales Red',
    primary: '4 100% 59%',         // #FF3B30 (Brand Red)
    light: '4 100% 80%',           // Lighter Red
    foreground: '0 0% 100%',       // White
    hex: '#FF3B30'
  },
  Mint: {
    label: 'Menta',
    primary: '177 100% 39%',       // #00C7BE
    light: '177 100% 70%',         // Lighter Mint
    foreground: '0 0% 100%',       // White
    hex: '#00C7BE'
  },
  Teal: {
    label: 'Turquesa',
    primary: '189 61% 48%',        // #30B0C7
    light: '189 61% 75%',          // Lighter Teal
    foreground: '0 0% 100%',       // White
    hex: '#30B0C7'
  },
  Cyan: {
    label: 'Ciano',
    primary: '199 77% 55%',        // #32ADE6
    light: '199 77% 80%',          // Lighter Cyan
    foreground: '0 0% 100%',       // White
    hex: '#32ADE6'
  },
  Indigo: {
    label: 'Índigo',
    primary: '241 61% 59%',        // #5856D6
    light: '241 61% 80%',          // Lighter Indigo
    foreground: '0 0% 100%',       // White
    hex: '#5856D6'
  },
  Pink: {
    label: 'Vermelho',             // Changed from Rosa to Vermelho
    primary: '349 100% 59%',       // #FF2D55
    light: '349 100% 80%',         // Lighter Pink
    foreground: '0 0% 100%',       // White
    hex: '#FF2D55'
  },
  Brown: {
    label: 'Marrom',
    primary: '33 27% 50%',         // #A2845E
    light: '33 27% 70%',           // Lighter Brown
    foreground: '0 0% 100%',       // White
    hex: '#A2845E'
  },
  PRDStudio: {
    label: 'PRD Studio',
    primary: '195 28% 45%',        // #538096 (Petróleo Blue)
    light: '195 28% 65%',          // Lighter Petróleo
    foreground: '0 0% 100%',       // White
    hex: '#538096'
  },
  Creator: {
    label: 'Course Creator',
    primary: '195 28% 45%',        // #538096 (Petróleo Blue)
    light: '195 28% 65%',          // Lighter Petróleo
    foreground: '0 0% 100%',       // White
    hex: '#538096'
  }
};

export type ThemeName = keyof typeof THEMES;

// --- APP DETECTION HELPERS ---

export const isPRDApp = (section: Section): boolean =>
  section.toString().startsWith('studio_prd');
