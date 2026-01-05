import React from 'react';
import type { SentimentDataPoint, ChartDataPoint } from '../types';

interface SentimentChartProps {
  data: SentimentDataPoint[];
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  // Convert data to chart points (valor: -1 to 1 → y: 0 to 50)
  const points: ChartDataPoint[] = data.map((d, i) => ({
    x: data.length > 1 ? (i / (data.length - 1)) * 100 : 50,
    y: ((d.valor + 1) / 2) * 50,
    label: d.data,
  }));

  if (points.length === 0) {
    return (
      <div className="w-full h-40 flex items-center justify-center text-muted-foreground text-sm">
        Sem dados disponíveis
      </div>
    );
  }

  const pathD =
    points.length > 1
      ? `M ${points.map((p) => `${p.x} ${50 - p.y}`).join(' L ')}`
      : `M ${points[0].x} ${50 - points[0].y}`;

  const labels =
    points.length > 2
      ? [points[0], points[Math.floor(points.length / 2)], points[points.length - 1]]
      : points;

  return (
    <div className="w-full h-40 relative mt-4 group">
      <svg
        viewBox="0 0 100 50"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Grid Lines */}
        <line x1="0" y1="0" x2="100" y2="0" className="stroke-border" strokeWidth="0.2" strokeDasharray="2" />
        <line x1="0" y1="25" x2="100" y2="25" className="stroke-border" strokeWidth="0.2" strokeDasharray="2" />
        <line x1="0" y1="50" x2="100" y2="50" className="stroke-border" strokeWidth="0.2" />

        {/* Path */}
        <path d={pathD} fill="none" stroke="#EAB308" strokeWidth="1.5" className="drop-shadow-sm" />

        {/* Area Fill (Gradient) */}
        {points.length > 1 && (
          <path d={`${pathD} L 100 50 L 0 50 Z`} fill="url(#gradient-gold)" opacity="0.2" />
        )}

        <defs>
          <linearGradient id="gradient-gold" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={50 - p.y}
            r="2"
            fill="#EAB308"
            className="hover:r-3 transition-all cursor-pointer"
          />
        ))}
      </svg>
      <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-mono">
        {labels.map((p, i) => (
          <span key={i}>{p.label}</span>
        ))}
      </div>
    </div>
  );
};
