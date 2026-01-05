import React from 'react';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import { TOOLS_DIAGRAM } from '../../data/diagrams';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent
} from '../../ops-ui';

export const SchemaView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <MermaidDiagram chart={TOOLS_DIAGRAM} id="tools" />
      </OpsCardContent>
    </OpsCard>
  );
};
