import React from 'react';
import { MermaidDiagram } from '../../components/MermaidDiagram';
import { JOB_LIFECYCLE, JOB_LIFECYCLE_DIAGRAM } from '../../data/jobs-content';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid
} from '../../ops-ui';
import { StatusBadge } from '../molecules';

/**
 * LifecycleView - Job states and transitions with state diagram
 */
export const LifecycleView: React.FC = () => {
  return (
    <>
      {/* Section Divider */}
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold uppercase text-muted-foreground">Ciclo de Vida do Job</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Job Lifecycle */}
      <OpsCard>
        <OpsCardHeader title="Estados e Transicoes" accentColor="text-muted-foreground" />
        <OpsCardContent>
          {/* State Diagram */}
          <div className="mb-6">
            <MermaidDiagram chart={JOB_LIFECYCLE_DIAGRAM} id="job-lifecycle" />
          </div>

          {/* Status Cards */}
          <OpsGrid columns={3}>
            {JOB_LIFECYCLE.map((state) => (
              <div
                key={state.status}
                className="p-3 rounded-lg text-center"
                style={{ backgroundColor: `${state.color}15`, borderColor: `${state.color}30`, borderWidth: 1 }}
              >
                <StatusBadge status={state.label} color={state.color} />
                <p className="text-[10px] text-muted-foreground mt-2 leading-tight">{state.description}</p>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>
    </>
  );
};
