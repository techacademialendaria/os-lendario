import React from 'react';
import { TOOL_EXPLANATION } from '../../data/tool-content';
import { OPS_PRIMARY, OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent
} from '../../ops-ui';

export const AxesView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Eixos de Classificacao" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <div className="space-y-4">
          {TOOL_EXPLANATION.axes.map((axis, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: OPS_ACCENT }}>{axis.name}</span>
                <span className="text-[10px] text-muted-foreground">{axis.example}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-32 text-right">{axis.low}</span>
                <div
                  className="flex-1 h-2 rounded-full"
                  style={{ background: `linear-gradient(to right, ${OPS_PRIMARY}, ${OPS_ACCENT})` }}
                />
                <span className="text-xs text-muted-foreground w-32">{axis.high}</span>
              </div>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
