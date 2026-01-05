/**
 * PopularBooksSection - Carousel of popular books
 */

import React from 'react';
import BookCard from '../../ui/BookCard';
import { BookCardSkeleton } from '../../ui/BookSkeletons';
import type { BookData, ReadingStatus } from '../types';

interface PopularBooksSectionProps {
  books: BookData[];
  localFavorites: Set<string>;
  readingStatusMap: Map<string, ReadingStatus>;
  onBookClick: (book: BookData) => void;
  onToggleFavorite: (book: BookData) => void;
  isLoading: boolean;
}

export const PopularBooksSection: React.FC<PopularBooksSectionProps> = ({
  books,
  localFavorites,
  readingStatusMap,
  onBookClick,
  onToggleFavorite,
  isLoading,
}) => {
  if (books.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-6">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">Tendencias</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Mais Populares</h2>
        </div>
        <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
      </div>

      <div className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:-mx-0 md:gap-8 md:px-0 md:pb-8">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="min-w-[200px] shrink-0 snap-start md:min-w-[260px]">
                <BookCardSkeleton variant="grid" />
              </div>
            ))
          : books.map((book) => (
              <div key={book.id} className="min-w-[200px] shrink-0 snap-start md:min-w-[260px]">
                <BookCard
                  book={book}
                  onClick={() => onBookClick(book)}
                  isBookmarked={localFavorites.has(book.id)}
                  readingStatus={readingStatusMap.get(book.id)}
                  onBookmark={onToggleFavorite}
                />
              </div>
            ))}
      </div>
    </section>
  );
};
