import React from 'react';
import { Icon } from '../../../ui/icon';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid } from '../../ops-ui';
import { OPS_ACCENT } from '../../ops-tokens';
import { MENTAL_MODELS_FRAMEWORK } from '../../data/mental-models-content';

export const PrinciplesView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Principios Fundamentais" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsGrid columns={2}>
          {MENTAL_MODELS_FRAMEWORK.principles.map((principle, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/20 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  name={principle.icon}
                  size="size-4"
                  style={{ color: OPS_ACCENT }}
                />
                <h4 className="font-bold text-sm" style={{ color: OPS_ACCENT }}>
                  {principle.principle}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground">
                {principle.desc}
              </p>
            </div>
          ))}
        </OpsGrid>
      </OpsCardContent>
    </OpsCard>
  );
};
