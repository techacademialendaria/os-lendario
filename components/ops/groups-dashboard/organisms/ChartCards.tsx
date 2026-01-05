import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Icon } from '../../../ui/icon';
import { SentimentChart, ParticipantsChart } from '../molecules';
import type { SentimentChartCardProps, ParticipantsChartCardProps } from '../types';

export const SentimentEvolutionCard: React.FC<SentimentChartCardProps> = ({ data }) => {
  return (
    <Card className="rounded-3xl border-border bg-card shadow-sm h-full">
      <CardContent className="p-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
            <Icon name="graph-up" size="size-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Evolução dos Sentimentos</h3>
        </div>
        <div className="flex-1 min-h-[180px]">
          <SentimentChart data={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export const ParticipantsEvolutionCard: React.FC<ParticipantsChartCardProps> = ({ data }) => {
  return (
    <Card className="rounded-3xl border-border bg-card shadow-sm h-full">
      <CardContent className="p-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
            <Icon name="chart-histogram" size="size-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Evolução de Participantes</h3>
        </div>
        <div className="flex-1 min-h-[180px]">
          <ParticipantsChart data={data} />
        </div>
      </CardContent>
    </Card>
  );
};
