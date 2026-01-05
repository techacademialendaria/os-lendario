import React from 'react';
import { StatusBadge } from '../../components/StatusBadge';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsCode
} from '../../ops-ui';

const MINDS_TABLE = [
  { table: 'minds', records: 8, status: 'ok' as const, desc: 'Registro central de cada mind (inclui obsession)' },
  { table: 'mind_drivers', records: 0, status: 'empty' as const, desc: 'Drivers inferidos (includes migrated values)' },
  { table: 'mind_psychometrics', records: 0, status: 'empty' as const, desc: 'Scores Big Five e outros' },
  { table: 'mind_component_scores', records: 0, status: 'empty' as const, desc: 'Scores em componentes de sistemas' },
  { table: 'mind_tags', records: 15, status: 'ok' as const, desc: 'Tags para categorizacao' },
  { table: 'mind_tools', records: 0, status: 'empty' as const, desc: 'Ferramentas usadas por cada mind' }
];

export const TableStatusView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Status das Tabelas" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <div className="overflow-x-auto rounded-lg border border-border/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20 bg-muted/20">
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Tabela</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Registros</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Descricao</th>
              </tr>
            </thead>
            <tbody>
              {MINDS_TABLE.map((row, i) => (
                <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-4"><OpsCode style={{ color: OPS_ACCENT }}>{row.table}</OpsCode></td>
                  <td className="py-3 px-4 font-mono font-bold text-foreground">{row.records}</td>
                  <td className="py-3 px-4"><StatusBadge status={row.status} /></td>
                  <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell leading-relaxed">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
