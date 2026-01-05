import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsText,
} from '../../ops-ui';
import { OPS_ACCENT } from '../../ops-tokens';
import { QUICK_WINS } from '../../data/tables';

export const QuickWinsView: React.FC = () => {
  return (
    <OpsCard style={{ borderColor: 'rgba(34,211,238,0.3)' }}>
      <OpsCardHeader title="Quick Wins - Comece Por Aqui" accentColor={OPS_ACCENT} />
      <OpsCardContent>
        <OpsText className="mb-6">
          Acoes de alto impacto que podem ser executadas rapidamente para validar o pipeline:
        </OpsText>
        <div className="space-y-4">
          {QUICK_WINS.map((win) => (
            <div
              key={win.rank}
              className="p-5 rounded-lg border-l-4 shadow-sm transition-all hover:-translate-y-0.5"
              style={{
                borderColor: win.roi === 'Alto' ? '#22c55e' : win.roi === 'Medio' ? '#f59e0b' : '#64748b',
                backgroundColor: win.roi === 'Alto' ? 'rgba(34,197,94,0.05)' : 'transparent'
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md"
                    style={{ backgroundColor: OPS_ACCENT, color: '#000' }}
                  >
                    {win.rank}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">{win.action}</h4>
                    <code className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded font-mono">
                      {win.gap}
                    </code>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className={`px-2 py-0.5 border ${
                      win.roi === 'Alto'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : win.roi === 'Medio'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }`}
                  >
                    ROI {win.roi}
                  </Badge>
                  <Badge variant="outline" className="px-2 py-0.5 border bg-purple-500/10 text-purple-400 border-purple-500/20">
                    {win.effort}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-foreground mb-2 pl-12">{win.impact}</p>
              <p className="text-xs text-muted-foreground italic pl-12 border-l-2 border-border/20 ml-2">
                {win.reasoning}
              </p>
            </div>
          ))}
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
