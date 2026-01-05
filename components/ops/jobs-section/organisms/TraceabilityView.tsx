import React from 'react';
import { Badge } from '../../../ui/badge';
import { JOB_ENTITY_RELATIONSHIPS, ERROR_HANDLING } from '../../data/jobs-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsCode
} from '../../ops-ui';

/**
 * TraceabilityView - Entity relationships and error handling documentation
 */
export const TraceabilityView: React.FC = () => {
  return (
    <>
      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Rastreabilidade e Erros</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Entity Relationships */}
      <OpsCard>
        <OpsCardHeader title={JOB_ENTITY_RELATIONSHIPS.title} />
        <OpsCardContent>
          <OpsText className="text-muted-foreground text-sm mb-4">{JOB_ENTITY_RELATIONSHIPS.description}</OpsText>

          {/* Linked Tables */}
          <OpsGrid columns={2} className="mb-4">
            {JOB_ENTITY_RELATIONSHIPS.linkedTables.map((table, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20 border-l-2" style={{ borderColor: OPS_ACCENT }}>
                <div className="flex items-center gap-2 mb-2">
                  <OpsCode className="text-sm font-bold" style={{ color: OPS_ACCENT }}>{table.table}</OpsCode>
                  <Badge variant="outline" className="text-[10px]">{table.field}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{table.desc}</p>
                <p className="text-xs text-foreground mt-1 italic">{table.example}</p>
              </div>
            ))}
          </OpsGrid>

          {/* Use Cases */}
          <div>
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Casos de Uso</h4>
            <div className="space-y-2">
              {JOB_ENTITY_RELATIONSHIPS.useCases.map((uc, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/10 border border-border/30">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                    <span className="font-medium text-foreground text-sm">{uc.name}</span>
                    <OpsCode className="text-[10px] text-muted-foreground bg-muted/20">
                      {uc.query}
                    </OpsCode>
                  </div>
                  <p className="text-xs text-emerald-400">{uc.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Error Handling */}
      <OpsCard>
        <OpsCardHeader title={ERROR_HANDLING.title} />
        <OpsCardContent>
          <OpsText className="text-muted-foreground text-sm mb-6">{ERROR_HANDLING.description}</OpsText>

          {/* Retry Strategy */}
          <div className="p-4 rounded-lg bg-muted/20 border border-border/50 mb-6">
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Estrategia de Retry</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-2 rounded bg-muted/20">
                <div className="text-lg font-bold" style={{ color: OPS_ACCENT }}>{ERROR_HANDLING.retryStrategy.maxAttempts}</div>
                <div className="text-[10px] text-muted-foreground">Max Tentativas</div>
              </div>
              <div className="p-2 rounded bg-muted/20">
                <div className="text-lg font-bold" style={{ color: OPS_ACCENT }}>{ERROR_HANDLING.retryStrategy.initialDelay}ms</div>
                <div className="text-[10px] text-muted-foreground">Delay Inicial</div>
              </div>
              <div className="p-2 rounded bg-muted/20">
                <div className="text-lg font-bold" style={{ color: OPS_ACCENT }}>{ERROR_HANDLING.retryStrategy.backoffMultiplier}x</div>
                <div className="text-[10px] text-muted-foreground">Backoff</div>
              </div>
              <div className="p-2 rounded bg-muted/20">
                <div className="text-lg font-bold" style={{ color: OPS_ACCENT }}>{ERROR_HANDLING.retryStrategy.maxDelay / 1000}s</div>
                <div className="text-[10px] text-muted-foreground">Max Delay</div>
              </div>
            </div>
          </div>

          {/* Error Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Categorias de Erro</h4>
            <OpsGrid columns={2}>
              {ERROR_HANDLING.errorCategories.map((cat, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border"
                  style={{
                    backgroundColor: cat.recoverable ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                    borderColor: cat.recoverable ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-foreground text-sm">{cat.category}</span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${cat.recoverable ? 'text-emerald-400 border-emerald-400/30' : 'text-red-400 border-red-400/30'}`}
                    >
                      {cat.recoverable ? 'Recuperavel' : 'Permanente'}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {cat.examples.join(', ')}
                  </div>
                  <p className="text-xs" style={{ color: cat.recoverable ? '#22c55e' : '#ef4444' }}>
                    Acao: {cat.action}
                  </p>
                </div>
              ))}
            </OpsGrid>
          </div>
        </OpsCardContent>
      </OpsCard>
    </>
  );
};
