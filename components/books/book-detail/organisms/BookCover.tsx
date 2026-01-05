import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface BookCoverProps {
  book: {
    title: string;
    coverUrl?: string | null;
  } | null;
  loading: boolean;
  fallbackGradient: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ book, loading, fallbackGradient }) => {
  if (loading) {
    return <Skeleton className="mx-auto aspect-[2/3] w-48 rounded-2xl md:mx-0 md:w-full" />;
  }

  return (
    <div className="group relative mx-auto w-48 md:mx-0 md:w-full perspective-1000">
      {/* Ambient Glow */}
      <div className="absolute inset-8 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* 3D Floating Cover */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-border/50 shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-4 group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.5)] cursor-pointer">
        {book?.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div
            className={cn(
              'flex h-full w-full flex-col items-center justify-center bg-gradient-to-br p-6',
              fallbackGradient
            )}
          >
            <Icon name="book" className="mb-3 text-white/30" size="size-10" />
            <span className="text-center font-serif text-base font-bold text-white">
              {book?.title}
            </span>
          </div>
        )}

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1500ms] ease-in-out" />

        {/* Spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-white/40 via-white/20 to-white/10" />
      </div>

      {/* Shadow that softens on hover */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-8 w-3/4 rounded-full bg-black/30 blur-2xl transition-all duration-700 group-hover:w-2/3 group-hover:opacity-60" />
    </div>
  );
};
