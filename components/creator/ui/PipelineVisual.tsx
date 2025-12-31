import React from 'react';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export type PipelineStepStatus = 'completed' | 'current' | 'pending';

export interface PipelineState {
  brief: PipelineStepStatus;
  research: PipelineStepStatus;
  curriculum: PipelineStepStatus;
  lessons: PipelineStepStatus;
  validation: PipelineStepStatus;
}

interface PipelineStepProps {
  status: PipelineStepStatus;
  label: string;
}

interface PipelineVisualProps {
  pipeline: PipelineState;
  className?: string;
}

// =============================================================================
// PipelineStep Component
// =============================================================================

export function PipelineStep({ status, label }: PipelineStepProps) {
  let iconName = 'circle';
  let colorClass = 'text-muted-foreground/30';
  let labelClass = 'text-muted-foreground';

  if (status === 'completed') {
    iconName = 'check-circle';
    colorClass = 'text-success';
    labelClass = 'text-success font-medium';
  } else if (status === 'current') {
    iconName = 'target';
    colorClass = 'text-primary animate-pulse';
    labelClass = 'text-primary font-bold';
  }

  return (
    <div className="group relative flex cursor-help flex-col items-center gap-1">
      <Icon
        name={iconName}
        className={cn('size-4 transition-colors', colorClass)}
        type={status === 'completed' ? 'solid' : 'regular'}
      />
      <span className={cn('text-[9px] uppercase tracking-wider transition-colors', labelClass)}>
        {label}
      </span>
    </div>
  );
}

// =============================================================================
// PipelineVisual Component
// =============================================================================

export function PipelineVisual({ pipeline, className }: PipelineVisualProps) {
  return (
    <div className={cn('relative flex w-full items-center justify-between', className)}>
      <div className="absolute left-0 top-[7px] -z-10 h-0.5 w-full bg-muted" />
      <div className="z-10 bg-card px-1">
        <PipelineStep status={pipeline.brief} label="Brief" />
      </div>
      <div className="z-10 bg-card px-1">
        <PipelineStep status={pipeline.research} label="Research" />
      </div>
      <div className="z-10 bg-card px-1">
        <PipelineStep status={pipeline.curriculum} label="Currículo" />
      </div>
      <div className="z-10 bg-card px-1">
        <PipelineStep status={pipeline.lessons} label="Lições" />
      </div>
      <div className="z-10 bg-card px-1">
        <PipelineStep status={pipeline.validation} label="Validação" />
      </div>
    </div>
  );
}

export default PipelineVisual;
