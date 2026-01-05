import React from 'react';
import { INGESTION_PIPELINE } from '../../data/contents-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent
} from '../../ops-ui';

/**
 * IngestionPipelineView - Step-by-step ingestion pipeline visualization
 */
export const IngestionPipelineView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Etapas de Ingestao" />
      <OpsCardContent>
        <div className="space-y-8 pl-2">
          {INGESTION_PIPELINE.map((step, index) => (
            <div key={step.step} className="relative group">
              {/* Connector Line */}
              {index < INGESTION_PIPELINE.length - 1 && (
                <div
                  className="absolute left-[1.15rem] top-10 w-0.5 h-[calc(100%+1.5rem)] opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: OPS_ACCENT }}
                />
              )}

              <div className="flex gap-6">
                {/* Step Number */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg z-10 relative"
                  style={{ backgroundColor: OPS_ACCENT, color: '#000' }}
                >
                  {step.step}
                </div>

                <div className="flex-1 pb-4">
                  <h4 className="font-bold text-base mb-2 flex items-center gap-3" style={{ color: OPS_ACCENT }}>
                    {step.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-3xl">
                    {step.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
                    <div className="p-3 rounded bg-muted/10 border border-border/20">
                      <span className="text-muted-foreground font-bold tracking-wide block mb-1">INPUT</span>
                      <span className="text-foreground">{step.input}</span>
                    </div>
                    <div className="p-3 rounded bg-emerald-500/5 border border-emerald-500/10">
                      <span className="text-emerald-400 font-bold tracking-wide block mb-1">OUTPUT</span>
                      <span className="text-foreground">{step.output}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {step.tables.map((table, i) => (
                      <code
                        key={i}
                        className="text-[10px] bg-muted/30 px-2 py-1 rounded border border-white/5"
                        style={{ color: OPS_ACCENT }}
                      >
                        {table}
                      </code>
                    ))}
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
