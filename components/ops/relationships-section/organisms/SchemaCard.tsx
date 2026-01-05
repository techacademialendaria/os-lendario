import React from 'react';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
  OpsCode
} from '../../ops-ui';
import type { SchemaCardProps } from '../types';

export const SchemaCard: React.FC<SchemaCardProps> = ({
  title,
  desc,
  columns,
  constraints,
  indexes
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={title} accentColor="text-muted-foreground" />
      <OpsCardContent className="p-0">
        <OpsText className="px-6 pt-6 pb-4 max-w-4xl leading-relaxed">{desc}</OpsText>

        {/* Columns Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/20">
                <th className="text-left py-3 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Coluna</th>
                <th className="text-left py-3 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Tipo</th>
                <th className="text-left py-3 px-6 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Descricao</th>
              </tr>
            </thead>
            <tbody>
              {columns.map((col, i) => (
                <tr key={i} className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-6 font-mono text-xs">
                    <span style={{ color: col.pk ? '#C9B298' : OPS_ACCENT, fontWeight: col.pk ? 'bold' : 'normal' }}>
                      {col.pk && '* '}{col.name}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <OpsCode className="text-xs text-muted-foreground bg-muted/20 px-1.5 py-0.5 rounded border border-white/5">{col.type}</OpsCode>
                  </td>
                  <td className="py-3 px-6 text-muted-foreground text-xs hidden md:table-cell leading-snug max-w-md">{col.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Constraints & Indexes Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-t border-border/30 bg-muted/5">
          {/* Constraints */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Constraints</h5>
            <div className="flex flex-wrap gap-2">
              {constraints.map((c, i) => (
                <div key={i} className="text-[10px] bg-muted/20 px-3 py-1.5 rounded border border-white/5 flex items-center gap-2">
                  <span className="text-[#C9B298] font-bold">{c.type}:</span>
                  <OpsCode className="text-muted-foreground">{c.target}</OpsCode>
                </div>
              ))}
            </div>
          </div>

          {/* Indexes */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Indexes</h5>
            <div className="space-y-2">
              {indexes.map((idx, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-[10px] bg-muted/20 px-3 py-1.5 rounded border border-white/5">
                  <div className="flex items-center gap-2">
                    <code className="text-cyan-400 font-bold">{idx.name}</code>
                    <span className="text-muted-foreground text-[9px] uppercase">on</span>
                    <code className="text-muted-foreground bg-muted/20 px-1 rounded">{idx.columns}</code>
                  </div>
                  <span className="text-muted-foreground/50 hidden sm:inline">|</span>
                  <span className="text-muted-foreground/70 italic">{idx.reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
