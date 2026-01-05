import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsCode } from '../../ops-ui';
import { MIU_EXPLANATION } from '../../data/miu-content';
import { OPS_ACCENT } from '../../ops-tokens';

export const FieldsTable: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Campos do MIU" accentColor="text-muted-foreground" />
    <OpsCardContent className="p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Campo</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Descricao</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Exemplo</th>
          </tr>
        </thead>
        <tbody>
          {MIU_EXPLANATION.fields.map((field, i) => (
            <tr key={i} className="border-b border-border/30 hover:bg-muted/30">
              <td className="py-3 px-4">
                <OpsCode className="text-xs font-mono" style={{ color: OPS_ACCENT }}>{field.name}</OpsCode>
              </td>
              <td className="py-3 px-4 text-muted-foreground">{field.desc}</td>
              <td className="py-3 px-4 text-xs text-muted-foreground hidden md:table-cell">{field.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </OpsCardContent>
  </OpsCard>
);
