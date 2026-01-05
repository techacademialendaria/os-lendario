import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import type { StatsCardsProps, BookListStats } from '../types';
import { STATS_CONFIG } from '../types';

/**
 * StatsCards - Dashboard stats cards for books overview
 */
export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const getStatValue = (key: keyof BookListStats): number => stats[key];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS_CONFIG.map((config) => (
        <Card key={config.key} className="border-border bg-card/50">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {config.label}
              </p>
              <h3 className={`font-mono text-2xl font-bold ${config.colorClass}`}>
                {getStatValue(config.key)}
              </h3>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bgClass} ${config.colorClass}`}>
              <Icon name={config.icon} size="size-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
