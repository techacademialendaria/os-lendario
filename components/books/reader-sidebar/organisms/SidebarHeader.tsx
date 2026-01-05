import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SidebarHeaderProps } from '../types';

/**
 * SidebarHeader - Book info header with cover, title, author and actions
 */
export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  book,
  fallbackGradient,
  interactions,
  interactionsLoading,
  isTogglingFavorite,
  onToggleFavorite,
  onClose,
}) => {
  return (
    <div className="relative shrink-0 border-b border-border bg-muted/10 p-4 pt-0 md:pt-4">
      {/* Top Actions */}
      <div className="absolute right-3 top-0 flex items-center gap-1 md:top-3">
        <button
          onClick={onToggleFavorite}
          disabled={isTogglingFavorite || interactionsLoading}
          className="p-2 disabled:opacity-50"
          title={interactions?.isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Icon
            name={interactions?.isFavorite ? 'star-solid' : 'star'}
            size="size-4"
            className={cn(
              'transition-colors',
              isTogglingFavorite && 'animate-pulse',
              interactions?.isFavorite
                ? 'text-brand-gold'
                : 'text-muted-foreground/50 hover:text-brand-gold'
            )}
          />
        </button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <Icon name="arrow-right" size="size-4" />
        </Button>
      </div>

      {/* Book Info */}
      <div className="mb-3 flex items-start gap-3 pr-20">
        <div className="h-18 w-12 shrink-0 overflow-hidden rounded border border-border shadow-md">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt="Cover" loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div
              className={cn(
                'flex h-full w-full items-center justify-center bg-gradient-to-br',
                fallbackGradient
              )}
            >
              <Icon name="book-open-cover" className="text-white/50" size="size-4" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h2 className="mb-0.5 font-serif text-sm font-bold leading-tight">
            {book.title}
          </h2>
          <p className="text-xs text-muted-foreground">{book.author}</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
