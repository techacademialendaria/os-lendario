import React from 'react';
import { MIND_EXPLANATION } from '../../data/minds-content';
import { OPS_ACCENT } from '../../ops-tokens';
import { Icon } from '../../../ui/icon';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText
} from '../../ops-ui';

export const DefinitionView: React.FC = () => {
  return (
    <>
      {/* Definition */}
      <OpsCard>
        <OpsCardHeader title={MIND_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground max-w-4xl mb-6">{MIND_EXPLANATION.definition}</OpsText>
          <div className="p-6 rounded-xl bg-muted/5 border-l-4" style={{ borderColor: OPS_ACCENT }}>
            <OpsText className="italic" style={{ color: OPS_ACCENT }}>{MIND_EXPLANATION.coreIdea}</OpsText>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Mind Components Overview */}
      <OpsCard>
        <OpsCardHeader title="Componentes de um Mind" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsGrid columns={3}>
            {MIND_EXPLANATION.components.map((comp, i) => (
              <div key={i} className="p-5 rounded-xl bg-muted/5 border-l-4 transition-all hover:translate-x-1" style={{ borderColor: comp.color }}>
                <div className="flex items-center gap-3 mb-3">
                  <Icon name={comp.icon} size="size-5" style={{ color: comp.color }} />
                  <code className="text-base font-bold" style={{ color: comp.color }}>{comp.name}</code>
                </div>
                <OpsText>{comp.desc}</OpsText>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>
    </>
  );
};
