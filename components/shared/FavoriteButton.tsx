import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';

export interface FavoriteButtonProps {
  /** Whether the item is currently favorited */
  isFavorite: boolean;
  /** Called when the button is clicked */
  onToggle: () => void;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button variant: icon-only or with label */
  variant?: 'icon' | 'labeled';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

/**
 * FavoriteButton - Reusable heart toggle button
 *
 * @example
 * // Icon-only
 * <FavoriteButton isFavorite={isFav} onToggle={handleToggle} />
 *
 * @example
 * // With label
 * <FavoriteButton isFavorite={isFav} onToggle={handleToggle} variant="labeled" />
 *
 * @example
 * // With loading state
 * <FavoriteButton isFavorite={isFav} onToggle={handleToggle} isLoading={isLoading} />
 */
export function FavoriteButton({
  isFavorite,
  onToggle,
  isLoading = false,
  disabled = false,
  variant = 'icon',
  size = 'md',
  className,
}: FavoriteButtonProps) {
  const isDisabled = disabled || isLoading;

  const sizeClasses = {
    sm: 'size-3',
    md: 'size-4',
    lg: 'size-5',
  };

  const buttonSizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-10 w-10',
  };

  // Icon-only variant
  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        disabled={isDisabled}
        className={cn(
          'transition-colors',
          buttonSizeClasses[size],
          isFavorite && 'text-red-500 hover:text-red-600',
          !isFavorite && 'text-muted-foreground hover:text-red-400',
          className
        )}
      >
        <Icon
          name="heart"
          type={isFavorite ? 'solid' : 'regular'}
          size={sizeClasses[size]}
          className={cn(isLoading && 'animate-pulse')}
        />
      </Button>
    );
  }

  // Labeled variant
  return (
    <Button
      variant="ghost"
      onClick={onToggle}
      disabled={isDisabled}
      className={cn(
        'gap-2 transition-colors hover:bg-red-500/10',
        isFavorite ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-400',
        className
      )}
    >
      <Icon
        name="heart"
        type={isFavorite ? 'solid' : 'regular'}
        size={sizeClasses[size]}
        className={cn(isLoading && 'animate-pulse')}
      />
      {isFavorite ? 'Favorito' : 'Favoritar'}
    </Button>
  );
}

export default FavoriteButton;
