import React from 'react';
import { Icon } from '@/components/ui/icon';
import type { StatConfig } from '../types';

interface StatsCardsProps {
  stats: StatConfig[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="p-4 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/40 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
            </div>
            {stat.icon && (
              <div
                className="p-2.5 rounded-lg"
                style={{
                  backgroundColor: `${stat.color || '#3b82f6'}20`,
                  color: stat.color || '#3b82f6'
                }}
              >
                <Icon name={stat.icon as any} size="size-5" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
