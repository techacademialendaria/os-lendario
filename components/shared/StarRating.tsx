import React, { useState } from 'react';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';

export interface StarRatingProps {
  /** Current rating value (0-5) */
  value?: number;
  /** Called when user clicks a star (interactive mode only) */
  onChange?: (rating: number) => void;
  /** Whether the rating is interactive (clickable) or display-only */
  interactive?: boolean;
  /** Size of the stars */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the component is in a loading/disabled state */
  disabled?: boolean;
  /** Optional label to show before stars */
  label?: string;
  /** Additional className for the container */
  className?: string;
}

const sizeClasses = {
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-5',
};

/**
 * StarRating - Reusable star rating component
 *
 * @example
 * // Display-only
 * <StarRating value={4.5} />
 *
 * @example
 * // Interactive
 * <StarRating value={rating} onChange={setRating} interactive />
 *
 * @example
 * // With label
 * <StarRating value={rating} onChange={handleRate} interactive label="Avalie:" />
 */
export function StarRating({
  value = 0,
  onChange,
  interactive = false,
  size = 'md',
  disabled = false,
  label,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (star: number) => {
    if (interactive && onChange && !disabled) {
      onChange(star);
    }
  };

  const displayValue = interactive ? (hoverRating || value) : value;

  // Display-only mode
  if (!interactive) {
    return (
      <div className={cn('flex items-center gap-0.5', className)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="star"
            size={sizeClasses[size]}
            className={cn(
              'transition-colors',
              displayValue >= star ? 'text-yellow-500' : 'text-muted-foreground/30'
            )}
          />
        ))}
      </div>
    );
  }

  // Interactive mode
  return (
    <div
      className={cn('flex items-center gap-1', className)}
      onMouseLeave={() => setHoverRating(0)}
    >
      {label && (
        <span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      )}
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => !disabled && setHoverRating(star)}
          disabled={disabled}
          className={cn(
            'transition-transform focus:outline-none',
            !disabled && 'hover:scale-110',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <Icon
            name="star"
            size={sizeClasses[size]}
            className={cn(
              'transition-colors',
              displayValue >= star ? 'text-yellow-500' : 'text-muted-foreground/50'
            )}
          />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
