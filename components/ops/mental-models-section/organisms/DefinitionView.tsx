import React from 'react';
import { Icon } from '../../../ui/icon';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
} from '../../ops-ui';
import { MENTAL_MODELS_EXPLANATION } from '../../data/mental-models-content';

export const DefinitionView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={MENTAL_MODELS_EXPLANATION.title} />
      <OpsCardContent>
        <OpsText className="text-foreground mb-4">
          {MENTAL_MODELS_EXPLANATION.definition}
        </OpsText>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MENTAL_MODELS_EXPLANATION.importance.map((point, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/20">
              <Icon name="check" size="size-4" className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{point}</span>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
