/**
 * FrameworksTemplate - Orchestrator Component
 *
 * Refactored from 442 lines to ~60 lines
 * Following Atomic Design pattern
 */
import React from 'react';
import { Section } from '@/types';
import CreatorTopbar from '@/components/creator/CreatorTopbar';
import { useContentFrameworks } from '@/hooks/useContentFrameworks';
import type { FrameworksTemplateProps } from './types';
import { useFrameworksState } from './hooks';
import { FrameworksListView, FrameworkDetailView } from './organisms';

export const FrameworksTemplate: React.FC<FrameworksTemplateProps> = ({ setSection }) => {
  // Data from hook
  const { frameworks, loading, error, refetch } = useContentFrameworks();

  // Local state
  const {
    selectedFramework,
    categoryFilter,
    setCategoryFilter,
    selectFramework,
    clearSelection,
  } = useFrameworksState();

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_FRAMEWORKS} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 p-6 md:p-12">
        {selectedFramework ? (
          <FrameworkDetailView
            framework={selectedFramework}
            onBack={clearSelection}
          />
        ) : (
          <FrameworksListView
            frameworks={frameworks}
            loading={loading}
            error={error}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            onSelectFramework={selectFramework}
            onRefetch={refetch}
          />
        )}
      </main>
    </div>
  );
};

export default FrameworksTemplate;
