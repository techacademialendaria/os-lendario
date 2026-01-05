import React, { useState } from 'react';
import { cn } from '../../../../lib/utils';
import { OPS_PRIMARY, OPS_ACCENT } from '../../ops-tokens';
import { AXIS_EXAMPLES } from '../../data/tool-content';

interface AxisVisualProps {
  axis: typeof AXIS_EXAMPLES.axes[0];
}

export const AxisVisual: React.FC<AxisVisualProps> = ({ axis }) => {
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  return (
    <div className="space-y-12 py-10 px-4 relative">
      {/* Axis Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8">
        <div>
          <h4 className="font-bold text-base tracking-tight" style={{ color: OPS_ACCENT }}>
            {axis.name}
          </h4>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-70">
            {axis.description}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="block text-[9px] font-bold text-muted-foreground/50 uppercase">Min</span>
            <span className="text-xs font-medium text-muted-foreground">{axis.low.label}</span>
          </div>
          <div className="h-8 w-px bg-border/20" />
          <div>
            <span className="block text-[9px] font-bold text-muted-foreground/50 uppercase">Max</span>
            <span className="text-xs font-medium text-muted-foreground">{axis.high.label}</span>
          </div>
        </div>
      </div>

      {/* The Instrument Track */}
      <div className="relative h-20 flex items-center">
        {/* Background Track with Gradient and Glow */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-muted/20 border border-white/5 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 blur-sm"
            style={{ background: `linear-gradient(to right, ${OPS_PRIMARY}, ${OPS_ACCENT})` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${OPS_PRIMARY}, ${OPS_ACCENT})` }}
          />
        </div>

        {/* Ticks */}
        <div className="absolute inset-x-0 flex justify-between px-0.5 pointer-events-none">
          {[...Array(11)].map((_, i) => (
            <div key={i} className={cn(
              "w-px bg-foreground/10 transition-all duration-500",
              i % 5 === 0 ? "h-4" : "h-2",
              i === 0 || i === 10 ? "opacity-40" : "opacity-20"
            )} />
          ))}
        </div>

        {/* Tools Dots and Labels */}
        {axis.tools.map((tool, j) => {
          const position = ((tool.score - 1) / 9) * 100;
          const isStaggered = j % 2 === 0;
          const isHovered = hoveredTool === j;

          return (
            <div
              key={j}
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
              style={{ left: `${position}%`, zIndex: isHovered ? 50 : 10 }}
              onMouseEnter={() => setHoveredTool(j)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              {/* Vertical Guide */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-px transition-all duration-500",
                  isStaggered ? "bottom-2 h-8" : "top-2 h-8",
                  isHovered ? "bg-primary opacity-100" : "bg-foreground/10 opacity-30"
                )}
              />

              {/* Dot */}
              <div
                className={cn(
                  "relative w-3 h-3 rounded-full border-2 border-background transition-all duration-300 cursor-pointer shadow-lg",
                  isHovered ? "scale-150 ring-4 ring-primary/20" : "hover:scale-125"
                )}
                style={{ backgroundColor: isHovered ? OPS_PRIMARY : OPS_ACCENT }}
              />

              {/* Label */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none",
                  isStaggered ? "bottom-12" : "top-12",
                  isHovered ? "opacity-100 scale-105" : "opacity-70 scale-100"
                )}
              >
                <span className={cn(
                  "text-[9px] font-bold px-2 py-0.5 rounded border transition-colors",
                  isHovered
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/30 text-muted-foreground border-white/5"
                )}>
                  {tool.name}
                </span>
              </div>

              {/* Tooltip (Rationale) */}
              {isHovered && (
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-48 p-2 rounded-lg bg-card border border-border shadow-2xl z-50 animate-in zoom-in-95 duration-200",
                    isStaggered ? "bottom-20" : "top-20"
                  )}
                >
                  <p className="text-[10px] text-foreground font-medium leading-tight">
                    {tool.reason}
                  </p>
                  <div className="mt-1.5 pt-1.5 border-t border-border/40 text-[8px] text-muted-foreground italic">
                    Score: {tool.score}/10
                  </div>
                  {/* Tooltip Arrow */}
                  <div
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-card border-border border-r border-b",
                      isStaggered ? "top-full -mt-1" : "bottom-full -mb-1 rotate-[-135deg]"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Axis Footer Desc */}
      <div className="flex justify-between items-start gap-10 pt-4 border-t border-border/10">
        <div className="max-w-[200px]">
          <span className="block text-[8px] font-bold text-muted-foreground/30 uppercase mb-1">Low Range</span>
          <p className="text-[10px] text-muted-foreground/60 leading-tight italic">{axis.low.desc}</p>
        </div>
        <div className="max-w-[200px] text-right">
          <span className="block text-[8px] font-bold text-muted-foreground/30 uppercase mb-1">High Range</span>
          <p className="text-[10px] text-muted-foreground/60 leading-tight italic">{axis.high.desc}</p>
        </div>
      </div>
    </div>
  );
};
