import React from 'react';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import { getSimpleGradient } from '../../shared/MediaCover';
import type { BookData } from '../../../hooks/useBooks';
import type { ReadingStatus } from '../../../hooks/useMyBooks';

interface BookCardProps {
  book: BookData;
  onClick?: () => void;
  onBookmark?: (book: BookData) => void;
  isBookmarked?: boolean;
  readingStatus?: ReadingStatus;
  className?: string;
}

/**
 * BookCard - Luxury grid card for displaying books
 *
 * Features:
 * - Prestige aura glow on hover
 * - Book levitation effect
 * - Reading status badge
 * - Bookmark/favorite action
 *
 * For horizontal layouts, use BookCardHorizontal instead.
 */
const BookCard: React.FC<BookCardProps> = ({
  book,
  onClick,
  onBookmark,
  isBookmarked = false,
  readingStatus = 'none',
  className,
}) => {
  const fallbackGradient = getSimpleGradient(book.slug);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.(book);
  };

  // Reading status badge config
  const statusBadge = {
    read: { label: 'LIDO', icon: 'check' as const, className: 'bg-green-500/20 text-green-400 border-green-500/30' },
    reading: { label: 'LENDO', icon: 'book-open-cover' as const, className: 'bg-primary/20 text-primary border-primary/30' },
    want_to_read: null,
    none: null,
  }[readingStatus];

  return (
    <div
      className={cn(
        'group relative cursor-pointer rounded-2xl border border-border bg-card/60 p-4 transition-all duration-500',
        'hover:border-border/80 hover:bg-card/80',
        'active:scale-[0.98]',
        className
      )}
      onClick={onClick}
    >
      {/* Top bar: Status badge + Favorite */}
      <div className="mb-4 flex items-start justify-between">
        {statusBadge ? (
          <Badge className={cn('flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.15em] border', statusBadge.className)}>
            <Icon name={statusBadge.icon} size="size-3" />
            <span className="hidden sm:inline">{statusBadge.label}</span>
          </Badge>
        ) : (
          <div />
        )}
        <button
          onClick={handleBookmark}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/5 sm:h-8 sm:w-8"
          aria-label={isBookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Icon
            name={isBookmarked ? 'star-solid' : 'star'}
            size="size-4"
            className={cn(
              'transition-colors duration-300',
              isBookmarked ? 'text-primary' : 'text-muted-foreground/50 group-hover:text-muted-foreground'
            )}
          />
        </button>
      </div>

      {/* Cover with Aura & Levitation */}
      <div className="relative mb-6 flex justify-center">
        {/* Prestige Aura - glows on hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-24 bg-primary/0 group-hover:bg-primary/20 rounded-full blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-100 sm:h-40 sm:w-32" />
        </div>

        {/* Book Cover - levitates on hover */}
        <div className="relative z-10 h-36 w-24 overflow-hidden rounded-lg shadow-xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.6)] sm:h-44 sm:w-28 md:h-52 md:w-36">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div className={cn('flex h-full w-full items-center justify-center bg-gradient-to-br', fallbackGradient)}>
              <div className="p-2 text-center text-white">
                <Icon name="book" className="mx-auto mb-2 text-white/50" size="size-5" />
                <span className="line-clamp-2 font-serif text-xs">{book.title}</span>
              </div>
            </div>
          )}
          {/* Subtle spine effect */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/20 via-white/10 to-white/5" />
        </div>

        {/* Shadow that softens on hover */}
        <div className="absolute bottom-0 h-4 w-24 rounded-full bg-black/30 blur-lg transition-all duration-500 group-hover:w-20 group-hover:opacity-40 sm:w-28" />
      </div>

      {/* Info - Luxury Typography */}
      <div className="space-y-1.5 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground">
          {book.category || 'Livro'}
        </p>
        <h4 className="line-clamp-2 text-sm font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary md:text-base">
          {book.title}
        </h4>
        <p className="truncate font-serif text-xs italic text-muted-foreground">
          {book.author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
