import React from 'react';
import { Icon } from '@/components/ui/icon';
import type { DarkTriadSectionProps } from '../types';

export const DarkTriadSection: React.FC<DarkTriadSectionProps> = ({ minds }) => {
  return (
    <div className="mt-8 rounded-2xl border border-red-500/10 bg-red-500/5 p-6">
      <h3 className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500">
        <Icon name="shield" className="text-red-500" /> Dark Triad Profile
      </h3>
      <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
        {minds.map((mind) => (
          <div key={mind.id} className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase text-zinc-400">{mind.name}</span>
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[10px] text-red-400/70">
                <span>Narcisismo</span> <span>{mind.darkTriad.narc}/7</span>
              </div>
              <div className="h-1 w-full rounded-full bg-red-500/10">
                <div
                  className="h-full rounded-full bg-red-500/50"
                  style={{ width: `${(mind.darkTriad.narc / 7) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between font-mono text-[10px] text-red-400/70">
                <span>Maquiavelismo</span> <span>{mind.darkTriad.mach}/7</span>
              </div>
              <div className="h-1 w-full rounded-full bg-red-500/10">
                <div
                  className="h-full rounded-full bg-red-500/50"
                  style={{ width: `${(mind.darkTriad.mach / 7) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between font-mono text-[10px] text-red-400/70">
                <span>Psicopatia</span> <span>{mind.darkTriad.psych}/7</span>
              </div>
              <div className="h-1 w-full rounded-full bg-red-500/10">
                <div
                  className="h-full rounded-full bg-red-500/50"
                  style={{ width: `${(mind.darkTriad.psych / 7) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
