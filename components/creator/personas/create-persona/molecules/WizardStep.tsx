import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { StepProps } from '../types';

/**
 * Stepper step indicator for the persona creation wizard
 */
export const WizardStep: React.FC<StepProps> = ({ number, label, active, completed }) => (
  <div className="z-10 flex flex-col items-center gap-2 bg-background px-2">
    <div
      className={cn(
        'flex size-10 items-center justify-center rounded-full font-bold transition-all',
        active
          ? 'bg-studio-primary text-white shadow-[0_0_15px_rgba(83,128,150,0.4)]'
          : completed
            ? 'bg-studio-primary/80 text-white'
            : 'border border-border bg-card text-muted-foreground'
      )}
    >
      {completed ? <Icon name="check" size="size-5" /> : number}
    </div>
    <span
      className={cn(
        'whitespace-nowrap text-sm font-medium',
        active
          ? 'text-studio-primary'
          : completed
            ? 'text-studio-primary/70'
            : 'text-muted-foreground'
      )}
    >
      {label}
    </span>
  </div>
);
