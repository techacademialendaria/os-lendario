import React from 'react';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import { JOB_METRICS, JOB_ER_DIAGRAM } from '../../data/jobs-content';
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
 * MetricsView - Operational metrics, dashboard queries, and ER diagram
 */
export const MetricsView: React.FC = () => {
  return (
    <>
      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Metricas Operacionais</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Key Metrics */}
      <OpsCard>
        <OpsCardHeader title={JOB_METRICS.title} />
        <OpsCardContent>
          <OpsText className="text-muted-foreground text-sm mb-4">{JOB_METRICS.description}</OpsText>

          <OpsGrid columns={3}>
            {JOB_METRICS.keyMetrics.map((metric, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                <div className="font-medium text-foreground text-sm mb-2">{metric.name}</div>
                <div className="text-xs text-muted-foreground font-mono mb-2">{metric.formula}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-400">Target: {metric.target}</span>
                  <span className="text-red-400">Alert: {metric.alert}</span>
                </div>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Dashboard Queries */}
      <OpsCard>
        <OpsCardHeader title="Queries para Dashboard" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="space-y-4">
            {JOB_METRICS.dashboardQueries.map((query, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/20">
                <h4 className="text-sm font-medium text-foreground mb-2">{query.title}</h4>
                <pre className="text-xs font-mono text-muted-foreground bg-muted/30 p-3 rounded overflow-x-auto">
                  {query.sql}
                </pre>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* ER Diagram */}
      <OpsCard>
        <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={JOB_ER_DIAGRAM} id="jobs-er" />
        </OpsCardContent>
      </OpsCard>

      {/* Key Insight Box */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
        <h4 className="text-sm font-bold text-emerald-400 mb-2">Insight Chave: Rastreabilidade Completa</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Cada entidade gerada (MIU, fragment, content) pode ser rastreada ate o job que a criou,
          incluindo qual modelo foi usado, quanto custou, e quanto tempo levou. Isso permite:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-2 rounded bg-muted/30 text-center">
            <div className="font-bold text-emerald-400">Auditoria</div>
            <div className="text-muted-foreground">Validar qualidade por modelo</div>
          </div>
          <div className="p-2 rounded bg-muted/30 text-center">
            <div className="font-bold text-emerald-400">Otimizacao</div>
            <div className="text-muted-foreground">Identificar gargalos de custo</div>
          </div>
          <div className="p-2 rounded bg-muted/30 text-center">
            <div className="font-bold text-emerald-400">Rollback</div>
            <div className="text-muted-foreground">Reverter dados problematicos</div>
          </div>
        </div>
      </div>
    </>
  );
};
