import React from 'react';
import { Icon } from '../../../ui/icon';
import { RECOMMENDATION_FLOW } from '../../data/tool-content';
import { OPS_ACCENT, OPS_PRIMARY } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
  OpsCode
} from '../../ops-ui';

export const RecommendationFlowView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={RECOMMENDATION_FLOW.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-4">{RECOMMENDATION_FLOW.description}</OpsText>

        {/* Flow Steps */}
        <div className="flex flex-col md:flex-row gap-2 mb-6 overflow-x-auto pb-2">
          {RECOMMENDATION_FLOW.steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div
                className="flex-shrink-0 w-40 p-3 rounded-lg bg-muted/20 border"
                style={{ borderColor: OPS_ACCENT + '40' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: OPS_ACCENT }}
                  >
                    {s.step}
                  </span>
                  <Icon name={s.icon} size="size-3" style={{ color: OPS_ACCENT }} />
                </div>
                <h5 className="text-xs font-bold mb-1">{s.title}</h5>
                <p className="text-[9px] text-muted-foreground">{s.description}</p>
                <OpsCode className="block text-[8px] bg-muted/20 p-1 rounded mt-1 text-muted-foreground">
                  {s.data}
                </OpsCode>
              </div>
              {i < RECOMMENDATION_FLOW.steps.length - 1 && (
                <Icon
                  name="arrow-right"
                  size="size-4"
                  className="mx-1 flex-shrink-0 hidden md:block"
                  style={{ color: OPS_PRIMARY }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Example Output */}
        <div className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: OPS_ACCENT }}>
          <h4 className="font-bold text-sm mb-2" style={{ color: OPS_ACCENT }}>
            Exemplo: Recomendacoes para {RECOMMENDATION_FLOW.exampleOutput.mind}
          </h4>
          <div className="space-y-2">
            {RECOMMENDATION_FLOW.exampleOutput.recommendations.map((rec, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded bg-muted/20">
                <span className="text-xs font-bold w-6 text-center" style={{ color: OPS_ACCENT }}>
                  #{i + 1}
                </span>
                <div className="flex-1">
                  <span className="text-xs font-medium">{rec.tool}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">{rec.reason}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 rounded-full bg-muted/30 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${rec.score * 100}%`, backgroundColor: OPS_ACCENT }}
                    />
                  </div>
                  <span className="text-[10px] font-mono" style={{ color: OPS_ACCENT }}>
                    {rec.score.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
