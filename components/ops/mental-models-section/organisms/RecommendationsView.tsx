import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent } from '../../ops-ui';
import { MENTAL_MODELS_RECOMMENDATIONS } from '../../data/mental-models-content';

export const RecommendationsView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={MENTAL_MODELS_RECOMMENDATIONS.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <div className="space-y-3">
          {MENTAL_MODELS_RECOMMENDATIONS.situations.map((situation, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border/20">
              <h4 className="font-bold text-sm text-foreground mb-2">{situation.situation}</h4>
              <div className="flex flex-wrap gap-1 mb-2">
                {situation.models.map((model, j) => (
                  <span key={j} className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded">
                    {model}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">{situation.reason}</p>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
