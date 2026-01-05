import React from 'react';
import type { ToneSliderProps } from '../types';

export const ToneSlider: React.FC<ToneSliderProps> = ({ left, right, value, description }) => (
  <div className="space-y-2">
    <div className="flex justify-between font-sans text-sm font-semibold">
      <span>{left}</span>
      <span>{right}</span>
    </div>
    <div className="relative h-2 overflow-hidden rounded-full bg-muted">
      <div
        className="absolute bottom-0 top-0 -mt-0.5 h-3 w-3 -translate-x-1/2 transform rounded-full bg-primary shadow-md"
        style={{ left: `${(value / 10) * 100}%` }}
      />
      <div
        className="absolute bottom-0 left-0 top-0 bg-primary/20"
        style={{ width: `${(value / 10) * 100}%` }}
      />
    </div>
    <p className="text-center font-sans text-xs font-medium italic text-muted-foreground">
      {description}
    </p>
  </div>
);
