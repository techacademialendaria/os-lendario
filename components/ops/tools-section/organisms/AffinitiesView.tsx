import React from 'react';
import { TOOL_EXPLANATION } from '../../data/tool-content';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsCode
} from '../../ops-ui';

export const AffinitiesView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Tipos de Afinidade (tool_driver_affinities)" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-4">{TOOL_EXPLANATION.affinities.desc}</OpsText>
        <OpsGrid columns={2}>
          {TOOL_EXPLANATION.affinities.types.map((aff, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: aff.color }}>
              <div className="flex items-center gap-2 mb-1">
                <OpsCode className="text-xs font-bold" style={{ color: aff.color }}>{aff.type}</OpsCode>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{aff.desc}</p>
              <p className="text-[10px] italic" style={{ color: aff.color }}>{aff.example}</p>
            </div>
          ))}
        </OpsGrid>
      </OpsCardContent>
    </OpsCard>
  );
};
