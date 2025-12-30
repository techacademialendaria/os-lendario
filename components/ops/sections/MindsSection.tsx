import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { StatusBadge } from '../components/StatusBadge';
import {
  MIND_EXPLANATION,
  MIND_LIFECYCLE,
  MIND_PROFILES_DETAIL,
  MIND_PSYCHOMETRICS,
  MIND_RELATIONSHIPS,
  MIND_VIEWS,
  EXAMPLE_MIND,
  MIND_SCHEMA
} from '../data/minds-content';
import { OPS_ACCENT, OPS_PRIMARY } from '../ops-tokens';
import { Icon } from '../../ui/icon';
import {
  OpsPage,
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsCode,
  OpsBadge,
  OpsProgressBar,
  OpsSection
} from '../ops-ui';

// =============================================================================
// MERMAID DIAGRAM
// =============================================================================

const MINDS_DIAGRAM = `
erDiagram
    minds ||--o{ mind_drivers : has
    minds ||--o{ mind_psychometrics : has
    minds ||--o{ mind_component_scores : has
    minds ||--o{ mind_system_mappings : has
    minds ||--o{ mind_tools : uses
    minds ||--o{ mind_tags : tagged_with
    minds ||--o{ contents : about
    minds ||--o{ fragments : extracted_from

    mind_drivers }o--|| drivers : references
    mind_tools }o--|| tools : references
    mind_tags }o--|| tags : references
    mind_component_scores }o--|| system_components : scores_in
    mind_system_mappings }o--|| mapping_systems : assessed_in

    minds {
        uuid id
        text slug
        text name
        text short_bio
        text privacy_level
        numeric apex_score
    }

    mind_drivers {
        uuid id
        uuid mind_id
        uuid driver_id
        int strength
        numeric confidence
        text evidence
    }

    mind_psychometrics {
        uuid id
        uuid mind_id
        text psychometric_type
        jsonb scores
    }
`;

// =============================================================================
// TABLE DATA
// =============================================================================

const MINDS_TABLE = [
  { table: 'minds', records: 8, status: 'ok' as const, desc: 'Registro central de cada mind (inclui obsession)' },
  { table: 'mind_drivers', records: 0, status: 'empty' as const, desc: 'Drivers inferidos (includes migrated values)' },
  { table: 'mind_psychometrics', records: 0, status: 'empty' as const, desc: 'Scores Big Five e outros' },
  { table: 'mind_component_scores', records: 0, status: 'empty' as const, desc: 'Scores em componentes de sistemas' },
  { table: 'mind_tags', records: 15, status: 'ok' as const, desc: 'Tags para categorizacao' },
  { table: 'mind_tools', records: 0, status: 'empty' as const, desc: 'Ferramentas usadas por cada mind' }
];

// =============================================================================
// COMPONENT
// =============================================================================

export const MindsSection: React.FC = () => {
  const [expandedLifecycleStage, setExpandedLifecycleStage] = useState<number | null>(null);
  const [selectedProfileType, setSelectedProfileType] = useState<string>('generalista');
  const [selectedBigFiveTrait, setSelectedBigFiveTrait] = useState<string>('Openness');

  const selectedProfile = MIND_PROFILES_DETAIL.types.find(t => t.type === selectedProfileType);
  const selectedTrait = MIND_PSYCHOMETRICS.bigFive.find(t => t.trait === selectedBigFiveTrait);

  return (
    <OpsPage>
      {/* Definition */}
      <OpsCard>
        <OpsCardHeader title={MIND_EXPLANATION.title} />
        <OpsCardContent>
          <OpsText className="text-foreground max-w-4xl mb-6">{MIND_EXPLANATION.definition}</OpsText>
          <div className="p-6 rounded-xl bg-muted/5 border-l-4" style={{ borderColor: OPS_ACCENT }}>
            <OpsText className="italic" style={{ color: OPS_ACCENT }}>{MIND_EXPLANATION.coreIdea}</OpsText>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Mind Components Overview */}
      <OpsCard>
        <OpsCardHeader title="Componentes de um Mind" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsGrid columns={3}>
            {MIND_EXPLANATION.components.map((comp, i) => (
              <div key={i} className="p-5 rounded-xl bg-muted/5 border-l-4 transition-all hover:translate-x-1" style={{ borderColor: comp.color }}>
                <div className="flex items-center gap-3 mb-3">
                  <Icon name={comp.icon} size="size-5" style={{ color: comp.color }} />
                  <code className="text-base font-bold" style={{ color: comp.color }}>{comp.name}</code>
                </div>
                <OpsText>{comp.desc}</OpsText>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Lifecycle */}
      <OpsCard>
        <OpsCardHeader title={MIND_LIFECYCLE.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-6 max-w-4xl">{MIND_LIFECYCLE.description}</OpsText>

          {/* Lifecycle Flow */}
          <div className="flex flex-wrap gap-4 mb-8 overflow-x-auto pb-4 custom-scrollbar">
            {MIND_LIFECYCLE.stages.map((stage, i) => (
              <div key={i} className="flex items-center">
                <button
                  onClick={() => setExpandedLifecycleStage(expandedLifecycleStage === stage.stage ? null : stage.stage)}
                  className={cn(
                    "flex-shrink-0 w-40 p-4 rounded-xl border transition-all cursor-pointer text-left relative overflow-hidden group",
                    expandedLifecycleStage === stage.stage ? 'ring-2 ring-offset-2 ring-offset-background bg-muted/10' : 'hover:bg-muted/5'
                  )}
                  style={{
                    borderColor: stage.color + '40',
                    ...(expandedLifecycleStage === stage.stage ? { '--tw-ring-color': stage.color } as any : {})
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: stage.color, color: '#000' }}
                    >
                      {stage.stage}
                    </span>
                    <Icon name={stage.icon} size="size-4" style={{ color: stage.color }} />
                  </div>
                  <h5 className="text-sm font-bold" style={{ color: stage.color }}>{stage.name}</h5>
                </button>
                {i < MIND_LIFECYCLE.stages.length - 1 && (
                  <div className="mx-2 flex-shrink-0 opacity-30">
                    <Icon name="arrow-right" size="size-5" style={{ color: OPS_PRIMARY }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Expanded Stage Details */}
          {expandedLifecycleStage !== null && (
            <div
              className="p-6 rounded-xl bg-muted/5 border-l-4 animate-in fade-in duration-300 slide-in-from-top-2"
              style={{ borderColor: MIND_LIFECYCLE.stages[expandedLifecycleStage - 1].color }}
            >
              <h4 className="font-bold text-base md:text-lg mb-4 flex items-center gap-3" style={{ color: MIND_LIFECYCLE.stages[expandedLifecycleStage - 1].color }}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-current text-background text-sm">
                  {MIND_LIFECYCLE.stages[expandedLifecycleStage - 1].stage}
                </span>
                {MIND_LIFECYCLE.stages[expandedLifecycleStage - 1].name}: {MIND_LIFECYCLE.stages[expandedLifecycleStage - 1].description}
              </h4>

              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Criterios:</span>
                  <ul className="space-y-2">
                    {MIND_LIFECYCLE.stages[expandedLifecycleStage - 1].criteria.map((c, i) => (
                      <li key={i} className="text-sm text-foreground flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: MIND_LIFECYCLE.stages[expandedLifecycleStage - 1].color }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Proxima Acao:</span>
                  <div className="p-4 rounded-lg bg-background/50 border border-border/10">
                    <span className="text-sm text-foreground leading-relaxed">{MIND_LIFECYCLE.stages[expandedLifecycleStage - 1].nextAction}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </OpsCardContent>
      </OpsCard>

      {/* Profile Types */}
      <OpsCard>
        <OpsCardHeader title={MIND_PROFILES_DETAIL.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-6">{MIND_PROFILES_DETAIL.description}</OpsText>

          {/* Type Selector */}
          <div className="flex flex-wrap gap-3 mb-8">
            {MIND_PROFILES_DETAIL.types.map((type) => (
              <button
                key={type.type}
                onClick={() => setSelectedProfileType(type.type)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                  selectedProfileType === type.type
                    ? 'text-foreground border-transparent shadow-sm scale-105'
                    : 'bg-muted/10 text-muted-foreground border-transparent hover:bg-muted/20 hover:text-foreground'
                )}
                style={selectedProfileType === type.type ? { backgroundColor: type.color + '20', color: type.color, borderColor: type.color } : {}}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Selected Profile Detail */}
          {selectedProfile && (
            <div className="p-6 rounded-xl bg-muted/5 border-l-4 shadow-sm" style={{ borderColor: selectedProfile.color }}>
              <h4 className="font-bold text-lg mb-2" style={{ color: selectedProfile.color }}>{selectedProfile.name}</h4>
              <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed max-w-3xl">{selectedProfile.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 rounded-lg bg-background/50 border border-border/10">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">Formato</span>
                  <span className="text-sm text-foreground">{selectedProfile.format}</span>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/10">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">Caso de Uso</span>
                  <span className="text-sm text-foreground">{selectedProfile.useCase}</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-background/50 border border-border/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: selectedProfile.color }}></div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Exemplo</span>
                <span className="text-sm italic block pl-2" style={{ color: selectedProfile.color, fontFamily: 'serif' }}>"{selectedProfile.example}"</span>
              </div>
            </div>
          )}

          {/* Storage Formats */}
          <div className="mt-8 pt-6 border-t border-border/10">
            <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Formatos de Armazenamento</h5>
            <OpsGrid columns={3}>
              {MIND_PROFILES_DETAIL.storageFormats.map((fmt, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/5 border border-border/10 transition-colors hover:border-border/20">
                  <code className="text-sm font-bold block mb-2" style={{ color: OPS_ACCENT }}>{fmt.format}</code>
                  <div className="text-xs text-muted-foreground mb-3 leading-relaxed">{fmt.description}</div>
                  <span className="text-[10px] font-mono bg-muted/20 px-1.5 py-0.5 rounded" style={{ color: OPS_PRIMARY }}>col: {fmt.column}</span>
                </div>
              ))}
            </OpsGrid>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Psychometrics / Big Five */}
      <OpsCard>
        <OpsCardHeader title={MIND_PSYCHOMETRICS.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-6 max-w-4xl">{MIND_PSYCHOMETRICS.description}</OpsText>

          {/* Big Five Traits */}
          <div className="flex flex-wrap gap-3 mb-8">
            {MIND_PSYCHOMETRICS.bigFive.map((trait) => (
              <button
                key={trait.trait}
                onClick={() => setSelectedBigFiveTrait(trait.trait)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  selectedBigFiveTrait === trait.trait
                    ? 'text-foreground shadow-sm scale-105'
                    : 'bg-muted/10 text-muted-foreground hover:bg-muted/20 hover:text-foreground'
                )}
                style={selectedBigFiveTrait === trait.trait ? { backgroundColor: trait.color + '20', color: trait.color, border: `1px solid ${trait.color}` } : { border: '1px solid transparent' }}
              >
                <span className="font-bold opacity-70">{trait.abbrev}</span>
                <span>{trait.trait}</span>
              </button>
            ))}
          </div>

          {/* Selected Trait Detail */}
          {selectedTrait && (
            <div className="p-6 rounded-xl bg-muted/5 border-l-4 shadow-sm animate-in fade-in zoom-in-95 duration-200" style={{ borderColor: selectedTrait.color }}>
              <h4 className="font-bold text-lg mb-2" style={{ color: selectedTrait.color }}>{selectedTrait.trait}</h4>
              <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">{selectedTrait.desc}</p>

              {/* Spectrum */}
              <div className="mb-6 p-4 rounded-lg bg-background/50 border border-border/10">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-muted-foreground w-24 text-right uppercase tracking-wider">{selectedTrait.low}</span>
                  <div className="flex-1 h-3 rounded-full relative bg-muted/20 overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(to right, ${OPS_PRIMARY}, ${selectedTrait.color})` }} />
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-background/40 to-transparent w-full h-full skew-x-12 opacity-30" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground w-24 uppercase tracking-wider">{selectedTrait.high}</span>
                </div>
              </div>

              {/* Facets */}
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Facetas</span>
                <div className="flex flex-wrap gap-2">
                  {selectedTrait.facets.map((facet, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-md font-medium border"
                      style={{
                        backgroundColor: selectedTrait.color + '10',
                        color: selectedTrait.color,
                        borderColor: selectedTrait.color + '20'
                      }}
                    >
                      {facet}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Example Profile */}
          <div className="mt-8 p-6 rounded-xl bg-muted/5 border border-border/10">
            <h5 className="font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: OPS_ACCENT }}>
              <Icon name="user" size="size-4" />
              Exemplo: {MIND_PSYCHOMETRICS.exampleProfile.mind}
            </h5>

            <div className="grid grid-cols-5 gap-4 mb-4">
              {MIND_PSYCHOMETRICS.bigFive.map((trait, i) => {
                const score = MIND_PSYCHOMETRICS.exampleProfile.scores[trait.trait.toLowerCase() as keyof typeof MIND_PSYCHOMETRICS.exampleProfile.scores]?.score || 0;
                return (
                  <div key={i} className="text-center group">
                    <div className="w-full h-24 rounded-lg bg-muted/20 relative overflow-hidden mb-2">
                      <div
                        className="absolute bottom-0 left-0 right-0 transition-all duration-700 ease-out group-hover:opacity-90"
                        style={{ height: `${score}%`, backgroundColor: trait.color }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white drop-shadow-md z-10">
                        {score}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">{trait.abbrev}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-sm text-muted-foreground italic leading-relaxed border-t border-border/10 pt-4 mt-4">
              "{MIND_PSYCHOMETRICS.exampleProfile.interpretation}"
            </p>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Relationships */}
      <OpsCard>
        <OpsCardHeader title={MIND_RELATIONSHIPS.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-6">{MIND_RELATIONSHIPS.description}</OpsText>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inbound */}
            <div className="p-6 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
              <h5 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: '#0891b2' }}>
                <Icon name="arrow-small-down" size="size-4" />
                Inbound (dados que alimentam)
              </h5>
              <div className="space-y-3">
                {MIND_RELATIONSHIPS.inbound.map((rel, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/5 hover:border-cyan-500/30 transition-colors">
                    <div className="mt-0.5 p-1.5 rounded bg-cyan-500/10">
                      <Icon name={rel.icon} size="size-4" style={{ color: '#0891b2' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <code className="text-sm font-bold" style={{ color: OPS_ACCENT }}>{rel.table}</code>
                        <span className="text-[10px] font-mono text-muted-foreground bg-muted/40 text-foreground px-1.5 py-0.5 rounded">{rel.cardinality}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{rel.relationship}</p>
                      <span className="text-[10px] italic opacity-70 block" style={{ color: OPS_PRIMARY }}>via: {rel.via}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outbound */}
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/10">
              <h5 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: '#dc2626' }}>
                <Icon name="arrow-small-up" size="size-4" />
                Outbound (dados derivados)
              </h5>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {MIND_RELATIONSHIPS.outbound.map((rel, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/5 hover:border-red-500/30 transition-colors">
                    <div className="mt-0.5 p-1.5 rounded bg-red-500/10">
                      <Icon name={rel.icon} size="size-4" style={{ color: '#dc2626' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <code className="text-sm font-bold" style={{ color: OPS_ACCENT }}>{rel.table}</code>
                        <span className="text-[10px] font-mono text-muted-foreground bg-muted/40 text-foreground px-1.5 py-0.5 rounded">{rel.cardinality}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{rel.relationship}</p>
                      <span className="text-[10px] italic opacity-70 block" style={{ color: OPS_PRIMARY }}>via: {rel.via}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Example Mind */}
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
                        style={{ width: `${d.strength * 10}%`, backgroundColor: '#e11d48' }} // Darker red for light mode
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

            {/* Obsession (consolidated to single field on minds table) */}
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
                      color: '#0d9488', // Darker teal for light mode contrast
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

      {/* Views */}
      <OpsCard>
        <OpsCardHeader title={MIND_VIEWS.title} accentColor="text-muted-foreground" />
        <OpsCardContent>
          <OpsText className="mb-6">{MIND_VIEWS.description}</OpsText>

          <OpsGrid>
            {MIND_VIEWS.views.map((view, i) => (
              <div key={i} className="p-5 rounded-xl bg-muted/5 border border-border/10 hover:border-border/30 transition-all">
                <code className="text-sm font-bold block mb-2" style={{ color: OPS_ACCENT }}>{view.name}</code>
                <p className="text-sm text-foreground mb-3 leading-relaxed">{view.purpose}</p>
                <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Retorna</span>
                    <code className="text-xs bg-muted/20 px-1 py-0.5 rounded">{view.returns}</code>
                  </div>
                  <div className="flex flex-col border-l border-border/10 pl-3">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Uso</span>
                    <span className="text-xs italic" style={{ color: OPS_PRIMARY }}>{view.useCase}</span>
                  </div>
                </div>
              </div>
            ))}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* ER Diagram */}
      <OpsCard>
        <OpsCardHeader title="Schema - Relacionamentos" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <MermaidDiagram chart={MINDS_DIAGRAM} id="minds" />
        </OpsCardContent>
      </OpsCard>

      {/* Table Schema Reference */}
      <OpsCard>
        <OpsCardHeader title="Schema - Colunas Principais" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="space-y-6">
            {Object.entries(MIND_SCHEMA).map(([tableName, columns], i) => (
              <div key={i} className="p-5 rounded-xl bg-muted/5 border border-border/10">
                <code className="text-base font-bold block mb-4" style={{ color: OPS_ACCENT }}>{tableName}</code>
                <div className="space-y-2">
                  {columns.map((col, j) => (
                    <div key={j} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm border-b border-border/5 last:border-0 pb-2 last:pb-0">
                      <code className="text-foreground font-bold w-40">{col.column}</code>
                      <span className="text-muted-foreground font-mono text-xs w-24 opacity-70">{col.type}</span>
                      <span className="text-muted-foreground flex-1 leading-relaxed">{col.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Table Status */}
      <OpsCard>
        <OpsCardHeader title="Status das Tabelas" accentColor="text-muted-foreground" />
        <OpsCardContent>
          <div className="overflow-x-auto rounded-lg border border-border/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 bg-muted/20">
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Tabela</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Registros</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell">Descricao</th>
                </tr>
              </thead>
              <tbody>
                {MINDS_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-border/10 hover:bg-muted/10 transition-colors">
                    <td className="py-3 px-4"><OpsCode style={{ color: OPS_ACCENT }}>{row.table}</OpsCode></td>
                    <td className="py-3 px-4 font-mono font-bold text-foreground">{row.records}</td>
                    <td className="py-3 px-4"><StatusBadge status={row.status} /></td>
                    <td className="py-3 px-4 text-muted-foreground text-xs hidden md:table-cell leading-relaxed">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </OpsCardContent>
      </OpsCard>
    </OpsPage>
  );
};
