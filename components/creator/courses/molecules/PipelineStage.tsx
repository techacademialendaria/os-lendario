import React from 'react';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';
import type { PipelineStageConfig } from '../types';

interface PipelineStageProps {
  stage: PipelineStageConfig;
}

export const PipelineStage: React.FC<PipelineStageProps> = ({ stage }) => {
  return (
    <div className="group/step relative z-10 flex flex-col items-center gap-3">
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
          stage.status === 'active'
            ? 'border-studio-primary bg-studio-primary text-white shadow-[0_0_20px_hsl(var(--primary-color)/.4)] scale-110'
            : stage.status === 'done'
              ? 'border-studio-primary bg-card text-studio-primary'
              : 'border-border bg-card text-muted-foreground group-hover/step:text-foreground'
        )}
      >
        {stage.status === 'done' ? (
          <Icon name="check" size="size-4" />
        ) : (
          <Icon name={stage.icon} size="size-4" />
        )}
      </div>
      <div className="text-center">
        <p
          className={cn(
            'mb-0.5 text-xs font-bold uppercase tracking-wider',
            stage.status === 'active' || stage.status === 'done'
              ? 'text-studio-primary'
              : 'text-muted-foreground'
          )}
        >
          {stage.label}
        </p>
        <p className="font-mono text-sm text-muted-foreground">{stage.count}</p>
      </div>
    </div>
  );
};
