/**
 * AudiobooksSection - Books with audiobook versions
 */

import React from 'react';
import { Icon } from '@/components/ui/icon';
import BookCard from '../../ui/BookCard';
import type { BookData, ReadingStatus } from '../types';

interface AudiobooksSectionProps {
  books: BookData[];
  localFavorites: Set<string>;
  readingStatusMap: Map<string, ReadingStatus>;
  onBookClick: (book: BookData) => void;
  onToggleFavorite: (book: BookData) => void;
}

export const AudiobooksSection: React.FC<AudiobooksSectionProps> = ({
  books,
  localFavorites,
  readingStatusMap,
  onBookClick,
  onToggleFavorite,
}) => {
  if (books.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon name="headset" size="size-4" />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">Audio</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Com Audiobook</h2>
          </div>
        </div>
        <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
      </div>

      <div className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:-mx-0 md:gap-8 md:px-0 md:pb-8">
        {books.map((book) => (
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
