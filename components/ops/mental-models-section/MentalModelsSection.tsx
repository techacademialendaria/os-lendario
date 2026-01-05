import React from 'react';
import { OpsPage } from '../ops-ui';
import { useMentalModels } from '../../../hooks/useMentalModels';
import { useCategoryExpansion, useModelExpansion } from './hooks';
import {
  DefinitionView,
  LoadingStateView,
  ErrorStateView,
  EmptyStateView,
  CategoriesView,
  RelationshipsView,
  FrameworkView,
  PrinciplesView,
  RecommendationsView,
  SchemaDiagramView,
  TableStatusView,
  ReferencesView,
  CreationProcessView,
  PracticalApplicationView,
  ReferencesLinksView
} from './organisms';

/**
 * MentalModelsSection - Documentation and visualization for Mental Models
 *
 * Refactored from 623 lines -> ~80 lines (87% reduction)
 * Following Atomic Design: hooks + organisms pattern
 */
export const MentalModelsSection: React.FC = () => {
  // Data fetching
  const { categories, loading, error } = useMentalModels();

  // Hooks for interactive state management
  const { expandedCategory, toggleCategory } = useCategoryExpansion();
  const { expandedModel, toggleModel } = useModelExpansion();

  return (
    <OpsPage>
      {/* Main Definition */}
      <DefinitionView />

      {/* Loading State */}
      {loading && <LoadingStateView />}

      {/* Error State */}
      {error && !loading && <ErrorStateView error={error} />}

      {/* Empty State */}
      {!loading && !error && categories.length === 0 && <EmptyStateView />}

      {/* Categories Deep Dive */}
      {!loading && !error && categories.length > 0 && (
        <CategoriesView
          categories={categories}
          expandedCategory={expandedCategory}
          expandedModel={expandedModel}
          onToggleCategory={toggleCategory}
          onToggleModel={toggleModel}
        />
      )}

      {/* Relationships */}
      <RelationshipsView />

      {/* How to Use Framework */}
      <FrameworkView />

      {/* Core Principles */}
      <PrinciplesView />

      {/* Recommendations by Situation */}
      <RecommendationsView />

      {/* Schema Diagram */}
      <SchemaDiagramView />

      {/* Table Status */}
      <TableStatusView />

      {/* References & Aprofundamento */}
      <ReferencesView />

      {/* Creation Process & Rules */}
      <CreationProcessView />

      {/* Practical Application */}
      <PracticalApplicationView />

      {/* References Links */}
      <ReferencesLinksView />
    </OpsPage>
  );
};

export default MentalModelsSection;
