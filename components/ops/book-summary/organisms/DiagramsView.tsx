import React from 'react';
import { Badge } from '../../../ui/badge';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
} from '../../ops-ui';
import {
  BOOK_SUMMARY_PIPELINE_DIAGRAM,
  BOOK_SUMMARY_PARADIGM_DIAGRAM,
  BOOK_SUMMARY_PRE_PIPELINE_DIAGRAM,
  BOOK_SUMMARY_ETL_DIAGRAM,
  BOOK_SUMMARY_CORE_PHASES_DIAGRAM,
  BOOK_SUMMARY_OUTPUT_DIAGRAM,
  BOOK_SUMMARY_SEQUENCE_DIAGRAM,
  BOOK_SUMMARY_ER_DIAGRAM,
} from '../../data/book-summary-content';
import type { DiagramsViewProps } from '../types';

export const DiagramsView: React.FC<DiagramsViewProps> = () => {
  return (
    <>
      <MainPipelineDiagram />
      <ParadigmShiftDiagram />
      <PrePipelineETLDiagrams />
      <CorePhasesDiagram />
      <OutputStructureDiagram />
      <SequenceDiagram />
      <ERDiagram />
    </>
  );
};

// ============================================================================
// Individual Diagram Cards
// ============================================================================

const MainPipelineDiagram: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Pipeline Completo" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <MermaidDiagram chart={BOOK_SUMMARY_PIPELINE_DIAGRAM} id="book-summary-pipeline" />
    </OpsCardContent>
  </OpsCard>
);

const ParadigmShiftDiagram: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Paradigm Shift: Antes vs Depois" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <MermaidDiagram chart={BOOK_SUMMARY_PARADIGM_DIAGRAM} id="book-summary-paradigm" />
    </OpsCardContent>
  </OpsCard>
);

const PrePipelineETLDiagrams: React.FC = () => (
  <OpsGrid columns={2}>
    <OpsCard>
      <OpsCardHeader title="Pre-Pipeline" accentColor="#8B5CF6">
        <Badge variant="outline" className="text-violet-400 border-violet-400/30">4 Etapas</Badge>
      </OpsCardHeader>
      <OpsCardContent>
        <MermaidDiagram chart={BOOK_SUMMARY_PRE_PIPELINE_DIAGRAM} id="book-summary-pre" />
      </OpsCardContent>
    </OpsCard>

    <OpsCard>
      <OpsCardHeader title="Phase 0: ETL" accentColor="#06B6D4">
        <Badge variant="outline" className="text-cyan-400 border-cyan-400/30">3 Etapas</Badge>
      </OpsCardHeader>
      <OpsCardContent>
        <MermaidDiagram chart={BOOK_SUMMARY_ETL_DIAGRAM} id="book-summary-etl" />
      </OpsCardContent>
    </OpsCard>
  </OpsGrid>
);

const CorePhasesDiagram: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Core Pipeline - Context Injection" accentColor="text-muted-foreground">
      <Badge variant="outline" className="text-amber-400 border-amber-400/30">11 Fases</Badge>
    </OpsCardHeader>
    <OpsCardContent>
      <MermaidDiagram chart={BOOK_SUMMARY_CORE_PHASES_DIAGRAM} id="book-summary-core" />
    </OpsCardContent>
  </OpsCard>
);

const OutputStructureDiagram: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Output Structure" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <MermaidDiagram chart={BOOK_SUMMARY_OUTPUT_DIAGRAM} id="book-summary-output" />
    </OpsCardContent>
  </OpsCard>
);

const SequenceDiagram: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Data Flow Sequence" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <MermaidDiagram chart={BOOK_SUMMARY_SEQUENCE_DIAGRAM} id="book-summary-sequence" />
    </OpsCardContent>
  </OpsCard>
);

const ERDiagram: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Entity Relationship Diagram" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <MermaidDiagram chart={BOOK_SUMMARY_ER_DIAGRAM} id="book-summary-er-full" />
    </OpsCardContent>
  </OpsCard>
);
