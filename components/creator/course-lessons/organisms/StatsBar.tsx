import React from 'react';
import { Progress } from '@/components/ui/progress';
import type { StatsBarProps } from '../types';

export const StatsBar: React.FC<StatsBarProps> = ({
  stats,
  progressPercent,
}) => {
  return (
    <div className="border-b border-border bg-muted/20 px-6 py-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-success h-3 w-3 rounded-full"></div>
            <span className="text-sm">{stats.completed} concluidas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-brand-yellow"></div>
            <span className="text-sm">{stats.review} em revisao</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded-full bg-primary"></div>
            <span className="text-sm">{stats.generating} gerando</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted"></div>
            <span className="text-sm">{stats.draft} rascunhos</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Progresso:</span>
          <Progress value={progressPercent} className="h-2 w-32" />
          <span className="font-mono text-sm">{progressPercent}%</span>
        </div>
      </div>
    </div>
  );
};
