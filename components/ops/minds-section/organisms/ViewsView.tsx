import React from 'react';
import { MIND_VIEWS } from '../../data/minds-content';
import { OPS_ACCENT, OPS_PRIMARY } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText
} from '../../ops-ui';

export const ViewsView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={MIND_VIEWS.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-6">{MIND_VIEWS.description}</OpsText>

        <OpsGrid>
          {MIND_VIEWS.views.map((view, i) => (
            <div key={i} className="p-5 rounded-xl bg-muted/5 border border-border/10 hover:border-border/30 transition-all">
              <code className="text-sm font-bold block mb-2" style={{ color: OPS_ACCENT }}>{view.name}</code>
              <p className="text-sm text-foreground mb-3 leading-relaxed">{view.purpose}</p>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border/5">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Retorna</span>
                  <code className="text-xs bg-muted/20 px-1 py-0.5 rounded">{view.returns}</code>
                </div>
                <div className="flex flex-col border-l border-border/10 pl-3">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">Uso</span>
                  <span className="text-xs italic" style={{ color: OPS_PRIMARY }}>{view.useCase}</span>
                </div>
              </div>
            </div>
          ))}
        </OpsGrid>
      </OpsCardContent>
    </OpsCard>
  );
};
