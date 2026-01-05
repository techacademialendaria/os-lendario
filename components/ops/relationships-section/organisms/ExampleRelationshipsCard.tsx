import React from 'react';
import { cn } from '@/lib/utils';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
  OpsCode
} from '../../ops-ui';
import { getCorrelationColor } from '../utils';
import type { ExampleRelationshipsCardProps } from '../types';

export const ExampleRelationshipsCard: React.FC<ExampleRelationshipsCardProps> = ({
  title,
  desc,
  examples
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-6 leading-relaxed">{desc}</OpsText>
        <div className="space-y-4">
          {examples.map((ex, i) => (
            <div key={i} className="p-5 rounded-lg bg-muted/20 border-l-4 shadow-sm hover:bg-muted/30 transition-colors" style={{ borderColor: getCorrelationColor(ex.r) }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <div className="flex flex-wrap items-center gap-3">
                  <OpsCode className="text-sm font-bold bg-muted/20 px-2 py-1 rounded" style={{ color: OPS_ACCENT }}>{ex.driverA}</OpsCode>
                  <div className="flex flex-col items-center">
                    <span className={cn("text-base font-mono font-bold", ex.r > 0 ? 'text-emerald-400' : 'text-red-400')}>
                      {ex.r > 0 ? '+' : ''}{ex.r.toFixed(2)}
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{ex.type}</span>
                  </div>
                  <OpsCode className="text-sm font-bold bg-muted/20 px-2 py-1 rounded" style={{ color: OPS_ACCENT }}>{ex.driverB}</OpsCode>
                </div>

                <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                  <span className="bg-muted/30 px-2 py-1 rounded text-muted-foreground border border-white/5">
                    k={ex.k}
                  </span>
                  <span className="bg-muted/30 px-2 py-1 rounded text-muted-foreground border border-white/5">
                    N={ex.n.toLocaleString()}
                  </span>
                  <span className="bg-muted/30 px-2 py-1 rounded text-muted-foreground border border-white/5">
                    CI [{ex.ci[0]}, {ex.ci[1]}]
                  </span>
                  <span className="px-2 py-1 rounded border" style={{
                    backgroundColor: ex.qualityTier === 'gold' ? '#CD7F3220' : '#c0c0c020',
                    borderColor: ex.qualityTier === 'gold' ? '#C9B298' : '#c0c0c0',
                    color: ex.qualityTier === 'gold' ? '#C9B298' : '#c0c0c0'
                  }}>
                    {ex.qualityTier.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3 mt-1">{ex.interpretation}</p>

              <div className="mt-3 flex justify-end">
                <a
                  href={`https://doi.org/${ex.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                >
                  DOI: {ex.doi} &#8599;
                </a>
              </div>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
