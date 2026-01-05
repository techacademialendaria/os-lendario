import React from 'react';
import { cn } from '@/lib/utils';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsText, OpsCode } from '../../ops-ui';
import { MAPPING_EXPLANATION } from '../../data/mapping-content';
import { OPS_ACCENT } from '../../ops-tokens';

export const ComponentDriverMapCard: React.FC = () => {
  const { componentDriverMap } = MAPPING_EXPLANATION;

  return (
    <OpsCard>
      <OpsCardHeader title={componentDriverMap.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="text-sm text-muted-foreground leading-relaxed max-w-4xl mb-6">{componentDriverMap.desc}</OpsText>

        {/* Relevance Types Legend */}
        <div className="flex flex-wrap gap-4 p-4 rounded-lg bg-muted/10 border border-border/20 mb-4">
          {componentDriverMap.relevanceTypes.map((rel, i) => (
            <div key={i} className="flex items-center gap-3 bg-muted/20 px-3 py-1.5 rounded-full">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: rel.color, boxShadow: `0 0 8px ${rel.color}` }}
              />
              <span className="text-xs">
                <strong style={{ color: rel.color }}>{rel.type}</strong>
                <span className="text-muted-foreground ml-1.5 hidden sm:inline border-l border-white/10 pl-1.5 max-w-md">{rel.desc}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Driver Mapping Examples */}
        <div className="space-y-4">
          {componentDriverMap.examples.map((ex, i) => (
            <div key={i} className="p-5 rounded-lg bg-muted/20 border border-transparent hover:border-border/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: OPS_ACCENT }}></div>
                <OpsCode className="text-sm font-bold bg-muted/20 px-2 py-1 rounded" style={{ color: OPS_ACCENT }}>{ex.driver}</OpsCode>
                <span className="text-[10px] px-2 py-1 rounded bg-muted text-muted-foreground uppercase tracking-wider font-medium">{ex.driverType}</span>
              </div>
              <OpsGrid columns={3} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ex.mappings.map((map, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/20 border-l-4 transition-all hover:translate-x-1"
                    style={{
                      borderColor: componentDriverMap.relevanceTypes.find(r => r.type === map.relevance)?.color
                    }}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wider block mb-0.5">{map.system}</span>
                      <span className="text-sm text-foreground truncate block font-medium">{map.component}</span>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        'text-xs font-mono font-bold bg-muted/30 px-1.5 py-0.5 rounded',
                        map.weight > 0 ? 'text-emerald-400' : 'text-red-400'
                      )}>
                        {map.weight > 0 ? '+' : ''}{map.weight.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </OpsGrid>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
