import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { ComparisonHeroProps } from '../types';

export const ComparisonHero: React.FC<ComparisonHeroProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="relative overflow-hidden border-b border-white/5 bg-studio-bg p-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050507] to-[#050507] opacity-60"></div>
      <div className="relative z-10 mx-auto max-w-[1400px] space-y-4 text-center">
        <Badge
          variant="outline"
          className="border-white/10 text-[10px] uppercase tracking-widest text-zinc-400"
        >
          High-Level Analysis
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">DNA Mental</h1>
        <p className="mx-auto max-w-2xl font-serif text-xl italic text-zinc-400">
          Analise comparativa profunda dos modelos mentais, motivacoes e comportamentos de tres
          mentes lendarias.
        </p>

        <div className="flex justify-center gap-2 pt-4">
          <Badge
            onClick={() => onViewModeChange('grid')}
            className={`cursor-pointer transition-all ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'border border-white/10 bg-transparent text-zinc-500 hover:bg-white/5 hover:text-white'}`}
          >
            Abas (Focado)
          </Badge>
          <Badge
            onClick={() => onViewModeChange('list')}
            className={`cursor-pointer transition-all ${viewMode === 'list' ? 'bg-white/20 text-white' : 'border border-white/10 bg-transparent text-zinc-500 hover:bg-white/5 hover:text-white'}`}
          >
            Lista (Relatorio)
          </Badge>
        </div>
      </div>
    </div>
  );
};
