import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ReaderLoadingSkeleton: React.FC = () => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex-1 p-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <Skeleton className="mx-auto h-6 w-24" />
          <Skeleton className="mx-auto h-12 w-3/4" />
          <Skeleton className="mx-auto h-1 w-16" />
          <Skeleton className="mt-12 h-64 w-full" />
        </div>
      </div>
    </div>
  );
};
