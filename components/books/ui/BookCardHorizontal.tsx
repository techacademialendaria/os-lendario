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
        'group relative flex cursor-pointer items-center gap-6 rounded-2xl p-6 shadow-lg transition-all duration-500 hover:shadow-2xl overflow-hidden',
        backgroundClass,
        className
      )}
      onClick={onClick}
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      {/* Book Cover */}
      <div className="relative h-40 w-28 shrink-0 overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
      <div className="relative min-w-0 flex-1 space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 transition-colors duration-300 group-hover:text-primary/80">
          {book.category || 'Livro'}
        </p>
        <div>
          <h3 className="text-2xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-white">{book.title}</h3>
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
        {curator && <p className={cn('text-sm font-medium transition-colors duration-300', accentColor)}>{curator}</p>}
      </div>

      {/* Arrow indicator on hover */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <Icon name="chevron-right" className="text-white/40" size="size-6" />
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
