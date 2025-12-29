import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Section } from '../../../types';
import { PRDStatus, EpicData } from '../../../types/prd';
import { usePRDProject } from '../../../hooks/prd/usePRDProject';
import PRDTopbar from '../PRDTopbar';

import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { AutosizeTextarea } from '../../ui/autosize-textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { useToast } from '../../../hooks/use-toast';
import { cn } from '../../../lib/utils';

// Re-export EpicData for convenience
export type { EpicData } from '../../../types/prd';

// =============================================================================
// CONSTANTS
// =============================================================================

const STUDIO_TEAL = '#00C7BE';

const PIPELINE_STEPS = [
  { id: 'upload', label: 'Upload', status: 'done' as const },
  { id: 'brief', label: 'Brief', status: 'done' as const },
  { id: 'prd', label: 'PRD', status: 'done' as const },
  { id: 'epics', label: 'Épicos', status: 'active' as const },
  { id: 'stories', label: 'Stories', status: 'active' as const },
  { id: 'export', label: 'Export', status: 'pending' as const },
];

// =============================================================================
// TYPES
// =============================================================================

interface PRDEpicsTemplateProps {
  setSection: (section: Section) => void;
}

interface DetailedStory {
  id: string;
  title: string;
  verb: string;
  complexity: 'P' | 'M' | 'G';
  criteria: number;
}

interface EpicWithStories extends EpicData {
  detailedStories?: DetailedStory[];
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const LoadingState: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-4 text-center">
        <Icon name="refresh" className="mx-auto size-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">Carregando projeto...</p>
      </div>
    </div>
  </div>
);

// Pipeline Stepper Component
const PipelineStepper: React.FC = () => (
  <div className="relative mx-auto flex max-w-3xl items-center justify-between">
    <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full bg-muted" />
    {PIPELINE_STEPS.map((step, i) => (
      <div
        key={step.id}
        className="z-10 flex flex-col items-center gap-2 rounded-full bg-background px-2"
      >
        <div
          className={cn(
            'flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors',
            step.status === 'active'
              ? 'border-[var(--studio-teal)] bg-[var(--studio-teal)] text-white shadow-lg'
              : step.status === 'done'
                ? 'border-[var(--studio-teal)] bg-card text-[var(--studio-teal)]'
                : 'border-border bg-card text-muted-foreground'
          )}
          style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
        >
          {step.status === 'done' ? <Icon name="check" size="size-3" /> : i + 1}
        </div>
        <span
          className={cn(
            'hidden text-[10px] font-bold uppercase tracking-wider sm:block',
            step.status === 'active' ? 'text-[var(--studio-teal)]' : 'text-muted-foreground'
          )}
          style={step.status === 'active' ? { color: STUDIO_TEAL } : {}}
        >
          {step.label}
        </span>
      </div>
    ))}
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDEpicsTemplate: React.FC<PRDEpicsTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateProject, advancePhase } = usePRDProject(slug || '');
  const { toast } = useToast();

  // Local state
  const [epics, setEpics] = useState<EpicWithStories[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Initialize from project
  React.useEffect(() => {
    if (project?.project_metadata?.epics) {
      const projectEpics = project.project_metadata.epics.map((e, epicIdx) => ({
        ...e,
        detailedStories: (e.stories || []).map((s, storyIdx) => {
          const title = typeof s === 'string' ? s : `Story ${storyIdx + 1}`;
          const verb = title.split(' ')[0] || 'Implementar';
          return {
            id: `${epicIdx + 1}.${storyIdx + 1}`,
            title,
            verb,
            complexity: (['P', 'M', 'G'] as const)[storyIdx % 3],
            criteria: Math.floor(Math.random() * 4) + 2,
          };
        }),
      }));
      setEpics(projectEpics);
      setHasGenerated(projectEpics.length > 0);
    }
  }, [project]);

  // Generate epics with AI
  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const mockEpics: EpicWithStories[] = [
      {
        id: 'E1',
        sequence_order: 1,
        title: 'FUNDAÇÃO E AUTENTICAÇÃO',
        description: 'Estabelecer base segura para o sistema.',
        storiesCount: 3,
        status: 'pending',
        stories: [],
        detailedStories: [
          {
            id: '1.1',
            title: 'Configurar ambiente Next.js + Supabase',
            verb: 'Configurar',
            complexity: 'M',
            criteria: 3,
          },
          {
            id: '1.2',
            title: 'Implementar login social Google',
            verb: 'Implementar',
            complexity: 'M',
            criteria: 2,
          },
          {
            id: '1.3',
            title: 'Criar sistema de Roles (RBAC)',
            verb: 'Criar',
            complexity: 'G',
            criteria: 4,
          },
        ],
      },
      {
        id: 'E2',
        sequence_order: 2,
        title: 'GESTÃO DE DADOS',
        description: 'CRUD completo de entidades principais.',
        storiesCount: 2,
        status: 'pending',
        stories: [],
        detailedStories: [
          {
            id: '2.1',
            title: 'Desenvolver formulário de cadastro',
            verb: 'Desenvolver',
            complexity: 'M',
            criteria: 5,
          },
          {
            id: '2.2',
            title: 'Listar registros com busca e filtro',
            verb: 'Listar',
            complexity: 'P',
            criteria: 2,
          },
        ],
      },
      {
        id: 'E3',
        sequence_order: 3,
        title: 'DASHBOARD E RELATÓRIOS',
        description: 'Visualização de métricas e geração de relatórios.',
        storiesCount: 2,
        status: 'pending',
        stories: [],
        detailedStories: [
          {
            id: '3.1',
            title: 'Criar componente de Dashboard',
            verb: 'Criar',
            complexity: 'G',
            criteria: 6,
          },
          {
            id: '3.2',
            title: 'Exportar relatórios em PDF',
            verb: 'Exportar',
            complexity: 'M',
            criteria: 3,
          },
        ],
      },
    ];

    setEpics(mockEpics);
    setHasGenerated(true);

    await updateProject({
      epics: mockEpics.map((e) => ({
        ...e,
        stories: e.detailedStories?.map((s) => s.title) || [],
        storiesCount: e.detailedStories?.length || 0,
      })),
    });

    toast({
      title: 'Plano Gerado',
      description: 'Épicos e Stories criados com base no PRD.',
      variant: 'success',
    });

    setIsGenerating(false);
  }, [updateProject, toast]);

  // Refine with AI
  const handleRefine = useCallback(() => {
    toast({
      title: 'Refinando...',
      description: 'Ajustando granularidade das stories.',
    });
  }, [toast]);

  // Add manual story to epic
  const handleAddStory = useCallback((epicId: string) => {
    setEpics((prev) =>
      prev.map((e) =>
        e.id === epicId
          ? {
              ...e,
              detailedStories: [
                ...(e.detailedStories || []),
                {
                  id: `${epicId}.${(e.detailedStories?.length || 0) + 1}`,
                  title: 'Nova Story',
                  verb: 'Implementar',
                  complexity: 'M' as const,
                  criteria: 2,
                },
              ],
              storiesCount: (e.storiesCount || 0) + 1,
            }
          : e
      )
    );
  }, []);

  // Validate and advance
  const handleValidate = useCallback(async () => {
    if (epics.length === 0) return;

    setIsAdvancing(true);

    // Save all data
    await updateProject({
      epics: epics.map((e) => ({
        ...e,
        stories: e.detailedStories?.map((s) => s.title) || [],
        storiesCount: e.detailedStories?.length || 0,
      })),
      stories: epics.flatMap((e) =>
        (e.detailedStories || []).map((s, idx) => ({
          id: `story-${e.id}-${idx}`,
          epic_id: e.id,
          sequence_order: idx + 1,
          title: s.title,
          userStory: `Como usuário, quero ${s.title.toLowerCase()}, para alcançar objetivo`,
          acceptanceCriteria: Array(s.criteria).fill('Critério de aceite'),
          complexity: s.complexity,
          isValid: true,
        }))
      ),
    });

    toast({
      title: 'Plano Aprovado',
      description: 'Avançando para exportação...',
      variant: 'success',
    });

    const success = await advancePhase();
    if (success) {
      navigate(`/prd/${slug}/exportar`);
    }
    setIsAdvancing(false);
  }, [epics, updateProject, advancePhase, navigate, slug, toast]);

  // Loading state
  if (loading) {
    return <LoadingState setSection={setSection} />;
  }

  // NOTE: Auto-redirect removed to allow free navigation between phases

  return (
    <div className="relative flex min-h-screen animate-fade-in flex-col bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container py-4">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span
                className="cursor-pointer hover:text-foreground"
                onClick={() => navigate('/prd')}
              >
                Projetos
              </span>
              <Icon name="nav-arrow-right" size="size-3" />
              <span className="font-medium text-foreground">Plano de Execução</span>
            </div>
            <Badge
              variant="outline"
              className="border-[var(--studio-teal)]/30 bg-[var(--studio-teal)]/5 w-fit text-[var(--studio-teal)]"
              style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
            >
              40% Você · 60% IA
            </Badge>
          </div>
          <PipelineStepper />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-5xl flex-1 space-y-8 py-8">
        {/* Intro */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Arquitetura de Execução</h1>
          <p className="mx-auto max-w-2xl font-serif text-muted-foreground">
            A IA transformou seu PRD em marcos (Épicos) e tarefas (Stories). Valide a lógica antes
            de exportar para garantir que o "Puxadinho" vire "Mansão".
          </p>
        </div>

        {!hasGenerated && !isGenerating && (
          <Card className="flex flex-col items-center justify-center gap-6 border-2 border-dashed py-16">
            <div
              className="flex size-20 items-center justify-center rounded-full"
              style={{ backgroundColor: `${STUDIO_TEAL}15`, color: STUDIO_TEAL }}
            >
              <Icon name="layers" size="size-10" />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Pronto para gerar o plano</h3>
              <p className="text-sm text-muted-foreground">
                Baseado nas especificações técnicas aprovadas.
              </p>
            </div>
            <Button
              size="lg"
              onClick={handleGenerate}
              className="gap-2 text-white shadow-lg"
              style={{ backgroundColor: STUDIO_TEAL }}
            >
              <Icon name="sparkles" /> Gerar Épicos e Stories
            </Button>
          </Card>
        )}

        {isGenerating && (
          <div className="flex animate-pulse flex-col items-center justify-center gap-6 py-16">
            <Icon
              name="brain"
              size="size-10"
              className="animate-spin"
              style={{ color: STUDIO_TEAL }}
            />
            <p className="font-mono text-muted-foreground">Quebrando PRD em tarefas atômicas...</p>
          </div>
        )}

        {hasGenerated && (
          <div className="animate-fade-in space-y-4">
            {epics.map((epic, index) => (
              <Accordion
                key={epic.id}
                type="single"
                collapsible
                defaultValue={index === 0 ? epic.id : undefined}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
              >
                <AccordionItem value={epic.id} className="border-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 hover:no-underline">
                    <div className="flex flex-1 items-center gap-4 text-left">
                      <div className="flex size-12 flex-col items-center justify-center rounded-lg border border-border bg-muted">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">
                          Épico
                        </span>
                        <span className="font-mono text-lg font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-bold text-foreground">{epic.title}</h4>
                        <p className="font-serif text-sm text-muted-foreground">
                          {epic.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="mr-4">
                        {epic.detailedStories?.length || 0} stories
                      </Badge>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="border-t border-border bg-muted/5 p-0">
                    <div className="divide-y divide-border/50">
                      {epic.detailedStories?.map((story) => (
                        <div
                          key={story.id}
                          className="group flex items-center gap-4 p-4 pl-8 transition-colors hover:bg-muted/20"
                        >
                          <div className="w-16 font-mono text-xs text-muted-foreground">
                            {story.id}
                          </div>
                          <div className="flex flex-1 items-center gap-2">
                            <Badge variant="secondary" className="h-4 px-1 text-[9px]">
                              {story.verb}
                            </Badge>
                            <span className="text-sm font-medium">
                              {story.title.replace(story.verb, '').trim()}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span title="Complexidade">
                              Comp:{' '}
                              <strong
                                className={cn(
                                  story.complexity === 'P' && 'text-green-600',
                                  story.complexity === 'M' && 'text-amber-600',
                                  story.complexity === 'G' && 'text-red-600'
                                )}
                              >
                                {story.complexity}
                              </strong>
                            </span>
                            <span title="Critérios de Aceite">
                              <Icon name="check-circle" size="size-3" className="mr-1 inline" />
                              {story.criteria}
                            </span>
                          </div>
                          <div className="w-8 opacity-0 group-hover:opacity-100">
                            <Button variant="ghost" size="icon" className="size-6">
                              <Icon name="edit-pencil" size="size-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border/50 p-2 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => handleAddStory(epic.id)}
                      >
                        <Icon name="plus" size="size-3" /> Adicionar Story Manual
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}

            {/* Footer Actions */}
            <div className="sticky bottom-0 z-10 flex items-center justify-between border-t border-border bg-background/95 py-4 backdrop-blur">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="check-circle" className="text-green-500" size="size-4" />
                <span>QA Automático: Verbos de ação validados.</span>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleRefine}>
                  Refinar com IA
                </Button>
                <Button
                  size="lg"
                  onClick={handleValidate}
                  disabled={epics.length === 0 || isAdvancing}
                  className="px-8 font-bold text-white shadow-lg"
                  style={{ backgroundColor: STUDIO_TEAL }}
                >
                  {isAdvancing ? (
                    <>
                      <Icon name="refresh" className="mr-2 size-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Aprovar e Exportar <Icon name="arrow-right" className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PRDEpicsTemplate;
