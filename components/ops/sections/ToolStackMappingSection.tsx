import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../ui/icon';
import {
  TOOL_STACK_MAPPING,
  TOOL_STACK_LOOKUP
} from '../data/tool-mapping-content';
import { OPS_PRIMARY, OPS_ACCENT } from '../ops-tokens';
import {
  OpsPage,
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsLabel,
  OpsCode,
  OpsSection
} from '../ops-ui';

type MappingSystem = 'enneagram' | 'mbti' | 'bigFive' | 'disc';

const CorrelationCard: React.FC<{
  title: string;
  subtitle?: string;
  primaryStacks: string[];
  explanation: string;
  avoidStacks?: string[];
  avoidanceReason?: string;
  color: string;
}> = ({
  title,
  subtitle,
  primaryStacks,
  explanation,
  avoidStacks,
  avoidanceReason,
  color
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 rounded-lg bg-muted/20 border-l-4 space-y-3 cursor-pointer transition-all hover:bg-muted/30"
      style={{ borderColor: color }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div>
        <h4 className="font-bold text-sm mb-1" style={{ color }}>{title}</h4>
        {subtitle && <p className="text-xs text-muted-foreground italic">{subtitle}</p>}
      </div>

      {/* Primary Stacks */}
      <div>
        <span className="text-[10px] font-medium text-muted-foreground uppercase">Primary Stacks</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {primaryStacks.map((stack, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 rounded"
              style={{ backgroundColor: color + '30', color }}
            >
              {stack}
            </span>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <p className="text-xs text-foreground leading-tight">{explanation}</p>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-border space-y-2 animate-in zoom-in-95 duration-200">
          {avoidStacks && avoidanceReason && (
            <div className="p-2 rounded bg-red-500/10 border border-red-500/30">
              <span className="text-[10px] font-medium text-red-500">❌ Avoid:</span>
              <div className="mt-1 space-y-1">
                {avoidStacks.map((stack, i) => (
                  <p key={i} className="text-[10px] text-red-400">{stack}</p>
                ))}
              </div>
              <p className="text-[10px] text-red-400/80 italic mt-1">{avoidanceReason}</p>
            </div>
          )}
        </div>
      )}

      <div className="text-[9px] text-muted-foreground text-right">
        {expanded ? 'Click to collapse' : 'Click to expand'}
      </div>
    </div>
  );
};

export const ToolStackMappingSection: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<MappingSystem>('enneagram');

  const systems = [
    { key: 'enneagram' as MappingSystem, label: 'Enneagram', icon: 'circle' },
    { key: 'mbti' as MappingSystem, label: 'MBTI', icon: 'grid' },
    { key: 'bigFive' as MappingSystem, label: 'Big Five', icon: 'bar-chart' },
    { key: 'disc' as MappingSystem, label: 'DISC', icon: 'compass' }
  ];

  const currentSystem = TOOL_STACK_MAPPING[selectedSystem];

  return (
    <OpsPage>
      {/* Overview */}
      <OpsCard>
        <OpsCardHeader title="Tool Stacks x Mapping Systems" />
        <OpsCardContent>
          <OpsText className="mb-4">
            Different personality types have natural affinities for different Tool Stacks.
            This section maps your psychological profile to the Tool Stacks that will be most
            effective for you.
          </OpsText>
          <OpsText className="text-sm opacity-80">
            Example: Type 5 in the Enneagram (The Investigator) naturally thrives with
            <OpsCode className="text-xs mx-1" style={{ color: OPS_ACCENT }}>The Knowledge Architect</OpsCode>
            stack because both are driven by deep understanding and intellectual mastery.
          </OpsText>
        </OpsCardContent>
      </OpsCard>

      {/* System Selector */}
      <OpsCard>
        <OpsCardHeader title="Select Mapping System" />
        <OpsCardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {systems.map((system) => {
              const isSelected = selectedSystem === system.key;
              return (
                <button
                  key={system.key}
                  onClick={() => setSelectedSystem(system.key)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${isSelected
                    ? 'bg-opacity-100 text-white'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                    }`}
                  style={isSelected ? { backgroundColor: OPS_ACCENT } : {}}
                >
                  <Icon name={system.icon} size="size-5" />
                  <span className="text-xs font-medium text-center">{system.label}</span>
                </button>
              );
            })}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* System Overview */}
      <OpsCard>
        <OpsCardHeader
          title={currentSystem.system}
          accentColor="text-muted-foreground"
        />
        <OpsCardContent>
          <OpsText>{currentSystem.description}</OpsText>
        </OpsCardContent>
      </OpsCard>

      {/* Correlations */}
      <OpsCard>
        <OpsCardHeader
          title={`${currentSystem.system} → Tool Stacks Correlations`}
          accentColor="text-muted-foreground"
        />
        <OpsCardContent>
          <OpsGrid columns={selectedSystem === 'bigFive' || selectedSystem === 'disc' ? 2 : 1}>
            {('correlations' in currentSystem ? currentSystem.correlations : []).map((corr, i) => {
              // Determine color based on system
              let color = OPS_ACCENT;
              if (selectedSystem === 'enneagram') {
                const colors = [
                  '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899',
                  '#06b6d4', '#ef4444', '#14b8a6', '#f97316'
                ];
                color = colors[i % colors.length];
              } else if (selectedSystem === 'mbti') {
                const colors = [
                  '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899',
                  '#06b6d4', '#ef4444', '#14b8a6', '#f97316', '#a855f7',
                  '#fb923c', '#6366f1', '#d946ef', '#14b8a6', '#0891b2', '#e11d48'
                ];
                color = colors[i % colors.length];
              } else {
                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
                color = colors[i % colors.length];
              }

              const corrAny = corr as Record<string, unknown>;
              return (
                <CorrelationCard
                  key={i}
                  title={(corrAny.type || corrAny.dimension) as string}
                  subtitle={
                    (corrAny.tagline || corrAny.traits || corrAny.dimensions) as string
                  }
                  primaryStacks={
                    (corrAny.primaryStacks as string[]) ||
                    (corrAny.workingStyle ? [corrAny.workingStyle as string] : [])
                  }
                  explanation={corrAny.explanation as string}
                  avoidStacks={corrAny.avoidStacks as string[] | undefined}
                  avoidanceReason={corrAny.avoidanceReason as string | undefined}
                  color={color}
                />
              );
            })}
          </OpsGrid>
        </OpsCardContent>
      </OpsCard>

      {/* Quick Lookup Table */}
      <OpsCard>
        <OpsCardHeader
          title="Tool Stack Quick Lookup"
          accentColor="text-muted-foreground"
        />
        <OpsCardContent>
          <OpsText className="mb-4">
            Quick reference for which personality types are best suited for each Tool Stack.
          </OpsText>

          <div className="space-y-3">
            {Object.entries(TOOL_STACK_LOOKUP).map(([stackName, lookup], i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-muted/20 border-l-4"
                style={{ borderColor: OPS_ACCENT }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h5 className="font-bold text-sm mb-1" style={{ color: OPS_ACCENT }}>
                      {stackName}
                    </h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      <span className="font-medium">Best for:</span> {lookup.bestFor.join(', ')}
                    </p>
                    <p className="text-xs text-foreground mb-1">
                      <span className="font-medium">Characteristics:</span> {lookup.characteristics}
                    </p>
                    <p className="text-[10px] italic" style={{ color: OPS_PRIMARY }}>
                      <span className="font-medium">Core tool:</span> {lookup.coreTool}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Implementation Guide */}
      <OpsCard>
        <OpsCardHeader
          title="How to Use This Mapping"
          accentColor="text-muted-foreground"
        />
        <OpsCardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-2" style={{ color: OPS_ACCENT }}>
                1. Identify Your Type
              </h4>
              <p className="text-xs text-muted-foreground">
                Take assessments for Enneagram, MBTI, Big Five, and/or DISC to understand
                your personality profile. You can use multiple systems - they provide different
                perspectives on the same person.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2" style={{ color: OPS_ACCENT }}>
                2. Find Your Primary Tool Stacks
              </h4>
              <p className="text-xs text-muted-foreground">
                Use the mappings above to identify which Tool Stacks align with your type.
                These are your "native" stacks - they'll feel natural and produce results quickly.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2" style={{ color: OPS_ACCENT }}>
                3. Start with Core Tools
              </h4>
              <p className="text-xs text-muted-foreground">
                Each Tool Stack has a core tool that anchors it. Start with the core tool
                of your primary stack, then add complementary tools from the same stack.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2" style={{ color: OPS_ACCENT }}>
                4. Develop Secondary Stacks
              </h4>
              <p className="text-xs text-muted-foreground">
                Once you've mastered your primary stack, explore secondary stacks that address
                gaps in your personality. This builds well-rounded capabilities.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2" style={{ color: OPS_ACCENT }}>
                5. Avoid Mismatch Stacks
              </h4>
              <p className="text-xs text-muted-foreground">
                Some stacks may conflict with your natural wiring. Avoid these unless you have
                a specific reason and are willing to invest extra effort to adopt them.
              </p>
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>

      {/* Examples */}
      <OpsCard>
        <OpsCardHeader
          title="Real-World Examples"
          accentColor="text-muted-foreground"
        />
        <OpsCardContent>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-blue-500/10 border-l-4 border-blue-500">
              <h5 className="font-bold text-sm text-blue-500 mb-1">
                Example 1: Charlie Munger (Type 5 Enneagram, INTJ MBTI)
              </h5>
              <p className="text-xs text-foreground mb-2">
                Natural fit with <OpsCode className="text-xs mx-0.5" style={{ color: OPS_ACCENT }}>The Knowledge Architect</OpsCode>.
                Munger's famous latticework of mental models is literally the core tool of this stack.
                He combines it with <OpsCode className="text-xs mx-0.5" style={{ color: OPS_ACCENT }}>The Data-Driven Decider</OpsCode>
                for investment decisions and <OpsCode className="text-xs mx-0.5" style={{ color: OPS_ACCENT }}>The Strategic Leader</OpsCode>
                for Berkshire strategy.
              </p>
              <p className="text-[10px] text-blue-400 italic">
                Key insight: Avoid The Agile Builder - Munger's long-term thinking conflicts with rapid iteration.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-green-500/10 border-l-4 border-green-500">
              <h5 className="font-bold text-sm text-green-500 mb-1">
                Example 2: Steve Jobs (Type 4 Enneagram, ENFP MBTI)
              </h5>
              <p className="text-xs text-foreground mb-2">
                Natural fit with <OpsCode className="text-xs mx-0.5" style={{ color: OPS_ACCENT }}>The Creative Explorer</OpsCode>.
                Jobs' design thinking and focus on simplicity reflect this stack. He combined it with
                <OpsCode className="text-xs mx-0.5" style={{ color: OPS_ACCENT }}>The Change Catalyst</OpsCode>
                to drive adoption and <OpsCode className="text-xs mx-0.5" style={{ color: OPS_ACCENT }}>The Customer-Centric Designer</OpsCode>
                for obsessive user focus.
              </p>
              <p className="text-[10px] text-green-400 italic">
                Key insight: Adopted The Structured Thinker late (hiring Tim Cook) to balance his creative chaos.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-purple-500/10 border-l-4 border-purple-500">
              <h5 className="font-bold text-sm text-purple-500 mb-1">
                Example 3: Jeff Bezos (Type 3 Enneagram, ENTJ MBTI)
              </h5>
              <p className="text-xs text-foreground mb-2">
                Natural fit with <OpsCode className="text-xs mx-0.5" style={{ color: OPS_ACCENT }}>The Strategic Leader</OpsCode>.
                Bezos' focus on long-term vision (shareholder letters) and systematic improvement (6-pagers)
                reflect Strategic Leader + Systems Optimizer. He combines with
                <OpsCode className="text-xs mx-0.5" style={{ color: OPS_ACCENT }}>The Agile Builder</OpsCode>
                for Amazon's experimental culture.
              </p>
              <p className="text-[10px] text-purple-400 italic">
                Key insight: "Day 1" philosophy keeps Amazon in Agile Builder mode despite massive scale.
              </p>
            </div>
          </div>
        </OpsCardContent>
      </OpsCard>
    </OpsPage>
  );
};
