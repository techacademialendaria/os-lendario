import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { getDiscTheme } from '@/utils/psychometrics';
import { bigFiveLabels } from '../data';
import type { ComparisonListViewProps } from '../types';

export const ComparisonListView: React.FC<ComparisonListViewProps> = ({ minds }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 overflow-x-auto duration-500">
      <Card className="bg-studio-card min-w-[800px] overflow-hidden rounded-2xl border-white/5">
        <CardHeader className="border-b border-white/5 bg-white/[0.02] pb-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="pl-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Criterio Comparativo
            </div>
            {minds.map((mind) => (
              <div key={mind.id} className="flex items-center gap-3 border-l border-white/5 pl-4">
                <div className="h-8 w-8 overflow-hidden rounded-full border border-white/10">
                  <img src={mind.avatar} className="h-full w-full object-cover" alt={mind.name} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{mind.name}</span>
                  <span className="text-[10px] uppercase text-zinc-500">{mind.title}</span>
                </div>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Row: Superpower */}
          <div className="grid grid-cols-4 gap-4 border-b border-white/5 py-6 transition-colors hover:bg-white/[0.01]">
            <div className="flex items-center px-6">
              <div className="flex items-center gap-2 text-studio-primary">
                <Icon name="bolt" size="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Superpoder</span>
              </div>
            </div>
            {minds.map((mind) => (
              <div
                key={mind.id}
                className="border-l border-white/5 px-6 font-serif text-sm italic text-zinc-300"
              >
                "{mind.superpower}"
              </div>
            ))}
          </div>

          {/* Row: Kryptonite */}
          <div className="grid grid-cols-4 gap-4 border-b border-white/5 py-6 transition-colors hover:bg-white/[0.01]">
            <div className="flex items-center px-6">
              <div className="flex items-center gap-2 text-red-400">
                <Icon name="shield" size="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Kryptonita</span>
              </div>
            </div>
            {minds.map((mind) => (
              <div key={mind.id} className="border-l border-white/5 px-6 text-sm text-zinc-400">
                {mind.kryptonite}
              </div>
            ))}
          </div>

          {/* Row: Archetypes */}
          <div className="grid grid-cols-4 gap-4 border-b border-white/5 py-6 transition-colors hover:bg-white/[0.01]">
            <div className="flex items-center px-6">
              <div className="flex items-center gap-2 text-blue-400">
                <Icon name="grid" size="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Arquetipos</span>
              </div>
            </div>
            {minds.map((mind) => {
              const theme = getDiscTheme(mind.archetypes.disc);
              return (
                <div key={mind.id} className="space-y-3 border-l border-white/5 px-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">MBTI</span>
                    <Badge variant="outline" className="border-white/10 font-mono text-white">
                      {mind.archetypes.mbti}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Eneagrama</span>
                    <Badge variant="outline" className="border-white/10 font-mono text-white">
                      {mind.archetypes.enneagram}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">DISC</span>
                    <Badge variant="outline" className={`border-white/10 font-mono ${theme.color}`}>
                      {mind.archetypes.disc}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-1 text-xs">
                    <span className="text-[10px] uppercase text-zinc-600">Estrato</span>
                    <span className="font-mono font-bold text-zinc-300">{mind.strat}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section: Big Five Table */}
          <div className="bg-black/20">
            <div className="border-b border-white/5 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Detalhamento Big Five (0-100)
            </div>
            {bigFiveLabels.map((trait, i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 border-b border-white/5 py-3 last:border-0 hover:bg-white/[0.02]"
              >
                <div className="flex items-center px-6 text-xs font-medium uppercase tracking-wider text-zinc-400">
                  {trait}
                </div>
                {minds.map((mind) => (
                  <div
                    key={mind.id}
                    className="flex items-center gap-2 border-l border-white/5 px-6"
                  >
                    <span className="w-8 font-mono text-xs font-bold text-white">
                      {mind.bigFive[i]}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full bg-indigo-500/50"
                        style={{ width: `${mind.bigFive[i]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
