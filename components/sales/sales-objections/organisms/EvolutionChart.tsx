import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { StackedAreaChart } from '../molecules';

export const EvolutionChart: React.FC = () => {
  return (
    <Card className="overflow-hidden border-border">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border px-6 py-4">
        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
          <Icon name="chart-line" className="text-primary" /> Evolucao ao Longo do Tempo
        </CardTitle>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer bg-muted hover:bg-muted/80">
            Absoluto
          </Badge>
          <Badge
            variant="outline"
            className="cursor-pointer border-transparent text-muted-foreground hover:bg-muted"
          >
            Percentual
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <StackedAreaChart />
        <div className="mt-4 flex justify-center gap-6">
          <div className="flex cursor-pointer items-center gap-2 opacity-80 hover:opacity-100">
            <div className="h-3 w-3 rounded-full bg-destructive"></div>
            <span className="text-xs font-bold text-muted-foreground">Preco</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 opacity-80 hover:opacity-100">
            <div className="h-3 w-3 rounded-full bg-brand-orange"></div>
            <span className="text-xs font-bold text-muted-foreground">Timing</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 opacity-80 hover:opacity-100">
            <div className="h-3 w-3 rounded-full bg-brand-blue"></div>
            <span className="text-xs font-bold text-muted-foreground">Concorrente</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
