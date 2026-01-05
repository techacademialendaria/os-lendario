import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LanguageIndicator } from '../molecules';
import type { GridViewProps } from '../types';

/**
 * GridView - Grid view for books with cover images
 */
export const GridView: React.FC<GridViewProps> = ({
  books,
  selectedIds,
  onToggleSelect,
  onEdit,
}) => {
  const getBookId = (book: typeof books[0]) =>
    book.languages.pt?.id || book.languages.en?.id || book.languages.es?.id || '';

  return (
    <div className="grid animate-fade-in grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book) => {
        const bookId = getBookId(book);

        return (
          <Card
            key={bookId}
            className={cn(
              'group flex cursor-pointer flex-col overflow-hidden border-border transition-all hover:border-brand-gold/50 hover:shadow-lg',
              selectedIds.includes(bookId) && 'ring-2 ring-brand-gold'
            )}
            onClick={() => onEdit(book)}
          >
            {/* Cover Image */}
            <div className="relative aspect-[2/3] overflow-hidden bg-muted">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={book.originalTitle}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Icon name="book" size="size-8" className="text-muted-foreground/50" />
                </div>
              )}

              {/* Checkbox Overlay */}
              <div className="absolute left-2 top-2" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedIds.includes(bookId)}
                  onCheckedChange={() => onToggleSelect(bookId)}
                  className="border-white/50 bg-black/50"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute right-2 top-2">
                <Badge
                  variant={book.status === 'published' ? 'success' : 'warning'}
                  className="text-[9px] uppercase opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100"
                >
                  {book.status}
                </Badge>
              </div>

              {/* Edit Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Button size="sm" className="h-8 bg-brand-gold font-bold text-black">
                  Editar
                </Button>
              </div>
            </div>

            {/* Card Content */}
            <CardContent className="flex flex-1 flex-col space-y-1 p-4">
              <div className="flex items-start justify-between">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  {book.category?.name || '-'}
                </p>
                <LanguageIndicator book={book} />
              </div>
              <h4 className="mt-1 line-clamp-2 text-sm font-bold leading-tight">
                {book.originalTitle}
              </h4>
              <p className="mt-auto pt-2 font-serif text-xs text-muted-foreground">
                {book.author?.name || 'Autor Desconhecido'}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
