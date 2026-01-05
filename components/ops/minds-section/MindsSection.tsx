import React from 'react';
import { OpsPage } from '../ops-ui';
import { useLifecycleExpansion, useProfileTypeSelection, useBigFiveSelection } from './hooks';
import {
  DefinitionView,
  LifecycleView,
  ProfileTypesView,
  PsychometricsView,
  RelationshipsView,
  ExampleMindView,
  ViewsView,
  SchemaDiagramView,
  SchemaColumnsView,
  TableStatusView
} from './organisms';

/**
 * MindsSection - Documentation and visualization for the Minds domain
 *
 * Refactored from 661 lines → ~60 lines (91% reduction)
 * Following Atomic Design: hooks + organisms pattern
 */
export const MindsSection: React.FC = () => {
  // Hooks for interactive state management
  const { expandedStage, toggleStage } = useLifecycleExpansion();
  const { selectedType, setSelectedType, selectedProfile } = useProfileTypeSelection();
  const { selectedTrait, setSelectedTrait, selectedTraitData } = useBigFiveSelection();

  return (
    <OpsPage>
      {/* Definition & Components Overview */}
      <DefinitionView />

      {/* Lifecycle Flow */}
      <LifecycleView
        expandedStage={expandedStage}
        onToggleStage={toggleStage}
      />

      {/* Profile Types */}
      <ProfileTypesView
        selectedType={selectedType}
        onSelectType={setSelectedType}
        selectedProfile={selectedProfile}
      />

      {/* Psychometrics / Big Five */}
      <PsychometricsView
        selectedTrait={selectedTrait}
        onSelectTrait={setSelectedTrait}
        selectedTraitData={selectedTraitData}
      />

      {/* Relationships */}
      <RelationshipsView />

      {/* Example Mind */}
      <ExampleMindView />

      {/* Views */}
      <ViewsView />

      {/* Schema Diagram */}
      <SchemaDiagramView />

      {/* Schema Columns */}
      <SchemaColumnsView />

      {/* Table Status */}
      <TableStatusView />
    </OpsPage>
  );
};
