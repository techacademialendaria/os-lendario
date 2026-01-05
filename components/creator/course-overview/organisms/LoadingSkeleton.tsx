import React from 'react';
import { Section } from '@/types';
import CreatorTopbar from '../../CreatorTopbar';

interface LoadingSkeletonProps {
  setSection: (s: Section) => void;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ setSection }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />
      <main className="mx-auto w-full max-w-[1400px] p-6 md:p-8">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-muted/30" />
              <div className="h-8 w-64 rounded bg-muted/30" />
            </div>
            <div className="h-10 w-32 rounded bg-muted/30" />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 rounded-xl bg-muted/20" />
            ))}
          </div>
          <div className="h-32 rounded-xl bg-muted/20" />
        </div>
      </main>
    </div>
  );
};
