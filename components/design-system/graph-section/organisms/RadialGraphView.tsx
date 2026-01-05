import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { generateRadialTree } from '../data';

export const RadialGraphView: React.FC = () => {
  const [data] = useState(() => generateRadialTree());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-card">
      <div className="absolute left-4 top-4 z-10">
        <Badge variant="outline" className="bg-background/80 backdrop-blur">
          Radial Taxonomy
        </Badge>
      </div>

      <svg className="h-full w-full" viewBox="0 0 100 100">
        {/* Concentric Guides */}
        <circle
          cx="50"
          cy="50"
          r="20"
          className="stroke-dasharray-1 fill-none stroke-border stroke-[0.2]"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          className="stroke-dasharray-1 fill-none stroke-border stroke-[0.2]"
        />

        {/* Links */}
        {data.links.map((link, i) => {
          const source = data.nodes.find((n) => n.id === link.source);
          const target = data.nodes.find((n) => n.id === link.target);
          if (!source || !target) return null;

          return (
            <path
              key={i}
              d={`M${source.x},${source.y} L${target.x},${target.y}`}
              className="fill-none stroke-muted-foreground/30 stroke-[0.3]"
            />
          );
        })}

        {/* Nodes */}
        {data.nodes.map((node) => {
          let colorClass = 'fill-muted-foreground';
          if (node.type === 'primary') colorClass = 'fill-primary';
          if (node.type === 'secondary') {
            // Color based on index roughly
            const idx = parseInt(node.id.split('-')[1]) || 0;
            const colors = [
              'fill-brand-blue',
              'fill-brand-green',
              'fill-brand-red',
              'fill-brand-yellow',
            ];
            colorClass = colors[idx % colors.length];
          }

          const isHovered = hoveredNode === node.id;

          return (
            <g
              key={node.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.type === 'primary' ? 6 : node.type === 'secondary' ? 3 : 1.5}
                className={cn(
                  'stroke-background stroke-2 transition-all duration-300',
                  colorClass,
                  isHovered ? 'scale-125' : 'scale-100'
                )}
              />
              {/* Text Background for readability */}
              <text
                x={node.x}
                y={node.y + (node.type === 'primary' ? 1.5 : 5)}
                textAnchor="middle"
                className="stroke-background stroke-[0.5] font-sans text-[2.5px] font-bold opacity-80"
              >
                {node.label}
              </text>
              {/* Actual Text */}
              <text
                x={node.x}
                y={node.y + (node.type === 'primary' ? 1.5 : 5)}
                textAnchor="middle"
                className={cn(
                  'pointer-events-none fill-foreground font-sans text-[2.5px] font-bold',
                  node.type === 'primary' ? 'text-[3px]' : ''
                )}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
