import React from 'react';
import {
  JOB_EXECUTIONS_EXPLANATION,
  INGESTION_BATCHES_EXPLANATION,
  PROCESSING_QUEUE_EXPLANATION
} from '../../data/jobs-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText
} from '../../ops-ui';
import { FieldTable } from '../molecules';

/**
 * TablesView - Documentation for job_executions, ingestion_batches, and processing_queue tables
 */
export const TablesView: React.FC = () => {
  return (
    <>
      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Tabelas do Sistema</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* job_executions Table */}
      <OpsCard>
        <OpsCardHeader title={JOB_EXECUTIONS_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground mb-4">{JOB_EXECUTIONS_EXPLANATION.description}</OpsText>

          {/* Key Insights */}
          <div className="space-y-2 mb-4">
            {JOB_EXECUTIONS_EXPLANATION.keyInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: OPS_ACCENT }} />
                <span>{insight}</span>
              </div>
            ))}
          </div>

          {/* Fields Table */}
          <div className="overflow-x-auto">
            <FieldTable fields={JOB_EXECUTIONS_EXPLANATION.fields} />
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* ingestion_batches Table */}
      <OpsCard>
        <OpsCardHeader title={INGESTION_BATCHES_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground mb-4">{INGESTION_BATCHES_EXPLANATION.description}</OpsText>

          <div className="space-y-2 mb-4">
            {INGESTION_BATCHES_EXPLANATION.keyInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-500" />
                <span>{insight}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <FieldTable fields={INGESTION_BATCHES_EXPLANATION.fields} />
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* processing_queue Table */}
      <OpsCard>
        <OpsCardHeader title={PROCESSING_QUEUE_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground mb-4">{PROCESSING_QUEUE_EXPLANATION.description}</OpsText>

          <div className="space-y-2 mb-4">
            {PROCESSING_QUEUE_EXPLANATION.keyInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500" />
                <span>{insight}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <FieldTable fields={PROCESSING_QUEUE_EXPLANATION.fields} />
          </div>
        </OpsCardContent>
      </OpsCard>
    </>
  );
};
