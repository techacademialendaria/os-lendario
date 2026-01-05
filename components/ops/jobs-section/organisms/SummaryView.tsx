import React from 'react';
import { OPS_ACCENT } from '../../ops-tokens';
import { OpsCode } from '../../ops-ui';

/**
 * SummaryView - Bottom summary of the jobs system
 */
export const SummaryView: React.FC = () => {
  return (
    <div className="p-4 rounded-xl border-l-4" style={{ borderColor: OPS_ACCENT, backgroundColor: `${OPS_ACCENT}10` }}>
      <p className="text-sm mb-2"><strong>Sistema de Jobs:</strong></p>
      <ul className="text-sm space-y-1 text-muted-foreground">
        <li>
          <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>job_executions</OpsCode>
          = Cada chamada LLM com metricas de custo/performance
        </li>
        <li>
          <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>ingestion_batches</OpsCode>
          = Agrupa operacoes de import em lotes
        </li>
        <li>
          <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>processing_queue</OpsCode>
          = Fila com prioridade e retry automatico
        </li>
        <li>
          <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>generation_execution_id</OpsCode>
          = FK que conecta entidades geradas ao job (Rastreabilidade)
        </li>
      </ul>
    </div>
  );
};
