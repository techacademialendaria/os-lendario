import React from 'react';
import { Icon } from '@/components/ui/icon';
import type { BookData } from '@/hooks/useBooks';

interface SearchResultsDropdownProps {
  results: BookData[];
  loading: boolean;
  onSelectBook: (book: BookData) => void;
  variant?: 'desktop' | 'mobile';
}

export const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = ({
  results,
  loading,
  onSelectBook,
  variant = 'desktop',
}) => {
  if (loading) {
    return (
      <div className={`flex ${variant === 'mobile' ? 'flex-col' : ''} items-center justify-center ${variant === 'mobile' ? 'p-12' : 'p-6'}`}>
        <Icon name="spinner" className="animate-spin text-muted-foreground" size={variant === 'mobile' ? 'size-8' : 'size-4'} />
        <span className={`${variant === 'mobile' ? 'mt-4' : 'ml-3'} text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground`}>
          Buscando...
        </span>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={`${variant === 'mobile' ? 'flex flex-col items-center justify-center p-12' : 'p-6'} text-center`}>
        {variant === 'mobile' && (
          <Icon name="search" size="size-16" className="text-muted-foreground/20" />
        )}
        <p className={`${variant === 'mobile' ? 'mt-4' : ''} text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground`}>
          Nenhum livro encontrado
        </p>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <ul className="divide-y divide-border">
        {results.map((book) => (
          <li key={book.id}>
            <button
              onClick={() => onSelectBook(book)}
              className="flex w-full items-center gap-4 p-4 text-left transition-colors active:bg-muted"
            >
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt=""
                  className="h-16 w-11 rounded-lg object-cover shadow-md"
                />
              ) : (
                <div className="flex h-16 w-11 items-center justify-center rounded-lg bg-muted">
                  <Icon name="book" size="size-5" className="text-muted-foreground" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold">{book.title}</p>
                <p className="truncate text-sm text-muted-foreground font-serif italic">
                  {book.author}
                </p>
              </div>
              <Icon name="chevron-right" size="size-5" className="text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="max-h-80 overflow-y-auto">
      {results.map((book) => (
        <li key={book.id}>
          <button
            onClick={() => onSelectBook(book)}
            className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/50"
          >
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt=""
                className="h-14 w-10 rounded-lg object-cover shadow-md"
              />
            ) : (
              <div className="flex h-14 w-10 items-center justify-center rounded-lg bg-muted">
                <Icon name="book" size="size-4" className="text-muted-foreground" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-foreground">{book.title}</p>
              <p className="truncate text-xs text-muted-foreground font-serif italic">
                {book.author}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};
