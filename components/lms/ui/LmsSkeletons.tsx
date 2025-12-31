import React from 'react';
import { Skeleton } from '../../ui/skeleton';

/**
 * Skeleton for the course grid loading state
 */
export function CourseGridSkeleton() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto w-full max-w-[1400px] space-y-8">
        <Skeleton className="h-16 w-full" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for course detail page
 */
export function CourseDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl space-y-8">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <div className="space-y-6 lg:col-span-4">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for lesson player loading state
 */
export function LessonPlayerSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="mt-8 h-32 w-full" />
    </div>
  );
}

/**
 * Skeleton for course card in grid
 */
export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <Skeleton className="aspect-video w-full" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for progress card in "Continue Learning" section
 */
export function ProgressCardSkeleton() {
  return (
    <div className="min-w-[320px] overflow-hidden rounded-xl border border-border bg-card md:min-w-[380px]">
      <div className="flex items-start gap-3 border-b border-border p-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-1 w-full rounded-full" />
        </div>
      </div>
      <Skeleton className="aspect-video w-full" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default {
  CourseGridSkeleton,
  CourseDetailSkeleton,
  LessonPlayerSkeleton,
  CourseCardSkeleton,
  ProgressCardSkeleton,
};
