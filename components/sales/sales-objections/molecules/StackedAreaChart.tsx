import React from 'react';

export const StackedAreaChart: React.FC = () => {
  return (
    <div className="relative h-64 w-full">
      <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="h-full w-full">
        {/* Grid Lines */}
        <line
          x1="0"
          y1="75"
          x2="1000"
          y2="75"
          className="stroke-dasharray-4 stroke-border stroke-1"
        />
        <line
          x1="0"
          y1="150"
          x2="1000"
          y2="150"
          className="stroke-dasharray-4 stroke-border stroke-1"
        />
        <line
          x1="0"
          y1="225"
          x2="1000"
          y2="225"
          className="stroke-dasharray-4 stroke-border stroke-1"
        />

        {/* Layer 1: Competitor (Bottom) */}
        <path
          d="M0,300 Q250,280 500,290 T1000,300 L1000,300 L0,300 Z"
          className="fill-brand-blue opacity-20"
        />
        <path
          d="M0,300 Q250,280 500,290 T1000,300"
          className="fill-none stroke-brand-blue stroke-2"
        />

        {/* Layer 2: Timing (Middle) */}
        <path
          d="M0,300 Q250,200 500,220 T1000,250 L1000,300 L0,300 Z"
          className="fill-brand-orange opacity-20"
        />
        <path
          d="M0,300 Q250,200 500,220 T1000,250"
          className="fill-none stroke-brand-orange stroke-2"
        />

        {/* Layer 3: Price (Top) - Largest */}
        <path
          d="M0,300 Q250,100 500,150 T1000,100 L1000,300 L0,300 Z"
          className="fill-destructive opacity-10"
        />
        <path
          d="M0,300 Q250,100 500,150 T1000,100"
          className="fill-none stroke-destructive stroke-2"
        />
      </svg>

      {/* Axis Labels (X) */}
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>Semana 1</span>
        <span>Semana 2</span>
        <span>Semana 3</span>
        <span>Semana 4</span>
      </div>
    </div>
  );
};
