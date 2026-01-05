import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsCode } from '../../ops-ui';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import { MIU_DIAGRAM } from '../../data/diagrams';
import { OPS_ACCENT } from '../../ops-tokens';

export const SchemaDiagramCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <MermaidDiagram chart={MIU_DIAGRAM} id="miu" />
    </OpsCardContent>
  </OpsCard>
);

export const BottomNoteCard: React.FC = () => (
  <div className="p-4 rounded-xl border-l-4" style={{ borderColor: OPS_ACCENT, backgroundColor: `${OPS_ACCENT}10` }}>
    <p className="text-sm mb-2"><strong>MIU vs Fragment:</strong></p>
    <ul className="text-sm space-y-1 text-muted-foreground">
      <li><OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>mius</OpsCode> = Zero-inference, apenas observaveis (verbatim, pronomes, verbos)</li>
      <li><OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>fragments</OpsCode> = Legado, mistura observavel com inferencia (campo insight)</li>
    </ul>
    <p className="text-sm mt-3"><strong>Rastreabilidade:</strong> <OpsCode className="px-1 rounded" style={{ color: OPS_ACCENT }}>miu_driver_evidence</OpsCode> conecta MIU {'→'} Driver com peso e reasoning</p>
  </div>
);
