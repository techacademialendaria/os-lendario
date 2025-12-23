import React from 'react';
import {
  Skeleton,
  SkeletonHeading,
  SkeletonButton,
  SkeletonText,
} from './ui/skeleton';

/**
 * Loading skeleton for template lazy-load fallback
 * Displays a generic template loading state with:
 * - Header section
 * - Content area placeholder
 * - Action buttons
 */
export const TemplateSkeleton: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="w-full max-w-4xl space-y-6 px-4 py-8">
      {/* Header Section */}
      <div className="space-y-3">
        <SkeletonHeading size="xl" className="w-1/3" />
        <SkeletonText lines={2} className="text-sm" />
      </div>

      {/* Main Content Area */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="space-y-3">
          <SkeletonHeading size="lg" className="w-1/2" />
          <SkeletonText lines={4} className="h-3" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-48 w-full rounded-md" />
          <Skeleton className="h-48 w-full rounded-md" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <SkeletonButton size="default" />
        <SkeletonButton size="default" />
      </div>
    </div>
  </div>
);

export default TemplateSkeleton;
