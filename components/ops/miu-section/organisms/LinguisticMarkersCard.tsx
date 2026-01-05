import React from 'react';
import { Badge } from '@/components/ui/badge';
import { OpsCard, OpsCardHeader, OpsCardContent, OpsGrid, OpsText, OpsCode } from '../../ops-ui';
import { LINGUISTIC_MARKERS } from '../../data/miu-content';
import { OPS_ACCENT } from '../../ops-tokens';

export const LinguisticMarkersCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={LINGUISTIC_MARKERS.title} />
    <OpsCardContent>
      <OpsText className="text-muted-foreground text-sm mb-6">{LINGUISTIC_MARKERS.description}</OpsText>

      {/* Pronoun Patterns */}
      <div className="mb-6">
        <h4 className="text-sm font-bold mb-1" style={{ color: OPS_ACCENT }}>{LINGUISTIC_MARKERS.pronounPatterns.title}</h4>
        <p className="text-xs text-muted-foreground mb-3">{LINGUISTIC_MARKERS.pronounPatterns.subtitle}</p>
        <div className="space-y-2">
          {LINGUISTIC_MARKERS.pronounPatterns.patterns.map((p, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/20 border-l-2" style={{ borderColor: OPS_ACCENT }}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <OpsCode className="text-sm font-mono font-bold" style={{ color: OPS_ACCENT }}>{p.pronoun}</OpsCode>
                <span className="text-xs text-muted-foreground">- {p.indicates}</span>
              </div>
              <p className="text-xs text-foreground italic mb-1">{p.example}</p>
              <p className="text-xs text-emerald-400">{p.insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Verb Tenses */}
      <div className="mb-6">
        <h4 className="text-sm font-bold mb-1" style={{ color: OPS_ACCENT }}>{LINGUISTIC_MARKERS.verbTenses.title}</h4>
        <p className="text-xs text-muted-foreground mb-3">{LINGUISTIC_MARKERS.verbTenses.subtitle}</p>
        <OpsGrid columns={3}>
          {LINGUISTIC_MARKERS.verbTenses.patterns.map((t, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/20">
              <div className="font-medium text-foreground mb-1">{t.tense}</div>
              <p className="text-xs text-muted-foreground italic mb-2">{t.example}</p>
              <p className="text-xs text-muted-foreground mb-1">{t.indicates}</p>
              <p className="text-xs text-emerald-400">{t.insight}</p>
            </div>
          ))}
        </OpsGrid>
      </div>

      {/* Modal Verbs */}
      <div className="mb-6">
        <h4 className="text-sm font-bold mb-1" style={{ color: OPS_ACCENT }}>{LINGUISTIC_MARKERS.modalVerbs.title}</h4>
        <p className="text-xs text-muted-foreground mb-3">{LINGUISTIC_MARKERS.modalVerbs.subtitle}</p>
        <div className="space-y-2">
          {LINGUISTIC_MARKERS.modalVerbs.patterns.map((m, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/20 flex flex-col md:flex-row gap-3">
              <div className="md:w-1/4">
                <OpsCode className="text-sm font-mono" style={{ color: OPS_ACCENT }}>{m.modal}</OpsCode>
                <Badge variant="outline" className="ml-2 text-[9px]">{m.category}</Badge>
              </div>
              <div className="md:w-1/4">
                <p className="text-xs text-muted-foreground italic">{m.example}</p>
              </div>
              <div className="md:w-2/4">
                <p className="text-xs text-emerald-400">{m.insight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Negation Patterns */}
      <div>
        <h4 className="text-sm font-bold mb-1" style={{ color: OPS_ACCENT }}>{LINGUISTIC_MARKERS.negationPatterns.title}</h4>
        <p className="text-xs text-muted-foreground mb-3">{LINGUISTIC_MARKERS.negationPatterns.subtitle}</p>
        <div className="space-y-2">
          {LINGUISTIC_MARKERS.negationPatterns.patterns.map((n, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/20 border-l-2 border-red-500/50">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <OpsCode className="text-sm font-mono text-red-400">{n.pattern}</OpsCode>
                <span className="text-xs text-muted-foreground">- {n.indicates}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{n.contrast}</p>
              <p className="text-xs text-emerald-400">{n.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </OpsCardContent>
  </OpsCard>
);
