import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { StarRatingProps } from '../types';

export const StarRating: React.FC<StarRatingProps> = ({ value, max = 5 }) => (
  <div className="flex gap-1">
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} className={cn('text-xs', i < value ? 'text-amber-400' : 'text-muted-foreground/30')}>
        <Icon
          name="star"
          size="size-3"
          className={cn(i < value ? 'text-amber-400' : 'text-muted-foreground/30')}
        />
      </span>
    ))}
  </div>
);
