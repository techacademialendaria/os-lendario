import React from 'react';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsCode,
  OpsBadge,
  OpsLabel,
  OpsText,
} from '../../ops-ui';
import { GAP_IMPACTS } from '../../data/tables';

export const GapImpactAnalysis: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Analise de Impacto por Gap" />
      <OpsCardContent>
        <div className="space-y-6">
          {GAP_IMPACTS.map((gap, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border-l-4 shadow-sm"
              style={{
                borderColor: gap.currentCount === 0 ? '#ef4444' : '#f59e0b',
                backgroundColor: gap.currentCount === 0 ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.05)'
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <OpsCode className="text-base text-red-400 bg-red-500/10 px-2 py-1">{gap.table}</OpsCode>
                  <span className="text-sm text-foreground/80 font-medium">= {gap.currentCount} registros</span>
                </div>
                <div className="flex gap-2">
                  <OpsBadge variant={gap.automatable ? 'success' : 'warning'} className="px-2 py-0.5">
                    {gap.automatable ? 'Automatizavel' : 'Manual'}
                  </OpsBadge>
                  <OpsBadge variant="info" className="px-2 py-0.5">{gap.effortEstimate}</OpsBadge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <OpsLabel>Causa Raiz</OpsLabel>
                  <OpsText className="text-foreground">{gap.rootCause}</OpsText>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-500/5 p-4 rounded-lg border border-red-500/10">
                    <h5 className="text-xs font-bold text-red-400 uppercase mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Bloqueado Por
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {gap.blockedBy.map((b, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <code className="text-xs bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded">{b}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-500/5 p-4 rounded-lg border border-amber-500/10">
                    <h5 className="text-xs font-bold text-amber-400 uppercase mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Bloqueando
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {gap.blocking.map((b, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <code className="text-xs bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded">{b}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <h5 className="text-xs font-bold text-emerald-400 uppercase mb-2">Passos para Resolucao</h5>
                  <div className="bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/10">
                    <ol className="text-sm text-foreground/90 space-y-2 list-decimal list-inside marker:text-emerald-500/70">
                      {gap.resolutionSteps.map((step, j) => (
                        <li key={j} className="leading-relaxed">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
