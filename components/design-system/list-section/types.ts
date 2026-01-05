// ListSection Types
// Extracted from ListSection.tsx for Atomic Design pattern

export type CheckStyle = 'standard' | 'white' | 'soft' | 'soft-outlined' | 'solid' | 'outlined';
export type ColorVariant = 'dark' | 'gray' | 'green' | 'blue' | 'red' | 'yellow' | 'light' | 'primary';
export type Shape = 'rounded' | 'circle';

export interface ListItemProps {
  style?: CheckStyle;
  color?: ColorVariant;
  shape?: Shape;
  label: React.ReactNode;
  className?: string;
}

export interface ColorConfig {
  text: string;
  bg: string;
  border: string;
  iconColor: string;
  bgSolid: string;
}

export type ColorMap = Record<ColorVariant, ColorConfig>;
