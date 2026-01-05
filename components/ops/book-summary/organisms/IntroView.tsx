import React from 'react';
import { Icon } from '../../../ui/icon';
import { OPS_ACCENT } from '../../ops-tokens';
import {
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
} from '../../ops-ui';
import { StatsGrid, type StatItem } from '../../../shared/molecules';
import {
  BOOK_SUMMARY_PROJECT_CONTEXT,
  BOOK_SUMMARY_EXPLANATION,
} from '../../data/book-summary-content';
import type { IntroViewProps } from '../types';

export const IntroView: React.FC<IntroViewProps> = () => {
  return (
    <>
      <ProjectContextCard />
      <TechStackCard />
      <PipelineStatsCard />
      <NavigationHintCard />
    </>
  );
};

// ============================================================================
// Sub-components
// ============================================================================

const ProjectContextCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title={BOOK_SUMMARY_PROJECT_CONTEXT.title} />
    <OpsCardContent>
      <div className="space-y-4">
        {BOOK_SUMMARY_PROJECT_CONTEXT.sections.map((section) => (
          <div
            key={section.id}
            className="p-4 rounded-lg bg-muted/10 border-l-4 transition-all hover:bg-muted/20"
            style={{ borderColor: section.color }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon name={section.icon} size="size-5" style={{ color: section.color }} />
              <h4 className="font-bold text-sm" style={{ color: section.color }}>
                {section.title}
              </h4>
            </div>
            <OpsText className="text-sm">{section.content}</OpsText>
          </div>
        ))}
      </div>
    </OpsCardContent>
  </OpsCard>
);

const TechStackCard: React.FC = () => (
  <OpsCard>
    <OpsCardHeader title="Stack Tecnologico" accentColor="text-muted-foreground" />
    <OpsCardContent>
      <OpsGrid columns={3}>
        {BOOK_SUMMARY_PROJECT_CONTEXT.techStack.map((tech) => (
          <div
            key={tech.name}
            className="p-4 rounded-lg bg-muted/10 border border-border/20 transition-all hover:bg-muted/20 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${tech.color}20` }}
              >
                <Icon name={tech.icon} size="size-4" style={{ color: tech.color }} />
              </div>
              <span className="font-bold text-sm" style={{ color: tech.color }}>
                {tech.name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{tech.description}</p>
            <p className="text-[10px] text-foreground/60 italic">{tech.reason}</p>
          </div>
        ))}
      </OpsGrid>
    </OpsCardContent>
  </OpsCard>
);

const PipelineStatsCard: React.FC = () => {
  const stats: StatItem[] = [
    {
      id: 'total-phases',
      icon: 'layers',
      iconColorClass: 'text-violet-400',
      bgColorClass: 'bg-violet-500/10',
      value: BOOK_SUMMARY_EXPLANATION.stats.totalPhases,
      label: 'Fases Totais',
    },
    {
      id: 'pro-calls',
      icon: 'cpu',
      iconColorClass: 'text-blue-400',
      bgColorClass: 'bg-blue-500/10',
      value: BOOK_SUMMARY_EXPLANATION.stats.proModelCalls,
      label: 'Chamadas PRO',
    },
    {
      id: 'flash-calls',
      icon: 'zap',
      iconColorClass: 'text-amber-400',
      bgColorClass: 'bg-amber-500/10',
      value: BOOK_SUMMARY_EXPLANATION.stats.flashModelCalls,
      label: 'Chamadas FLASH',
    },
    {
      id: 'output-words',
      icon: 'document-text',
      iconColorClass: 'text-emerald-400',
      bgColorClass: 'bg-emerald-500/10',
      value: BOOK_SUMMARY_EXPLANATION.stats.outputWordCount,
      label: 'Palavras Output',
    },
  ];

  return (
    <OpsCard>
      <OpsCardHeader title="Pipeline em Numeros" accentColor="text-muted-foreground" />
      <OpsCardContent>
        <StatsGrid stats={stats} columns={4} />
      </OpsCardContent>
    </OpsCard>
  );
};

const NavigationHintCard: React.FC = () => (
  <OpsCard variant="highlight">
    <OpsCardContent>
      <div
        className="p-4 rounded-lg border-l-4"
        style={{ borderColor: OPS_ACCENT, backgroundColor: 'rgba(201, 178, 152, 0.05)' }}
      >
        <h4 className="font-bold text-sm mb-2" style={{ color: OPS_ACCENT }}>Navegacao</h4>
        <p className="text-xs text-muted-foreground">
          Use as abas acima para explorar: <strong>Decisoes</strong> explica o porquê das escolhas arquiteturais,{' '}
          <strong>Pipeline</strong> detalha cada fase, e <strong>Glossario</strong> define todos os termos tecnicos.
        </p>
      </div>
    </OpsCardContent>
  </OpsCard>
);
