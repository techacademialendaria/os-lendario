import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsCode,
} from '../../ops-ui';
import { OPS_ACCENT } from '../../ops-tokens';
import { RESOLUTION_ROADMAP } from '../../data/tables';

export const ResolutionRoadmap: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Roadmap de Resolucao" />
      <OpsCardContent>
        <div className="space-y-4">
          {RESOLUTION_ROADMAP.map((step) => (
            <div
              key={step.step}
              className="p-5 rounded-lg border transition-all hover:bg-muted/5"
              style={{
                borderColor: step.status === 'ready' ? OPS_ACCENT : step.status === 'blocked' ? '#64748b' : '#22c55e',
                backgroundColor: step.status === 'ready' ? `${OPS_ACCENT}08` : 'transparent'
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm"
                    style={{
                      backgroundColor: step.status === 'ready' ? OPS_ACCENT : step.status === 'blocked' ? '#64748b' : '#22c55e',
                      color: step.status === 'ready' ? '#000' : '#fff'
                    }}
                  >
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">{step.action}</h4>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{step.phase}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className={`px-2 py-0.5 border ${
                      step.status === 'ready'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        : step.status === 'blocked'
                          ? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}
                  >
                    {step.status === 'ready' ? 'Pronto' : step.status === 'blocked' ? 'Bloqueado' : 'Concluido'}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`px-2 py-0.5 border ${
                      step.automatable
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}
                  >
                    {step.automatable ? 'Auto' : 'Manual'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-border/10 text-xs">
                <div>
                  <span className="text-muted-foreground block mb-1 font-medium">Input</span>
                  <OpsCode className="bg-muted/20 text-foreground">{step.input}</OpsCode>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1 font-medium">Output</span>
                  <OpsCode className="bg-muted/20" style={{ color: OPS_ACCENT }}>{step.output}</OpsCode>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1 font-medium">Esforco</span>
                  <span className="text-purple-400 font-bold">{step.effort} (~{step.effortHours}h)</span>
                </div>
              </div>

              {step.blockedBy.length > 0 && (
                <div className="mt-3 bg-red-500/5 p-2 rounded border border-red-500/10 inline-block">
                  <p className="text-xs text-red-400 font-medium">
                    Depende de: {step.blockedBy.map(s => `Step ${s}`).join(', ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
