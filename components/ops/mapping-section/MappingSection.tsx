import React from 'react';
import { OpsPage } from '../ops-ui';
import {
  DefinitionCard,
  SystemsOverviewCard,
  ComponentDriverMapCard,
  ScoringAlgorithmCard,
  SystemComparisonCard,
  VisualExampleCard,
  DiagramCard,
  XRaySectionCard,
  SchemaBrowserCard,
} from './organisms';

/**
 * MappingSection - Psychometric Mapping Systems Documentation
 *
 * Displays comprehensive information about mapping systems including:
 * - Definition and overview
 * - Psychometric systems comparison
 * - Component-to-driver mapping
 * - Scoring algorithm explanation
 * - Visual examples
 * - Schema diagram and browser
 */
export const MappingSection: React.FC = () => {
  return (
    <OpsPage>
      <DefinitionCard />
      <SystemsOverviewCard />
      <ComponentDriverMapCard />
      <ScoringAlgorithmCard />
      <SystemComparisonCard />
      <VisualExampleCard />
      <DiagramCard />
      <XRaySectionCard />
      <SchemaBrowserCard />
    </OpsPage>
  );
};
