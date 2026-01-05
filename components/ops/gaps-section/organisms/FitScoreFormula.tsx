import React from 'react';
import { OPS_ACCENT } from '../../ops-tokens';

export const FitScoreFormula: React.FC = () => {
  return (
    <div
      className="p-6 rounded-xl border-l-4 shadow-sm"
      style={{ borderColor: OPS_ACCENT, backgroundColor: `${OPS_ACCENT}10` }}
    >
      <p className="text-sm font-bold uppercase tracking-wider mb-3 text-foreground/80">
        Fit Score Formula
      </p>
      <div className="bg-muted/20 p-4 rounded-lg border border-white/5 mb-3">
        <code className="text-sm font-mono block text-center" style={{ color: OPS_ACCENT }}>
          fit_score = Sum(tool_driver_affinity.strength x mind_driver.strength / 10)
        </code>
      </div>
      <p className="text-xs text-muted-foreground flex items-center gap-2">
        <span className="text-amber-400 font-bold">Nota:</span>
        Para calcular fit_score, precisamos de{' '}
        <code className="text-red-400 bg-red-500/10 px-1 rounded">mind_drivers</code> +{' '}
        <code className="text-red-400 bg-red-500/10 px-1 rounded">tool_driver_affinities</code> populados.
      </p>
    </div>
  );
};
