import React from 'react';
import { TOOL_EXPLANATION } from '../../data/tool-content';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText
} from '../../ops-ui';

export const DefinitionView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={TOOL_EXPLANATION.title} />
      <OpsCardContent>
        <OpsText className="text-foreground">{TOOL_EXPLANATION.definition}</OpsText>
      </OpsCardContent>
    </OpsCard>
  );
};
