import React from 'react';
import { cn } from '@/lib/utils';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsText } from '../../ops-ui';
import { MAPPING_EXPLANATION } from '../../data/mapping-content';
import { StarRating, ProgressBar } from '../molecules';
import { OPS_ACCENT } from '../../ops-tokens';

export const SystemComparisonCard: React.FC = () => {
  const { systems, comparison } = MAPPING_EXPLANATION;

  return (
    <OpsCard>
      <OpsCardHeader title={comparison.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-4xl">{comparison.desc}</OpsText>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-y-1">
            <thead>
              <tr>
                {comparison.headers.map((h, i) => (
                  <th key={i} className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap bg-muted/20 first:rounded-l last:rounded-r">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-2">
              {comparison.systems.map((sys, i) => {
                const systemData = systems.find(s => s.shortName === sys.system || s.name.includes(sys.system));
                const color = systemData?.color || OPS_ACCENT;

                return (
                  <tr key={i} className="hover:bg-muted/10 transition-colors group">
                    <td className="py-4 px-4 bg-muted/10 group-hover:bg-muted/20 rounded-l border-y border-l border-white/5">
                      <span className="font-bold flex items-center gap-2" style={{ color }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></span>
                        {sys.system}
                      </span>
                    </td>
                    <td className="py-4 px-4 bg-muted/10 group-hover:bg-muted/20 border-y border-white/5">
                      <StarRating value={sys.scientificValidity} />
                    </td>
                    <td className="py-4 px-4 bg-muted/10 group-hover:bg-muted/20 border-y border-white/5">
                      <StarRating value={sys.practicalUtility} />
                    </td>
                    <td className="py-4 px-4 bg-muted/10 group-hover:bg-muted/20 border-y border-white/5">
                      <span className={cn(
                        'text-[10px] px-2.5 py-1 rounded-full border',
                        sys.granularity === 'facetas' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                        sys.granularity === 'dimensoes' && 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
                        sys.granularity === 'tipos' && 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                        sys.granularity === 'partes' && 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      )}>
                        {sys.granularity}
                      </span>
                    </td>
                    <td className="py-4 px-4 bg-muted/10 group-hover:bg-muted/20 border-y border-white/5">
                      <span className={cn(
                        'text-xs font-medium',
                        sys.replicability === 'alta' && 'text-emerald-400',
                        sys.replicability === 'media' && 'text-amber-400',
                        sys.replicability === 'baixa' && 'text-red-400'
                      )}>
                        {sys.replicability}
                      </span>
                    </td>
                    <td className="py-4 px-4 min-w-[140px] bg-muted/10 group-hover:bg-muted/20 rounded-r border-y border-r border-white/5">
                      <ProgressBar value={sys.driverCoverage} color={color} label={`${sys.driverCoverage}%`} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
