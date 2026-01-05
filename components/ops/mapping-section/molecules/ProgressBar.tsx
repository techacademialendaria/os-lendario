import React from 'react';
import { OPS_ACCENT } from '../../ops-tokens';
import type { ProgressBarProps } from '../types';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = OPS_ACCENT,
  label
}) => (
  <div className="flex items-center gap-3">
    <div className="flex-1 h-2.5 bg-muted/30 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
      />
    </div>
    {label && <span className="text-xs text-muted-foreground w-12 text-right font-mono">{label}</span>}
  </div>
);
