import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsText } from '../../ops-ui';
import { MIU_EXPLANATION } from '../../data/miu-content';

export const DefinitionCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={MIU_EXPLANATION.title} />
    <OpsCardContent>
      <OpsText className="text-foreground mb-4">{MIU_EXPLANATION.definition}</OpsText>
      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
        <p className="text-sm text-amber-400 font-medium">{MIU_EXPLANATION.principle}</p>
      </div>
    </OpsCardContent>
  </OpsCard>
);
