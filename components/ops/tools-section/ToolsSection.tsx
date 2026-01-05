import React from 'react';
import { OpsPage } from '../ops-ui';
import { useCatalogType, useStackExpansion } from './hooks';
import {
  DefinitionView,
  ToolTypesView,
  CatalogView,
  RelationsView,
  AxesView,
  AxisExamplesView,
  AffinitiesView,
  AffinityAlgorithmView,
  RecommendationFlowView,
  ToolStacksView,
  SchemaView,
  TableStatusView
} from './organisms';

/**
 * ToolsSection - Documentation and visualization for the Tools domain
 *
 * Refactored from 622 lines -> ~60 lines (90% reduction)
 * Following Atomic Design: hooks + molecules + organisms pattern
 */
export const ToolsSection: React.FC = () => {
  // Hooks for interactive state management
  const {
    selectedCatalogType,
    setSelectedCatalogType,
    catalogTypes,
    selectedCatalog
  } = useCatalogType();
  const { expandedStack, toggleStack } = useStackExpansion();

  return (
    <OpsPage>
      {/* Definition */}
      <DefinitionView />

      {/* Types */}
      <ToolTypesView />

      {/* Tool Catalog Deep Dive */}
      <CatalogView
        selectedCatalogType={selectedCatalogType}
        onSelectType={setSelectedCatalogType}
        catalogTypes={catalogTypes}
        selectedCatalog={selectedCatalog}
      />

      {/* Tool Relations */}
      <RelationsView />

      {/* Axes */}
      <AxesView />

      {/* Axis Classification Examples */}
      <AxisExamplesView />

      {/* Affinities */}
      <AffinitiesView />

      {/* Affinity Algorithm Deep Dive */}
      <AffinityAlgorithmView />

      {/* Recommendation Flow */}
      <RecommendationFlowView />

      {/* Tool Stacks */}
      <ToolStacksView
        expandedStack={expandedStack}
        onToggleStack={toggleStack}
      />

      {/* ER Diagram */}
      <SchemaView />

      {/* Table Status */}
      <TableStatusView />
    </OpsPage>
  );
};
