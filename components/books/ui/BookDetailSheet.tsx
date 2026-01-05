import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '../../ui/sheet';
import type { BookData } from '../../../hooks/useBooks';

/**
 * BookDetailSheet - Slide-out panel showing book details
 *
 * Extracted from: BooksLibraryTemplate.tsx
 * Features:
 * - Hero section with blurred cover background
 * - Book metadata (pages, year, rating, audiobook)
 * - Action buttons (read, bookmark)
 * - Tags display
 */

interface BookDetailSheetProps {
  book: BookData | null;
  isOpen: boolean;
  onClose: () => void;
  onReadSummary: (book: BookData) => void;
  onBookmark?: (book: BookData) => void;
  isBookmarked?: boolean;
}

const BookDetailSheet: React.FC<BookDetailSheetProps> = ({
  book,
  isOpen,
  onClose,
  onReadSummary,
  onBookmark,
  isBookmarked = false,
}) => {
  if (!book) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-lg border-l border-border bg-background">
        <div className="flex flex-col h-full">
          {/* Hero with Centered Cover */}
          <div className="relative h-[45vh] w-full flex items-center justify-center pt-12 overflow-hidden">
            {/* Background blur from cover */}
            {book.coverUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20 scale-150"
                style={{ backgroundImage: `url(${book.coverUrl})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>

            {/* Centered Cover */}
            <div className="relative z-10 w-40 aspect-[2/3] rounded-2xl shadow-2xl overflow-hidden border border-border/20 bg-card">
              {book.coverUrl ? (
                <img src={book.coverUrl} loading="lazy" className="w-full h-full object-cover" alt={book.title} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <Icon name="book" className="text-muted-foreground/30" size="size-12" />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 space-y-8">
            {/* Title and Author */}
            <div className="text-center space-y-3">
              <Badge className="border-none bg-primary/10 text-[9px] font-black uppercase tracking-[0.3em] text-primary rounded-full px-4 py-1.5">
                {book.category || 'Livro'}
              </Badge>
              <SheetTitle className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {book.title}
              </SheetTitle>
              <p className="font-serif text-base italic text-muted-foreground">{book.author}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 h-14 rounded-xl bg-foreground font-black uppercase tracking-[0.2em] text-[10px] text-background hover:opacity-90 shadow-lg active:scale-[0.98] transition-all"
                onClick={() => onReadSummary(book)}
              >
                <Icon name="book-open-cover" className="mr-2" size="size-4" /> Ler Resumo
              </Button>
              {onBookmark && (
                <Button
                  variant="outline"
                  size="icon"
                  className={`h-14 w-14 rounded-xl border-border hover:bg-muted active:scale-[0.98] transition-all ${
                    isBookmarked ? 'text-primary border-primary/30 bg-primary/5' : 'text-foreground'
                  }`}
                  onClick={() => onBookmark(book)}
                >
                  <Icon name={isBookmarked ? 'bookmark-solid' : 'bookmark'} size="size-5" />
                </Button>
              )}
            </div>

            {/* Description */}
            <SheetDescription className="font-serif text-base leading-relaxed text-muted-foreground text-center">
              {book.summary || 'Sem descrição disponível.'}
            </SheetDescription>

            {/* Tags */}
            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {book.tags.map((tag) => (
                  <Badge
                    key={tag.slug}
                    variant="secondary"
                    className="bg-muted/50 text-[8px] font-black uppercase tracking-[0.15em] text-muted-foreground rounded-full px-3 py-1"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              {book.pageCount && (
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                    Páginas
                  </p>
                  <p className="text-lg font-bold text-foreground">{book.pageCount}</p>
                </div>
              )}
              {book.publishedYear && (
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                    Ano
                  </p>
                  <p className="text-lg font-bold text-foreground">{book.publishedYear}</p>
                </div>
              )}
              {book.hasAudio && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                  <Icon name="headset" size="size-5" className="text-primary mx-auto mb-1" />
                  <p className="text-[8px] font-black uppercase tracking-widest text-primary">
                    Audiobook
                  </p>
                </div>
              )}
              {book.rating && (
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                  <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                    Avaliação
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <Icon name="star-solid" size="size-4" className="text-primary" />
                    <span className="text-lg font-bold text-foreground">
                      {book.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookDetailSheet;
