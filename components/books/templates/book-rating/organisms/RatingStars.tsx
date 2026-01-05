import React from 'react';
import { Icon } from '../../../../ui/icon';
import { cn } from '../../../../../lib/utils';
import { RATING_LABELS } from '../types';

interface RatingStarsProps {
  selectedRating: number | null;
  hoveredRating: number | null;
  onSelect: (value: number) => void;
  onHover: (value: number | null) => void;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  selectedRating,
  hoveredRating,
  onSelect,
  onHover,
}) => {
  const displayRating = hoveredRating ?? selectedRating;

  return (
    <div className="space-y-4">
      <h2 className="text-center text-xl font-semibold text-foreground">
        Como voce avalia?
      </h2>

      <div className="flex justify-center gap-4">
        {RATING_LABELS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className="group flex flex-col items-center gap-2"
            onMouseEnter={() => onHover(value)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(value)}
          >
            <Icon
              name={displayRating && displayRating >= value ? 'star-solid' : 'star'}
              size="size-12"
              className={cn(
                'transition-all',
                displayRating && displayRating >= value
                  ? 'text-blue-500'
                  : 'text-blue-200 hover:text-blue-300 dark:text-blue-800 dark:hover:text-blue-600'
              )}
            />
            <span
              className={cn(
                'text-sm transition-colors',
                displayRating === value
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingStars;
