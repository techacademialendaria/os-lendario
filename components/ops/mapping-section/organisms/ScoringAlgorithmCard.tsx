import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsText } from '../../ops-ui';
import { MAPPING_EXPLANATION } from '../../data/mapping-content';
import { OPS_ACCENT } from '../../ops-tokens';

export const ScoringAlgorithmCard: React.FC = () => {
  const { scoring } = MAPPING_EXPLANATION;

  return (
    <OpsCard>
      <OpsCardHeader title={scoring.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="text-sm text-muted-foreground leading-relaxed max-w-4xl mb-6">{scoring.desc}</OpsText>

        <div className="space-y-6 relative">
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-muted/20"></div>
          {scoring.steps.map((step, i) => (
            <div
              key={i}
              className="relative pl-10"
            >
              <div
                className="absolute left-0 top-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-card"
                style={{ backgroundColor: OPS_ACCENT, color: '#000' }}
              >
                {step.step}
              </div>
              <div className="space-y-3 bg-muted/10 p-4 rounded-lg border border-border/20">
                <h4 className="font-bold text-base" style={{ color: OPS_ACCENT }}>{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>

                {step.formula && (
                  <div className="p-3 rounded bg-muted/30 font-mono text-xs overflow-x-auto border-l-2" style={{ borderColor: OPS_ACCENT, color: '#e5e7eb' }}>
                    {step.formula}
                  </div>
                )}

                {step.example && (
                  <div className="text-xs text-muted-foreground/80 italic pl-2 border-l-2 border-muted">
                    Ex: <code className="text-foreground not-italic">{step.example}</code>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
