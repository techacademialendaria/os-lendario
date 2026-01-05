import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { MarketGapsTabProps } from '../types';
import { getOpportunityColor } from '../types';

export const MarketGapsTab: React.FC<MarketGapsTabProps> = ({ gaps, onToggleGap }) => {
  const addressedCount = gaps.filter((g) => g.addressed).length;
  const pendingCount = gaps.filter((g) => !g.addressed).length;
  const highPriorityCount = gaps.filter((g) => g.opportunity === 'high').length;

  return (
    <div className="mt-6 animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Oportunidades identificadas no mercado
        </p>
        <Button variant="outline" size="sm">
          <Icon name="plus" className="mr-2 size-3" /> Adicionar Gap
        </Button>
      </div>

      <div className="space-y-3">
        {gaps.map((gap) => (
          <Card
            key={gap.id}
            className={cn(
              'transition-all',
              gap.addressed && 'border-success/30 bg-success/5'
            )}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleGap(gap.id)}
                className={cn(
                  'h-6 w-6 rounded-full border-2 transition-colors',
                  gap.addressed
                    ? 'bg-success border-success text-white'
                    : 'border-muted-foreground/30'
                )}
              >
                {gap.addressed && <Icon name="check" size="size-3" />}
              </Button>

              <div className="flex-1">
                <p
                  className={cn(
                    'text-sm font-medium',
                    gap.addressed && 'text-muted-foreground line-through'
                  )}
                >
                  {gap.description}
                </p>
              </div>

              <Badge
                className={cn(
                  'text-[10px] uppercase',
                  getOpportunityColor(gap.opportunity)
                )}
              >
                {gap.opportunity === 'high'
                  ? 'Alta Oportunidade'
                  : gap.opportunity === 'medium'
                    ? 'Media Oportunidade'
                    : 'Baixa Oportunidade'}
              </Badge>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
              >
                <Icon name="pencil" size="size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Icon name="chart-pie" className="size-4 text-studio-primary" />
          <span className="text-sm font-medium">Resumo</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-success text-2xl font-bold">{addressedCount}</p>
            <p className="text-xs text-muted-foreground">Enderecados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-brand-yellow">{pendingCount}</p>
            <p className="text-xs text-muted-foreground">Pendentes</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{highPriorityCount}</p>
            <p className="text-xs text-muted-foreground">Alta Prioridade</p>
          </div>
        </div>
      </div>
    </div>
  );
};
