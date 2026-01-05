import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { generateNetwork } from '../data';

export const ObsidianGraphView: React.FC = () => {
  const [data] = useState(() => generateNetwork(25));

  // Auto-drift animation simulation (very simplified)
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] text-white shadow-inner">
      <div className="absolute left-4 top-4 z-10">
        <Badge
          variant="outline"
          className="border-brand-indigo/50 bg-brand-indigo/5 text-brand-indigo"
        >
          Digital Brain
        </Badge>
      </div>

      <svg className="h-full w-full" viewBox="0 0 100 100">
        {/* Background Grid */}
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.05" opacity="0.1" />
        </pattern>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Dynamic Links */}
        {data.links.map((link, i) => {
          const source = data.nodes.find((n) => n.id === link.source);
          const target = data.nodes.find((n) => n.id === link.target);
          if (!source || !target) return null;

          return (
            <line
              key={i}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              className="stroke-brand-indigo"
              strokeWidth="0.15"
              strokeOpacity="0.4"
            />
          );
        })}

        {/* Nodes with Glow */}
        {data.nodes.map((node, i) => (
          <g
            key={node.id}
            transform={`translate(${Math.sin((offset + i * 10) * 0.05) * 0.5}, ${Math.cos((offset + i * 10) * 0.05) * 0.5})`}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'primary' ? 2 : 1}
              className={cn(
                'fill-brand-indigo',
                node.type === 'primary' ? 'fill-brand-indigo' : 'fill-white'
              )}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'primary' ? 4 : 2}
              className="animate-pulse fill-brand-indigo opacity-20"
            />
            {node.type === 'primary' && (
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="fill-white font-mono text-[3px] opacity-80"
              >
                {node.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
