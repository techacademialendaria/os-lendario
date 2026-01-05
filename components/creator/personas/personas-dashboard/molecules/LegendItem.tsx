import React from 'react';
import { cn } from '@/lib/utils';
import type { LegendItemProps } from '../types';

export const LegendItem: React.FC<LegendItemProps> = ({ color, label, value }) => (
  <div className="flex items-center gap-3">
    <div className={cn('size-3 shrink-0 rounded-full', color)} />
    <div className="flex flex-col">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="text-xs text-muted-foreground">{value} das personas</span>
    </div>
  </div>
);
