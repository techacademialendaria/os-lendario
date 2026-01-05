import React from 'react';
import { cn } from '@/lib/utils';
import type { ToneBarProps } from '../types';

/**
 * ToneBar - Visual indicator for tone/voice metrics
 *
 * Displays a scale bar with a marker indicating the current position
 * between two extremes (left and right labels).
 */
export const ToneBar: React.FC<ToneBarProps> = ({
  label,
  value,
  leftLabel,
  rightLabel,
  color = 'studio-primary',
}) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-500">
      <span>{leftLabel}</span>
      <span className="text-white">{label}</span>
      <span>{rightLabel}</span>
    </div>
    <div className="relative h-2 overflow-hidden rounded-full bg-zinc-800">
      <div
        className={cn(
          'absolute bottom-0 top-0 h-full w-2 rounded-full shadow-[0_0_10px_currentColor]',
          color === 'red' ? 'bg-red-500 text-red-500' : 'bg-studio-primary text-white'
        )}
        style={{ left: `${value}%` }}
      />
      <div
        className={cn(
          'h-full w-full bg-gradient-to-r from-transparent to-transparent opacity-50',
          color === 'red' ? 'via-red-500/20' : 'via-studio-primary/20'
        )}
        style={{ transform: `translateX(${value - 50}%)` }}
      />
    </div>
  </div>
);
