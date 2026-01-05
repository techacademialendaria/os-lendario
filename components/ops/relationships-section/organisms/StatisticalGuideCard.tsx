import React from 'react';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
  OpsCode
} from '../../ops-ui';
import type { StatisticalGuideCardProps } from '../types';

export const StatisticalGuideCard: React.FC<StatisticalGuideCardProps> = ({
  title,
  desc,
  strengthLevels,
  directionExplanation,
  caveats
}) => {
  return (
    <OpsCard>
      <OpsCardHeader title={title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="mb-8 leading-relaxed max-w-4xl">{desc}</OpsText>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          {/* Strength Levels */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Escala de Forca</h5>
            {strengthLevels.map((level, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 border border-transparent hover:border-border/30 transition-colors">
                <OpsCode className="text-sm font-mono w-24 shrink-0 text-center py-1 rounded bg-muted/20" style={{ color: level.color }}>
                  {level.range}
                </OpsCode>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-bold" style={{ color: level.color }}>{level.label}</span>
                    <OpsCode className="text-[10px] bg-muted/30 px-2 py-0.5 rounded text-muted-foreground hidden xl:block border border-white/5">
                      {level.example}
                    </OpsCode>
                  </div>
                  <span className="text-xs text-muted-foreground block truncate">{level.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Direction */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Direcionalidade</h5>
            <div className="grid grid-cols-1 gap-4">
              {directionExplanation.map((dir, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/20 border-l-4" style={{ borderColor: dir.color }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded flex items-center justify-center bg-muted/20 text-lg font-bold" style={{ color: dir.color }}>
                      {dir.symbol}
                    </div>
                    <span className="text-base font-medium text-foreground capitalize">{dir.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug mb-3">{dir.desc}</p>
                  <OpsCode className="text-xs bg-muted/30 px-2 py-1 rounded text-muted-foreground inline-block border border-white/5">
                    Ex: {dir.example}
                  </OpsCode>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Caveats */}
        <div className="p-5 rounded-lg bg-[#C9B298]/10 border border-[#C9B298]/20">
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#C9B298] mb-3 flex items-center gap-2">
            <span className="text-lg">!</span>
            Cuidados na Interpretacao
          </h5>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {caveats.map((caveat, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-3 bg-muted/10 p-2 rounded">
                <span className="text-[#C9B298] mt-0.5">&#8226;</span>
                {caveat}
              </li>
            ))}
          </ul>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
