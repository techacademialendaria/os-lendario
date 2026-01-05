/**
 * BookDetailSheetDemo - Interactive demo for BookDetailSheet
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import BookDetailSheet from '@/components/books/ui/BookDetailSheet';
import type { BookData } from '@/hooks/useBooks';
import { MOCK_BOOK } from '../data';

// Type assertion for mock data
const book = MOCK_BOOK as unknown as BookData;

export const BookDetailSheetDemo: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        className="h-14 bg-foreground px-10 text-sm font-black uppercase tracking-[0.25em] text-background shadow-lg transition-all duration-300 hover:bg-foreground/90 hover:shadow-xl active:scale-[0.98]"
      >
        Abrir Sheet
      </Button>
      <BookDetailSheet
        book={book}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onReadSummary={() => {}}
        onBookmark={() => {}}
        isBookmarked={false}
      />
    </div>
  );
};
