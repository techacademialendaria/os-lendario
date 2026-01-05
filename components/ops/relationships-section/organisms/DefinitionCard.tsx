import React from 'react';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText
} from '../../ops-ui';
import type { DefinitionCardProps } from '../types';

export const DefinitionCard: React.FC<DefinitionCardProps> = ({
  title,
  definition,
  importance
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={title} />
      <OpsCardContent>
        <OpsText className="leading-relaxed md:text-base max-w-4xl mb-6">
          {definition}
        </OpsText>
        <OpsGrid columns={2}>
          {importance.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border/30">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm"
                style={{ backgroundColor: OPS_ACCENT, color: '#000' }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-muted-foreground leading-snug pt-0.5">{item}</span>
            </div>
          ))}
        </OpsGrid>
      </OpsCardContent>
    </OpsCard>
  );
};
