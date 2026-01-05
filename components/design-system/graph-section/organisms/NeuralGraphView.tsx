import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { generateNetwork } from '../data';
import type { Link } from '../types';

export const NeuralGraphView: React.FC = () => {
  const [data] = useState(() => generateNetwork(40));
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Filter highlights
  const activeLinks = useMemo(() => {
    if (!hoveredNode) return [];
    return data.links.filter((l: Link) => l.source === hoveredNode || l.target === hoveredNode);
  }, [hoveredNode, data.links]);

  const activeNodes = useMemo(() => {
    if (!hoveredNode) return new Set<string>();

    const neighbors = new Set<string>();
    neighbors.add(hoveredNode);
    activeLinks.forEach((l: Link) => {
      neighbors.add(l.source);
      neighbors.add(l.target);
    });
    return neighbors;
  }, [hoveredNode, activeLinks]);

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-card">
      <div className="absolute left-4 top-4 z-10">
        <Badge variant="outline" className="bg-background/80 backdrop-blur">
          Neural Map
        </Badge>
      </div>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {/* Links */}
        {data.links.map((link, i) => {
          const source = data.nodes.find((n) => n.id === link.source);
          const target = data.nodes.find((n) => n.id === link.target);
          if (!source || !target) return null;

          const isActive = activeLinks.includes(link);
          const isDimmed = hoveredNode && !isActive;

          return (
            <line
              key={i}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="currentColor"
              strokeWidth={isActive ? 0.5 : 0.1}
              className={cn(
                'transition-all duration-300',
                isActive ? 'text-primary opacity-100' : 'text-muted-foreground',
                isDimmed ? 'opacity-10' : 'opacity-30'
              )}
            />
          );
        })}

        {/* Nodes */}
        {data.nodes.map((node) => {
          const isActive = hoveredNode === node.id || activeNodes.has(node.id);
          const isDimmed = hoveredNode && !isActive;

          return (
            <g
              key={node.id}
              className="cursor-pointer transition-opacity duration-300"
              style={{ opacity: isDimmed ? 0.1 : 1 }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.type === 'primary' ? 3 : isActive ? 2 : 1}
                className={cn(
                  'transition-all duration-300',
                  node.type === 'primary'
                    ? 'fill-primary'
                    : isActive
                      ? 'fill-foreground'
                      : 'fill-muted-foreground'
                )}
              />
              {/* Label only on hover or primary */}
              {(node.type === 'primary' || isActive) && (
                <text
                  x={node.x}
                  y={node.y - 4}
                  textAnchor="middle"
                  className={cn(
                    'fill-foreground font-sans text-[3px] font-bold transition-all',
                    node.type === 'primary' ? 'uppercase tracking-widest' : ''
                  )}
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
