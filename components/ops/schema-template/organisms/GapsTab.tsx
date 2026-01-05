import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';
import { OPS_CARD_CLASSES } from '../../ops-tokens';
import { CRITICAL_GAPS, DRIVER_FIELD_GAPS, TOOL_FIELD_GAPS } from '../data';

interface ProgressBarProps {
  pct: number;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ pct, label }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm text-foreground w-32">{label}</span>
    <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${pct}%`,
          backgroundColor: pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444'
        }}
      />
    </div>
    <span className="text-sm font-mono w-12 text-right">{pct}%</span>
  </div>
);

export const GapsTab: React.FC = () => {
  return (
    <TabsContent value="gaps" className="space-y-6">
      <Card className={OPS_CARD_CLASSES} style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
        <CardHeader className="border-b border-red-500/20 pb-3">
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-red-400">
            Critical Gaps - Blocking Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-xs font-bold text-red-400 uppercase">Tabela</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Impacto</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden lg:table-cell">Solucao</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">P</th>
              </tr>
            </thead>
            <tbody>
              {CRITICAL_GAPS.map((gap, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-muted/30">
                  <td className="py-3 px-4"><code className="text-xs font-mono text-red-400">{gap.table}</code></td>
                  <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell">{gap.impact}</td>
                  <td className="py-3 px-4 text-muted-foreground text-xs hidden lg:table-cell">{gap.solution}</td>
                  <td className="py-3 px-4">
                    <Badge className={gap.priority === 'P0' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}>
                      {gap.priority}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={OPS_CARD_CLASSES}>
          <CardHeader className="border-b border-border/50 pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              drivers (849 total) - Field Completeness
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {DRIVER_FIELD_GAPS.map((gap, i) => (
              <ProgressBar key={i} label={gap.field} pct={gap.pct} />
            ))}
          </CardContent>
        </Card>

        <Card className={OPS_CARD_CLASSES}>
          <CardHeader className="border-b border-border/50 pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              tools (200 total) - Field Completeness
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {TOOL_FIELD_GAPS.map((gap, i) => (
              <ProgressBar key={i} label={gap.field} pct={gap.pct} />
            ))}
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};
