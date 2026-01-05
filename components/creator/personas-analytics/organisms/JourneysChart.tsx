import React from 'react';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import type { JourneyData } from '../types';

interface JourneyCardProps {
  journey: JourneyData;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ journey }) => (
  <div className="relative overflow-hidden rounded-lg border border-border bg-background p-4">
    <div className={cn('absolute left-0 top-0 h-full w-1', journey.color.bg)} />
    <div className="mb-3 flex justify-between">
      <span className={cn('text-xs font-bold uppercase', journey.color.text)}>
        {journey.name} ({journey.type})
      </span>
      <span className="text-[10px] text-muted-foreground">Ciclo: {journey.cycle}</span>
    </div>
    <div className="relative z-10 flex flex-col gap-3">
      {journey.steps.map((step, i) => (
        <React.Fragment key={step.step}>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex size-6 items-center justify-center rounded-full text-[10px]',
                step.final
                  ? cn(journey.color.bg, 'font-bold text-background')
                  : 'bg-muted text-foreground'
              )}
            >
              {step.step}
            </div>
            <span
              className={cn(
                'text-xs',
                step.final ? 'font-bold text-foreground' : 'text-muted-foreground'
              )}
            >
              {step.label}
            </span>
          </div>
          {i < journey.steps.length - 1 && <div className="ml-3 h-2 w-px bg-muted-foreground/30" />}
        </React.Fragment>
      ))}
    </div>
  </div>
);

interface JourneysChartProps {
  journeys: JourneyData[];
}

export const JourneysChart: React.FC<JourneysChartProps> = ({ journeys }) => {
  return (
    <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col p-6')}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Icon name="route" size="size-5" className="text-[#C9B298]" />
          Jornadas de Compra Comuns
        </h3>
      </div>
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
        {journeys.map((journey) => (
          <JourneyCard key={journey.name} journey={journey} />
        ))}
      </div>
    </Card>
  );
};
