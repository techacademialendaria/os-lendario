import React, { useState, useCallback } from 'react';
import {
  PRDProject,
  BriefStructure,
  BriefClassification,
  BriefComplexity,
} from '../../../types/prd';
import { usePRDAI } from '../../../hooks/prd/usePRDAI';
import { PRD_PRIMARY } from '../prd-tokens';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface BriefStructureViewProps {
  project: PRDProject;
  onUpdate: (structure: BriefStructure) => Promise<void>;
  onNext: () => void;
}

type SectionKey = keyof Pick<
  BriefStructure,
  'problem' | 'solution' | 'targetAudience' | 'differentials' | 'risks' | 'successMetrics'
>;

interface SectionConfig {
  key: SectionKey;
  label: string;
  icon: string;
  required: boolean;
  isArray: boolean;
  placeholder: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const SECTIONS: SectionConfig[] = [
  {
    key: 'problem',
    label: 'Problema',
    icon: 'exclamation-circle',
    required: true,
    isArray: false,
    placeholder: 'Descreva o problema que você está resolvendo...',
  },
  {
    key: 'solution',
    label: 'Solução',
    icon: 'lightbulb',
    required: true,
    isArray: false,
    placeholder: 'Descreva a solução proposta...',
  },
  {
    key: 'targetAudience',
    label: 'Público-Alvo',
    icon: 'users',
    required: true,
    isArray: false,
    placeholder: 'Descreva o público-alvo...',
  },
  {
    key: 'differentials',
    label: 'Diferenciais',
    icon: 'star',
    required: false,
    isArray: true,
    placeholder: 'Adicionar diferencial...',
  },
  {
    key: 'risks',
    label: 'Riscos',
    icon: 'exclamation-triangle',
    required: false,
    isArray: true,
    placeholder: 'Adicionar risco...',
  },
  {
    key: 'successMetrics',
    label: 'Métricas de Sucesso',
    icon: 'chart-line',
    required: true,
    isArray: true,
    placeholder: 'Adicionar métrica...',
  },
];

const COMPLEXITY_LABELS: Record<BriefComplexity, { label: string; color: string }> = {
  low: { label: 'Baixa', color: 'text-emerald-500' },
  medium: { label: 'Média', color: 'text-amber-500' },
  high: { label: 'Alta', color: 'text-red-500' },
};

// =============================================================================
// PROMPTS
// =============================================================================

const BRIEF_SYSTEM = `Você é um product manager experiente que estrutura ideias de produtos em briefs claros e acionáveis.
Seja direto, focado e use linguagem profissional.`;

const BRIEF_PROMPT = `Analise o seguinte contexto de produto e gere um brief estruturado:

IDEIA ORIGINAL:
{uploadContent}

PONTOS CEGOS IDENTIFICADOS:
{blindSpots}

PESQUISA REALIZADA:
{research}

WOWs E INSIGHTS:
{wows}

Responda APENAS com um JSON (sem markdown, sem explicações) no seguinte formato:
{
  "problem": "Descrição clara do problema em 2-3 parágrafos",
  "solution": "Descrição da solução proposta em 2-3 parágrafos",
  "targetAudience": "Descrição do público-alvo em 1-2 parágrafos",
  "differentials": ["Diferencial 1", "Diferencial 2", "Diferencial 3"],
  "risks": ["Risco 1", "Risco 2", "Risco 3"],
  "successMetrics": ["Métrica 1", "Métrica 2", "Métrica 3"],
  "classification": "task" ou "project",
  "estimatedComplexity": "low", "medium" ou "high"
}

Classificação:
- "task": Tarefa simples que pode ser feita em horas/dias
- "project": Projeto completo que requer semanas/meses

Complexidade:
- "low": Poucas funcionalidades, tecnologia simples
- "medium": Múltiplas funcionalidades, integrações
- "high": Sistema complexo, múltiplos componentes`;

const SECTION_PROMPTS: Record<SectionKey, string> = {
  problem:
    'Reescreva a seção PROBLEMA do brief de forma mais clara e detalhada, mantendo o contexto original.',
  solution:
    'Reescreva a seção SOLUÇÃO do brief de forma mais clara e detalhada, mantendo o contexto original.',
  targetAudience:
    'Reescreva a seção PÚBLICO-ALVO do brief de forma mais clara e detalhada, mantendo o contexto original.',
  differentials: 'Gere 3-5 diferenciais competitivos para este produto.',
  risks: 'Identifique 3-5 riscos principais para este projeto.',
  successMetrics: 'Defina 3-5 métricas de sucesso mensuráveis para este produto.',
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const BriefSection: React.FC<{
  config: SectionConfig;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}> = ({ config, value, onChange, onRegenerate, isRegenerating }) => {
  const isEmpty = config.isArray
    ? (value as string[]).filter((v) => v.trim()).length === 0
    : !(value as string).trim();

  const handleArrayItemChange = (index: number, newValue: string) => {
    const arr = [...(value as string[])];
    arr[index] = newValue;
    onChange(arr);
  };

  const handleAddItem = () => {
    onChange([...(value as string[]), '']);
  };

  const handleRemoveItem = (index: number) => {
    const arr = (value as string[]).filter((_, i) => i !== index);
    onChange(arr);
  };

  return (
    <Card
      className={cn(
        'p-4 transition-all',
        config.required && isEmpty && 'border-amber-500/50 bg-amber-500/5'
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name={config.icon} className="text-muted-foreground" size="size-4" />
          <h3 className="font-bold text-foreground">{config.label}</h3>
          {config.required && (
            <Badge variant="outline" className="text-[10px]">
              Obrigatório
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="h-8"
        >
          <Icon
            name={isRegenerating ? 'spinner' : 'refresh'}
            className={cn('mr-1.5 size-3', isRegenerating && 'animate-spin')}
          />
          Regenerar
        </Button>
      </div>

      {config.isArray ? (
        <div className="space-y-2">
          {(value as string[]).map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">•</span>
              <Input
                value={item}
                onChange={(e) => handleArrayItemChange(i, e.target.value)}
                placeholder={config.placeholder}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveItem(i)}
              >
                <Icon name="cross" size="size-3" />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddItem}
            className="text-muted-foreground"
          >
            <Icon name="plus" className="mr-1.5 size-3" />
            Adicionar
          </Button>
        </div>
      ) : (
        <Textarea
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[100px] resize-none"
          placeholder={config.placeholder}
        />
      )}
    </Card>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const BriefStructureView: React.FC<BriefStructureViewProps> = ({
  project,
  onUpdate,
  onNext,
}) => {
  const { generate, isGenerating, error, progress } = usePRDAI();
  const [structure, setStructure] = useState<BriefStructure | null>(
    project.project_metadata?.brief?.structure || null
  );
  const [regeneratingSection, setRegeneratingSection] = useState<SectionKey | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const brief = project.project_metadata?.brief;
  const uploadContent = project.project_metadata?.upload?.content || '';

  // Build context strings
  const blindSpotsContext =
    brief?.blindSpots
      ?.filter((bs) => bs.selected)
      .map((bs) => `- ${bs.title}: ${bs.description}`)
      .join('\n') || 'Nenhum ponto cego identificado';

  const researchContext =
    brief?.researchTopics
      ?.filter((t) => t.isRead)
      .map((t) => `- ${t.title}: ${t.summary}`)
      .join('\n') || 'Nenhuma pesquisa realizada';

  const wowsContext =
    brief?.wows?.map((w) => `- [${w.category}] ${w.text}`).join('\n') || 'Nenhum WOW registrado';

  // Check if all required sections are filled
  const isComplete =
    structure &&
    SECTIONS.filter((s) => s.required).every((s) => {
      const value = structure[s.key];
      if (s.isArray) {
        return (value as string[]).filter((v) => v.trim()).length > 0;
      }
      return (value as string).trim().length > 0;
    });

  // Generate full brief
  const handleGenerate = useCallback(async () => {
    try {
      const prompt = BRIEF_PROMPT.replace('{uploadContent}', uploadContent)
        .replace('{blindSpots}', blindSpotsContext)
        .replace('{research}', researchContext)
        .replace('{wows}', wowsContext);

      const result = await generate(prompt, {
        systemPrompt: BRIEF_SYSTEM,
        temperature: 0.7,
      });

      let parsed: BriefStructure;
      try {
        let jsonContent = result.content;
        const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonContent = jsonMatch[0];
        }
        parsed = JSON.parse(jsonContent);
      } catch {
        console.error('Failed to parse brief response:', result.content);
        return;
      }

      setStructure(parsed);
      await onUpdate(parsed);
    } catch (err) {
      console.error('Failed to generate brief:', err);
    }
  }, [generate, uploadContent, blindSpotsContext, researchContext, wowsContext, onUpdate]);

  // Regenerate single section
  const handleRegenerateSection = useCallback(
    async (key: SectionKey) => {
      if (!structure) return;

      setRegeneratingSection(key);
      try {
        const sectionConfig = SECTIONS.find((s) => s.key === key);
        const prompt = `${SECTION_PROMPTS[key]}

Contexto atual:
Problema: ${structure.problem}
Solução: ${structure.solution}
Público: ${structure.targetAudience}

Responda APENAS com ${sectionConfig?.isArray ? 'um array JSON de strings' : 'o texto da seção'}.`;

        const result = await generate(prompt, {
          systemPrompt: BRIEF_SYSTEM,
          temperature: 0.8,
        });

        let newValue: string | string[];
        if (sectionConfig?.isArray) {
          try {
            const jsonMatch = result.content.match(/\[[\s\S]*\]/);
            newValue = jsonMatch ? JSON.parse(jsonMatch[0]) : [result.content];
          } catch {
            newValue = [result.content];
          }
        } else {
          newValue = result.content.replace(/^["']|["']$/g, '').trim();
        }

        const updated = { ...structure, [key]: newValue };
        setStructure(updated);
        await onUpdate(updated);
      } catch (err) {
        console.error('Failed to regenerate section:', err);
      } finally {
        setRegeneratingSection(null);
      }
    },
    [structure, generate, onUpdate]
  );

  // Handle section value change
  const handleSectionChange = useCallback(
    async (key: SectionKey, value: string | string[]) => {
      if (!structure) return;
      const updated = { ...structure, [key]: value };
      setStructure(updated);
      await onUpdate(updated);
    },
    [structure, onUpdate]
  );

  // Format preview
  const formatPreview = () => {
    if (!structure) return '';
    return `# Brief do Projeto

## Problema
${structure.problem}

## Solução
${structure.solution}

## Público-Alvo
${structure.targetAudience}

## Diferenciais
${structure.differentials.map((d) => `- ${d}`).join('\n')}

## Riscos
${structure.risks.map((r) => `- ${r}`).join('\n')}

## Métricas de Sucesso
${structure.successMetrics.map((m) => `- ${m}`).join('\n')}

---
Classificação: ${structure.classification === 'task' ? 'Tarefa Simples' : 'Projeto Completo'}
Complexidade: ${COMPLEXITY_LABELS[structure.estimatedComplexity].label}`;
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Icon name="document" className="text-studio-primary" />
            Brief Estruturado
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Revise e ajuste o brief antes de gerar o PRD
          </p>
        </div>
        {structure && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}>
              <Icon name="eye" className="mr-1.5 size-4" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
              <Icon name="refresh" className="mr-1.5 size-4" />
              Regenerar Tudo
            </Button>
          </div>
        )}
      </div>

      {/* Initial State */}
      {!structure && !isGenerating && (
        <Card className="p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-studio-primary/20">
            <Icon name="document" size="size-8" className="text-studio-primary" />
          </div>
          <h3 className="mb-2 text-lg font-bold">Gerar Brief Estruturado</h3>
          <p className="mx-auto mb-6 max-w-md text-muted-foreground">
            A IA vai analisar seu upload, pontos cegos, pesquisa e WOWs para gerar um brief completo
          </p>
          <Button onClick={handleGenerate} className="bg-studio-primary hover:bg-studio-primary/90">
            <Icon name="magic-wand" className="mr-2 size-4" />
            Gerar Brief
          </Button>
        </Card>
      )}

      {/* Loading State */}
      {isGenerating && !structure && (
        <Card className="p-12 text-center">
          <Icon name="refresh" className="mx-auto mb-4 size-12 animate-spin text-studio-primary" />
          <h3 className="mb-2 text-lg font-bold">Gerando Brief...</h3>
          <p className="text-muted-foreground">Analisando contexto e estruturando o brief</p>
          {progress > 0 && (
            <div className="mx-auto mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-studio-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5 p-6">
          <div className="flex items-center gap-3 text-destructive">
            <Icon name="exclamation" size="size-5" />
            <div>
              <p className="font-medium">Erro ao gerar brief</p>
              <p className="text-sm opacity-80">{error.message}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleGenerate} className="mt-4">
            Tentar novamente
          </Button>
        </Card>
      )}

      {/* Sections */}
      {structure && (
        <div className="space-y-4">
          {SECTIONS.map((section) => (
            <BriefSection
              key={section.key}
              config={section}
              value={structure[section.key]}
              onChange={(v) => handleSectionChange(section.key, v)}
              onRegenerate={() => handleRegenerateSection(section.key)}
              isRegenerating={regeneratingSection === section.key}
            />
          ))}

          {/* Classification Card */}
          <Card className="bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-studio-primary/20">
                  <Icon name="chart-pie" size="size-6" className="text-studio-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">
                    {structure.classification === 'task' ? 'Tarefa Simples' : 'Projeto Completo'}
                  </p>
                  <p
                    className={cn(
                      'text-sm',
                      COMPLEXITY_LABELS[structure.estimatedComplexity].color
                    )}
                  >
                    Complexidade: {COMPLEXITY_LABELS[structure.estimatedComplexity].label}
                  </p>
                </div>
              </div>
              <Badge
                variant={structure.classification === 'task' ? 'secondary' : 'default'}
                className="text-sm"
              >
                {structure.classification === 'task' ? 'Task' : 'Project'}
              </Badge>
            </div>
          </Card>
        </div>
      )}

      {/* Progress & Actions */}
      {structure && (
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-sm text-muted-foreground">
            {isComplete ? (
              <span className="font-medium text-emerald-500">Brief completo</span>
            ) : (
              <span className="text-amber-500">Preencha todas as seções obrigatórias</span>
            )}
          </div>
          <Button
            onClick={onNext}
            disabled={!isComplete}
            className={isComplete ? 'bg-studio-primary hover:bg-studio-primary/90' : ''}
          >
            Gerar PRD Completo
            <Icon name="arrow-right" className="ml-2 size-4" />
          </Button>
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent
          onClose={() => setShowPreview(false)}
          className="max-h-[80vh] max-w-2xl overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>Preview do Brief</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm">
              {formatPreview()}
            </pre>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(formatPreview());
              }}
            >
              <Icon name="clipboard" className="mr-2 size-4" />
              Copiar
            </Button>
            <Button onClick={() => setShowPreview(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BriefStructureView;
