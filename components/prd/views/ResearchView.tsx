import React, { useState, useCallback } from 'react';
import { PRDProject, ResearchTopic } from '../../../types/prd';
import { usePRDAI } from '../../../hooks/prd/usePRDAI';
import { PRD_PRIMARY } from '../prd-tokens';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../ui/dialog';
import { cn } from '../../../lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface ResearchViewProps {
  project: PRDProject;
  onUpdate: (topics: ResearchTopic[], skipped?: boolean) => Promise<void>;
  onNext: () => void;
}

// =============================================================================
// PROMPTS
// =============================================================================

const RESEARCH_SYSTEM = `Você é um pesquisador especializado em análise de mercado e tendências.
Seu papel é fornecer contexto relevante sobre o domínio do produto proposto.
Seja informativo, cite fontes quando possível, e foque em informações acionáveis.`;

const RESEARCH_PROMPT = `Analise a seguinte ideia de produto e gere 4-5 tópicos de pesquisa relevantes:

{content}

Responda APENAS com um array JSON (sem markdown, sem explicações) no seguinte formato:
[
  {
    "title": "Título do tópico",
    "summary": "Resumo em 1-2 frases",
    "content": "Conteúdo detalhado com 3-4 parágrafos informativos",
    "sources": ["Fonte 1", "Fonte 2"],
    "readingTimeMinutes": 5
  }
]

Tipos de tópicos a cobrir:
- Tendências de mercado e crescimento do setor
- Principais concorrentes e suas abordagens
- Melhores práticas de UX para o domínio
- Tecnologias emergentes relevantes
- Considerações regulatórias ou de compliance (se aplicável)`;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const ResearchTopicCard: React.FC<{
  topic: ResearchTopic;
  onMarkRead: () => void;
}> = ({ topic, onMarkRead }) => {
  return (
    <AccordionItem value={topic.id} className="overflow-hidden rounded-lg border">
      <AccordionTrigger className="px-4 hover:bg-muted/50 hover:no-underline">
        <div className="flex w-full items-center justify-between pr-2">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full',
                topic.isRead ? 'bg-emerald-500/20' : 'bg-muted'
              )}
            >
              <Icon
                name={topic.isRead ? 'check' : 'circle'}
                size="size-3"
                className={topic.isRead ? 'text-emerald-500' : 'text-muted-foreground'}
              />
            </div>
            <span className={cn('text-left font-medium', topic.isRead && 'text-muted-foreground')}>
              {topic.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-normal">
              {topic.readingTimeMinutes} min
            </Badge>
            {topic.isRead && (
              <Badge className="bg-emerald-500/10 text-xs text-emerald-600">Lido</Badge>
            )}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4 pt-2">
          {/* Summary */}
          <p className="text-sm font-medium text-foreground">{topic.summary}</p>

          {/* Full Content */}
          <div className="whitespace-pre-line text-sm text-muted-foreground">{topic.content}</div>

          {/* Sources */}
          {topic.sources.length > 0 && (
            <div className="border-t pt-2 text-xs text-muted-foreground">
              <span className="font-medium">Fontes sugeridas:</span> {topic.sources.join(', ')}
            </div>
          )}

          {/* Mark as Read Button */}
          {!topic.isRead && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMarkRead();
              }}
              className="mt-2"
            >
              <Icon name="check" className="mr-1.5 size-3" />
              Marcar como lido
            </Button>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const ResearchView: React.FC<ResearchViewProps> = ({ project, onUpdate, onNext }) => {
  const { generate, isGenerating, error, progress } = usePRDAI();
  const [topics, setTopics] = useState<ResearchTopic[]>(
    project.project_metadata?.brief?.researchTopics || []
  );
  const [showSkipWarning, setShowSkipWarning] = useState(false);

  const uploadContent = project.project_metadata?.upload?.content || '';
  const readCount = topics.filter((t) => t.isRead).length;
  const readPercent = topics.length > 0 ? Math.round((readCount / topics.length) * 100) : 0;
  const canAdvance = readPercent >= 50 || project.project_metadata?.brief?.researchSkipped;

  // Generate research topics
  const handleGenerate = useCallback(async () => {
    try {
      const result = await generate(RESEARCH_PROMPT.replace('{content}', uploadContent), {
        systemPrompt: RESEARCH_SYSTEM,
        temperature: 0.7,
      });

      // Parse response
      let parsed: Array<Omit<ResearchTopic, 'id' | 'isRead'>>;
      try {
        let jsonContent = result.content;
        const jsonMatch = jsonContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          jsonContent = jsonMatch[0];
        }
        parsed = JSON.parse(jsonContent);
      } catch {
        console.error('Failed to parse research response:', result.content);
        return;
      }

      // Transform to ResearchTopic type with IDs
      const generated: ResearchTopic[] = parsed.map((t, i) => ({
        ...t,
        id: `research-${Date.now()}-${i}`,
        isRead: false,
      }));

      setTopics(generated);
      await onUpdate(generated);
    } catch (err) {
      console.error('Failed to generate research:', err);
    }
  }, [generate, uploadContent, onUpdate]);

  // Mark topic as read
  const handleMarkRead = useCallback(
    async (topicId: string) => {
      const updated = topics.map((t) => (t.id === topicId ? { ...t, isRead: true } : t));
      setTopics(updated);
      await onUpdate(updated);
    },
    [topics, onUpdate]
  );

  // Skip research
  const handleSkip = useCallback(async () => {
    await onUpdate(topics, true);
    setShowSkipWarning(false);
    onNext();
  }, [topics, onUpdate, onNext]);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Icon name="search" className="text-studio-primary" />
            Pesquisa de Contexto
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Entenda o cenário antes de definir seu projeto
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => setShowSkipWarning(true)}
        >
          Pular
          <Icon name="exclamation" className="ml-2 size-4 text-amber-500" />
        </Button>
      </div>

      {/* Initial State */}
      {topics.length === 0 && !isGenerating && (
        <Card className="p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-studio-primary/20">
            <Icon name="search" size="size-8" className="text-studio-primary" />
          </div>
          <h3 className="mb-2 text-lg font-bold">Pesquisa de Mercado</h3>
          <p className="mx-auto mb-6 max-w-md text-muted-foreground">
            A IA vai buscar informações relevantes sobre seu domínio para contextualizar melhor seu
            projeto
          </p>
          <Button onClick={handleGenerate} className="bg-studio-primary hover:bg-studio-primary/90">
            <Icon name="magic-wand" className="mr-2 size-4" />
            Gerar Pesquisa
          </Button>
        </Card>
      )}

      {/* Loading State */}
      {isGenerating && (
        <Card className="p-12 text-center">
          <Icon name="refresh" className="mx-auto mb-4 size-12 animate-spin text-studio-primary" />
          <h3 className="mb-2 text-lg font-bold">Pesquisando...</h3>
          <p className="text-muted-foreground">Buscando informações relevantes para seu projeto</p>
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
              <p className="font-medium">Erro ao gerar pesquisa</p>
              <p className="text-sm opacity-80">{error.message}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleGenerate} className="mt-4">
            Tentar novamente
          </Button>
        </Card>
      )}

      {/* Research Topics */}
      {topics.length > 0 && !isGenerating && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Leia os tópicos abaixo para contextualizar seu projeto
            </p>
            <Button variant="outline" size="sm" onClick={handleGenerate}>
              <Icon name="refresh" className="mr-2 size-4" />
              Regenerar
            </Button>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {topics.map((topic) => (
              <ResearchTopicCard
                key={topic.id}
                topic={topic}
                onMarkRead={() => handleMarkRead(topic.id)}
              />
            ))}
          </Accordion>
        </div>
      )}

      {/* Progress & Actions */}
      {topics.length > 0 && !isGenerating && (
        <div className="flex items-center justify-between border-t pt-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              <span
                className={cn(
                  'font-mono font-medium',
                  canAdvance ? 'text-emerald-500' : 'text-amber-500'
                )}
              >
                {readCount}/{topics.length}
              </span>{' '}
              tópicos lidos ({readPercent}%) {!canAdvance && '- mínimo 50%'}
            </div>
            <Progress value={readPercent} className="h-2 w-48" />
          </div>
          <Button
            onClick={onNext}
            disabled={!canAdvance}
            className={canAdvance ? 'bg-studio-primary hover:bg-studio-primary/90' : ''}
          >
            Continuar
            <Icon name="arrow-right" className="ml-2 size-4" />
          </Button>
        </div>
      )}

      {/* Skip Warning Dialog */}
      <Dialog open={showSkipWarning} onOpenChange={setShowSkipWarning}>
        <DialogContent onClose={() => setShowSkipWarning(false)}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="exclamation" className="text-amber-500" />
              Pular Pesquisa?
            </DialogTitle>
            <DialogDescription>
              A pesquisa ajuda a criar um brief mais completo e informado. Pular esta etapa pode
              resultar em um PRD menos contextualizado sobre o mercado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowSkipWarning(false)}>
              Voltar
            </Button>
            <Button variant="destructive" onClick={handleSkip}>
              Pular mesmo assim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResearchView;
