import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { STUDIO_ACCENT, STUDIO_PRIMARY } from '../../studio-tokens';
import type { KpiStat } from '../types';

interface KpiCardsGridProps {
  stats: KpiStat[];
}

export const KpiCardsGrid: React.FC<KpiCardsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card
          key={i}
          className="group relative overflow-hidden border-border bg-card transition-all hover:border-studio-primary/50"
        >
          {/* Sparkline Background */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 opacity-10 transition-opacity group-hover:opacity-20">
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full">
              <path d={`M0,30 L${stat.sparkline} L100,30 Z`} fill={STUDIO_PRIMARY} />
            </svg>
          </div>
          <CardContent className="relative z-10 flex items-start justify-between p-5">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              <h3 className="font-mono text-3xl font-medium text-foreground">{stat.value}</h3>
              <p className="mt-2 text-[10px] text-muted-foreground">{stat.detail}</p>
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
              style={{ backgroundColor: STUDIO_ACCENT, color: STUDIO_PRIMARY }}
            >
              <Icon name={stat.icon} size="size-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
