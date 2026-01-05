import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import type { MindFragmentsResult } from '../types';

interface FragmentsStatsGridProps {
  fragmentsData: MindFragmentsResult;
}

export const FragmentsStatsGrid: React.FC<FragmentsStatsGridProps> = ({ fragmentsData }) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      <Card className="bg-muted/20 border-white/5">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="box" className="text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold">{fragmentsData.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-emerald-500/5 border-emerald-500/20">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Icon name="arrow-up" className="text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">{fragmentsData.byRelevance.high}</div>
            <div className="text-xs text-muted-foreground">Alta Relevancia</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-amber-500/5 border-amber-500/20">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Icon name="minus" className="text-amber-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">{fragmentsData.byRelevance.medium}</div>
            <div className="text-xs text-muted-foreground">Media</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-zinc-500/5 border-zinc-500/20">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-zinc-500/10 flex items-center justify-center">
            <Icon name="arrow-small-down" className="text-zinc-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-400">{fragmentsData.byRelevance.low}</div>
            <div className="text-xs text-muted-foreground">Baixa</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
