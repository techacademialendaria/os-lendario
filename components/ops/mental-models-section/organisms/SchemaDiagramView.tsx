import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent } from '../../ops-ui';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import { MENTAL_MODELS_DIAGRAM } from '../../data/tables';

export const SchemaDiagramView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <MermaidDiagram chart={MENTAL_MODELS_DIAGRAM} id="mental-models" />
      </OpsCardContent>
    </OpsCard>
  );
};
