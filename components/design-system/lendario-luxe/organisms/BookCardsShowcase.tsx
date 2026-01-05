/**
 * BookCardsShowcase - BookCard and BookCardHorizontal demos
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import BookCard from '@/components/books/ui/BookCard';
import BookCardHorizontal from '@/components/books/ui/BookCardHorizontal';
import type { BookData } from '@/hooks/useBooks';
import { MOCK_BOOK, MOCK_BOOK_2 } from '../data';

// Type assertion for mock data
const book1 = MOCK_BOOK as unknown as BookData;
const book2 = MOCK_BOOK_2 as unknown as BookData;

export const BookCardsShowcase: React.FC = () => {
  return (
    <>
      {/* BookCard */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BookCard</CardTitle>
            <CardDescription>
              <code>components/books/ui/BookCard.tsx</code> — Aura, levitação, tipografia luxe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <BookCard book={book1} />
              <BookCard book={{ ...book1, id: '2', coverUrl: null }} />
              <BookCard book={book1} isBookmarked />
              <BookCard book={book1} readingStatus="reading" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* BookCardHorizontal */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BookCardHorizontal</CardTitle>
            <CardDescription>
              <code>components/books/ui/BookCardHorizontal.tsx</code> — Layout horizontal com progresso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BookCardHorizontal book={book1} progress={75} curator="Recomendado por Alan" />
            <BookCardHorizontal book={book2} progress={25} />
          </CardContent>
        </Card>
      </section>
    </>
  );
};
