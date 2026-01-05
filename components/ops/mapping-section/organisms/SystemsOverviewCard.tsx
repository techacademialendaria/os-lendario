import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsCode } from '../../ops-ui';
import { MAPPING_EXPLANATION } from '../../data/mapping-content';

export const SystemsOverviewCard: React.FC = () => {
  const { systems } = MAPPING_EXPLANATION;

  return (
    <OpsCard>
      <OpsCardHeader title="Sistemas Psicometricos" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsGrid columns={2}>
          {systems.map((sys, i) => (
            <div
              key={i}
              className="p-5 rounded-lg bg-muted/20 border-l-4 space-y-4 shadow-sm"
              style={{ borderColor: sys.color }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-muted/20">
                    <Icon name={sys.icon} size="size-5" style={{ color: sys.color }} />
                  </div>
                  <h4 className="font-bold text-base" style={{ color: sys.color }}>{sys.name}</h4>
                </div>
                <span className={cn(
                  'text-[10px] px-2.5 py-1 rounded-full border border-transparent font-medium uppercase tracking-wide',
                  sys.scientificValidity === 'alta' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                  sys.scientificValidity === 'media' && 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                  sys.scientificValidity === 'baixa' && 'bg-red-500/10 text-red-400 border-red-500/20'
                )}>
                  Validade: {sys.scientificValidity}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{sys.desc}</p>

              <div className="flex items-center gap-6 text-xs text-muted-foreground bg-muted/10 p-2 rounded">
                <span><strong className="text-foreground">{sys.dimensions}</strong> dimensoes</span>
                <span className="w-px h-3 bg-white/10"></span>
                <span>{sys.granularity}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {sys.components.slice(0, 8).map((comp, j) => (
                  <OpsCode
                    key={j}
                    className="text-[10px] bg-muted/20 px-2 py-1 rounded border border-white/5"
                    style={{ color: sys.color }}
                  >
                    {comp}
                  </OpsCode>
                ))}
                {sys.components.length > 8 && (
                  <span className="text-[10px] text-muted-foreground self-center px-1">+{sys.components.length - 8}</span>
                )}
              </div>

              <div className="text-xs pt-2 border-t border-border/20 flex justify-between items-center">
                <span className="text-muted-foreground">Driver overlap</span>
                <span className="text-foreground font-mono font-bold" style={{ color: sys.color }}>{sys.driverOverlap}</span>
              </div>
            </div>
          ))}
        </OpsGrid>
      </OpsCardContent>
    </OpsCard>
  );
};
