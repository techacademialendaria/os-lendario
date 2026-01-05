import React from 'react';
import { cn } from '@/lib/utils';
import type { SparklineProps } from '../types';

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = 'stroke-primary',
}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" className="h-6 w-16 overflow-visible" preserveAspectRatio="none">
      <polyline
        fill="none"
        strokeWidth="3"
        points={points}
        className={cn(color, 'vector-effect-non-scaling-stroke')}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
