import React from 'react';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import type { LtvData, PersonaColorInfo } from '../types';

interface LtvChartProps {
  data: LtvData[];
  maxLtv: number;
  getPersonaColor: (index: number) => PersonaColorInfo;
}

export const LtvChart: React.FC<LtvChartProps> = ({ data, maxLtv, getPersonaColor }) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col p-6')}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Icon name="coins" size="size-5" className="text-[#C9B298]" />
          Qual Perfil Mais Compra?
        </h3>
        <span className="text-xs font-semibold text-muted-foreground">LTV Medio</span>
      </div>
      <div className="flex min-h-[200px] flex-1 items-end justify-around gap-4 border-b border-white/5 px-4 pb-4">
        {data.map((item, index) => {
          const height = (item.value / maxLtv) * 100;
          const colorInfo = getPersonaColor(index);
          return (
            <div key={item.name} className="group flex w-1/4 flex-col items-center gap-2">
              <span className="mb-1 text-sm font-bold text-foreground">
                R$ {(item.value / 1000).toFixed(1)}k
              </span>
              <div className="relative h-40 w-full overflow-hidden rounded-t-lg bg-white/5 transition-opacity group-hover:opacity-90">
                <div
                  className={cn('absolute bottom-0 w-full', colorInfo.bg, 'opacity-80')}
                  style={{ height: `${height}%` }}
                />
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <div className={cn('size-2 rounded-full', colorInfo.bg)} />
                <span className="text-xs font-bold text-muted-foreground">{item.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 pt-4 text-xs text-muted-foreground">
        <Icon name="info" size="size-4" />
        <span>Compare LTV para identificar personas de maior valor.</span>
      </div>
    </Card>
  );
};
