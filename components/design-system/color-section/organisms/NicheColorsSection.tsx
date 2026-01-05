import React from 'react';
import { Icon } from '@/components/ui/icon';
import type { Palette } from '../types';
import { PaletteCard } from './PaletteCard';

interface NicheColorsSectionProps {
  otherNichePalettes: Palette[];
  isDark: boolean;
}

export const NicheColorsSection: React.FC<NicheColorsSectionProps> = ({
  otherNichePalettes,
  isDark,
}) => {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-b border-border pb-4">
        <h3 className="flex items-center gap-3 font-sans text-2xl font-bold">
          <Icon name="apps" /> Outras Opcoes de Tema
        </h3>
        <span className="font-serif text-sm text-muted-foreground">
          Disponiveis no Seletor de Cores
        </span>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {otherNichePalettes.map((palette) => (
          <PaletteCard key={palette.name} palette={palette} isDark={isDark} />
        ))}
      </div>
    </section>
  );
};
