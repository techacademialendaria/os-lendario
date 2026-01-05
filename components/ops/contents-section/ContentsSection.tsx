import React from 'react';
import { OpsPage } from '../ops-ui';
import {
  ContentFlowDiagramView,
  ContentsTableView,
  ContentProjectsView,
  ContentTypesView,
  StatusWorkflowView,
  IngestionPipelineView,
  FragmentsComparisonView,
  ExtractionExampleView,
  ContentStatisticsView,
  ContentSchemaView,
  SectionDivider
} from './organisms';

/**
 * ContentsSection - Documentation and visualization for the Content Pipeline domain
 *
 * Refactored from 604 lines -> ~60 lines (90% reduction)
 * Following Atomic Design: organisms pattern (no hooks needed - purely presentational)
 */
export const ContentsSection: React.FC = () => {
  return (
    <OpsPage>
      {/* Overview: Flow Diagram and Quick Summary */}
      <ContentFlowDiagramView />

      {/* Contents Table Definition */}
      <ContentsTableView />

      {/* Content Projects */}
      <ContentProjectsView />

      <SectionDivider title="Tipos de Conteudo" />

      {/* Content Types Table */}
      <ContentTypesView />

      {/* Status Workflow */}
      <StatusWorkflowView />

      <SectionDivider title="Pipeline de Ingestao" />

      {/* Ingestion Pipeline Steps */}
      <IngestionPipelineView />

      <SectionDivider title="Fragments vs MIUs" />

      {/* Fragments (Legacy) Comparison */}
      <FragmentsComparisonView />

      {/* Extraction Example */}
      <ExtractionExampleView />

      {/* Statistics */}
      <ContentStatisticsView />

      {/* Schema and Key Takeaway */}
      <ContentSchemaView />
    </OpsPage>
  );
};
