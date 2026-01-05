import React from 'react';
import { EXAMPLE_MIND, MIND_PSYCHOMETRICS } from '../../data/minds-content';
import { OPS_ACCENT } from '../../ops-tokens';
import { Icon } from '../../../ui/icon';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsBadge,
  OpsProgressBar
} from '../../ops-ui';

export const ExampleMindView: React.FC = () => {
  return (
    <OpsCard>
      <OpsCardHeader title={EXAMPLE_MIND.title} accentColor="text-muted-foreground" />
      <OpsCardContent>
        {/* Basic Info */}
        <div className="p-6 rounded-xl bg-muted/5 border-l-4 mb-6" style={{ borderColor: OPS_ACCENT }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-muted/20 flex items-center justify-center border-2 border-border/10">
              <Icon name="circle-user" size="size-10" style={{ color: OPS_ACCENT }} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-bold text-xl mb-1" style={{ color: OPS_ACCENT }}>{EXAMPLE_MIND.basic.name}</h4>
              <code className="text-sm text-muted-foreground bg-muted/10 px-2 py-0.5 rounded">@{EXAMPLE_MIND.basic.slug}</code>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">{EXAMPLE_MIND.basic.short_bio}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-background/50 border border-border/10 md:ml-auto min-w-[120px]">
              <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">APEX Score</span>
              <div className="text-3xl font-bold" style={{ color: OPS_ACCENT }}>{EXAMPLE_MIND.basic.apex_score}</div>
            </div>
          </div>
        </div>

        {/* Drivers, Tools, Obsessions, Values */}
        <OpsGrid columns={2}>
          {/* Drivers */}
          <div className="p-5 rounded-xl bg-muted/5 border border-border/10">
            <h5 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4">Top Drivers</h5>
            <div className="space-y-4">
              {EXAMPLE_MIND.drivers.map((d, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-foreground">{d.driver}</span>
                    <span className="text-xs font-mono text-muted-foreground">{d.strength}/10</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/20 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${d.strength * 10}%`, backgroundColor: '#e11d48' }}
                    />
                  </div>
                  <div className="text-[10px] text-right text-muted-foreground opacity-70">
                    Confidence: {(d.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="p-5 rounded-xl bg-muted/5 border border-border/10">
            <h5 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4">Signature Tools</h5>
            <div className="space-y-3">
              {EXAMPLE_MIND.tools.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/5">
                  <span className="text-sm text-foreground font-medium">{t.tool}</span>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] uppercase font-bold px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: t.frequency === 'signature' ? '#10b981' + '10' : '#feca57' + '10',
                        color: t.frequency === 'signature' ? '#10b981' : '#feca57',
                        borderColor: t.frequency === 'signature' ? '#10b981' + '20' : '#feca57' + '20'
                      }}
                    >
                      {t.frequency}
                    </span>
                    <span className="text-xs text-muted-foreground">{t.proficiency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Obsession */}
          <div className="p-5 rounded-xl bg-muted/5 border border-border/10">
            <h5 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4">Obsession</h5>
            <div className="flex flex-wrap gap-2.5">
              <OpsBadge
                variant="outline"
                className="px-3 py-1.5 rounded-full text-xs"
                style={{
                  backgroundColor: `#a55eea15`,
                  color: '#a55eea',
                  borderColor: `#a55eea30`
                }}
              >
                <span className="font-bold">{EXAMPLE_MIND.obsession}</span>
              </OpsBadge>
            </div>
          </div>

          {/* Values */}
          <div className="p-5 rounded-xl bg-muted/5 border border-border/10">
            <h5 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4">Core Values</h5>
            <div className="flex flex-wrap gap-2.5">
              {EXAMPLE_MIND.values.map((v, i) => (
                <OpsBadge
                  key={i}
                  variant="outline"
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{
                    backgroundColor: `#2dd4bf15`,
                    color: '#0d9488',
                    borderColor: `#2dd4bf30`
                  }}
                >
                  <span className="font-bold">{v.name}</span>
                  <span className="opacity-60 text-[10px] border-l border-current pl-2 ml-1">{v.importance}/10</span>
                </OpsBadge>
              ))}
            </div>
          </div>
        </OpsGrid>

        {/* Big Five Visualization */}
        <div className="mt-6 p-6 rounded-xl bg-background/40 border border-border/10 shadow-sm">
          <h5 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-6">Big Five Profile</h5>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {Object.entries(EXAMPLE_MIND.bigFive).map(([trait, score], i) => {
              const traitInfo = MIND_PSYCHOMETRICS.bigFive.find(t => t.trait.toLowerCase() === trait);
              return (
                <OpsProgressBar
                  key={i}
                  label={traitInfo?.abbrev || trait}
                  value={score}
                  color={traitInfo?.color || OPS_ACCENT}
                  className="h-2"
                />
              );
            })}
          </div>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};
