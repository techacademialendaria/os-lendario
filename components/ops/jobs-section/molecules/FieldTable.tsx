import React from 'react';
import { FieldTableProps } from '../types';
import { OpsCode } from '../../ops-ui';
import { OPS_ACCENT } from '../../ops-tokens';

/**
 * FieldTable - Renders a table of field definitions with type, description, and examples
 */
export const FieldTable: React.FC<FieldTableProps> = ({ fields, showType = true }) => (
  <table className="w-full text-sm">
    <thead>
      <tr className="border-b border-border">
        <th className="text-left py-3 px-4 text-xs font-bold uppercase" style={{ color: OPS_ACCENT }}>Campo</th>
        {showType && <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Tipo</th>}
        <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Descricao</th>
        <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden lg:table-cell">Exemplo</th>
      </tr>
    </thead>
    <tbody>
      {fields.map((field, i) => (
        <tr key={i} className="border-b border-border/30 hover:bg-muted/30">
          <td className="py-3 px-4">
            <OpsCode className="text-xs font-mono" style={{ color: OPS_ACCENT }}>{field.name}</OpsCode>
          </td>
          {showType && <td className="py-3 px-4 text-xs text-muted-foreground font-mono">{field.type}</td>}
          <td className="py-3 px-4 text-muted-foreground text-xs">{field.desc}</td>
          <td className="py-3 px-4 text-xs text-muted-foreground hidden lg:table-cell">{field.example || '-'}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
