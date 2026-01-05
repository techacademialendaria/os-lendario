import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import type { BigFiveDetailsProps } from '../types';

const BIG_FIVE_TRAITS = [
  {
    label: 'Abertura (Openness)',
    key: 'openness' as const,
    color: 'bg-blue-600',
    desc: 'Curiosidade, criatividade, abertura a novas experiencias',
  },
  {
    label: 'Conscienciosidade',
    key: 'conscientiousness' as const,
    color: 'bg-blue-500',
    desc: 'Organizacao, disciplina, orientacao a metas',
  },
  {
    label: 'Extroversao',
    key: 'extraversion' as const,
    color: 'bg-yellow-500',
    desc: 'Sociabilidade, energia, assertividade',
  },
  {
    label: 'Agradabilidade',
    key: 'agreeableness' as const,
    color: 'bg-green-500',
    desc: 'Cooperacao, empatia, confianca',
  },
  {
    label: 'Neuroticismo',
    key: 'neuroticism' as const,
    color: 'bg-red-500',
    desc: 'Sensibilidade emocional, ansiedade, reatividade',
  },
];

export const BigFiveDetails: React.FC<BigFiveDetailsProps> = ({ bigFive }) => {
  return (
    <Card className="rounded-xl border-border">
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-muted-foreground">
          <Icon name="chart-histogram" /> Big Five - Detalhamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {BIG_FIVE_TRAITS.map((trait) => (
          <div key={trait.key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{trait.label}</span>
              <span className="font-mono font-bold">{bigFive[trait.key]}/100</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted/30">
              <div
                className={`h-full rounded-full ${trait.color}`}
                style={{ width: `${bigFive[trait.key]}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground">{trait.desc}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BigFiveDetails;
