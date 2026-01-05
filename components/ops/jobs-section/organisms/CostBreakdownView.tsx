import React from 'react';
import { EXAMPLE_JOB_EXECUTION, COST_TRACKING } from '../../data/jobs-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsCode
} from '../../ops-ui';

/**
 * CostBreakdownCard - Displays a real example of job cost breakdown
 */
const CostBreakdownCard: React.FC = () => {
  const { costBreakdown, job } = EXAMPLE_JOB_EXECUTION;

  return (
    <OpsCard>
      <OpsCardHeader title="Breakdown de Custo - Exemplo Real" />
      <OpsCardContent>
        {/* Job Info */}
        <OpsGrid columns={3}>
          <div className="p-3 rounded-lg bg-muted/20 flex flex-col items-center justify-center text-center space-y-2 border border-border/40">
            <div className="text-xs text-muted-foreground uppercase mb-1">Provider</div>
            <div className="text-sm font-medium text-foreground">{job.llm_provider}</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/20">
            <div className="text-xs text-muted-foreground uppercase mb-1">Modelo</div>
            <div className="text-sm font-medium text-foreground">{job.llm_model.split('-').slice(0, 3).join('-')}</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/20">
            <div className="text-xs text-muted-foreground uppercase mb-1">Latencia</div>
            <div className="text-sm font-medium text-foreground">{(job.latency_ms / 1000).toFixed(2)}s</div>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10">
            <div className="text-xs text-emerald-400 uppercase mb-1">Status</div>
            <div className="text-sm font-medium text-emerald-400">{job.status}</div>
          </div>
        </OpsGrid>

        {/* Token Breakdown */}
        <div className="p-4 rounded-lg bg-muted/20 border border-border/50 mt-4">
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Tokens & Custo</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Prompt Tokens</span>
                <span className="font-mono" style={{ color: OPS_ACCENT }}>{costBreakdown.promptTokens.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">@ $3.00/1M</span>
                <span className="font-mono text-foreground">${costBreakdown.promptCost.toFixed(4)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Completion Tokens</span>
                <span className="font-mono" style={{ color: OPS_ACCENT }}>{costBreakdown.completionTokens.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">@ $15.00/1M</span>
                <span className="font-mono text-foreground">${costBreakdown.completionCost.toFixed(4)}</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-xs text-emerald-400 uppercase mb-1">Total</div>
              <div className="text-lg font-bold text-emerald-400">${costBreakdown.totalCost.toFixed(4)}</div>
              <div className="text-[10px] text-muted-foreground mt-1">
                ${costBreakdown.costPerMIU.toFixed(4)} por MIU
              </div>
            </div>
          </div>
        </div>

        {/* Result Summary */}
        <OpsGrid columns={4} className="mt-4">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-center">
            <div className="text-2xl font-bold text-emerald-400">{job.result.mius_extracted}</div>
            <div className="text-xs text-muted-foreground">MIUs Extraidos</div>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-center">
            <div className="text-2xl font-bold text-emerald-400">{job.result.validation_passed}</div>
            <div className="text-xs text-muted-foreground">Validados</div>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 text-center">
            <div className="text-2xl font-bold text-red-400">{job.result.validation_failed}</div>
            <div className="text-xs text-muted-foreground">Rejeitados</div>
          </div>
          <div className="p-3 rounded-lg bg-muted/20 text-center">
            <div className="text-2xl font-bold text-foreground">{job.result.processing_time_s}s</div>
            <div className="text-xs text-muted-foreground">Tempo Total</div>
          </div>
        </OpsGrid>

        {/* Linked Entities */}
        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Entidades Vinculadas</h4>
          <div className="space-y-1.5">
            {EXAMPLE_JOB_EXECUTION.linkedEntities.map((entity, i) => (
              <div key={i} className="flex items-center gap-3 text-xs p-2 rounded bg-muted/10">
                <OpsCode className="font-mono px-1.5 py-0.5 rounded bg-muted/30" style={{ color: OPS_ACCENT }}>
                  {entity.entity}
                </OpsCode>
                <span className="text-muted-foreground">{entity.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

/**
 * CostBreakdownView - Cost tracking section with example breakdown and pricing reference
 */
export const CostBreakdownView: React.FC = () => {
  return (
    <>
      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Custo e Metricas</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Cost Breakdown Example */}
      <CostBreakdownCard />

      {/* Pricing Reference */}
      <OpsCard>
        <OpsCardHeader title={COST_TRACKING.pricingReference.title} />
        <OpsCardContent>
          {COST_TRACKING.pricingReference.providers.map((provider, i) => (
            <div key={i} className="space-y-2 mb-4 last:mb-0">
              <h4 className="text-sm font-bold text-foreground">{provider.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {provider.models.map((model, j) => (
                  <div key={j} className="p-3 rounded-lg bg-muted/20 text-xs">
                    <div className="font-mono font-medium text-foreground mb-2">{model.model}</div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Prompt:</span>
                      <span className="font-mono">${model.promptPrice.toFixed(2)}/1M</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Completion:</span>
                      <span className="font-mono">${model.completionPrice.toFixed(2)}/1M</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </OpsCardContent>
      </OpsCard>

      {/* Aggregation Queries */}
      <OpsCard>
        <OpsCardHeader title="Agregacoes de Custo" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsGrid columns={3}>
            {COST_TRACKING.aggregations.map((agg, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                <div className="font-medium text-foreground text-sm mb-1">{agg.metric}</div>
                <OpsCode className="text-[10px] text-muted-foreground font-mono">{agg.query}</OpsCode>
                <p className="text-xs text-muted-foreground mt-2">{agg.insight}</p>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>
    </>
  );
};
