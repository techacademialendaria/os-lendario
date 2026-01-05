import React from 'react';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent
} from '../../ops-ui';

interface SchemaDiagramCardProps {
  title: string;
  diagram: string;
}

export const SchemaDiagramCard: React.FC<SchemaDiagramCardProps> = ({
  title,
  diagram
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <MermaidDiagram chart={diagram} id="relationships-er" />
      </OpsCardContent>
    </OpsCard>
  );
};
