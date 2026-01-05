/**
 * RecentBooksSection - Horizontal book cards for recent releases
 */

import React from 'react';
import BookCardHorizontal from '../../ui/BookCardHorizontal';
import type { BookData } from '../types';

interface RecentBooksSectionProps {
  books: BookData[];
  onBookClick: (book: BookData) => void;
  isLoading: boolean;
}

export const RecentBooksSection: React.FC<RecentBooksSectionProps> = ({
  books,
  onBookClick,
  isLoading,
}) => {
  if (books.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-6">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Novidades</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Lancamentos</h2>
        </div>
        <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {isLoading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-[2rem] bg-muted/50 md:h-56"></div>
            ))
          : books.map((book, index) => (
              <BookCardHorizontal
                key={book.id}
                book={book}
                onClick={() => onBookClick(book)}
                curator={book.author}
                accentColor={index === 0 ? 'text-purple-400' : 'text-orange-400'}
              />
            ))}
      </div>
    </section>
  );
};
