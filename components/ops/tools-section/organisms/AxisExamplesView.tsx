import React from 'react';
import { AXIS_EXAMPLES } from '../../data/tool-content';
import { AxisVisual } from '../molecules';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText
} from '../../ops-ui';

export const AxisExamplesView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader
        title={`${AXIS_EXAMPLES.title} - Instrumentos de Precisao`}
        accentColor="text-muted-foreground"
      />
      <OpsCardContent>
        <OpsText className="mb-8 opacity-80">{AXIS_EXAMPLES.description}</OpsText>

        <div className="space-y-4 divide-y divide-border/20">
          {AXIS_EXAMPLES.axes.map((axis, i) => (
            <AxisVisual key={i} axis={axis} />
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
