import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';

interface BatchStatsCardsProps {
  total: number;
  inProgress: number;
  pending: number;
  completed: number;
  failed: number;
}

export const BatchStatsCards: React.FC<BatchStatsCardsProps> = ({
  total,
  inProgress,
  pending,
  completed,
  failed,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      <Card className="bg-card">
        <CardContent className="pt-6 pb-4 text-center">
          <div className="text-4xl font-bold">{total}</div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">
            Total
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-warning/50 bg-warning/5">
        <CardContent className="pt-6 pb-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Icon name="play" size="size-5" className="text-warning" />
            <span className="text-4xl font-bold text-warning">{inProgress}</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-warning/80 mt-2">
            Em Progresso
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card">
        <CardContent className="pt-6 pb-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Icon name="clock" size="size-5" className="text-muted-foreground" />
            <span className="text-4xl font-bold">{pending}</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">
            Pendentes
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-success/50 bg-success/5">
        <CardContent className="pt-6 pb-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Icon name="check-circle" size="size-5" className="text-success" />
            <span className="text-4xl font-bold text-success">{completed}</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-success/80 mt-2">
            Concluídos
          </p>
        </CardContent>
      </Card>

      <Card
        className={cn(
          'border-2',
          failed > 0 ? 'border-destructive/50 bg-destructive/5' : 'border-border bg-card'
        )}
      >
        <CardContent className="pt-6 pb-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Icon
              name="x-circle"
              size="size-5"
              className={failed > 0 ? 'text-destructive' : 'text-muted-foreground'}
            />
            <span className={cn('text-4xl font-bold', failed > 0 ? 'text-destructive' : '')}>
              {failed}
            </span>
          </div>
          <p
            className={cn(
              'text-xs font-bold uppercase tracking-widest mt-2',
              failed > 0 ? 'text-destructive/80' : 'text-muted-foreground'
            )}
          >
            Falhas
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchStatsCards;
