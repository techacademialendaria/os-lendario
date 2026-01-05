import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';
import type { MetricConfig } from '../types';

interface MetricCardProps {
  metric: MetricConfig;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <Card className="group relative overflow-hidden border-border bg-card transition-all hover:border-studio-primary/50">
      {/* Sparkline Background */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 opacity-10 transition-opacity group-hover:opacity-20">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full">
          <path d={`M0,30 L${metric.sparkline} L100,30 Z`} fill="hsl(var(--primary-color))" />
        </svg>
      </div>
      <CardContent className="relative z-10 flex items-start justify-between p-5">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {metric.label}
          </p>
          <h3 className="font-mono text-3xl font-medium text-foreground">{metric.value}</h3>
          <div className="mt-2 flex items-center gap-1">
            {metric.trendUp ? (
              <Icon name="trend-up" className="text-emerald-500" size="size-3" />
            ) : (
              <Icon name="minus" className="text-muted-foreground" size="size-3" />
            )}
            <span
              className={cn(
                'text-[10px] font-bold',
                metric.trendUp ? 'text-emerald-600' : 'text-muted-foreground'
              )}
            >
              {metric.change}
            </span>
            <span className="ml-1 text-[10px] text-muted-foreground">{metric.changeLabel}</span>
          </div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-studio-accent text-studio-primary transition-colors">
          <Icon name={metric.icon} size="size-5" />
        </div>
      </CardContent>
    </Card>
  );
};
