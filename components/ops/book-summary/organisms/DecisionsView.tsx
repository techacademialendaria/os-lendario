import React from 'react';
import { Icon } from '../../../ui/icon';
import { OPS_ACCENT, OPS_PRIMARY } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsCode,
} from '../../ops-ui';
import { ExpandableCard } from '../../../shared/molecules';
import { BOOK_SUMMARY_DECISIONS } from '../../data/book-summary-content';
import type { DecisionsViewProps } from '../types';

export const DecisionsView: React.FC<DecisionsViewProps> = ({
  isExpanded,
  onToggle,
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={BOOK_SUMMARY_DECISIONS.title} />
      <OpsCardContent>
        <div className="space-y-4">
          {BOOK_SUMMARY_DECISIONS.decisions.map((decision) => (
            <DecisionItem
              key={decision.id}
              decision={decision}
              isExpanded={isExpanded(decision.id)}
              onToggle={() => onToggle(decision.id)}
            />
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

// ============================================================================
// Sub-components
// ============================================================================

interface DecisionItemProps {
  decision: (typeof BOOK_SUMMARY_DECISIONS.decisions)[0];
  isExpanded: boolean;
  onToggle: () => void;
}

const DecisionItem: React.FC<DecisionItemProps> = ({ decision, isExpanded, onToggle }) => {
  return (
    <div className="rounded-lg bg-muted/10 border border-border/20 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${OPS_ACCENT}20` }}
          >
            <Icon name={decision.icon} size="size-5" style={{ color: OPS_ACCENT }} />
          </div>
          <span className="font-bold text-sm text-left" style={{ color: OPS_ACCENT }}>
            {decision.question}
          </span>
        </div>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size="size-5"
          style={{ color: OPS_PRIMARY }}
        />
      </button>

      {isExpanded && <DecisionContent decision={decision} />}
    </div>
  );
};

interface DecisionContentProps {
  decision: (typeof BOOK_SUMMARY_DECISIONS.decisions)[0];
}

const DecisionContent: React.FC<DecisionContentProps> = ({ decision }) => {
  return (
    <div className="p-4 pt-0 space-y-4 border-t border-border/20">
      {decision.id === 'gemini' && decision.pros && (
        <GeminiDecisionContent pros={decision.pros} />
      )}
      {decision.id === 'phases' && decision.comparison && (
        <PhasesDecisionContent explanation={decision.explanation} comparison={decision.comparison} />
      )}
      {decision.id === 'hybrid' && decision.files && decision.database && (
        <HybridDecisionContent explanation={decision.explanation} files={decision.files} database={decision.database} />
      )}
      {decision.id === 'stages' && decision.stages && (
        <StagesDecisionContent stages={decision.stages} benefit={decision.benefit} />
      )}
    </div>
  );
};

interface GeminiDecisionContentProps {
  pros: Array<{ label: string; value: string; comparison: string }>;
}

const GeminiDecisionContent: React.FC<GeminiDecisionContentProps> = ({ pros }) => (
  <div className="grid grid-cols-2 gap-3 mt-4">
    {pros.map((pro, i) => (
      <div key={i} className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
        <div className="text-xs font-bold text-emerald-400 mb-1">{pro.label}</div>
        <div className="text-sm font-mono" style={{ color: OPS_ACCENT }}>{pro.value}</div>
        <div className="text-[10px] text-muted-foreground">{pro.comparison}</div>
      </div>
    ))}
  </div>
);

interface PhasesDecisionContentProps {
  explanation?: string;
  comparison: {
    before: { title: string; pros: string[]; cons: string[] };
    after: { title: string; pros: string[]; cons: string[] };
  };
}

const PhasesDecisionContent: React.FC<PhasesDecisionContentProps> = ({ explanation, comparison }) => (
  <>
    {explanation && <p className="text-sm text-muted-foreground mt-4">{explanation}</p>}
    <OpsGrid columns={2}>
      <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
        <h5 className="text-xs font-bold uppercase text-red-400 mb-2">{comparison.before.title}</h5>
        <div className="space-y-1 mb-2">
          {comparison.before.pros.map((p, i) => (
            <div key={i} className="text-xs text-emerald-400 flex items-center gap-1">
              <Icon name="check" size="size-3" /> {p}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {comparison.before.cons.map((c, i) => (
            <div key={i} className="text-xs text-red-400 flex items-center gap-1">
              <Icon name="cross" size="size-3" /> {c}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
        <h5 className="text-xs font-bold uppercase text-emerald-400 mb-2">{comparison.after.title}</h5>
        <div className="space-y-1 mb-2">
          {comparison.after.pros.map((p, i) => (
            <div key={i} className="text-xs text-emerald-400 flex items-center gap-1">
              <Icon name="check" size="size-3" /> {p}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {comparison.after.cons.map((c, i) => (
            <div key={i} className="text-xs text-amber-400 flex items-center gap-1">
              <Icon name="warning" size="size-3" /> {c}
            </div>
          ))}
        </div>
      </div>
    </OpsGrid>
  </>
);

interface HybridDecisionContentProps {
  explanation?: string;
  files: { title: string; reasons: string[] };
  database: { title: string; reasons: string[] };
}

const HybridDecisionContent: React.FC<HybridDecisionContentProps> = ({ explanation, files, database }) => (
  <>
    {explanation && <p className="text-sm text-muted-foreground mt-4">{explanation}</p>}
    <OpsGrid columns={2}>
      <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20">
        <h5 className="text-xs font-bold uppercase text-violet-400 mb-3">{files.title}</h5>
        <div className="space-y-2">
          {files.reasons.map((r, i) => (
            <div key={i} className="text-xs text-foreground flex items-center gap-2">
              <Icon name="check" size="size-3" className="text-violet-400" /> {r}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
        <h5 className="text-xs font-bold uppercase text-cyan-400 mb-3">{database.title}</h5>
        <div className="space-y-2">
          {database.reasons.map((r, i) => (
            <div key={i} className="text-xs text-foreground flex items-center gap-2">
              <Icon name="check" size="size-3" className="text-cyan-400" /> {r}
            </div>
          ))}
        </div>
      </div>
    </OpsGrid>
  </>
);

interface StagesDecisionContentProps {
  stages: Array<{ name: string; desc: string; example: string }>;
  benefit?: string;
}

const StagesDecisionContent: React.FC<StagesDecisionContentProps> = ({ stages, benefit }) => (
  <>
    <div className="flex items-center gap-2 mt-4">
      {stages.map((stage, i) => (
        <React.Fragment key={stage.name}>
          <div className="flex-1 p-3 rounded-lg bg-muted/20 text-center">
            <div className="text-xs font-bold" style={{ color: OPS_ACCENT }}>{stage.name}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{stage.desc}</div>
            <OpsCode className="text-[9px] mt-1">{stage.example}</OpsCode>
          </div>
          {i < stages.length - 1 && (
            <Icon name="arrow-right" size="size-4" style={{ color: OPS_PRIMARY }} />
          )}
        </React.Fragment>
      ))}
    </div>
    {benefit && (
      <p className="text-xs text-emerald-400 mt-3 flex items-center gap-1">
        <Icon name="check" size="size-3" /> {benefit}
      </p>
    )}
  </>
);
