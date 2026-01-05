/**
 * AllBooksSection - Full catalog with infinite scroll
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import BookCard from '../../ui/BookCard';
import { BookCardSkeleton } from '../../ui/BookSkeletons';
import type { AllBooksSectionProps } from '../types';

export const AllBooksSection: React.FC<AllBooksSectionProps> = ({
  books,
  totalBookCount,
  localFavorites,
  readingStatusMap,
  onBookClick,
  onToggleFavorite,
  isLoading,
  loadingMore,
  hasMore,
  loadMoreRef,
  onViewAllBooks,
}) => {
  const isPageLoading = isLoading;

  return (
    <div className="border-t border-border pt-16 md:pt-20">
      <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
            Catalogo Completo
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {totalBookCount} <span className="font-serif italic font-light text-muted-foreground">obras</span>
          </p>
        </div>
        <p className="text-sm text-muted-foreground font-serif italic max-w-xs">
          Explore nossa biblioteca completa de resumos e insights.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} variant="grid" />)
          : books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => onBookClick(book)}
                isBookmarked={localFavorites.has(book.id)}
                readingStatus={readingStatusMap.get(book.id)}
                onBookmark={onToggleFavorite}
              />
            ))}
      </div>

      {/* Loading more indicator */}
      {loadingMore && (
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card px-8 py-4 shadow-lg">
            <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Carregando mais livros...
            </span>
          </div>
        </div>
      )}

      {/* Infinite scroll trigger */}
      {hasMore && !isLoading && (
        <div ref={loadMoreRef} className="mt-16 h-20" />
      )}

      {/* End of list */}
      {!hasMore && books.length > 0 && (
        <div className="mt-20 flex flex-col items-center gap-4">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-border to-transparent"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
            Fim do catalogo
          </p>
          <p className="text-sm text-muted-foreground font-serif italic">
            {totalBookCount} obras exploradas
          </p>
        </div>
      )}

      {!isPageLoading && books.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-card shadow-xl">
              <Icon name="book-open" className="text-muted-foreground/40" size="size-10" />
            </div>
          </div>
          <h3 className="mt-8 text-xl font-bold text-foreground">Nenhum livro encontrado</h3>
          <p className="mt-2 text-sm text-muted-foreground font-serif italic max-w-sm">
            Nao encontramos livros com os filtros selecionados. Tente ajustar sua busca.
          </p>
          <Button
            variant="outline"
            className="mt-6 h-12 px-8 rounded-xl font-black uppercase tracking-[0.2em] text-[10px]"
            onClick={onViewAllBooks}
          >
            Ver todos os livros
          </Button>
        </div>
      )}
    </div>
  );
};
