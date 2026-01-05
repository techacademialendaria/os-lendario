import React from 'react';
import { Icon } from '../../../ui/icon';
import { TOOL_EXPLANATION } from '../../data/tool-content';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid
} from '../../ops-ui';

export const ToolTypesView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title="Tipos de Tool" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsGrid columns={3}>
          {TOOL_EXPLANATION.types.map((t, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/20">
              <div className="flex items-center gap-2 mb-2">
                <Icon name={t.icon} size="size-4" style={{ color: OPS_ACCENT }} />
                <h4 className="font-bold text-sm" style={{ color: OPS_ACCENT }}>{t.type}</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
              <div className="flex flex-wrap gap-1">
                {t.examples.map((ex, j) => (
                  <span key={j} className="text-[10px] bg-muted/30 px-1.5 py-0.5 rounded text-foreground">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </OpsGrid>
      </OpsCardContent>
    </OpsCard>
  );
};
