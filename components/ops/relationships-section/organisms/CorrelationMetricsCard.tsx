import React from 'react';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsCode
} from '../../ops-ui';
import type { CorrelationMetricsCardProps } from '../types';

export const CorrelationMetricsCard: React.FC<CorrelationMetricsCardProps> = ({
  title,
  desc,
  metrics,
  qualityTiers
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-8 leading-relaxed max-w-4xl">{desc}</OpsText>

        <OpsGrid columns={2} className="mb-6">
          {metrics.map((metric, i) => (
            <div key={i} className="p-5 rounded-lg bg-muted/20 border-l-4 shadow-sm" style={{ borderColor: metric.color }}>
              <div className="flex items-center gap-3 mb-3">
                <OpsCode className="text-sm font-bold px-2 py-1 rounded" style={{ backgroundColor: `${metric.color}15`, color: metric.color }}>
                  {metric.symbol}
                </OpsCode>
                <span className="text-base font-medium text-foreground">{metric.metric}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{metric.desc}</p>
              <div className="flex justify-between items-end border-t border-border/30 pt-3">
                <p className="text-xs text-muted-foreground/80 italic pr-4">{metric.interpretation}</p>
                <div className="text-[10px] text-muted-foreground shrink-0 bg-muted/20 px-2 py-1 rounded">
                  Range: <OpsCode className="font-mono text-[10px] bg-transparent p-0">{metric.range}</OpsCode>
                </div>
              </div>
            </div>
          ))}
        </OpsGrid>

        {/* Quality Tiers */}
        <div className="p-6 rounded-lg bg-muted/10 border border-border/40">
          <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-muted-foreground/30 rounded-full"></span>
            Niveis de Qualidade da Evidencia
          </h5>
          <OpsGrid columns={4}>
            {qualityTiers.map((tier, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/20 text-center border border-white/5 hover:border-white/10 transition-colors">
                <div className="text-lg font-bold mb-1" style={{ color: tier.color }}>
                  {tier.label}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono mb-2 px-2 py-0.5 rounded bg-muted/30 inline-block border border-white/5">
                  {tier.criteria}
                </div>
                <div className="text-xs text-muted-foreground leading-tight px-2">{tier.desc}</div>
              </div>
            ))}
          </OpsGrid>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
