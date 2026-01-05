import React from 'react';
import { Icon } from '@/components/ui/icon';
import { bigFiveLabels } from '../data';
import type { BigFiveComparisonProps } from '../types';

export const BigFiveComparison: React.FC<BigFiveComparisonProps> = ({ minds }) => {
  return (
    <div className="bg-studio-card space-y-8 rounded-3xl border border-white/5 p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded bg-white/5 p-2">
          <Icon name="chart-histogram" className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">Big Five (OCEAN)</h3>
      </div>

      <div className="space-y-8">
        {bigFiveLabels.map((trait, i) => (
          <div
            key={i}
            className="group grid grid-cols-1 items-center gap-4 rounded-lg p-2 transition-colors hover:bg-white/[0.02] md:grid-cols-12"
          >
            <div className="text-sm font-medium uppercase tracking-wider text-zinc-400 md:col-span-3">
              {trait}
            </div>
            <div className="grid grid-cols-3 gap-8 md:col-span-9">
              {minds.map((mind, idx) => {
                const val = mind.bigFive[i];
                const colorClass =
                  idx === 0 ? 'bg-studio-primary' : idx === 1 ? 'bg-indigo-500' : 'bg-zinc-500';
                return (
                  <div key={mind.id} className="relative">
                    <div className="mb-1 flex justify-between font-mono text-[10px] text-zinc-500">
                      <span className="opacity-50">{mind.name.split(' ')[0]}</span>
                      <span
                        className={
                          idx === 0
                            ? 'text-studio-primary'
                            : idx === 1
                              ? 'text-indigo-400'
                              : 'text-zinc-300'
                        }
                      >
                        {val}/100
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full ${colorClass}`}
                        style={{ width: `${val}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
