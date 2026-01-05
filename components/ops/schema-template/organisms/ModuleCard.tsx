import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { OPS_CARD_CLASSES, getTableStatusColors, OpsTableStatus } from '../../ops-tokens';
import type { ModuleStats } from '../types';

interface StatusBadgeProps {
  status: OpsTableStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = getTableStatusColors(status);
  const labels = { ok: 'OK', partial: 'PARCIAL', empty: 'VAZIO', proposed: 'PROPOSTO' };
  return (
    <Badge className={cn(config.bg, config.text, config.border, "border text-[10px] uppercase tracking-wider shadow-sm")}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse", config.dot)} />
      {labels[status]}
    </Badge>
  );
};

interface ModuleCardProps {
  module: ModuleStats;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => (
  <Card className={OPS_CARD_CLASSES}>
    <CardHeader className="border-b border-border/40 pb-3 bg-muted/5">
      <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <Icon name={module.icon} size="size-4" className="text-muted-foreground/70" />
        {module.title}
        <span className="ml-auto text-xs font-normal normal-case opacity-50">{module.tables.length} tabelas</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <table className="w-full text-sm">
        <tbody>
          {module.tables.map((table, i) => (
            <tr key={i} className="border-b border-border/10 last:border-0 hover:bg-muted/10 transition-colors">
              <td className="py-3 px-4">
                <code className="text-xs font-mono font-medium text-foreground/90">{table.name}</code>
              </td>
              <td className="py-3 px-4 font-mono text-right text-muted-foreground/80">{table.records}</td>
              <td className="py-3 px-4 text-right"><StatusBadge status={table.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardContent>
  </Card>
);
