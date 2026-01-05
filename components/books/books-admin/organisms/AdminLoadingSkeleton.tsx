import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const AdminLoadingSkeleton: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background p-8">
      <div className="mb-8 flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
};
