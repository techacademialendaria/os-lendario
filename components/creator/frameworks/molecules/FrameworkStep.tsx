import React from 'react';
import { Badge } from '@/components/ui/badge';
import { STUDIO_PRIMARY } from '@/components/creator/studio-tokens';
import type { FrameworkStepProps } from '../types';

export const FrameworkStep: React.FC<FrameworkStepProps> = ({
  step,
  index,
  color,
  isPedagogical,
}) => (
  <div
    className="flex items-start gap-4 rounded-lg border border-border/50 p-4 transition-colors"
    style={{
      borderColor: isPedagogical ? `${STUDIO_PRIMARY}50` : undefined,
    }}
    onMouseEnter={(e) => {
      if (isPedagogical) {
        e.currentTarget.style.borderColor = `${STUDIO_PRIMARY}80`;
      }
    }}
    onMouseLeave={(e) => {
      if (isPedagogical) {
        e.currentTarget.style.borderColor = `${STUDIO_PRIMARY}50`;
      }
    }}
  >
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {index + 1}
    </div>
    <div className="flex-1">
      <div className="mb-1 flex items-center gap-2">
        <h4 className="font-semibold">{step.name}</h4>
        {step.duration && (
          <Badge variant="outline" className="text-[10px]">
            {step.duration}
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{step.description}</p>
    </div>
  </div>
);
