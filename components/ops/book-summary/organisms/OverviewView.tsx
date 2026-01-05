import React from 'react';
import type { OverviewViewProps } from '../types';
import {
  DefinitionCard,
  StatsCard,
  SystemComponentsCard,
  RelationshipsCard,
  TagsSystemCard,
  MindsConnectionCard,
  ExampleBookCard,
  ParadigmShiftCard,
  PipelineDiagramCard,
  TableStatusCard,
} from './overview';

/**
 * OverviewView - Book Summary Pipeline Overview
 *
 * Displays comprehensive information about the book summary system including:
 * - Definition and stats
 * - System components
 * - Relationships (inbound/outbound)
 * - Tags system
 * - Minds connection
 * - Example book
 * - Paradigm shift comparison
 * - Pipeline diagram
 * - Table status
 */
export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigateToDiagrams }) => {
  return (
    <>
      <DefinitionCard />
      <StatsCard />
      <SystemComponentsCard />
      <RelationshipsCard />
      <TagsSystemCard />
      <MindsConnectionCard />
      <ExampleBookCard />
      <ParadigmShiftCard />
      <PipelineDiagramCard onViewAllDiagrams={onNavigateToDiagrams} />
      <TableStatusCard />
    </>
  );
};
