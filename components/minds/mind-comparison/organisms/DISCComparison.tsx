import React from 'react';
import { Icon } from '@/components/ui/icon';
import type { DISCComparisonProps } from '../types';

export const DISCComparison: React.FC<DISCComparisonProps> = ({ minds }) => {
  return (
    <div className="bg-studio-card space-y-8 rounded-3xl border border-white/5 p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded bg-white/5 p-2">
          <Icon name="chart-pie" className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">DISC - Comportamento Observavel</h3>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Labels */}
        <div className="hidden space-y-8 md:block md:pt-8">
          <div className="flex h-[8px] items-center gap-2 font-mono text-sm text-zinc-400">
            <span className="h-1 w-1 rounded-full bg-red-500"></span> Dominancia (D)
          </div>
          <div className="flex h-[8px] items-center gap-2 font-mono text-sm text-zinc-400">
            <span className="h-1 w-1 rounded-full bg-yellow-500"></span> Influencia (I)
          </div>
          <div className="flex h-[8px] items-center gap-2 font-mono text-sm text-zinc-400">
            <span className="h-1 w-1 rounded-full bg-emerald-500"></span> Estabilidade (S)
          </div>
          <div className="flex h-[8px] items-center gap-2 font-mono text-sm text-zinc-400">
            <span className="h-1 w-1 rounded-full bg-blue-500"></span> Conformidade (C)
          </div>
        </div>

        {/* Mind Columns */}
        {minds.map((mind) => (
          <div key={mind.id} className="space-y-8">
            <div className="mb-4 flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
              <span>{mind.name}</span>
              <span className="text-white">{mind.archetypes.disc}</span>
            </div>

            {[
              { val: mind.disc.d, color: 'bg-red-500' },
              { val: mind.disc.i, color: 'bg-yellow-500' },
              { val: mind.disc.s, color: 'bg-emerald-500' },
              { val: mind.disc.c, color: 'bg-blue-500' },
            ].map((metric, i) => (
              <div key={i} className="group relative">
                <div className="absolute -top-4 mb-1 flex w-full justify-between font-mono text-[10px] text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100">
                  <span>{metric.val}/100</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${metric.color}`}
                    style={{ width: `${metric.val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
