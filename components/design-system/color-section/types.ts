import { ThemeName } from '@/lib/theme';

export interface Palette {
  name: string;
  main: string;
  dark: string;
  complements: string[];
  complementsDark?: string[];
  usageNote: string;
}

export interface ColorSectionProps {
  isDark: boolean;
  currentTheme: ThemeName;
}

export interface PaletteCardProps {
  palette: Palette;
  isDark: boolean;
}

export interface ColorFormats {
  hex: string;
  rgb: string;
  cmyk: string;
}
