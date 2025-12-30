import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../ui/icon';
import { TOOL_STACK_PROFILES } from '../data/tool-stacks-reverse-mapping';
import { OPS_ACCENT } from '../ops-tokens';
import {
  OpsPage,
  OpsCard,
  OpsCardHeader,
  OpsCardContent,
  OpsGrid,
  OpsText,
  OpsLabel,
  OpsSection
} from '../ops-ui';

type MappingFilter = 'all' | 'enneagram' | 'mbti' | 'bigFive' | 'disc';

interface StackCardProps {
  name: string;
  profile: typeof TOOL_STACK_PROFILES[keyof typeof TOOL_STACK_PROFILES];
}

const StackCard: React.FC<StackCardProps> = ({ name, profile }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <OpsCard
      variant="highlight"
      accentColor={profile.color}
      className="cursor-pointer transition-all hover:shadow-md"
      onClick={() => setExpanded(!expanded)}
    >
      <OpsCardHeader
        title={
          <div className="flex items-center gap-2">
            <Icon
              name={profile.icon as any}
              size="size-4"
              style={{ color: profile.color }}
            />
            <span style={{ color: profile.color }}>{name}</span>
          </div>
        }
        accentColor={profile.color}
      />

      <OpsCardContent className="space-y-4">
        {/* Description */}
        <div>
          <OpsLabel>Description</OpsLabel>
          <OpsText className="text-xs">{profile.description}</OpsText>
        </div>

        {/* Core Tools */}
        <div>
          <OpsLabel>Core Tools</OpsLabel>
          <div className="space-y-1.5">
            {profile.coreTools.map((tool, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[10px] font-bold text-muted-foreground mt-0.5">•</span>
                <span className="text-xs text-muted-foreground">{tool}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personality Profiles - Always Show Basics, Expand for Details */}
        <div className="border-t border-border/20 pt-3 space-y-3">
          {/* Enneagram */}
          <div>
            <OpsLabel className="flex items-center gap-1">
              <span>Enneagram</span>
              {profile.enneagram.primary.length > 0 && (
                <span className="text-[9px] ml-auto bg-muted/50 px-1.5 py-0.5 rounded">
                  {profile.enneagram.primary[0]?.split(' - ')[0]}
                </span>
              )}
            </OpsLabel>
            {expanded && (
              <div className="space-y-1">
                <div className="text-[10px] text-muted-foreground">
                  <strong>Primary:</strong> {profile.enneagram.primary.join(', ')}
                </div>
                {profile.enneagram.secondary.length > 0 && (
                  <div className="text-[10px] text-muted-foreground">
                    <strong>Secondary:</strong> {profile.enneagram.secondary.join(', ')}
                  </div>
                )}
                <div className="text-[10px] text-muted-foreground italic">
                  {profile.enneagram.explanation}
                </div>
              </div>
            )}
            {!expanded && profile.enneagram.primary.length > 0 && (
              <div className="text-[10px] text-muted-foreground truncate">
                {profile.enneagram.primary.join(', ')}
              </div>
            )}
          </div>

          {/* MBTI */}
          <div>
            <OpsLabel className="flex items-center gap-1">
              <span>MBTI</span>
              {profile.mbti.primary.length > 0 && (
                <span className="text-[9px] ml-auto bg-muted/50 px-1.5 py-0.5 rounded">
                  {profile.mbti.primary[0]?.split(' - ')[0]}
                </span>
              )}
            </OpsLabel>
            {expanded && (
              <div className="space-y-1">
                <div className="text-[10px] text-muted-foreground">
                  <strong>Primary:</strong> {profile.mbti.primary.join(', ')}
                </div>
                {profile.mbti.secondary.length > 0 && (
                  <div className="text-[10px] text-muted-foreground">
                    <strong>Secondary:</strong> {profile.mbti.secondary.join(', ')}
                  </div>
                )}
                <div className="text-[10px] text-muted-foreground italic">
                  {profile.mbti.explanation}
                </div>
              </div>
            )}
            {!expanded && profile.mbti.primary.length > 0 && (
              <div className="text-[10px] text-muted-foreground truncate">
                {profile.mbti.primary.join(', ')}
              </div>
            )}
          </div>

          {/* Big Five */}
          <div>
            <OpsLabel>Big Five</OpsLabel>
            {expanded && (
              <div className="space-y-1">
                <div className="text-[10px] text-muted-foreground">
                  <strong>Primary:</strong> {profile.bigFive.primary.join(', ')}
                </div>
                {profile.bigFive.secondary.length > 0 && (
                  <div className="text-[10px] text-muted-foreground">
                    <strong>Secondary:</strong> {profile.bigFive.secondary.join(', ')}
                  </div>
                )}
                <div className="text-[10px] text-muted-foreground italic">
                  {profile.bigFive.explanation}
                </div>
              </div>
            )}
            {!expanded && profile.bigFive.primary.length > 0 && (
              <div className="text-[10px] text-muted-foreground truncate">
                {profile.bigFive.primary.join(', ')}
              </div>
            )}
          </div>

          {/* DISC */}
          <div>
            <OpsLabel>DISC</OpsLabel>
            {expanded && (
              <div className="space-y-1">
                <div className="text-[10px] text-muted-foreground">
                  <strong>Primary:</strong> {profile.disc.primary.join(', ')}
                </div>
                {profile.disc.secondary.length > 0 && (
                  <div className="text-[10px] text-muted-foreground">
                    <strong>Secondary:</strong> {profile.disc.secondary.join(', ')}
                  </div>
                )}
                <div className="text-[10px] text-muted-foreground italic">
                  {profile.disc.explanation}
                </div>
              </div>
            )}
            {!expanded && profile.disc.primary.length > 0 && (
              <div className="text-[10px] text-muted-foreground truncate">
                {profile.disc.primary.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Secondary & Avoid Stacks - Show when expanded */}
        {expanded && (
          <div className="border-t border-border/20 pt-3 space-y-3">
            {profile.secondaryStacks.length > 0 && (
              <div>
                <OpsLabel>Secondary Stacks</OpsLabel>
                <div className="space-y-1">
                  {profile.secondaryStacks.map((stack, idx) => (
                    <div key={idx} className="text-[10px] text-muted-foreground">
                      • {stack}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profile.avoidStacks.length > 0 && (
              <div>
                <OpsLabel>Avoid Stacks</OpsLabel>
                <div className="space-y-1">
                  {profile.avoidStacks.map((stack, idx) => (
                    <div key={idx} className="text-[10px] text-muted-foreground">
                      • {stack}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths & Challenges */}
            <div className="border-t border-border/20 pt-3 space-y-2">
              <div>
                <OpsLabel className="text-emerald-600">✓ Strengths</OpsLabel>
                <OpsText className="text-[10px]">{profile.strength}</OpsText>
              </div>
              <div>
                <OpsLabel className="text-amber-600">⚠ Challenges</OpsLabel>
                <OpsText className="text-[10px]">{profile.challenge}</OpsText>
              </div>
            </div>
          </div>
        )}

        {/* Expand hint */}
        <div className="flex justify-center pt-1">
          <span className="text-[9px] text-muted-foreground/50">
            {expanded ? '▲ Click to collapse' : '▼ Click to expand'}
          </span>
        </div>
      </OpsCardContent>
    </OpsCard>
  );
};

export const ToolStacksGridSection: React.FC = () => {
  const [filter, setFilter] = useState<MappingFilter>('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filterButtons = [
    { id: 'all', label: 'All Stacks', icon: 'grid-3x3' },
    { id: 'enneagram', label: 'Enneagram', icon: 'triangle' },
    { id: 'mbti', label: 'MBTI', icon: 'type' },
    { id: 'bigFive', label: 'Big Five', icon: 'star' },
    { id: 'disc', label: 'DISC', icon: 'target' },
  ] as const;

  // Get unique types for each mapping system
  const getTypesForSystem = (system: MappingFilter): string[] => {
    const types = new Set<string>();

    Object.values(TOOL_STACK_PROFILES).forEach((profile) => {
      switch (system) {
        case 'enneagram':
          profile.enneagram.primary.forEach((t) => types.add(t));
          profile.enneagram.secondary.forEach((t) => types.add(t));
          break;
        case 'mbti':
          profile.mbti.primary.forEach((t) => types.add(t));
          profile.mbti.secondary.forEach((t) => types.add(t));
          break;
        case 'bigFive':
          profile.bigFive.primary.forEach((t) => types.add(t));
          profile.bigFive.secondary.forEach((t) => types.add(t));
          break;
        case 'disc':
          profile.disc.primary.forEach((t) => types.add(t));
          profile.disc.secondary.forEach((t) => types.add(t));
          break;
      }
    });

    return Array.from(types).sort();
  };

  const handleFilterChange = (newFilter: MappingFilter) => {
    setFilter(newFilter);
    setSelectedType(null); // Reset type selection when changing filter
  };

  const getFilteredStacks = () => {
    if (filter === 'all') {
      return Object.entries(TOOL_STACK_PROFILES);
    }

    return Object.entries(TOOL_STACK_PROFILES).filter(([_, profile]) => {
      const systemData = profile[filter];
      if (!systemData) return false;

      if (!selectedType) {
        // If no type selected, show all stacks with this system
        return systemData.primary.length > 0;
      }

      // If type selected, filter by that type
      const allTypes = [...systemData.primary, ...systemData.secondary];
      return allTypes.includes(selectedType);
    });
  };

  const filteredStacks = getFilteredStacks();
  const availableTypes = filter !== 'all' ? getTypesForSystem(filter) : [];

  return (
    <OpsPage>
      <OpsSection>
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">Tool Stacks Grid</h2>
          <p className="text-sm text-muted-foreground">
            14 distinct tool stacks mapped to personality types (Enneagram, MBTI, Big Five, DISC).
            Click any card to see detailed personality correlations.
          </p>
        </div>

        {/* Filter Tabs - Mapping Systems */}
        <div className="space-y-4 pb-4 border-b border-border/20">
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleFilterChange(btn.id as MappingFilter)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200",
                  filter === btn.id
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-muted/30 text-muted-foreground hover:bg-muted/50 border border-transparent"
                )}
              >
                <Icon name={btn.icon as any} size="size-3.5" />
                <span>{btn.label}</span>
                {filter === btn.id && selectedType && (
                  <span className="ml-1 text-[10px] font-bold">
                    ({filteredStacks.length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Type Selector - Shows when a system is selected */}
          {filter !== 'all' && availableTypes.length > 0 && (
            <div className="space-y-2">
              <OpsLabel className="text-muted-foreground">Select {filter === 'bigFive' ? 'Trait' : 'Type'}</OpsLabel>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType(null)}
                  className={cn(
                    "px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all duration-200",
                    !selectedType
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-muted/40 text-muted-foreground hover:bg-muted/60 border border-transparent"
                  )}
                >
                  All
                </button>
                {availableTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      "px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all duration-200 max-w-xs truncate",
                      selectedType === type
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-muted/40 text-muted-foreground hover:bg-muted/60 border border-transparent"
                    )}
                    title={type}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <OpsGrid columns={2}>
          {filteredStacks.map(([name, profile]) => (
            <StackCard key={name} name={name} profile={profile} />
          ))}
        </OpsGrid>

        {filteredStacks.length === 0 && (
          <div className="text-center py-12">
            <OpsText className="text-muted-foreground">
              No tool stacks match the selected filter
            </OpsText>
          </div>
        )}
      </OpsSection>
    </OpsPage>
  );
};
