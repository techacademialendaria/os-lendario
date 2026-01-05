import React from 'react';
import { Badge } from '../../../ui/badge';
import { cn } from '../../../../lib/utils';
import { SENTIMENT_COLORS, type SentimentType } from '../types';

interface SentimentBadgeProps {
  sentiment: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const SentimentBadge: React.FC<SentimentBadgeProps> = ({
  sentiment,
  className,
  size = 'md',
}) => {
  const s = sentiment?.toLowerCase() as SentimentType;
  const colorClass = SENTIMENT_COLORS[s] || SENTIMENT_COLORS.default;

  const sizeClass = size === 'sm' ? 'text-[9px] px-2' : 'text-[10px] px-3';

  return (
    <Badge
      className={cn(
        'border-none rounded-full uppercase font-bold capitalize',
        colorClass,
        sizeClass,
        className
      )}
    >
      {sentiment}
    </Badge>
  );
};
