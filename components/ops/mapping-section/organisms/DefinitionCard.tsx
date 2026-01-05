import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsText } from '../../ops-ui';
import { MAPPING_EXPLANATION } from '../../data/mapping-content';

export const DefinitionCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={MAPPING_EXPLANATION.title} />
    <OpsCardContent>
      <OpsText className="leading-relaxed md:text-base max-w-4xl">{MAPPING_EXPLANATION.definition}</OpsText>
    </OpsCardContent>
  </OpsCard>
);
