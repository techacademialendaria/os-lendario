import React from 'react';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsLabel,
} from '../../ops-ui';
import { OPS_ACCENT } from '../../ops-tokens';
import type { OpsStats } from '@/hooks/useOpsStats';
import { calculateGapCounts } from '../data';

interface CurrentDataStatusProps {
  stats?: OpsStats;
  loading?: boolean;
}

export const CurrentDataStatus: React.FC<CurrentDataStatusProps> = ({ stats, loading }) => {
  const gapCounts = calculateGapCounts(stats);

  return (
    <OpsCard>
      <OpsCardHeader title="Status dos Dados Atuais" />
      <OpsCardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 rounded-xl bg-muted/10 border border-border/20">
            <div className="text-2xl font-bold text-foreground mb-1">
              {loading ? <span className="animate-pulse">...</span> : stats?.contents ?? 0}
            </div>
            <OpsLabel>Total Contents</OpsLabel>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted/10 border border-border/20">
            <div className="text-2xl font-bold text-emerald-400 mb-1">
              {loading ? <span className="animate-pulse">...</span> : stats?.contentsWithTranscription ?? 0}
            </div>
            <OpsLabel>Com Texto</OpsLabel>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted/10 border border-border/20">
            <div className="text-2xl font-bold text-amber-400 mb-1">
              {loading ? <span className="animate-pulse">...</span> : gapCounts.drivers}
            </div>
            <OpsLabel>Drivers</OpsLabel>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted/10 border border-border/20">
            <div className="text-2xl font-bold mb-1" style={{ color: OPS_ACCENT }}>
              {loading ? <span className="animate-pulse">...</span> : gapCounts.fragments}
            </div>
            <OpsLabel>Fragments (MIUs)</OpsLabel>
          </div>
        </div>

        {stats && stats.contents > 0 && (
          <div className="space-y-3 bg-muted/5 p-4 rounded-lg border border-border/10">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
              <span className="text-muted-foreground">Contents com Texto</span>
              <span style={{ color: OPS_ACCENT }}>
                {Math.round((stats.contentsWithTranscription / stats.contents) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(stats.contentsWithTranscription / stats.contents) * 100}%`,
                  backgroundColor: OPS_ACCENT
                }}
              />
            </div>
          </div>
        )}
      </OpsCardContent>
    </OpsCard>
  );
};
