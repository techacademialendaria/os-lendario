import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { OPS_PRIMARY, OPS_KPI_CLASSES } from '../../ops-tokens';
import type { OpsStats } from '@/hooks/useOpsStats';

interface StatCardProps {
  number: number | string;
  label: string;
  icon: string;
  critical?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, icon, critical }) => (
  <Card className={cn(OPS_KPI_CLASSES, critical && "border-red-500/30 ring-1 ring-red-500/20")}>
    <CardContent className="p-4 flex items-start justify-between">
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
        <h3 className={cn("text-2xl font-mono font-bold", critical ? "text-red-400" : "text-foreground")}>{number}</h3>
      </div>
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-sm"
        style={{
          backgroundColor: critical ? 'rgba(239,68,68,0.1)' : `${OPS_PRIMARY}20`,
          color: critical ? '#f87171' : OPS_PRIMARY
        }}
      >
        <Icon name={icon} size="size-4" />
      </div>
    </CardContent>
  </Card>
);

interface SchemaStatsGridProps {
  stats: OpsStats;
}

export const SchemaStatsGrid: React.FC<SchemaStatsGridProps> = ({ stats }) => {
  const totalRels = stats.driverRels + stats.toolRels + stats.fragmentRels;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <StatCard number={stats.drivers} label="Drivers" icon="bolt" />
      <StatCard number={stats.tools} label="Tools" icon="tools" />
      <StatCard number={totalRels} label="Total Rels" icon="link" />
      <StatCard number={stats.systems} label="Systems" icon="chart-pie" />
      <StatCard number={stats.toolAffinities} label="Affinities" icon="bridge" critical={stats.toolAffinities === 0} />
      <StatCard number={stats.mindDrivers} label="Mind Drivers" icon="brain" critical={stats.mindDrivers === 0} />
    </div>
  );
};
