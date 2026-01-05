import React from 'react';
import { cn } from '@/lib/utils';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText
} from '../../ops-ui';
import type { DriverClustersCardProps } from '../types';

export const DriverClustersCard: React.FC<DriverClustersCardProps> = ({
  title,
  desc,
  clusters,
  interClusterRelations,
  networkDiagram
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-6 leading-relaxed max-w-4xl">{desc}</OpsText>

        {/* Network Diagram */}
        <div className="mb-8 p-4 rounded-xl bg-muted/20 border border-white/5">
          <MermaidDiagram chart={networkDiagram} id="driver-network" />
        </div>

        {/* Cluster Cards */}
        <OpsGrid columns={3} className="mb-8">
          {clusters.map((cluster, i) => (
            <div key={i} className="p-5 rounded-lg bg-muted/20 border-l-4 shadow-sm" style={{ borderColor: cluster.color }}>
              <h4 className="font-bold text-base mb-2 flex items-center gap-2" style={{ color: cluster.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cluster.color }}></span>
                {cluster.name}
              </h4>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed h-10 overflow-hidden">{cluster.description}</p>
              <div className="space-y-1.5 bg-muted/10 p-3 rounded-lg">
                {cluster.drivers.map((driver, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <code
                      className={cn(
                        "text-xs px-2 py-0.5 rounded transition-all",
                        driver.slug === cluster.coreDriver ? 'font-bold pl-2' : 'text-muted-foreground'
                      )}
                      style={driver.slug === cluster.coreDriver ? {
                        backgroundColor: `${cluster.color}20`,
                        color: cluster.color,
                        borderLeft: `2px solid ${cluster.color}`
                      } : {}}
                    >
                      {driver.slug}
                    </code>
                    {driver.r && (
                      <span className="text-[10px] font-mono text-muted-foreground/70">r={driver.r.toFixed(2)}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </OpsGrid>

        {/* Inter-cluster relations */}
        <div className="mt-8 p-6 rounded-lg bg-muted/10 border border-border/40">
          <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Relacoes Inter-Cluster Principais</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {interClusterRelations.map((rel, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors border-b border-border/20 last:border-0 md:border-b-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground font-medium">{rel.from}</span>
                  <span className="text-muted-foreground/30">&#8596;</span>
                  <span className="text-muted-foreground font-medium">{rel.to}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("font-mono font-bold text-sm", rel.r > 0 ? 'text-emerald-400' : 'text-red-400')}>
                    {rel.r > 0 ? '+' : ''}{rel.r.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-muted-foreground/50 italic text-right w-24 hidden sm:block truncate">{rel.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
