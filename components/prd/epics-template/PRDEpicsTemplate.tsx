// PRDEpicsTemplate - Orchestrator
// Atomic Design refactored: 546 -> ~65 lines

import React from 'react';
import { Section } from '@/types';
import { useEpicsData, useEpicsActions } from './hooks';
import {
  LoadingState,
  EpicsHeader,
  EpicsIntro,
  EpicsEmptyState,
  EpicsGenerating,
  EpicsList,
  EpicsFooter,
} from './organisms';

// Re-export types for convenience
export type { EpicData } from './types';

interface PRDEpicsTemplateProps {
  setSection: (section: Section) => void;
}

export const PRDEpicsTemplate: React.FC<PRDEpicsTemplateProps> = ({ setSection }) => {
  // Data hook
  const {
    loading,
    epics,
    setEpics,
    isGenerating,
    setIsGenerating,
    hasGenerated,
    setHasGenerated,
    isAdvancing,
    setIsAdvancing,
    slug,
  } = useEpicsData();

  // Actions hook
  const {
    handleGenerate,
    handleRefine,
    handleAddStory,
    handleValidate,
    navigateToProjects,
  } = useEpicsActions({
    slug,
    epics,
    setEpics,
    setIsGenerating,
    setHasGenerated,
    setIsAdvancing,
  });

  // Loading state
  if (loading) {
    return <LoadingState setSection={setSection} />;
  }

  return (
    <div className="relative flex min-h-screen animate-fade-in flex-col bg-background font-sans text-foreground">
      <EpicsHeader onNavigateToProjects={navigateToProjects} />

      <main className="container mx-auto max-w-5xl flex-1 space-y-8 py-8">
        <EpicsIntro />

        {!hasGenerated && !isGenerating && (
          <EpicsEmptyState onGenerate={handleGenerate} />
        )}

        {isGenerating && <EpicsGenerating />}

        {hasGenerated && (
          <>
            <EpicsList epics={epics} onAddStory={handleAddStory} />
            <EpicsFooter
              epicsCount={epics.length}
              isAdvancing={isAdvancing}
              onRefine={handleRefine}
              onValidate={handleValidate}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default PRDEpicsTemplate;
