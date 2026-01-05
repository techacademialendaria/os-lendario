// PipelineStepper organism for Stories Template
import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { PIPELINE_STEPS, STUDIO_TEAL } from '../types';

export const PipelineStepper: React.FC = () => (
  <div className="relative mx-auto flex max-w-3xl items-center justify-between">
    <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full bg-muted" />
    {PIPELINE_STEPS.map((step, i) => (
      <div
        key={step.id}
        className="z-10 flex flex-col items-center gap-2 rounded-full bg-background px-2"
      >
        <div
          className={cn(
            'flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors',
            step.status === 'active'
              ? 'border-[var(--studio-teal)] bg-[var(--studio-teal)] text-white shadow-lg'
              : step.status === 'done'
                ? 'border-[var(--studio-teal)] bg-card text-[var(--studio-teal)]'
                : 'border-border bg-card text-muted-foreground'
          )}
          style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
        >
          {step.status === 'done' ? <Icon name="check" size="size-3" /> : i + 1}
        </div>
        <span
          className={cn(
            'hidden text-[10px] font-bold uppercase tracking-wider sm:block',
            step.status === 'active' ? 'text-[var(--studio-teal)]' : 'text-muted-foreground'
          )}
          style={step.status === 'active' ? { color: STUDIO_TEAL } : {}}
        >
          {step.label}
        </span>
      </div>
    ))}
  </div>
);
