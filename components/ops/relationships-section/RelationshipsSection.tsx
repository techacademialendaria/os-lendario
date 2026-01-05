import React from 'react';
import { OpsPage } from '../ops-ui';
import {
  RELATIONSHIPS_EXPLANATION,
  CORRELATION_METRICS,
  STATISTICAL_GUIDE,
  RELATIONSHIP_TYPES,
  RELATIONSHIPS_SCHEMA,
  EXAMPLE_RELATIONSHIPS,
  CORRELATION_MATRIX,
  DRIVER_CLUSTERS,
  INFERENCE_USE_CASES,
  RELATIONSHIPS_DIAGRAM,
  NETWORK_DIAGRAM
} from '../data/relationships-content';
import {
  DefinitionCard,
  CorrelationMetricsCard,
  StatisticalGuideCard,
  RelationshipTypesCard,
  CorrelationMatrixCard,
  ExampleRelationshipsCard,
  DriverClustersCard,
  InferenceUseCasesCard,
  SchemaCard,
  SchemaDiagramCard
} from './organisms';

/**
 * RelationshipsSection - Orchestrator
 * Displays educational content about driver relationships and correlation metrics.
 */
export const RelationshipsSection: React.FC = () => (
  <OpsPage>
    <DefinitionCard {...RELATIONSHIPS_EXPLANATION} />
    <CorrelationMetricsCard {...CORRELATION_METRICS} />
    <StatisticalGuideCard {...STATISTICAL_GUIDE} />
    <RelationshipTypesCard {...RELATIONSHIP_TYPES} />
    <CorrelationMatrixCard {...CORRELATION_MATRIX} />
    <ExampleRelationshipsCard {...EXAMPLE_RELATIONSHIPS} />
    <DriverClustersCard {...DRIVER_CLUSTERS} networkDiagram={NETWORK_DIAGRAM} />
    <InferenceUseCasesCard {...INFERENCE_USE_CASES} />
    <SchemaCard {...RELATIONSHIPS_SCHEMA} />
    <SchemaDiagramCard title={`${RELATIONSHIPS_SCHEMA.title} - Diagrama`} diagram={RELATIONSHIPS_DIAGRAM} />
  </OpsPage>
);
