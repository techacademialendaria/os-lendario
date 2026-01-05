import React from 'react';
import { Card } from '@/components/ui/card';

export const LoadingSkeleton: React.FC = () => (
  <div className="animate-fade-in space-y-6">
    {/* Stats skeleton */}
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-5">
          <div className="space-y-2">
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-8 w-16 animate-pulse rounded bg-muted" />
            <div className="h-3 w-20 animate-pulse rounded bg-muted/60" />
          </div>
        </Card>
      ))}
    </div>
    {/* Pipeline skeleton */}
    <Card className="p-6">
      <div className="mb-4 h-5 w-40 animate-pulse rounded bg-muted" />
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
            <div className="h-3 w-16 animate-pulse rounded bg-muted/60" />
          </div>
        ))}
      </div>
    </Card>
    {/* Course cards skeleton */}
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 animate-pulse rounded-lg bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-48 animate-pulse rounded bg-muted" />
              <div className="h-3 w-32 animate-pulse rounded bg-muted/60" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);
