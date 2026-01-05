import React from 'react';
import { OpsPage } from '../ops-ui';
import {
  DefinitionCard,
  FieldsTable,
  ValidationPipelineCard,
  ExamplesCard,
  LinguisticMarkersCard,
  MIUVsFragmentCard,
  StatisticsCard,
  SchemaDiagramCard,
  BottomNoteCard,
} from './organisms';

/**
 * MIUSection - Documentation for Minimal Information Units
 *
 * Displays comprehensive information about MIUs including:
 * - Definition and fields
 * - Validation pipeline and quality gates
 * - Extraction examples
 * - Linguistic markers analysis
 * - MIU vs Fragment comparison
 * - Statistics and schema diagram
 */
export const MIUSection: React.FC = () => {
  return (
    <OpsPage>
      <DefinitionCard />
      <FieldsTable />
      <ValidationPipelineCard />
      <ExamplesCard />
      <LinguisticMarkersCard />
      <MIUVsFragmentCard />
      <StatisticsCard />
      <SchemaDiagramCard />
      <BottomNoteCard />
    </OpsPage>
  );
};
