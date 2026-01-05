import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { PRD_STATUS, PRD_PIPELINE_STAGES } from '../../prd-tokens';
import type { PipelineVisualProps } from '../types';

export const PipelineVisual: React.FC<PipelineVisualProps> = ({ projectsByStatus }) => (
  <Card className="border-border bg-card transition-colors hover:border-studio-primary/50">
    <CardContent className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          <Icon name="sitemap" size="size-4" /> Pipeline de Producao PRD
        </h3>
      </div>

      <div className="relative flex items-center justify-between">
        {/* Connecting line */}
        <div className="absolute left-0 top-5 -z-0 h-0.5 w-full bg-muted" />

        {PRD_PIPELINE_STAGES.map((stage) => {
          const count = projectsByStatus[stage.key] || 0;
          const hasProjects = count > 0;

          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center gap-3">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                  hasProjects
                    ? 'scale-110 border-studio-primary bg-studio-primary text-white shadow-lg shadow-studio-primary/40'
                    : 'border-border bg-card text-muted-foreground'
                )}
              >
                <Icon name={stage.icon} size="size-4" />
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    'mb-0.5 text-xs font-bold uppercase tracking-wider',
                    hasProjects ? 'text-studio-primary' : 'text-muted-foreground'
                  )}
                >
                  {stage.label}
                </p>
                <p className="font-mono text-sm text-muted-foreground">{count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);
