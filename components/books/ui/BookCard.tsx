import React from 'react';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import { getSimpleGradient } from '../../shared/MediaCover';
import type { BookData } from '../../../hooks/useBooks';

interface BookCardProps {
  book: BookData;
  onClick?: () => void;
  onBookmark?: (book: BookData) => void;
  isBookmarked?: boolean;
  variant?: 'grid' | 'horizontal' | 'compact';
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onClick,
  onBookmark,
  isBookmarked = false,
  variant = 'grid',
  className,
}) => {
  // Fallback gradient from shared MediaCover
  const fallbackGradient = getSimpleGradient(book.slug);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.(book);
  };

  if (variant === 'horizontal') {
    return (
      <div
        className={cn(
          'group flex cursor-pointer gap-4 rounded-xl border border-border/50 bg-card p-4 transition-colors hover:border-brand-gold/30',
          className
        )}
        onClick={onClick}
      >
        {/* Cover */}
        <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg shadow-md">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover" />
          ) : (
            <div
              className={cn(
                'flex h-full w-full items-center justify-center bg-gradient-to-br',
                fallbackGradient
              )}
            >
              <Icon name="book" className="text-white/50" size="size-6" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          {book.category && (
            <Badge variant="secondary" className="mb-2 text-[10px]">
              {book.category}
            </Badge>
          )}
          <h4 className="truncate text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-brand-gold">
            {book.title}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">Por {book.author}</p>
          <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
            {book.hasAudio && (
              <span className="flex items-center gap-1">
                <Icon name="headset" size="size-3" /> Audio
              </span>
            )}
            {book.duration && (
              <span className="flex items-center gap-1">
                <Icon name="clock" size="size-3" /> {book.duration}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('group relative cursor-pointer', className)} onClick={onClick}>
        <div
          className={cn(
            'relative aspect-[2/3] overflow-hidden rounded-md shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl'
          )}
        >
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover" />
          ) : (
            <div className={cn('h-full w-full bg-gradient-to-br', fallbackGradient)}>
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-white/20"></div>
              <div className="relative z-10 flex h-full flex-col justify-between bg-gradient-to-b from-transparent to-black/60 p-3">
                <div className="text-right">
                  <Icon name="book" className="text-white/30" size="size-4" />
                </div>
                <div>
                  <h4 className="mb-1 line-clamp-3 font-serif text-sm font-bold leading-tight text-white drop-shadow-md">
                    {book.title}
                  </h4>
                  <p className="truncate font-sans text-[9px] uppercase tracking-wider text-white/80">
                    {book.author}
                  </p>
                </div>
              </div>
            </div>
          )}
          {book.coverUrl && (
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <div>
                <h4 className="line-clamp-2 text-sm font-bold leading-tight text-white">
                  {book.title}
                </h4>
                <p className="text-[10px] text-white/80">{book.author}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: grid variant
  return (
    <div
      className={cn(
        'group cursor-pointer rounded-xl border border-border/50 bg-card p-4 transition-colors hover:border-brand-gold/30',
        className
      )}
      onClick={onClick}
    >
      <div className="mb-4 flex items-start justify-between">
        {book.hasAudio && (
          <div className="rounded-full bg-muted/50 p-1.5 text-muted-foreground">
            <Icon name="headset" size="size-3" />
          </div>
        )}
        {book.rating && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="star" type="solid" className="text-brand-gold" size="size-3" />
            {book.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Cover */}
      <div className="relative mb-6 flex justify-center">
        <div className="relative z-10 h-48 w-32 overflow-hidden rounded shadow-xl transition-transform duration-300 group-hover:-translate-y-2">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover" />
          ) : (
            <div
              className={cn(
                'flex h-full w-full items-center justify-center bg-gradient-to-br',
                fallbackGradient
              )}
            >
              <div className="p-2 text-center text-white">
                <Icon name="book" className="mx-auto mb-2 text-white/50" size="size-6" />
                <span className="line-clamp-3 font-serif text-xs">{book.title}</span>
              </div>
            </div>
          )}
        </div>
        {/* Shadow for depth */}
        <div className="absolute bottom-0 h-4 w-28 rounded-full bg-black/20 blur-lg transition-all duration-300 group-hover:w-24 group-hover:opacity-50"></div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {book.category || 'Livro'}
        </p>
        <h4 className="truncate text-base font-bold leading-tight text-foreground">{book.title}</h4>
        <p className="truncate font-serif text-xs text-muted-foreground">Por {book.author}</p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between">
        {book.duration && (
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Icon name="clock" size="size-3" /> {book.duration}
          </span>
        )}
        <button
          onClick={handleBookmark}
          className="ml-auto rounded p-1 transition-colors hover:bg-muted"
          aria-label={isBookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Icon
            name="star"
            type={isBookmarked ? 'solid' : 'regular'}
            className={cn(
              'transition-colors',
              isBookmarked ? 'text-brand-gold' : 'text-muted-foreground hover:text-brand-gold'
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
