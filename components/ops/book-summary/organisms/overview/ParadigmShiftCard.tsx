import React from 'react';
import { Icon } from '@/components/ui/icon';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid } from '../../../ops-ui';
import { OPS_ACCENT, OPS_PRIMARY } from '../../../ops-tokens';
import { PARADIGM_SHIFT } from '../../../data/book-summary-content';

export const ParadigmShiftCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Paradigm Shift: Pipeline Adaptativo" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsGrid columns={2}>
        <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
          <h4 className="text-xs font-bold uppercase text-red-400 mb-4">Antes: {PARADIGM_SHIFT.before.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{PARADIGM_SHIFT.before.description}</p>
          <ul className="space-y-1">
            {PARADIGM_SHIFT.before.problems.map((p, i) => (
              <li key={i} className="text-xs text-red-300/80 flex items-start gap-2">
                <Icon name="cross" size="size-3" className="mt-0.5 text-red-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <h4 className="text-xs font-bold uppercase text-emerald-400 mb-4">Depois: {PARADIGM_SHIFT.after.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{PARADIGM_SHIFT.after.description}</p>
          <ul className="space-y-1">
            {PARADIGM_SHIFT.after.solutions.map((s, i) => (
              <li key={i} className="text-xs text-emerald-300/80 flex items-start gap-2">
                <Icon name="check" size="size-3" className="mt-0.5 text-emerald-400" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </OpsGrid>
      <div className="mt-4 space-y-2">
        {PARADIGM_SHIFT.examples.map((ex, i) => (
          <div key={i} className="p-3 rounded-lg bg-muted/10 flex items-center gap-4">
            <div className="text-xs">
              <span className="font-bold" style={{ color: OPS_ACCENT }}>{ex.book}</span>
            </div>
            <Icon name="arrow-right" size="size-3" style={{ color: OPS_PRIMARY }} />
            <div className="text-xs text-muted-foreground flex-1">{ex.adaptation}</div>
            <Icon name="arrow-right" size="size-3" style={{ color: OPS_PRIMARY }} />
            <div className="text-xs text-emerald-400">{ex.result}</div>
          </div>
        ))}
      </div>
    </OpsCardContent>
  </OpsCard>
);
