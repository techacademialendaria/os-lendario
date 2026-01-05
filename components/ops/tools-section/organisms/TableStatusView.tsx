import React from 'react';
import { StatusBadge } from '../../components/StatusBadge';
import { TOOLS_TABLE } from '../../data/tables';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsCode
} from '../../ops-ui';

export const TableStatusView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Status das Tabelas" accentColor="text-muted-foreground" />
      <OpsCardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">
                Tabela
              </th>
              <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">
                Registros
              </th>
              <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">
                Descricao
              </th>
            </tr>
          </thead>
          <tbody>
            {TOOLS_TABLE.map((row, i) => (
              <tr key={i} className="border-b border-border/30 hover:bg-muted/30">
                <td className="py-3 px-4">
                  <OpsCode className="text-xs" style={{ color: OPS_ACCENT }}>{row.table}</OpsCode>
                </td>
                <td className="py-3 px-4 font-mono">{row.records}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell">
                  {row.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </OpsCardContent>
    </OpsCard>
  );
};
