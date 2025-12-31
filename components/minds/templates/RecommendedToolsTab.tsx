import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { PsychometricData } from '../../../hooks/useMindPsychometrics';
import {
  TOOL_STACK_MAPPING,
  TOOL_STACK_LOOKUP
} from '../../ops/data/tool-mapping-content';
import {
  getMindToolRecommendations,
  MindToolRecommendation,
} from '../data/mind-tool-recommendations';
import { cn } from '../../../lib/utils';

interface RecommendedToolsTabProps {
  psychometrics: PsychometricData | null;
  loading: boolean;
  mindSlug?: string;
}

// Tool Stack Colors - matching the visual identity from Tool Stacks
const TOOL_STACK_COLORS: Record<string, string> = {
  'The Structured Thinker': '#3b82f6',      // Blue
  'The Creative Explorer': '#f59e0b',       // Amber
  'The Strategic Leader': '#10b981',        // Green
  'The Resilient Stoic': '#8b5cf6',         // Purple
  'The Data-Driven Decider': '#ec4899',     // Pink
  'The Agile Builder': '#06b6d4',           // Cyan
  'The Deep Work Specialist': '#ef4444',    // Red
  'The Systems Optimizer': '#14b8a6',       // Teal
  'The Change Catalyst': '#f97316',         // Orange
  'The Holistic Growth Seeker': '#a855f7',  // Violet
  'The Risk Manager': '#0891b2',            // Sky
  'The Customer-Centric Designer': '#d946ef', // Fuchsia
  'The Negotiator & Influencer': '#fb923c', // Amber
  'The Knowledge Architect': '#6366f1',     // Indigo
};

// Helper function to extract personality types from psychometrics
const extractPersonalityTypes = (psychometrics: PsychometricData) => {
  return {
    mbti: psychometrics.mbtiType || null,
    enneagram: psychometrics.enneagramType || null,
    disc: psychometrics.discPattern || null,
  };
};

// Helper function to get recommended tool stacks based on personality types
const getRecommendedToolStacks = (
  psychometrics: PsychometricData,
  mindSlug?: string
) => {
  // First, check if we have a mind-specific recommendation
  if (mindSlug) {
    const mindRec = getMindToolRecommendations(mindSlug);
    if (mindRec) {
      const stacks = [mindRec.primaryStack, mindRec.secondaryStack];
      if (mindRec.tertiaryStack) {
        stacks.push(mindRec.tertiaryStack);
      }

      return {
        allStacks: stacks,
        sources: new Map([
          [
            `${mindRec.mbti} | ${mindRec.enneagram}`,
            {
              stacks,
              from: 'Mind Profile',
              rationale: mindRec.rationale,
            },
          ],
        ]),
        mindRecommendation: mindRec,
      };
    }
  }

  // Fall back to psychometric-based recommendations
  const types = extractPersonalityTypes(psychometrics);
  const recommendedStacks = new Map<
    string,
    { stacks: string[]; from: string; rationale?: string }
  >();

  // Check MBTI - compare base type (e.g., 'INTJ' matches 'INTJ - The Architect')
  if (types.mbti) {
    const mbtiCorrelation = TOOL_STACK_MAPPING.mbti.correlations.find(
      (corr) => corr.type.startsWith(types.mbti!)
    );
    if (mbtiCorrelation?.primaryStacks) {
      const key = `${types.mbti}`;
      recommendedStacks.set(key, {
        stacks: mbtiCorrelation.primaryStacks,
        from: 'MBTI',
        rationale: mbtiCorrelation.explanation,
      });
    }
  }

  // Check Enneagram - extract base type (e.g., '6w5' → '6', then match 'Type 6')
  if (types.enneagram) {
    const baseEnneagram = types.enneagram.split('w')[0]; // '6w5' → '6'
    const enneagramCorrelation = TOOL_STACK_MAPPING.enneagram.correlations.find(
      (corr) => corr.type.includes(`Type ${baseEnneagram}`)
    );
    if (enneagramCorrelation?.primaryStacks) {
      const key = `${types.enneagram}`;
      recommendedStacks.set(key, {
        stacks: enneagramCorrelation.primaryStacks,
        from: 'Enneagram',
        rationale: enneagramCorrelation.explanation,
      });
    }
  }

  // Collect unique stacks from all personality types
  const uniqueStacks = new Set<string>();
  recommendedStacks.forEach((item) => {
    item.stacks.forEach((stack) => uniqueStacks.add(stack));
  });

  return {
    allStacks: Array.from(uniqueStacks),
    sources: recommendedStacks,
    mindRecommendation: undefined,
  };
};

// Tool Stack Card Component
const RecommendedToolStackCard: React.FC<{
  stackName: string;
  color: string;
  sourceTypes: string[];
}> = ({ stackName, color, sourceTypes }) => {
  const lookup = TOOL_STACK_LOOKUP[stackName as keyof typeof TOOL_STACK_LOOKUP];

  if (!lookup) return null;

  return (
    <div
      className="p-4 rounded-lg border-l-4 space-y-3 cursor-pointer transition-all hover:bg-muted/30 bg-muted/10"
      style={{ borderColor: color }}
    >
      {/* Header */}
      <div>
        <h4 className="font-bold text-sm mb-1" style={{ color }}>
          {stackName}
        </h4>
        <p className="text-xs text-muted-foreground italic">
          {lookup.characteristics}
        </p>
      </div>

      {/* Best For */}
      <div>
        <span className="text-[10px] font-medium text-muted-foreground uppercase">
          Best For
        </span>
        <div className="flex flex-wrap gap-1 mt-1">
          {lookup.bestFor.map((item, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 rounded"
              style={{ backgroundColor: color + '30', color }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Core Tool */}
      <div className="pt-2 border-t border-border">
        <p className="text-[10px] font-medium text-muted-foreground mb-1">
          Core Tool
        </p>
        <p
          className="text-xs font-semibold"
          style={{ color }}
        >
          {lookup.coreTool}
        </p>
      </div>

      {/* Source Types */}
      <div className="flex flex-wrap gap-1 pt-2">
        {sourceTypes.map((type, i) => (
          <Badge
            key={i}
            variant="outline"
            className="text-[10px]"
            style={{
              borderColor: color,
              color: color,
            }}
          >
            {type}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export const RecommendedToolsTab: React.FC<RecommendedToolsTabProps> = ({
  psychometrics,
  loading,
  mindSlug,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!psychometrics) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <Icon
          name="box"
          size="size-12"
          className="mx-auto mb-4 opacity-50"
        />
        <p>Ferramentas recomendadas não disponíveis.</p>
        <p className="mt-2 text-xs opacity-50">
          Complete o perfil psicométrico para receber recomendações personalizadas.
        </p>
      </div>
    );
  }

  const { allStacks, sources, mindRecommendation } = getRecommendedToolStacks(
    psychometrics,
    mindSlug
  );
  const types = extractPersonalityTypes(psychometrics);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <Card className="rounded-xl border-border bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="flex items-center gap-2 text-base uppercase tracking-widest text-muted-foreground">
            <Icon name="box" className="text-primary" /> Ferramentas
            Recomendadas
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {mindRecommendation && (
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-foreground font-medium mb-2">
                ✨ Recomendação Personalizada
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {mindRecommendation.rationale}
              </p>
            </div>
          )}

          <p className="text-sm text-foreground mb-2">
            {mindRecommendation
              ? 'Ferramentas idealizadas especificamente para este perfil:'
              : 'Com base no seu perfil comportamental, aqui estão as ferramentas e metodologias que se alinham melhor com seu estilo de trabalho e personalidade.'}
          </p>

          {/* Personality Summary */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {types.mbti && (
              <div className="p-3 rounded-lg bg-muted/20">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  MBTI
                </p>
                <p className="font-bold text-sm">{types.mbti}</p>
              </div>
            )}
            {types.enneagram && (
              <div className="p-3 rounded-lg bg-muted/20">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Enneagram
                </p>
                <p className="font-bold text-sm">{types.enneagram}</p>
              </div>
            )}
            {psychometrics.bigFive && (
              <div className="p-3 rounded-lg bg-muted/20">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Big Five
                </p>
                <p className="text-xs text-foreground">
                  O: <span className="font-bold">{psychometrics.bigFive.openness}</span>
                </p>
              </div>
            )}
            {types.disc && (
              <div className="p-3 rounded-lg bg-muted/20">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  DISC
                </p>
                <p className="font-bold text-sm">{types.disc}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tool Stacks Grid */}
      {allStacks.length > 0 ? (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Tool Stacks Ideais para Você
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allStacks.map((stackName) => {
                const color =
                  TOOL_STACK_COLORS[
                  stackName as keyof typeof TOOL_STACK_COLORS
                  ] || '#6366f1';

                // Find which personality types recommend this stack
                const recommendingTypes: string[] = [];
                sources.forEach((item, typeKey) => {
                  if (item.stacks.includes(stackName)) {
                    recommendingTypes.push(`${item.from}`);
                  }
                });

                return (
                  <RecommendedToolStackCard
                    key={stackName}
                    stackName={stackName}
                    color={color}
                    sourceTypes={[...new Set(recommendingTypes)]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 text-center text-muted-foreground">
          <p>Nenhuma ferramenta recomendada disponível no momento.</p>
        </div>
      )}

      {/* Explanation Section */}
      <Card className="rounded-xl border-border bg-muted/5">
        <CardHeader className="border-b border-border pb-3">
          <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground">
            <Icon name="lightbulb" className="text-primary" /> Como Usar
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-3 text-sm">
          <p>
            Cada ferramenta (Tool Stack) foi selecionada porque se alinha com seus padrões de pensamento, valores e estilo de trabalho.
          </p>
          <ul className="space-y-2 list-disc list-inside text-xs text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Características:</span> O que torna essa ferramenta alinhada com você
            </li>
            <li>
              <span className="text-foreground font-medium">Core Tool:</span> A ferramenta ou metodologia central dessa stack
            </li>
            <li>
              <span className="text-foreground font-medium">Badges:</span> Mostram qual aspecto do seu perfil recomenda esse tool
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
