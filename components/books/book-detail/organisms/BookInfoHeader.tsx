import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Skeleton } from '@/components/ui/skeleton';

interface BookInfoHeaderProps {
  book: {
    title: string;
    author: string;
    authorSlug?: string | null;
    rating?: number | null;
  } | null;
  loading: boolean;
  onAuthorClick: () => void;
}

export const BookInfoHeader: React.FC<BookInfoHeaderProps> = ({ book, loading, onAuthorClick }) => {
  if (loading) {
    return (
      <div className="space-y-4 text-center md:text-left">
        <Skeleton className="mx-auto h-12 w-3/4 md:mx-0" />
        <Skeleton className="mx-auto h-6 w-48 md:mx-0" />
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="space-y-4 text-center md:text-left">
      <h1 className="font-serif text-4xl font-bold leading-[0.95] tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {book.title}
      </h1>
      <button
        className="font-serif text-xl italic text-muted-foreground transition-colors duration-300 hover:text-foreground"
        onClick={onAuthorClick}
      >
        por {book.author}
      </button>

      {/* Rating Display */}
      {book.rating && (
        <div className="flex items-center justify-center gap-4 pt-4 md:justify-start">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name={star <= Math.round(book.rating || 0) ? 'star-solid' : 'star'}
                size="size-6"
                className={star <= Math.round(book.rating || 0) ? 'text-primary' : 'text-muted-foreground/20'}
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-foreground">{book.rating.toFixed(1)}</span>
        </div>
      )}
    </div>
  );
};
