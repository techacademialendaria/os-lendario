import React from 'react';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import { GAPS_DIAGRAM } from '../../data/diagrams';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
} from '../../ops-ui';

export const GapsCriticalDiagram: React.FC = () => {
  return (
    <OpsCard style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
      <OpsCardHeader title="Critical Gaps - Blocking Full Pipeline" accentColor="#f87171" />
      <OpsCardContent>
        <MermaidDiagram chart={GAPS_DIAGRAM} id="gaps" />
      </OpsCardContent>
    </OpsCard>
  );
};
