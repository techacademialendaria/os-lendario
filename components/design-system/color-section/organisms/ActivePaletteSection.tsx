import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { THEMES, ThemeName } from '@/lib/theme';
import type { Palette } from '../types';
import { PaletteCard } from './PaletteCard';

interface ActivePaletteSectionProps {
  activePalette: Palette;
  currentTheme: ThemeName;
  isDark: boolean;
}

export const ActivePaletteSection: React.FC<ActivePaletteSectionProps> = ({
  activePalette,
  currentTheme,
  isDark,
}) => {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-b border-border pb-4">
        <h3 className="flex items-center gap-3 font-sans text-3xl font-bold">
          <Icon name="crown" className="text-primary" /> Cor Primaria Ativa
        </h3>
        <Badge variant="outline" className="border-primary text-primary">
          Tema: {THEMES[currentTheme].label}
        </Badge>
      </div>
      <div className="grid grid-cols-1">
        <PaletteCard palette={activePalette} isDark={isDark} />
      </div>
    </section>
  );
};
