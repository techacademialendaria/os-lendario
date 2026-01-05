import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import type { DarkTriadSectionProps } from '../types';

const DARK_TRIAD_TRAITS = [
  {
    label: 'Narcisismo',
    key: 'narcissism' as const,
    desc: 'Grandiosidade, necessidade de admiracao',
  },
  {
    label: 'Maquiavelismo',
    key: 'machiavellianism' as const,
    desc: 'Manipulacao estrategica, pragmatismo frio',
  },
  {
    label: 'Psicopatia',
    key: 'psychopathy' as const,
    desc: 'Baixa empatia, impulsividade, frieza',
  },
];

export const DarkTriadSection: React.FC<DarkTriadSectionProps> = ({ darkTriad }) => {
  // Only render if at least one value is > 0
  if (
    darkTriad.narcissism <= 0 &&
    darkTriad.machiavellianism <= 0 &&
    darkTriad.psychopathy <= 0
  ) {
    return null;
  }

  return (
    <Card className="rounded-xl border-red-500/10 bg-red-500/5">
      <CardHeader className="border-b border-red-500/10 pb-3">
        <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-red-400">
          <Icon name="shield" /> Dark Triad Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {DARK_TRIAD_TRAITS.map((trait) => (
            <div key={trait.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-400">{trait.label}</span>
                <span className="font-mono text-lg font-bold text-white">
                  {darkTriad[trait.key]}/7
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-red-500/10">
                <div
                  className="h-full rounded-full bg-red-500/50"
                  style={{ width: `${(darkTriad[trait.key] / 7) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-red-400/70">{trait.desc}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DarkTriadSection;
