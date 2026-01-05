import React from 'react';
import { Progress } from '@/components/ui/progress';

interface BatchProgressBarProps {
  completed: number;
  total: number;
  progressPercent: number;
}

export const BatchProgressBar: React.FC<BatchProgressBarProps> = ({
  completed,
  total,
  progressPercent,
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Progresso Geral
      </span>
      <span className="text-sm text-muted-foreground">
        {completed} de {total} concluidos ({progressPercent}%)
      </span>
    </div>
    <Progress value={progressPercent} className="h-2" />
  </div>
);
