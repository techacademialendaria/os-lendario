import React from 'react';
import {
  OpsCard,
  OpsCardContent,
  OpsGrid,
  OpsLabel,
} from '../../ops-ui';
import { OPS_ACCENT } from '../../ops-tokens';
import { GAPS_TABLE, RESOLUTION_ROADMAP } from '../../data/tables';

export const GapsQuickStats: React.FC = () => {
  const totalEffortHours = RESOLUTION_ROADMAP.reduce((acc, step) => acc + step.effortHours, 0);
  const automatableSteps = RESOLUTION_ROADMAP.filter(s => s.automatable).length;
  const readySteps = RESOLUTION_ROADMAP.filter(s => s.status === 'ready').length;

  return (
    <OpsGrid columns={4}>
      <OpsCard>
        <OpsCardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-red-400 mb-2">
            {GAPS_TABLE.filter(g => g.priority === 'P0').length}
          </div>
          <OpsLabel>Gaps P0 (Criticos)</OpsLabel>
        </OpsCardContent>
      </OpsCard>
      <OpsCard>
        <OpsCardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-amber-400 mb-2">{totalEffortHours}h</div>
          <OpsLabel>Esforco Total Estimado</OpsLabel>
        </OpsCardContent>
      </OpsCard>
      <OpsCard>
        <OpsCardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-emerald-400 mb-2">
            {automatableSteps}/{RESOLUTION_ROADMAP.length}
          </div>
          <OpsLabel>Steps Automatizaveis</OpsLabel>
        </OpsCardContent>
      </OpsCard>
      <OpsCard>
        <OpsCardContent className="p-6 text-center">
          <div className="text-3xl font-bold mb-2" style={{ color: OPS_ACCENT }}>{readySteps}</div>
          <OpsLabel>Steps Prontos para Iniciar</OpsLabel>
        </OpsCardContent>
      </OpsCard>
    </OpsGrid>
  );
};
