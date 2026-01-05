import React from 'react';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import type { ConsciousnessData } from '../types';

interface ConsciousnessChartProps {
  data: ConsciousnessData[];
}

const LegendDot: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-1.5">
    <div className={cn('size-2 rounded-full', color)} />
    <span className="text-[10px] text-muted-foreground">{label}</span>
  </div>
);

export const ConsciousnessChart: React.FC<ConsciousnessChartProps> = ({ data }) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col p-6')}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Icon name="brain" size="size-5" className="text-[#C9B298]" />
          Niveis de Consciencia
        </h3>
      </div>
      <div className="space-y-6">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <span>{item.name}</span>
              <span>{item.level} Consciencia</span>
            </div>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-background">
              <div className="bg-red-500" style={{ width: `${item.distribution.unaware}%` }} />
              <div className="bg-orange-500" style={{ width: `${item.distribution.problem}%` }} />
              <div className="bg-yellow-500" style={{ width: `${item.distribution.solution}%` }} />
              <div className="bg-green-500" style={{ width: `${item.distribution.product}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span className="text-red-400">Inconsciente: {item.distribution.unaware}%</span>
              <span className="text-green-400">
                Pronto para compra: {item.distribution.product}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <LegendDot color="bg-red-500" label="Inconsciente" />
        <LegendDot color="bg-orange-500" label="Problema" />
        <LegendDot color="bg-yellow-500" label="Solucao" />
        <LegendDot color="bg-green-500" label="Produto" />
      </div>
    </Card>
  );
};
