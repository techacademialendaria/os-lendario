import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Icon } from '../../../ui/icon';
import SentimentGauge from '../../groups/SentimentGauge';
import { SentimentBadge } from '../molecules';
import type { SentimentCardProps } from '../types';

export const SentimentCard: React.FC<SentimentCardProps> = ({
  sentimentoAtual,
  ultimosTresSentimentos,
}) => {
  return (
    <Card className="rounded-3xl border-border bg-card shadow-sm h-full flex flex-col hover:border-primary/30 transition-colors">
      <CardContent className="p-8 flex flex-col h-full gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
            <Icon name="chart-histogram" size="size-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Sentimento Atual</h3>
            <p className="text-xs text-muted-foreground font-serif">Média ponderada (3 dias)</p>
          </div>
        </div>

        <div className="flex justify-center py-4">
          <SentimentGauge sentiment={sentimentoAtual} size="lg" showLabel />
        </div>

        <div className="space-y-4 mt-auto">
          <h4 className="text-[10px] font-bold text-primary uppercase tracking-wider border-b border-border pb-2">
            Últimos Registros
          </h4>
          <div className="space-y-2">
            {ultimosTresSentimentos.map((rec, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-2 hover:bg-muted/30 rounded transition-colors"
              >
                <span className="text-sm font-mono text-muted-foreground">{rec.data_resumo}</span>
                <SentimentBadge sentiment={rec.Sentimento} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
