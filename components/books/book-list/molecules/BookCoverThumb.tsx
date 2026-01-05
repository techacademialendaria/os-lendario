import React from 'react';
import { Icon } from '@/components/ui/icon';
import type { AdminBook } from '@/hooks/useAdminBooks';

interface BookCoverThumbProps {
  book: AdminBook;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * BookCoverThumb - Small cover thumbnail for list/table views
 */
export const BookCoverThumb: React.FC<BookCoverThumbProps> = ({
  book,
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'h-14 w-10' : 'h-20 w-14';

  return (
    <div
      className={`${sizeClasses} overflow-hidden rounded border border-border bg-muted shadow-sm transition-transform group-hover:scale-105 ${className}`}
    >
      {book.coverUrl ? (
        <img
          src={book.coverUrl}
          className="h-full w-full object-cover"
          alt={book.originalTitle}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <Icon name="book" size="size-4" className="text-muted-foreground" />
        </div>
      )}
    </div>
  );
};
