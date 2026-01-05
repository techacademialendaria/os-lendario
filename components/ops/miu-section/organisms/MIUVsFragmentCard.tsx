import React from 'react';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsText, OpsLabel } from '../../ops-ui';
import { MIU_VS_FRAGMENT } from '../../data/miu-content';
import { OPS_ACCENT } from '../../ops-tokens';

export const MIUVsFragmentCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={MIU_VS_FRAGMENT.title} />
    <OpsCardContent>
      <OpsText className="text-muted-foreground text-sm mb-6">{MIU_VS_FRAGMENT.description}</OpsText>

      {/* Source Text */}
      <div className="p-4 rounded-lg bg-muted/30 border border-border mb-6">
        <p className="text-xs text-muted-foreground uppercase mb-2">Texto Fonte</p>
        <p className="text-foreground italic">{MIU_VS_FRAGMENT.comparisonExample.sourceText}</p>
      </div>

      {/* Side by Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* As MIU */}
        <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/30">
          <h4 className="text-sm font-bold text-emerald-400 mb-3">{MIU_VS_FRAGMENT.comparisonExample.asMIU.label}</h4>

          <div className="space-y-2 mb-4">
            {Object.entries(MIU_VS_FRAGMENT.comparisonExample.asMIU.data).map(([key, value]) => (
              <div key={key} className="flex text-xs">
                <code className="text-muted-foreground w-28 shrink-0">{key}:</code>
                <span style={{ color: OPS_ACCENT }}>
                  {Array.isArray(value) ? value.join(', ') || '[]' : String(value)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-emerald-500/20 pt-3">
            <p className="text-xs text-emerald-400 font-medium mb-2">Inclui:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {MIU_VS_FRAGMENT.comparisonExample.asMIU.whatsIncluded.map((item, i) => (
                <li key={i}>+ {item}</li>
              ))}
            </ul>
            <p className="text-xs text-emerald-400 font-medium mt-3 mb-2">Exclui (importante!):</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {MIU_VS_FRAGMENT.comparisonExample.asMIU.whatsExcluded.map((item, i) => (
                <li key={i}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* As Fragment */}
        <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/30">
          <h4 className="text-sm font-bold text-red-400 mb-3">{MIU_VS_FRAGMENT.comparisonExample.asFragment.label}</h4>

          <div className="space-y-2 mb-4">
            {Object.entries(MIU_VS_FRAGMENT.comparisonExample.asFragment.data).map(([key, value]) => (
              <div key={key} className="flex text-xs">
                <code className="text-muted-foreground w-28 shrink-0">{key}:</code>
                <span className="text-red-300">{String(value)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-red-500/20 pt-3">
            <p className="text-xs text-red-400 font-medium mb-2">Inclui:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {MIU_VS_FRAGMENT.comparisonExample.asFragment.whatsIncluded.map((item, i) => (
                <li key={i}>+ {item}</li>
              ))}
            </ul>
            <p className="text-xs text-red-400 font-medium mt-3 mb-2">Problemas:</p>
            <ul className="text-xs text-red-300 space-y-1">
              {MIU_VS_FRAGMENT.comparisonExample.asFragment.problems.map((item, i) => (
                <li key={i}>! {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Advantages Table */}
      <div className="mb-6">
        <OpsLabel className="mb-3">Comparacao por Aspecto</OpsLabel>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-muted-foreground">Aspecto</th>
              <th className="text-left py-2 px-3 text-emerald-400">MIU</th>
              <th className="text-left py-2 px-3 text-red-400">Fragment</th>
            </tr>
          </thead>
          <tbody>
            {MIU_VS_FRAGMENT.advantages.map((row, i) => (
              <tr key={i} className="border-b border-border/30">
                <td className="py-2 px-3 text-foreground font-medium">{row.aspect}</td>
                <td className="py-2 px-3 text-muted-foreground">{row.miu}</td>
                <td className="py-2 px-3 text-muted-foreground">{row.fragment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
        <p className="text-sm text-amber-400">{MIU_VS_FRAGMENT.bottomLine}</p>
      </div>
    </OpsCardContent>
  </OpsCard>
);
