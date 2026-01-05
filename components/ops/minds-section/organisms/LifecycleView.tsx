import React from 'react';
import { cn } from '../../../../lib/utils';
import { MIND_LIFECYCLE } from '../../data/minds-content';
import { OPS_PRIMARY } from '../../ops-tokens';
import { Icon } from '../../../ui/icon';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText
} from '../../ops-ui';

interface LifecycleViewProps {
  expandedStage: number | null;
  onToggleStage: (stage: number) => void;
}

export const LifecycleView: React.FC<LifecycleViewProps> = ({ expandedStage, onToggleStage }) => {
  return (
    <OpsCard>
      <OpsCardHeader title={MIND_LIFECYCLE.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-6 max-w-4xl">{MIND_LIFECYCLE.description}</OpsText>

        {/* Lifecycle Flow */}
        <div className="flex flex-wrap gap-4 mb-8 overflow-x-auto pb-4 custom-scrollbar">
          {MIND_LIFECYCLE.stages.map((stage, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => onToggleStage(stage.stage)}
                className={cn(
                  "flex-shrink-0 w-40 p-4 rounded-xl border transition-all cursor-pointer text-left relative overflow-hidden group",
                  expandedStage === stage.stage ? 'ring-2 ring-offset-2 ring-offset-background bg-muted/10' : 'hover:bg-muted/5'
                )}
                style={{
                  borderColor: stage.color + '40',
                  ...(expandedStage === stage.stage ? { '--tw-ring-color': stage.color } as React.CSSProperties : {})
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: stage.color, color: '#000' }}
                  >
                    {stage.stage}
                  </span>
                  <Icon name={stage.icon} size="size-4" style={{ color: stage.color }} />
                </div>
                <h5 className="text-sm font-bold" style={{ color: stage.color }}>{stage.name}</h5>
              </button>
              {i < MIND_LIFECYCLE.stages.length - 1 && (
                <div className="mx-2 flex-shrink-0 opacity-30">
                  <Icon name="arrow-right" size="size-5" style={{ color: OPS_PRIMARY }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expanded Stage Details */}
        {expandedStage !== null && (
          <div
            className="p-6 rounded-xl bg-muted/5 border-l-4 animate-in fade-in duration-300 slide-in-from-top-2"
            style={{ borderColor: MIND_LIFECYCLE.stages[expandedStage - 1].color }}
          >
            <h4 className="font-bold text-base md:text-lg mb-4 flex items-center gap-3" style={{ color: MIND_LIFECYCLE.stages[expandedStage - 1].color }}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center bg-current text-background text-sm">
                {MIND_LIFECYCLE.stages[expandedStage - 1].stage}
              </span>
              {MIND_LIFECYCLE.stages[expandedStage - 1].name}: {MIND_LIFECYCLE.stages[expandedStage - 1].description}
            </h4>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Criterios:</span>
                <ul className="space-y-2">
                  {MIND_LIFECYCLE.stages[expandedStage - 1].criteria.map((c, i) => (
                    <li key={i} className="text-sm text-foreground flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: MIND_LIFECYCLE.stages[expandedStage - 1].color }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Proxima Acao:</span>
                <div className="p-4 rounded-lg bg-background/50 border border-border/10">
                  <span className="text-sm text-foreground leading-relaxed">{MIND_LIFECYCLE.stages[expandedStage - 1].nextAction}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </OpsCardContent>
    </OpsCard>
  );
};
