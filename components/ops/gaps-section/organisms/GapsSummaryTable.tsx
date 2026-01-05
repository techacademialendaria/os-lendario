import React from 'react';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsCode,
  OpsBadge,
} from '../../ops-ui';
import { GAPS_TABLE } from '../../data/tables';

export const GapsSummaryTable: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Resumo dos Gaps" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <div className="overflow-x-auto rounded-lg border border-border/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20 bg-muted/20">
                <th className="text-left py-3 px-4 text-xs font-bold text-red-400 uppercase">Gap</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Impacto</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden lg:table-cell">Solucao</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">P</th>
              </tr>
            </thead>
            <tbody>
              {GAPS_TABLE.map((row, i) => (
                <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-4">
                    <OpsCode className="bg-red-500/10 text-red-400">{row.gap}</OpsCode>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell leading-relaxed">
                    {row.impact}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs hidden lg:table-cell leading-relaxed">
                    {row.solution}
                  </td>
                  <td className="py-3 px-4">
                    <OpsBadge
                      variant={row.priority === 'P0' ? 'error' : 'warning'}
                      className="px-2 py-0.5"
                    >
                      {row.priority}
                    </OpsBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
