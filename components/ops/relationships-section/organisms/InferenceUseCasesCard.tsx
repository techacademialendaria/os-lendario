import React from 'react';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText
} from '../../ops-ui';
import { getCorrelationColor } from '../utils';
import type { InferenceUseCasesCardProps } from '../types';

export const InferenceUseCasesCard: React.FC<InferenceUseCasesCardProps> = ({
  title,
  desc,
  useCases,
  confidenceAdjustments
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-8 leading-relaxed max-w-4xl">{desc}</OpsText>

        {/* Use Cases */}
        <OpsGrid columns={2} className="mb-6">
          {useCases.map((useCase, i) => (
            <div key={i} className="p-5 rounded-lg bg-muted/20 border-l-4 shadow-sm" style={{ borderColor: OPS_ACCENT }}>
              <h4 className="font-bold text-base mb-2" style={{ color: OPS_ACCENT }}>{useCase.name}</h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed min-h-[40px]">{useCase.desc}</p>

              <div className="p-3 rounded bg-muted/30 mb-4 border border-white/5">
                <p className="text-xs text-muted-foreground/90 italic flex gap-2">
                  <span className="not-italic opacity-50">Ex:</span>
                  {useCase.example}
                </p>
              </div>

              <div className="bg-muted/30 p-2 rounded mb-4 overflow-x-auto text-center">
                <code className="text-xs font-mono text-emerald-400">
                  {useCase.formula}
                </code>
              </div>

              <div className="mt-auto flex items-center gap-3 pt-2 border-t border-border/30">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Peso:</span>
                <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${useCase.weight * 100}%`, backgroundColor: OPS_ACCENT }}
                  />
                </div>
                <span className="text-xs font-mono font-bold" style={{ color: OPS_ACCENT }}>{useCase.weight}</span>
              </div>
            </div>
          ))}
        </OpsGrid>

        {/* Confidence Adjustments */}
        <div className="p-6 rounded-lg bg-muted/10 border border-border/40">
          <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
            Ajustes de Confianca por Fonte
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {confidenceAdjustments.map((adj, i) => (
              <div key={i} className="flex items-center gap-4 p-2 rounded hover:bg-white/5 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{adj.source}</span>
                    <span className="text-xs font-mono font-bold" style={{ color: getCorrelationColor(adj.baseConfidence) }}>
                      {adj.baseConfidence}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${adj.baseConfidence * 100}%`,
                        backgroundColor: getCorrelationColor(adj.baseConfidence)
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground block truncate">{adj.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
