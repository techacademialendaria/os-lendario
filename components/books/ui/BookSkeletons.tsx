import React from 'react';
import { Skeleton } from '../../ui/skeleton';
import { cn } from '../../../lib/utils';

interface BookCardSkeletonProps {
  variant?: 'grid' | 'horizontal' | 'compact';
  className?: string;
}

export const BookCardSkeleton: React.FC<BookCardSkeletonProps> = ({
  variant = 'grid',
  className,
}) => {
  if (variant === 'horizontal') {
    return (
      <div className={cn('flex gap-4 rounded-xl border border-border/50 bg-card p-4', className)}>
        <Skeleton className="h-28 w-20 shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-full max-w-[200px]" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-2 h-3 w-16" />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('aspect-[2/3] overflow-hidden rounded-md', className)}>
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  // Default: grid variant
  return (
    <div className={cn('rounded-xl border border-border/50 bg-card p-4', className)}>
      <div className="mb-4 flex items-start justify-between">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="mb-6 flex justify-center">
        <Skeleton className="h-48 w-32 rounded" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="mt-4 flex justify-between">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-4 w-4" />
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => (
  <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
    <div className="max-w-2xl space-y-6">
      <Skeleton className="h-6 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-12 w-full max-w-md" />
        <Skeleton className="h-12 w-48" />
      </div>
      <Skeleton className="h-6 w-full max-w-lg" />
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  </div>
);

export const CategorySkeleton: React.FC = () => (
  <div className="flex gap-2 overflow-x-auto pb-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton key={i} className="h-10 w-24 shrink-0 rounded-full" />
    ))}
  </div>
);

export default BookCardSkeleton;
