import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { PRD_PRIMARY, PRD_ACCENT, PRD_BLUE, PRD_GREEN } from '../../prd-tokens';
import type { MetricsRowProps, MetricItem } from '../types';
import type { PRDStatus } from '@/types/prd';

export const MetricsRow: React.FC<MetricsRowProps> = ({ totalProjects, projectsByStatus }) => {
  const inProgress =
    projectsByStatus.upload +
    projectsByStatus.brief +
    projectsByStatus.prd +
    projectsByStatus.epics +
    projectsByStatus.stories;
  const exported = projectsByStatus.exported;

  const metrics: MetricItem[] = [
    { label: 'Total de Projetos', value: totalProjects, icon: 'folder', color: PRD_PRIMARY },
    { label: 'Em Progresso', value: inProgress, icon: 'clock', color: PRD_BLUE },
    { label: 'Exportados', value: exported, icon: 'check-circle', color: PRD_GREEN },
    {
      label: 'Taxa de Conclusao',
      value: totalProjects > 0 ? `${Math.round((exported / totalProjects) * 100)}%` : '0%',
      icon: 'chart-pie',
      color: PRD_ACCENT,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((metric, idx) => (
        <Card
          key={idx}
          className="group border-border bg-card transition-all hover:border-studio-primary/50"
        >
          <CardContent className="flex items-start justify-between p-5">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {metric.label}
              </p>
              <h3 className="font-mono text-3xl font-medium text-foreground">{metric.value}</h3>
            </div>
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
              style={{ backgroundColor: `${metric.color}20`, color: metric.color }}
            >
              <Icon name={metric.icon} size="size-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
