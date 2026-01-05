// PRD Project Detail - Pipeline organism
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { ProjectPipelineProps } from '../types';
import { STUDIO_TEAL } from '../types';

export const ProjectPipeline: React.FC<ProjectPipelineProps> = ({
  steps,
  progress,
  onNavigate,
}) => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Pipeline de Producao
        </h3>
        <span className="font-mono text-xs text-muted-foreground">{progress}% completo</span>
      </div>
      <div className="relative mb-6">
        <Progress value={progress} className="h-1 bg-muted" />
      </div>
      <div className="relative flex items-center justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className="group relative z-10 flex cursor-pointer flex-col items-center gap-2"
            onClick={() => onNavigate(step.id)}
          >
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors',
                step.status === 'done'
                  ? 'border-[var(--studio-teal)] bg-card text-foreground'
                  : step.status === 'active'
                    ? 'border-[var(--studio-teal)] bg-[var(--studio-teal)] text-white shadow-lg ring-4 ring-[var(--studio-teal)]/20'
                    : 'border-border bg-card text-muted-foreground'
              )}
              style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
            >
              {step.status === 'done' ? <Icon name="check" size="size-3" /> : i + 1}
            </div>
            <span
              className={cn(
                'text-[10px] font-bold uppercase tracking-wider',
                step.status === 'active' ? 'text-[var(--studio-teal)]' : 'text-muted-foreground'
              )}
              style={step.status === 'active' ? { '--studio-teal': STUDIO_TEAL } as React.CSSProperties : {}}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
