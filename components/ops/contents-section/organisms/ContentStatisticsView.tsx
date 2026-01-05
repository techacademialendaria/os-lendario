import React from 'react';
import { CONTENT_STATISTICS } from '../../data/contents-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent
} from '../../ops-ui';

/**
 * ContentStatisticsView - Statistics about content types and processing metrics
 */
export const ContentStatisticsView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={CONTENT_STATISTICS.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        {/* Average per Mind */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">
            {CONTENT_STATISTICS.avgPerMind.title}
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT_STATISTICS.avgPerMind.data.map((stat, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/10 border border-border/20 text-center hover:border-border/40 transition-colors">
                <div className="text-2xl font-bold mb-1" style={{ color: OPS_ACCENT }}>
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {stat.metric}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Content Type */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">
            {CONTENT_STATISTICS.byContentType.title}
          </h4>
          <div className="overflow-x-auto rounded-lg border border-border/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 bg-muted/20">
                  <th className="text-left py-3 px-4" style={{ color: OPS_ACCENT }}>Tipo</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Palavras</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">MIUs</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Qualidade</th>
                </tr>
              </thead>
              <tbody>
                {CONTENT_STATISTICS.byContentType.data.map((row, i) => (
                  <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{row.type}</td>
                    <td className="py-3 px-4 font-mono text-xs" style={{ color: OPS_ACCENT }}>{row.words}</td>
                    <td className="py-3 px-4 font-mono text-xs" style={{ color: OPS_ACCENT }}>{row.mius}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{row.quality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Processing Metrics */}
        <div>
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">
            {CONTENT_STATISTICS.processingMetrics.title}
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT_STATISTICS.processingMetrics.data.map((metric, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/10 border border-border/20">
                <div className="text-xl font-bold mb-2" style={{ color: OPS_ACCENT }}>
                  {metric.value}
                </div>
                <div className="text-xs text-foreground font-medium mb-1">{metric.metric}</div>
                <div className="text-[10px] text-muted-foreground/70 leading-normal">{metric.notes}</div>
              </div>
            ))}
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
