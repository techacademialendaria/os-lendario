import React from 'react';
import { Icon } from '../../../ui/icon';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsText } from '../../ops-ui';
import { MENTAL_MODELS_RELATIONSHIPS } from '../../data/mental-models-content';

export const RelationshipsView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={MENTAL_MODELS_RELATIONSHIPS.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-4">{MENTAL_MODELS_RELATIONSHIPS.description}</OpsText>

        <div className="space-y-4">
          {MENTAL_MODELS_RELATIONSHIPS.relationTypes.map((relType, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: relType.color }}>
              <div className="flex items-center gap-2 mb-2">
                <Icon name={relType.icon} size="size-4" style={{ color: relType.color }} />
                <h4 className="font-bold text-sm" style={{ color: relType.color }}>
                  {relType.type}
                </h4>
                <span className="text-xs text-muted-foreground">- {relType.description}</span>
              </div>
              <div className="space-y-2 mt-3">
                {relType.examples.map((ex, j) => (
                  <div key={j} className="p-2 rounded bg-muted/20 text-xs">
                    <p className="font-medium text-foreground mb-1">
                      {(ex as { models?: string[] }).models?.join(' <-> ')}
                    </p>
                    <p className="text-muted-foreground">{ex.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
