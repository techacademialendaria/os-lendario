import React from 'react';
import { Icon } from '@/components/ui/icon';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsText, OpsCode, OpsBadge, OpsProgressBar } from '../../ops-ui';
import { MAPPING_EXPLANATION } from '../../data/mapping-content';
import { OPS_ACCENT } from '../../ops-tokens';

export const VisualExampleCard: React.FC = () => {
  const { visualExample } = MAPPING_EXPLANATION;

  return (
    <OpsCard>
      <OpsCardHeader title={visualExample.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        <OpsText className="text-sm text-muted-foreground leading-relaxed max-w-4xl mb-6">{visualExample.desc}</OpsText>

        {/* Mind Name */}
        <div className="p-4 rounded-lg bg-muted/20 flex items-center gap-4 w-fit border border-border/20 mb-6">
          <div className="p-2 bg-muted/20 rounded-full">
            <Icon name="user" size="size-5" style={{ color: OPS_ACCENT }} />
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Exemplo</div>
            <span className="font-mono text-base font-bold" style={{ color: OPS_ACCENT }}>{visualExample.mindName}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Input Drivers */}
          <div className="flex-1 space-y-4">
            <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Icon name="arrow-right" size="size-3" />
              Drivers de Entrada (Input)
            </h5>
            <div className="grid grid-cols-1 gap-3">
              {visualExample.drivers.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/10 hover:border-border/40 hover:bg-background/60 transition-all shadow-sm">
                  <div className="flex items-center gap-3">
                    <OpsCode className="text-xs font-bold" style={{ color: OPS_ACCENT }}>{d.driver}</OpsCode>
                    <OpsBadge variant="outline" className="text-[9px] px-1.5 py-0.5 rounded opacity-70">{d.type}</OpsBadge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end w-24">
                      <OpsProgressBar
                        value={d.score * 10}
                        max={10}
                        color="#10b981"
                        showValue={false}
                        className="h-1.5"
                      />
                      <span className="text-[10px] font-mono text-emerald-600 font-bold mt-1">+{d.score.toFixed(2)}</span>
                    </div>
                    <OpsBadge variant="default" className="text-[10px] w-12 text-center bg-muted/30">
                      {Math.round(d.confidence * 100)}%
                    </OpsBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow & Processing */}
          <div className="flex lg:flex-col justify-center items-center py-2 gap-2 text-muted-foreground/30">
            <div className="h-full w-px bg-current hidden lg:block"></div>
            <Icon name="arrow-right" size="size-6" className="transform rotate-90 lg:rotate-0 text-muted-foreground/50" />
            <div className="h-full w-px bg-current hidden lg:block"></div>
          </div>

          {/* Results Grid */}
          <div className="flex-[1.5] space-y-4">
            <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Icon name="check-circle" size="size-3" />
              Resultados Mapeados (Output)
            </h5>
            <OpsGrid columns={2} className="md:grid-cols-2 lg:grid-cols-2 gap-4">
              {/* Big Five Result */}
              <div className="p-5 rounded-lg bg-muted/20 border-t-4 shadow-sm" style={{ borderColor: '#10b981' }}>
                <h5 className="text-xs font-bold uppercase mb-4 flex justify-between items-center" style={{ color: '#10b981' }}>
                  Big Five (OCEAN)
                  <Icon name="chart-pie" size="size-3" />
                </h5>
                <div className="space-y-4">
                  {Object.entries(visualExample.bigFiveResult).map(([key, val]) => (
                    <OpsProgressBar
                      key={key}
                      label={`${key} - ${val.label}`}
                      value={val.score}
                      max={1}
                      color="#10b981"
                      className="h-1.5"
                    />
                  ))}
                </div>
              </div>

              {/* MBTI Result */}
              <div className="p-5 rounded-lg bg-background/40 border border-border/10 border-t-4 shadow-sm" style={{ borderTopColor: '#f59e0b' }}>
                <h5 className="text-xs font-bold uppercase mb-2 flex justify-between items-center" style={{ color: '#d97706' }}>
                  MBTI
                  <Icon name="users" size="size-3" />
                </h5>
                <div className="text-center mb-4 py-2 bg-amber-500/5 rounded border border-amber-500/10">
                  <span className="text-3xl font-bold tracking-widest" style={{ color: '#d97706' }}>{visualExample.mbtiResult.type}</span>
                  <p className="text-[10px] text-muted-foreground mt-1">Confidence: {Math.round(visualExample.mbtiResult.confidence * 100)}%</p>
                </div>
                <div className="space-y-3">
                  {Object.entries(visualExample.mbtiResult.breakdown).map(([key, val]) => (
                    <OpsProgressBar
                      key={key}
                      label={key}
                      value={val * 100}
                      color="#f59e0b"
                      className="h-1.5"
                    />
                  ))}
                </div>
              </div>

              {/* Enneagram Result */}
              <div className="p-5 rounded-lg bg-background/40 border border-border/10 border-t-4 shadow-sm md:col-span-2 lg:col-span-2" style={{ borderTopColor: '#ec4899' }}>
                <h5 className="text-xs font-bold uppercase mb-4 flex justify-between items-center" style={{ color: '#be185d' }}>
                  Enneagram
                  <Icon name="star" size="size-3" />
                </h5>
                <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold" style={{ color: '#be185d' }}>{visualExample.enneagramResult.primaryType}</span>
                      <span className="text-xl text-muted-foreground lowercase">w</span>
                      <span className="text-2xl font-bold text-muted-foreground">{visualExample.enneagramResult.wing}</span>
                    </div>
                    <OpsBadge variant="outline" className="mt-1 bg-pink-500/5 text-pink-600 border-pink-500/10">
                      Confidence: {Math.round(visualExample.enneagramResult.confidence * 100)}%
                    </OpsBadge>
                  </div>
                  <div className="text-center sm:text-left max-w-xs">
                    <p className="text-sm font-bold text-foreground">{visualExample.enneagramResult.label}</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      Caracterizado por um forte desejo de ser util e competente, buscando validacao externa e evitando o fracasso.
                    </p>
                  </div>
                </div>
              </div>
            </OpsGrid>
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
