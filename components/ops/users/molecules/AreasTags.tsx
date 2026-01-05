import React from 'react';
import type { AreaType } from '../types';
import { AREA_CONFIG } from '../types';

interface AreasTagsProps {
  areas: AreaType[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'px-1 py-0.5 text-[9px]',
  md: 'px-1.5 py-0.5 text-[10px]',
  lg: 'px-2 py-1 text-xs',
};

export const AreasTags: React.FC<AreasTagsProps> = ({
  areas,
  maxVisible = 3,
  size = 'md',
  className,
}) => {
  if (!areas || areas.length === 0) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  const visibleAreas = areas.slice(0, maxVisible);
  const hiddenCount = areas.length - maxVisible;
  const sizeClass = sizeStyles[size];

  return (
    <div className={`flex flex-wrap gap-1 ${className || ''}`}>
      {visibleAreas.map((area) => {
        const config = AREA_CONFIG[area];
        return (
          <span
            key={area}
            className={`inline-flex items-center rounded font-medium ${sizeClass} ${config.color}`}
          >
            {config.label}
          </span>
        );
      })}
      {hiddenCount > 0 && (
        <span className={`inline-flex items-center rounded bg-muted font-medium text-muted-foreground ${sizeClass}`}>
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};
