import React from 'react';
import { useWritingStylesState } from './hooks';
import {
  SidebarNavigation,
  OverviewSection,
  SemanticsSection,
  ExamplesSection,
  CatchphrasesSection,
  PromptsSection,
} from './organisms';
import type { WritingStylesTabProps } from './types';

/**
 * WritingStylesTab - Orchestrator component for writing style analysis
 *
 * Composition-only component that orchestrates:
 * - Sidebar navigation
 * - Section content based on active selection
 *
 * Original: 660 lines -> Refactored: ~60 lines (91% reduction)
 */
export const WritingStylesTab: React.FC<WritingStylesTabProps> = ({ profile }) => {
  const {
    activeSection,
    setActiveSection,
    navigateToSemantics,
    writeChannel,
    setWriteChannel,
    semantics,
    linguistics,
    catchphrases,
    systemPrompts,
  } = useWritingStylesState(profile);

  return (
    <div className="flex flex-col gap-8 pb-20 lg:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <SidebarNavigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* MAIN CONTENT */}
      <div className="min-w-0 flex-1">
        {activeSection === 'overview' && (
          <OverviewSection profile={profile} onNavigateToSemantics={navigateToSemantics} />
        )}
        {activeSection === 'semantics' && (
          <SemanticsSection semantics={semantics} antiPatterns={linguistics.antiPatterns} />
        )}
        {activeSection === 'examples' && (
          <ExamplesSection
            writingSamples={profile.writingSamples}
            activeChannel={writeChannel}
            onChannelChange={setWriteChannel}
          />
        )}
        {activeSection === 'catchphrases' && (
          <CatchphrasesSection catchphrases={catchphrases} />
        )}
        {activeSection === 'prompts' && <PromptsSection prompts={systemPrompts} />}
      </div>
    </div>
  );
};
