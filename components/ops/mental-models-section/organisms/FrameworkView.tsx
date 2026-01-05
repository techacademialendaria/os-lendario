import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsText } from '../../ops-ui';
import { OPS_ACCENT } from '../../ops-tokens';
import { MENTAL_MODELS_FRAMEWORK } from '../../data/mental-models-content';

export const FrameworkView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={MENTAL_MODELS_FRAMEWORK.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-6">
          {MENTAL_MODELS_FRAMEWORK.description}
        </OpsText>

        <div className="space-y-3">
          {MENTAL_MODELS_FRAMEWORK.steps.map((step) => (
            <div
              key={step.step}
              className="flex gap-4 p-4 rounded-lg bg-muted/10 border border-border/20 hover:bg-muted/20 transition-colors"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                style={{ backgroundColor: OPS_ACCENT }}
              >
                {step.step}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-foreground mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-1">
                  {step.description}
                </p>
                <p className="text-[11px] italic text-primary">
                  Acao: {step.action}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm text-foreground">
            <span className="font-bold">Dica de Ouro: </span>
            Charlie Munger (investidor lendario) recomenda desenvolver "uma mente que possa saltar
            entre diferentes disciplinas". O poder nao esta em memorizar modelos, mas em saber qual
            aplicar quando, e em combinar multiplas perspectivas para ver mais claramente.
          </p>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
