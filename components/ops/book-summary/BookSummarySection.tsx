import React from 'react';
import { OpsPage } from '../ops-ui';

// Hooks
import { useTabs, useExpandable } from './hooks';
import { useSchemaSelection } from './hooks/useSchemaSelection';
import { useGlossaryFilters } from './hooks/useGlossaryFilters';

// Molecules
import { ViewTabs } from './molecules';

// Organisms
import {
  IntroView,
  DecisionsView,
  OverviewView,
  DatabaseView,
  PipelineView,
  DiagramsView,
  GlossaryView,
  KeyTakeawayCard,
} from './organisms';

// Types
import type { ViewType } from './types';

export const BookSummarySection: React.FC = () => {
  // Navigation
  const { activeTab: activeView, setActiveTab: setActiveView } = useTabs<ViewType>('intro');

  // Expandable states (for decisions and pipeline phases)
  const expandable = useExpandable();

  // Schema selection (for database view)
  const { selectedSchema, setSelectedSchema } = useSchemaSelection('contents');

  // Glossary filters
  const {
    glossaryFilter,
    setGlossaryFilter,
    selectedGlossaryCategory,
    setSelectedGlossaryCategory,
  } = useGlossaryFilters();

  // Navigation handlers
  const navigateToDiagrams = () => setActiveView('diagrams');

  return (
    <OpsPage>
      <ViewTabs activeView={activeView} onViewChange={setActiveView} />

      {activeView === 'intro' && <IntroView />}

      {activeView === 'decisions' && (
        <DecisionsView
          isExpanded={expandable.isExpanded}
          onToggle={expandable.toggle}
        />
      )}

      {activeView === 'overview' && (
        <OverviewView onNavigateToDiagrams={navigateToDiagrams} />
      )}

      {activeView === 'database' && (
        <DatabaseView
          selectedSchema={selectedSchema}
          onSchemaChange={setSelectedSchema}
        />
      )}

      {activeView === 'pipeline' && (
        <PipelineView
          isExpanded={expandable.isExpanded}
          onToggle={expandable.toggle}
        />
      )}

      {activeView === 'diagrams' && <DiagramsView />}

      {activeView === 'glossary' && (
        <GlossaryView
          searchTerm={glossaryFilter}
          onSearchChange={setGlossaryFilter}
          selectedCategory={selectedGlossaryCategory}
          onCategoryChange={setSelectedGlossaryCategory}
        />
      )}

      <KeyTakeawayCard />
    </OpsPage>
  );
};

export default BookSummarySection;
