import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Section } from '../../../types';
import { PRDStatus, EpicSummary, StorySummary, Complexity } from '../../../types/prd';
import { usePRDProject } from '../../../hooks/prd/usePRDProject';
import PRDTopbar from '../PRDTopbar';

import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { AutosizeTextarea } from '../../ui/autosize-textarea';
import { ScrollArea } from '../../ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { cn } from '../../../lib/utils';

// Re-export types for convenience
export type { StorySummary as StoryData } from '../../../types/prd';

// =============================================================================
// CONSTANTS
// =============================================================================

const STUDIO_TEAL = '#00C7BE';

const PIPELINE_STEPS = [
  { id: 'upload', label: 'Upload', status: 'done' as const },
  { id: 'brief', label: 'Brief', status: 'done' as const },
  { id: 'prd', label: 'PRD', status: 'done' as const },
  { id: 'epics', label: 'Épicos', status: 'done' as const },
  { id: 'stories', label: 'Stories', status: 'active' as const },
  { id: 'export', label: 'Export', status: 'pending' as const },
];

const COMPLEXITY_CONFIG: Record<Complexity, { label: string; color: string; bg: string }> = {
  P: { label: 'Pequena', color: 'text-green-600', bg: 'bg-green-500/10' },
  M: { label: 'Média', color: 'text-amber-600', bg: 'bg-amber-500/10' },
  G: { label: 'Grande', color: 'text-red-600', bg: 'bg-red-500/10' },
};

// =============================================================================
// TYPES
// =============================================================================

interface PRDStoriesTemplateProps {
  setSection: (section: Section) => void;
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

// Story Detail Panel
interface StoryDetailProps {
  story: StorySummary | null;
  onSave: (story: StorySummary) => void;
  onClose: () => void;
}

const StoryDetail: React.FC<StoryDetailProps> = ({ story, onSave, onClose }) => {
  const [title, setTitle] = useState(story?.title || '');
  const [userStory, setUserStory] = useState(story?.userStory || '');
  const [criteria, setCriteria] = useState(story?.acceptanceCriteria?.join('\n') || '');
  const [complexity, setComplexity] = useState<Complexity>(story?.complexity || 'M');

  React.useEffect(() => {
    if (story) {
      setTitle(story.title);
      setUserStory(story.userStory || '');
      setCriteria(story.acceptanceCriteria?.join('\n') || '');
      setComplexity(story.complexity || 'M');
    }
  }, [story]);

  const handleSave = () => {
    if (!story) return;
    onSave({
      ...story,
      title,
      userStory,
      acceptanceCriteria: criteria.split('\n').filter(Boolean),
      complexity,
    });
  };

  if (!story) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Icon name="cursor" size="size-12" className="mx-auto mb-4 opacity-30" />
          <p>Selecione uma story para editar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border p-4">
        <h3 className="font-bold">Editar Story</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <Icon name="xmark" className="size-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Título
            </label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* User Story */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              User Story
            </label>
            <AutosizeTextarea
              value={userStory}
              onChange={(e) => setUserStory(e.target.value)}
              placeholder="Como [persona], quero [ação], para [benefício]"
              className="font-serif"
            />
          </div>

          {/* Acceptance Criteria */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Critérios de Aceite (um por linha)
            </label>
            <AutosizeTextarea
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              placeholder="- Critério 1&#10;- Critério 2&#10;- Critério 3"
              className="min-h-[120px] font-mono text-sm"
            />
          </div>

          {/* Complexity */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Complexidade
            </label>
            <div className="flex gap-2">
              {(['P', 'M', 'G'] as Complexity[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setComplexity(c)}
                  className={cn(
                    'flex-1 rounded-lg border-2 p-3 text-center transition-all',
                    complexity === c
                      ? 'bg-[var(--studio-teal)]/10 border-[var(--studio-teal)]'
                      : 'border-border hover:border-muted-foreground'
                  )}
                  style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                >
                  <div className={cn('text-lg font-bold', COMPLEXITY_CONFIG[c].color)}>{c}</div>
                  <div className="text-xs text-muted-foreground">{COMPLEXITY_CONFIG[c].label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Gherkin Preview */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Preview Gherkin
            </label>
            <Card className="bg-muted/30">
              <CardContent className="p-4 font-mono text-xs">
                <pre className="whitespace-pre-wrap text-muted-foreground">
                  {`Feature: ${title}

Scenario: ${title}
  ${userStory}

  ${criteria
    .split('\n')
    .filter(Boolean)
    .map((c: string, i: number) =>
      i === 0
        ? `Given ${c}`
        : i === criteria.split('\n').filter(Boolean).length - 1
          ? `Then ${c}`
          : `And ${c}`
    )
    .join('\n  ')}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t border-border p-4">
        <Button
          className="w-full text-white"
          style={{ backgroundColor: STUDIO_TEAL }}
          onClick={handleSave}
        >
          <Icon name="check" className="mr-2 size-4" />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDStoriesTemplate: React.FC<PRDStoriesTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateProject, advancePhase } = usePRDProject(slug || '');

  // Local state
  const [epics, setEpics] = useState<EpicSummary[]>([]);
  const [stories, setStories] = useState<StorySummary[]>([]);
  const [selectedEpicId, setSelectedEpicId] = useState<string | null>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Initialize from project
  React.useEffect(() => {
    if (project?.project_metadata) {
      const projectEpics = project.project_metadata.epics || [];
      const projectStories = project.project_metadata.stories || [];
      setEpics(projectEpics);
      setStories(projectStories);
      if (projectEpics.length > 0 && !selectedEpicId) {
        setSelectedEpicId(projectEpics[0].id);
      }
    }
  }, [project]);

  // Computed
  const selectedEpic = epics.find((e) => e.id === selectedEpicId);
  const epicStories = stories.filter((s) => s.epic_id === selectedEpicId);
  const selectedStory = stories.find((s) => s.id === selectedStoryId);
  const totalStories = stories.length;

  // Mock generate stories for epic
  const handleGenerateStories = useCallback(
    async (epicId: string) => {
      setIsGenerating(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const epic = epics.find((e) => e.id === epicId);
      if (!epic) return;

      const mockStories: StorySummary[] = (epic.stories || ['Story 1', 'Story 2', 'Story 3']).map(
        (title, i) => ({
          id: `story-${epicId}-${i}-${Date.now()}`,
          epic_id: epicId,
          sequence_order: i + 1,
          title: typeof title === 'string' ? title : `Story ${i + 1}`,
          userStory: `Como usuário, quero ${typeof title === 'string' ? title.toLowerCase() : 'realizar ação'}, para alcançar objetivo`,
          acceptanceCriteria: [
            'Sistema deve validar dados de entrada',
            'Feedback visual de sucesso/erro',
            'Ação deve ser registrada no log',
          ],
          complexity: (['P', 'M', 'G'] as Complexity[])[i % 3],
          isValid: true,
        })
      );

      const otherStories = stories.filter((s) => s.epic_id !== epicId);
      const updatedStories = [...otherStories, ...mockStories];
      setStories(updatedStories);
      await updateProject({ stories: updatedStories });
      setIsGenerating(false);
    },
    [epics, stories, updateProject]
  );

  // Save story
  const handleSaveStory = useCallback(
    async (updatedStory: StorySummary) => {
      const updated = stories.map((s) => (s.id === updatedStory.id ? updatedStory : s));
      setStories(updated);
      await updateProject({ stories: updated });
    },
    [stories, updateProject]
  );

  // Advance to export
  const handleAdvance = useCallback(async () => {
    if (stories.length === 0) return;
    setIsAdvancing(true);
    const success = await advancePhase();
    if (success) {
      navigate(`/prd/${slug}/exportar`);
    }
    setIsAdvancing(false);
  }, [stories, advancePhase, navigate, slug]);

  // Loading state
  if (loading) {
    return <LoadingState setSection={setSection} />;
  }

  // NOTE: Auto-redirect removed to allow free navigation between phases

  return (
    <div className="flex min-h-screen animate-fade-in flex-col bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container py-4">
          {/* Breadcrumbs + Effort Badge */}
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span
                className="cursor-pointer hover:text-foreground"
                onClick={() => navigate('/prd')}
              >
                Projetos
              </span>
              <Icon name="angle-small-right" size="size-3" />
              <span
                className="cursor-pointer hover:text-foreground"
                onClick={() => navigate(`/prd/${slug}/epicos`)}
              >
                Épicos
              </span>
              <Icon name="angle-small-right" size="size-3" />
              <span className="font-medium text-foreground">User Stories</span>
            </div>
            <Badge
              variant="outline"
              className="border-[var(--studio-teal)]/30 bg-[var(--studio-teal)]/5 w-fit text-[var(--studio-teal)]"
              style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
            >
              10% Você · 90% IA
            </Badge>
          </div>

          {/* Pipeline Stepper */}
          <PipelineStepper />
        </div>
      </header>

      {/* Main Content - Master-Detail */}
      <main className="flex flex-1 overflow-hidden">
        {/* Master List (Left) */}
        <aside className="w-80 flex-shrink-0 border-r border-border bg-muted/30">
          <div className="sticky top-0 border-b border-border bg-background/80 p-4 backdrop-blur-sm">
            <h3 className="font-bold">Épicos</h3>
            <p className="text-xs text-muted-foreground">{totalStories} stories total</p>
          </div>

          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-2 p-4">
              {epics.map((epic, i) => {
                const count = stories.filter((s) => s.epic_id === epic.id).length;
                const isSelected = selectedEpicId === epic.id;

                return (
                  <button
                    key={epic.id}
                    onClick={() => setSelectedEpicId(epic.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all',
                      isSelected
                        ? 'bg-[var(--studio-teal)]/5 border-[var(--studio-teal)]'
                        : 'border-transparent hover:bg-muted'
                    )}
                    style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                  >
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                      style={{ backgroundColor: STUDIO_TEAL }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="truncate text-sm font-medium">{epic.title}</div>
                      <div className="text-xs text-muted-foreground">{count} stories</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </aside>

        {/* Stories List (Center) */}
        <div className="flex-1 overflow-auto border-r border-border">
          <div className="sticky top-0 flex items-center justify-between border-b border-border bg-background/80 p-4 backdrop-blur-sm">
            <div>
              <h3 className="font-bold">{selectedEpic?.title || 'Selecione um épico'}</h3>
              <p className="text-xs text-muted-foreground">{epicStories.length} stories</p>
            </div>
            {selectedEpicId && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGenerateStories(selectedEpicId)}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Icon name="refresh" className="mr-2 size-3 animate-spin" />
                ) : (
                  <Icon name="magic-wand" className="mr-2 size-3" />
                )}
                {epicStories.length > 0 ? 'Regenerar' : 'Gerar Stories'}
              </Button>
            )}
          </div>

          <div className="p-4">
            {epicStories.length === 0 ? (
              <Card className="p-8 text-center">
                <Icon
                  name="list"
                  size="size-12"
                  className="mx-auto mb-4 text-muted-foreground/30"
                />
                <p className="mb-4 text-muted-foreground">Nenhuma story para este épico</p>
                {selectedEpicId && (
                  <Button
                    onClick={() => handleGenerateStories(selectedEpicId)}
                    disabled={isGenerating}
                    style={{ backgroundColor: STUDIO_TEAL }}
                    className="text-white"
                  >
                    <Icon name="magic-wand" className="mr-2 size-4" />
                    Gerar Stories com IA
                  </Button>
                )}
              </Card>
            ) : (
              <div className="space-y-2">
                {epicStories.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => setSelectedStoryId(story.id)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all',
                      selectedStoryId === story.id
                        ? 'bg-[var(--studio-teal)]/5 border-[var(--studio-teal)]'
                        : 'border-border hover:border-muted-foreground/50'
                    )}
                    style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                  >
                    <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                      #{story.sequence_order}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="truncate font-medium">{story.title}</span>
                        <Badge
                          className={cn(
                            'text-[10px]',
                            COMPLEXITY_CONFIG[story.complexity || 'M'].bg,
                            COMPLEXITY_CONFIG[story.complexity || 'M'].color
                          )}
                        >
                          {story.complexity || 'M'}
                        </Badge>
                      </div>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {story.userStory}
                      </p>
                    </div>
                    <Icon name="angle-small-right" className="size-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail Panel (Right) */}
        <aside className="w-96 flex-shrink-0 bg-card">
          <StoryDetail
            story={selectedStory || null}
            onSave={handleSaveStory}
            onClose={() => setSelectedStoryId(null)}
          />
        </aside>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-border bg-background p-4">
        <div className="container flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate(`/prd/${slug}/epicos`)}>
            <Icon name="arrow-left" className="mr-2 size-4" />
            Voltar aos Épicos
          </Button>

          <div className="text-sm text-muted-foreground">{totalStories} stories geradas</div>

          <Button
            size="lg"
            onClick={handleAdvance}
            disabled={stories.length === 0 || isAdvancing}
            className="px-8 text-white"
            style={{ backgroundColor: stories.length > 0 ? STUDIO_TEAL : undefined }}
          >
            {isAdvancing ? (
              <>
                <Icon name="refresh" className="mr-2 size-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                Exportar Projeto
                <Icon name="arrow-right" className="ml-2 size-4" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default PRDStoriesTemplate;
