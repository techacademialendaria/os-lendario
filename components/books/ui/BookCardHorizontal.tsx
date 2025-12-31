import React from 'react';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { getSimpleGradient } from '../../shared/MediaCover';
import type { BookData } from '../../../hooks/useBooks';

interface BookCardHorizontalProps {
  book: BookData;
  onClick?: () => void;
  /** Background color class (e.g., 'bg-[#2D2436]') */
  bgColor?: string;
  /** Accent color class for progress icons (e.g., 'text-purple-400') */
  accentColor?: string;
  /** Progress value 0-100 */
  progress?: number;
  /** Curator/recommender name */
  curator?: string;
  className?: string;
}

const BookCardHorizontal: React.FC<BookCardHorizontalProps> = ({
  book,
  onClick,
  bgColor,
  accentColor = 'text-brand-gold',
  progress = 0,
  curator,
  className,
}) => {
  // Calculate filled circles (0-4 based on progress)
  const filledCircles = Math.round((progress / 100) * 4);
  const fallbackGradient = getSimpleGradient(book.slug);

  // Generate background color from book slug if not provided
  const backgroundClass = bgColor || generateBgFromSlug(book.slug);

  return (
    <div
      className={cn(
        'group flex cursor-pointer items-center gap-6 rounded-2xl p-6 shadow-lg transition-transform hover:scale-[1.01]',
        backgroundClass,
        className
      )}
      onClick={onClick}
    >
      {/* Book Cover */}
      <div className="relative h-40 w-28 shrink-0 overflow-hidden rounded-lg shadow-2xl">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover" />
        ) : (
          <div
            className={cn(
              'flex h-full w-full items-center justify-center bg-gradient-to-br',
              fallbackGradient
            )}
          >
            <Icon name="book" className="text-white/50" size="size-8" />
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="min-w-0 flex-1 space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          {book.category || 'Livro'}
        </p>
        <div>
          <h3 className="text-2xl font-bold leading-tight text-white">{book.title}</h3>
          <p className="mt-1 font-serif text-sm text-zinc-400">Por {book.author}</p>
        </div>

        {/* Progress Indicators */}
        {progress > 0 && (
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((i) => (
              <Icon
                key={i}
                name="check-circle"
                type="solid"
                className={cn('text-lg', i < filledCircles ? accentColor : 'text-muted-foreground/30')}
              />
            ))}
          </div>
        )}

        {/* Curator */}
        {curator && <p className={cn('text-sm font-medium', accentColor)}>{curator}</p>}
      </div>
    </div>
  );
};

// Generate a background color based on slug hash
function generateBgFromSlug(slug: string): string {
  const colors = [
    'bg-[#2D2436]', // Dark purple
    'bg-[#1F1A18]', // Dark brown
    'bg-[#1A2436]', // Dark blue
    'bg-[#1F2418]', // Dark green
    'bg-[#241A1A]', // Dark red
    'bg-[#18241F]', // Dark teal
  ];
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export default BookCardHorizontal;
