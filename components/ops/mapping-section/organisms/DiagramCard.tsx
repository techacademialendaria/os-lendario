import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsSection, OpsText, OpsCode } from '../../ops-ui';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import { SchemaBrowser } from '../../components/SchemaBrowser';
import { XRayView } from '../../components/XRayView';
import { MAPPING_DIAGRAM } from '../../data/diagrams';
import { MAPPING_EXPLANATION } from '../../data/mapping-content';

export const DiagramCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={`${MAPPING_EXPLANATION.title} - Diagrama`} accentColor="text-muted-foreground" />
    <OpsCardContent>
      <MermaidDiagram chart={MAPPING_DIAGRAM} id="mapping" />
    </OpsCardContent>
  </OpsCard>
);

export const XRaySectionCard: React.FC = () => (
  <OpsSection>
    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1 h-px bg-border/40" />
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap px-4">Deep Record Inspection (X-Ray)</span>
      <div className="flex-1 h-px bg-border/40" />
    </div>
    <XRayView />
  </OpsSection>
);

export const SchemaBrowserCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Explorador de Esquema (Schema Browser)" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsText className="text-sm text-muted-foreground mb-4">
        Visualizacao em tempo real da estrutura do banco de dados, extraida diretamente do
        <OpsCode className="mx-1">information_schema</OpsCode>.
      </OpsText>
      <SchemaBrowser />
    </OpsCardContent>
  </OpsCard>
);
