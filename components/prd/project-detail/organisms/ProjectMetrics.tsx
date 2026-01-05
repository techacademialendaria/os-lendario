// PRD Project Detail - Metrics organism
import React from 'react';
import { Card } from '@/components/ui/card';
import type { ProjectMetricsProps } from '../types';
import { STUDIO_TEAL } from '../types';

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i} className="border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col">
            <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold" style={{ color: STUDIO_TEAL }}>
                {stat.value}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">{stat.subtext}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};
