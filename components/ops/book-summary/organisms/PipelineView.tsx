import React from 'react';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { OPS_ACCENT, OPS_PRIMARY } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsCode,
} from '../../ops-ui';
import {
  BOOK_SUMMARY_DATA_FLOW,
  PRE_PIPELINE_PHASES,
  ETL_PHASES,
  CORE_PHASES,
  METADATA_SCHEMA,
  OUTPUT_STRUCTURE,
  type BookSummaryPhase,
} from '../../data/book-summary-content';
import type { PipelineViewProps } from '../types';

export const PipelineView: React.FC<PipelineViewProps> = ({
  isExpanded,
  onToggle,
}) => {
  return (
    <>
      <DataFlowCard isExpanded={isExpanded} onToggle={onToggle} />
      <PrePipelineCard />
      <ETLCard />
      <CorePipelineCard />
      <MetadataSchemaCard />
      <OutputStructureCard />
    </>
  );
};

// ============================================================================
// Data Flow Card
// ============================================================================

interface DataFlowCardProps {
  isExpanded: (id: string) => boolean;
  onToggle: (id: string) => void;
}

const DataFlowCard: React.FC<DataFlowCardProps> = ({ isExpanded, onToggle }) => (
  <OpsCard>
    <OpsCardHeader title="Data Flow - Passo a Passo" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <div className="mb-4 p-3 rounded-lg bg-muted/20">
        <span className="text-xs font-bold" style={{ color: OPS_ACCENT }}>Input: </span>
        <span className="text-xs text-foreground">{BOOK_SUMMARY_DATA_FLOW.originalInput}</span>
        <br />
        <span className="text-xs text-muted-foreground">{BOOK_SUMMARY_DATA_FLOW.context}</span>
      </div>

      <div className="space-y-3">
        {BOOK_SUMMARY_DATA_FLOW.steps.map((step) => (
          <DataFlowStep
            key={step.phase}
            step={step}
            isExpanded={isExpanded(`phase-${step.phase}`)}
            onToggle={() => onToggle(`phase-${step.phase}`)}
          />
        ))}
      </div>
    </OpsCardContent>
  </OpsCard>
);

interface DataFlowStepProps {
  step: (typeof BOOK_SUMMARY_DATA_FLOW.steps)[0];
  isExpanded: boolean;
  onToggle: () => void;
}

const DataFlowStep: React.FC<DataFlowStepProps> = ({ step, isExpanded, onToggle }) => (
  <div
    className="p-4 rounded-lg bg-muted/10 border-l-4 cursor-pointer transition-all hover:bg-muted/20"
    style={{ borderColor: OPS_ACCENT }}
    onClick={onToggle}
  >
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-[10px]" style={{ borderColor: OPS_ACCENT, color: OPS_ACCENT }}>
          Phase {step.phase}
        </Badge>
        <span className="text-sm font-bold" style={{ color: OPS_ACCENT }}>{step.phaseName}</span>
      </div>
      <Icon
        name={isExpanded ? 'chevron-up' : 'chevron-down'}
        size="size-4"
        style={{ color: OPS_PRIMARY }}
      />
    </div>

    {isExpanded && (
      <div className="mt-3 space-y-2 pt-3 border-t border-border/20">
        <div className="text-xs">
          <span className="font-bold text-cyan-400">Input: </span>
          <span className="text-muted-foreground">{step.input}</span>
        </div>
        <div className="text-xs">
          <span className="font-bold text-amber-400">Process: </span>
          <span className="text-muted-foreground">{step.process}</span>
        </div>
        <div className="text-xs">
          <span className="font-bold text-emerald-400">Output: </span>
          <span className="text-muted-foreground">{step.output}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {step.files.map((file, j) => (
            <OpsCode key={j} className="text-[9px] bg-muted/20 px-1.5 py-0.5 rounded">{file}</OpsCode>
          ))}
        </div>
      </div>
    )}
  </div>
);

// ============================================================================
// Pipeline Phase Cards
// ============================================================================

const PrePipelineCard: React.FC = () => (
  <OpsCard accentColor="#8B5CF6" variant="highlight">
    <OpsCardHeader title="PRE-PIPELINE (Executar UMA VEZ por livro)" accentColor="#8B5CF6">
      <Badge variant="outline" className="text-violet-400 border-violet-400/30">4 Etapas</Badge>
    </OpsCardHeader>
    <OpsCardContent>
      <OpsGrid columns={2}>
        {PRE_PIPELINE_PHASES.map((phase, i) => (
          <PhaseCard
            key={i}
            phase={phase}
            color="#8B5CF6"
            bgClass="bg-violet-500/10"
            borderClass="border-violet-500/20"
          />
        ))}
      </OpsGrid>
    </OpsCardContent>
  </OpsCard>
);

const ETLCard: React.FC = () => (
  <OpsCard accentColor="#06B6D4" variant="highlight">
    <OpsCardHeader title="PHASE 0: ETL (Discovery + Fetch)" accentColor="#06B6D4">
      <Badge variant="outline" className="text-cyan-400 border-cyan-400/30">3 Etapas</Badge>
    </OpsCardHeader>
    <OpsCardContent>
      <OpsGrid columns={3}>
        {ETL_PHASES.map((phase, i) => (
          <PhaseCard
            key={i}
            phase={phase}
            color="#06B6D4"
            bgClass="bg-cyan-500/10"
            borderClass="border-cyan-500/20"
            showContext
          />
        ))}
      </OpsGrid>
    </OpsCardContent>
  </OpsCard>
);

const CorePipelineCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="CORE PIPELINE (Phases 1-11)" accentColor="text-muted-foreground">
      <Badge variant="outline" className="border-amber-400/30 text-amber-400">11 Fases</Badge>
    </OpsCardHeader>
    <OpsCardContent>
      <OpsGrid columns={2}>
        {CORE_PHASES.map((phase, i) => {
          const isPro = phase.model === 'PRO';
          return (
            <CorePhaseCard
              key={i}
              phase={phase}
              isPro={isPro}
            />
          );
        })}
      </OpsGrid>
    </OpsCardContent>
  </OpsCard>
);

interface PhaseCardProps {
  phase: BookSummaryPhase;
  color: string;
  bgClass: string;
  borderClass: string;
  showContext?: boolean;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, color, bgClass, borderClass, showContext }) => (
  <div className={`p-4 rounded-lg ${bgClass} border ${borderClass}`}>
    <div className="flex items-center gap-2 mb-2">
      <Icon name={phase.icon} size="size-4" style={{ color }} />
      <span className="text-xs font-bold" style={{ color }}>{phase.name}</span>
      <Badge variant="outline" className="text-[9px]" style={{ borderColor: `${color}40`, color }}>{phase.model}</Badge>
    </div>
    <p className="text-xs text-muted-foreground mb-2">{phase.description}</p>
    {showContext && phase.contextInjected && (
      <div className="mb-2">
        <span className="text-[9px] text-muted-foreground">Context: </span>
        {phase.contextInjected.map((c, j) => (
          <OpsCode key={j} className="text-[9px] mr-1">{c}</OpsCode>
        ))}
      </div>
    )}
    <OpsCode className="text-[10px]" style={{ color }}>{phase.output}</OpsCode>
  </div>
);

interface CorePhaseCardProps {
  phase: (typeof CORE_PHASES)[0];
  isPro: boolean;
}

const CorePhaseCard: React.FC<CorePhaseCardProps> = ({ phase, isPro }) => {
  const bgColor = isPro ? 'bg-blue-500/10' : 'bg-amber-500/10';
  const borderColor = isPro ? 'border-blue-500/20' : 'border-amber-500/20';
  const textColor = isPro ? '#3B82F6' : '#F59E0B';

  return (
    <div className={`p-4 rounded-lg ${bgColor} border ${borderColor}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon name={phase.icon} size="size-4" style={{ color: textColor }} />
        <span className="text-xs font-bold" style={{ color: textColor }}>
          Phase {phase.phase}: {phase.name}
        </span>
        <Badge
          variant="outline"
          className="text-[9px]"
          style={{ borderColor: `${textColor}40`, color: textColor }}
        >
          {phase.model}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{phase.description}</p>
      {phase.contextInjected && (
        <div className="mb-2 flex flex-wrap gap-1">
          {phase.contextInjected.slice(0, 3).map((c, j) => (
            <OpsCode key={j} className="text-[9px]">{c}</OpsCode>
          ))}
          {phase.contextInjected.length > 3 && (
            <span className="text-[9px] text-muted-foreground">+{phase.contextInjected.length - 3} more</span>
          )}
        </div>
      )}
      <OpsCode className="text-[10px]" style={{ color: textColor }}>{phase.output}</OpsCode>
    </div>
  );
};

// ============================================================================
// Metadata & Output Cards
// ============================================================================

const MetadataSchemaCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Metadata Schema (45+ campos)" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsGrid columns={2}>
        {Object.entries(METADATA_SCHEMA).map(([category, fields]) => (
          <div key={category} className="p-3 rounded-lg bg-muted/10">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: OPS_ACCENT }}>
              {category}
            </h4>
            <div className="flex flex-wrap gap-1">
              {fields.map((field, i) => (
                <OpsCode key={i} className="text-[10px] bg-muted/20 px-1.5 py-0.5 rounded">{field}</OpsCode>
              ))}
            </div>
          </div>
        ))}
      </OpsGrid>
    </OpsCardContent>
  </OpsCard>
);

const OutputStructureCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Output Structure" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <div className="font-mono text-sm">
        <div className="text-cyan-400 mb-4">{OUTPUT_STRUCTURE.root}</div>

        <div className="ml-4 space-y-1 mb-4">
          {OUTPUT_STRUCTURE.files.map((file, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <Icon name="document-text" size="size-3" style={{ color: OPS_ACCENT }} />
              <span className="text-foreground">{file.name}</span>
              <span className="text-muted-foreground text-[10px]">- {file.description}</span>
            </div>
          ))}
        </div>

        {OUTPUT_STRUCTURE.folders.map((folder, i) => (
          <div key={i} className="ml-4 mb-4">
            <div className="flex items-center gap-2 text-xs text-amber-400 mb-2">
              <Icon name="folder" size="size-3" />
              {folder.name}
            </div>
            <div className="ml-6 space-y-1">
              {folder.files.map((file, j) => (
                <div key={j} className="flex items-center gap-2 text-xs">
                  <Icon name="document-text" size="size-3" style={{ color: OPS_PRIMARY }} />
                  <span className="text-muted-foreground">{file.name}</span>
                  <span className="text-muted-foreground/60 text-[10px]">- {file.description}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </OpsCardContent>
  </OpsCard>
);
