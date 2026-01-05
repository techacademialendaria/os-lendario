import React from 'react';
import { Icon } from '../../../ui/icon';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import { JOBS_DIAGRAM } from '../../data/jobs-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsCode
} from '../../ops-ui';

/**
 * OverviewView - Jobs system overview diagram and quick summary
 */
export const OverviewView: React.FC = () => {
  return (
    <>
      {/* Overview Diagram */}
      <OpsCard>
        <OpsCardHeader title="Sistema de Jobs - Visao Geral" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={JOBS_DIAGRAM} id="jobs-overview" />
        </OpsCardContent>
      </OpsCard>

      {/* Quick Summary */}
      <div className="p-4 rounded-xl border-l-4" style={{ borderColor: OPS_ACCENT, backgroundColor: `${OPS_ACCENT}10` }}>
        <div className="space-y-3 text-sm">
          <p>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>job_executions</OpsCode>
            <strong>= Registro de cada chamada LLM</strong> com tokens, custo, latencia e resultado
          </p>
          <p>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>ingestion_batches</OpsCode>
            <strong>= Agrupa operacoes em lotes</strong> para imports em massa
          </p>
          <p>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>processing_queue</OpsCode>
            <strong>= Fila de tarefas</strong> com prioridade e retry automatico
          </p>
          <p>
            <OpsCode className="bg-muted/30 mr-1" style={{ color: OPS_ACCENT }}>generation_execution_id</OpsCode>
            <strong>= FK em fragments/mius/contents</strong> <Icon name="arrow-right" size="size-3" className="inline-block" /> rastreia qual job gerou cada entidade
          </p>
        </div>
      </div>
    </>
  );
};
