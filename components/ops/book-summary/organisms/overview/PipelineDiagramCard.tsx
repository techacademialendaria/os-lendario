import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsCode } from '../../../ops-ui';
import { MermaidDiagram } from '../../../components/MermaidDiagram';
import { StatusBadge } from '../../../components/StatusBadge';
import { OPS_ACCENT } from '../../../ops-tokens';
import { BOOK_SUMMARY_PIPELINE_DIAGRAM, BOOK_SUMMARY_TABLES } from '../../../data/book-summary-content';

interface PipelineDiagramCardProps {
  onViewAllDiagrams: () => void;
}

export const PipelineDiagramCard: React.FC<PipelineDiagramCardProps> = ({ onViewAllDiagrams }) => (
  <OpsCard>
    <OpsCardHeader title="Pipeline Visual" accentColor="text-muted-foreground">
      <button
        onClick={onViewAllDiagrams}
        className="text-[10px] text-muted-foreground hover:text-primary transition-colors"
      >
        Ver todos os diagramas
      </button>
    </OpsCardHeader>
    <OpsCardContent>
      <MermaidDiagram chart={BOOK_SUMMARY_PIPELINE_DIAGRAM} id="book-summary-pipeline-overview" />
    </OpsCardContent>
  </OpsCard>
);

export const TableStatusCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Status das Tabelas" accentColor="text-muted-foreground" />
    <OpsCardContent className="p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/20 bg-muted/20">
            <th className="text-left py-3 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Tabela</th>
            <th className="text-left py-3 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Registros</th>
            <th className="text-left py-3 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Status</th>
            <th className="text-left py-3 px-4 text-xs font-bold uppercase hidden md:table-cell" style={{ color: OPS_ACCENT }}>Descricao</th>
          </tr>
        </thead>
        <tbody>
          {BOOK_SUMMARY_TABLES.map((row, i) => (
            <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
              <td className="py-3 px-4"><OpsCode className="text-xs" style={{ color: OPS_ACCENT }}>{row.table}</OpsCode></td>
              <td className="py-3 px-4 font-mono">{row.records}</td>
              <td className="py-3 px-4"><StatusBadge status={row.status} /></td>
              <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </OpsCardContent>
  </OpsCard>
);
