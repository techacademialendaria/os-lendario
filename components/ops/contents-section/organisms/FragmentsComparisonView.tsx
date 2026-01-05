import React from 'react';
import { FRAGMENTS_EXPLANATION } from '../../data/contents-content';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText
} from '../../ops-ui';

/**
 * FragmentsComparisonView - Fragments (legacy) vs MIUs comparison
 */
export const FragmentsComparisonView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={FRAGMENTS_EXPLANATION.title} accentColor="#fbbf24" />
      <OpsCardContent>
        <OpsText className="text-foreground mb-6">{FRAGMENTS_EXPLANATION.definition}</OpsText>

        <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase text-red-400">Problema Identificado</span>
          </div>
          <p className="text-sm text-red-300/90 leading-relaxed">{FRAGMENTS_EXPLANATION.problem}</p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-lg border border-border/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20 bg-muted/20">
                <th className="text-left py-3 px-4 text-muted-foreground font-bold uppercase text-xs">Aspecto</th>
                <th className="text-left py-3 px-4 text-red-400 font-bold uppercase text-xs">Fragments</th>
                <th className="text-left py-3 px-4 text-emerald-400 font-bold uppercase text-xs">MIUs</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/10">
                <td className="py-3 px-4 text-foreground font-medium">Abordagem</td>
                <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.fragments.approach}</td>
                <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.mius.approach}</td>
              </tr>
              <tr className="border-b border-border/10">
                <td className="py-3 px-4 text-foreground font-medium">Rastreabilidade</td>
                <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.fragments.traceability}</td>
                <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.mius.traceability}</td>
              </tr>
              <tr className="border-b border-border/10">
                <td className="py-3 px-4 text-foreground font-medium">Reproducibilidade</td>
                <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.fragments.reproducibility}</td>
                <td className="py-3 px-4 text-muted-foreground">{FRAGMENTS_EXPLANATION.comparison.mius.reproducibility}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
