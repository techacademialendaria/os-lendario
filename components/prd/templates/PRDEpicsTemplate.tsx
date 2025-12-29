import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
import { Progress } from '../../ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
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
  { id: 'stories', label: 'Stories', status: 'pending' as const },
  { id: 'export', label: 'Export', status: 'pending' as const },
];

// =============================================================================
// TYPES
// =============================================================================

interface PRDEpicsTemplateProps {
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

// Epic Accordion Item
interface EpicItemProps {
  epic: EpicData;
  index: number;
  onEdit: (id: string, title: string, description: string) => void;
  onDelete: (id: string) => void;
  onAddStory: (epicId: string, title: string) => void;
}

const EpicItem: React.FC<EpicItemProps> = ({ epic, index, onEdit, onDelete, onAddStory }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(epic.title);
  const [editDescription, setEditDescription] = useState(epic.description);
  const [newStory, setNewStory] = useState('');

  const handleSave = () => {
    onEdit(epic.id, editTitle, editDescription);
    setIsEditing(false);
  };

  const handleAddStory = () => {
    if (newStory.trim()) {
      onAddStory(epic.id, newStory.trim());
      setNewStory('');
    }
  };

  const progress = epic.storiesCount > 0 ? Math.min(100, (epic.storiesCount / 5) * 100) : 0;

  return (
    <AccordionItem value={epic.id} className="overflow-hidden rounded-xl border">
      <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]]:bg-muted/30">
        <div className="flex flex-1 items-center gap-4">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white"
            style={{ backgroundColor: STUDIO_TEAL }}
          >
            {index + 1}
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <h3 className="font-bold">{epic.title}</h3>
              <Badge variant="outline" className="text-xs">
                {epic.storiesCount || 0} stories
              </Badge>
            </div>
            <p className="line-clamp-1 text-sm text-muted-foreground">{epic.description}</p>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-6 pb-6">
        {isEditing ? (
          <div className="space-y-4">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Título do épico"
              className="font-bold"
            />
            <AutosizeTextarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Descrição..."
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave}>
                Salvar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progresso estimado</span>
                <span className="font-bold" style={{ color: STUDIO_TEAL }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Stories Preview */}
            <div className="space-y-2">
              {epic.stories?.map((story, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm"
                >
                  <Icon name="check-circle" className="size-4 text-muted-foreground" />
                  {story}
                </div>
              ))}
            </div>

            {/* Add Story Input */}
            <div className="flex gap-2">
              <Input
                value={newStory}
                onChange={(e) => setNewStory(e.target.value)}
                placeholder="Adicionar story..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddStory()}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddStory}
                disabled={!newStory.trim()}
              >
                <Icon name="plus" className="size-4" />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                <Icon name="edit-pencil" className="mr-1 size-3" /> Editar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => onDelete(epic.id)}
              >
                <Icon name="trash" className="mr-1 size-3" /> Remover
              </Button>
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDEpicsTemplate: React.FC<PRDEpicsTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateProject, advancePhase } = usePRDProject(slug || '');

  // Local state
  const [epics, setEpics] = useState<EpicData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [openEpics, setOpenEpics] = useState<string[]>([]);

  // Initialize from project
  React.useEffect(() => {
    if (project?.project_metadata?.epics) {
      setEpics(project.project_metadata.epics);
      // Open first epic by default
      if (project.project_metadata.epics.length > 0 && openEpics.length === 0) {
        setOpenEpics([project.project_metadata.epics[0].id]);
      }
    }
  }, [project]);

  // Mock generate epics (would use AI in real implementation)
  const handleGenerateEpics = useCallback(async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockEpics: EpicData[] = [
      {
        id: 'epic-1',
        sequence_order: 1,
        title: 'Fundação e Autenticação',
        description: 'Setup inicial do projeto, autenticação de usuários e estrutura base.',
        storiesCount: 3,
        status: 'pending',
        stories: ['Configurar ambiente', 'Implementar login', 'Implementar registro'],
      },
      {
        id: 'epic-2',
        sequence_order: 2,
        title: 'Dashboard Principal',
        description: 'Tela principal com métricas, gráficos e visão geral do sistema.',
        storiesCount: 4,
        status: 'pending',
        stories: ['Layout do dashboard', 'Componentes de métricas', 'Gráficos', 'Filtros'],
      },
      {
        id: 'epic-3',
        sequence_order: 3,
        title: 'Gestão de Dados',
        description: 'CRUD completo para as entidades principais do sistema.',
        storiesCount: 5,
        status: 'pending',
        stories: ['Listagem', 'Criação', 'Edição', 'Exclusão', 'Busca'],
      },
    ];

    setEpics(mockEpics);
    setOpenEpics([mockEpics[0].id]);
    await updateProject({ epics: mockEpics });
    setIsGenerating(false);
  }, [updateProject]);

  // Add new epic
  const handleAddEpic = useCallback(() => {
    const newEpic: EpicData = {
      id: `epic-${Date.now()}`,
      sequence_order: epics.length + 1,
      title: 'Novo Épico',
      description: 'Descrição do épico...',
      storiesCount: 0,
      status: 'pending',
      stories: [],
    };
    const updated = [...epics, newEpic];
    setEpics(updated);
    setOpenEpics([newEpic.id]);
    updateProject({ epics: updated });
  }, [epics, updateProject]);

  // Edit epic
  const handleEditEpic = useCallback(
    (id: string, title: string, description: string) => {
      const updated = epics.map((e) => (e.id === id ? { ...e, title, description } : e));
      setEpics(updated);
      updateProject({ epics: updated });
    },
    [epics, updateProject]
  );

  // Delete epic
  const handleDeleteEpic = useCallback(
    (id: string) => {
      const updated = epics.filter((e) => e.id !== id);
      setEpics(updated);
      setShowDeleteConfirm(null);
      updateProject({ epics: updated });
    },
    [epics, updateProject]
  );

  // Add story to epic
  const handleAddStory = useCallback(
    (epicId: string, storyTitle: string) => {
      const updated = epics.map((e) =>
        e.id === epicId
          ? {
              ...e,
              stories: [...(e.stories || []), storyTitle],
              storiesCount: (e.storiesCount || 0) + 1,
            }
          : e
      );
      setEpics(updated);
      updateProject({ epics: updated });
    },
    [epics, updateProject]
  );

  // Advance to stories
  const handleAdvance = useCallback(async () => {
    if (epics.length === 0) return;
    setIsAdvancing(true);
    const success = await advancePhase();
    if (success) {
      navigate(`/prd/${slug}/stories`);
    }
    setIsAdvancing(false);
  }, [epics, advancePhase, navigate, slug]);

  // Loading state
  if (loading) {
    return <LoadingState setSection={setSection} />;
  }

  // Wrong phase redirect
  if (project && project.status !== 'epics') {
    const status = project.status as PRDStatus;
    const phaseRoutes: Record<string, string> = {
      upload: `/prd/${slug}`,
      brief: `/prd/${slug}/brief`,
      prd: `/prd/${slug}/prd`,
      epics: `/prd/${slug}/epicos`,
      stories: `/prd/${slug}/stories`,
      exported: `/prd/${slug}/exportar`,
      completed: `/prd/${slug}/exportar`,
    };
    navigate(phaseRoutes[status] || `/prd/${slug}`, { replace: true });
    return null;
  }

  const hasEpics = epics.length > 0;
  const totalStories = epics.reduce((sum, e) => sum + (e.storiesCount || 0), 0);

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
              <Icon name="nav-arrow-right" size="size-3" />
              <span
                className="cursor-pointer hover:text-foreground"
                onClick={() => navigate(`/prd/${slug}/prd`)}
              >
                PRD
              </span>
              <Icon name="nav-arrow-right" size="size-3" />
              <span className="font-medium text-foreground">Plano de Execução</span>
            </div>
            <Badge
              variant="outline"
              className="border-[var(--studio-teal)]/30 bg-[var(--studio-teal)]/5 w-fit text-[var(--studio-teal)]"
              style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
            >
              30% Você · 70% IA
            </Badge>
          </div>

          {/* Pipeline Stepper */}
          <PipelineStepper />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl flex-1 py-8">
        {!hasEpics && !isGenerating ? (
          /* Empty State - Generate */
          <Card className="mx-auto max-w-xl p-12 text-center">
            <div
              className="mx-auto mb-4 flex size-20 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${STUDIO_TEAL}20` }}
            >
              <Icon name="sitemap" size="size-10" style={{ color: STUDIO_TEAL }} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Quebrar PRD em Épicos</h3>
            <p className="mb-6 font-serif text-muted-foreground">
              A IA vai analisar seu PRD e dividir o projeto em blocos de entrega lógicos.
            </p>
            <Button
              size="lg"
              onClick={handleGenerateEpics}
              className="px-8 text-white"
              style={{ backgroundColor: STUDIO_TEAL }}
            >
              <Icon name="sparkles" className="mr-2 size-5" />
              Gerar Épicos
            </Button>
          </Card>
        ) : isGenerating ? (
          /* Loading State */
          <Card className="mx-auto max-w-xl p-12 text-center">
            <div className="mx-auto mb-4 flex size-20 items-center justify-center">
              <Icon
                name="brain"
                size="size-12"
                className="animate-pulse"
                style={{ color: STUDIO_TEAL }}
              />
            </div>
            <h3 className="mb-2 text-xl font-bold">Quebrando PRD em átomos...</h3>
            <p className="text-muted-foreground">
              Analisando requisitos e criando blocos de trabalho
            </p>
            <div className="mx-auto mt-6 h-2 w-48 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full animate-pulse rounded-full"
                style={{ width: '60%', backgroundColor: STUDIO_TEAL }}
              />
            </div>
          </Card>
        ) : (
          /* Epics List */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Plano de Execução</h2>
                <p className="text-muted-foreground">
                  {epics.length} épicos · {totalStories} stories previstas
                </p>
              </div>
              <Button variant="outline" onClick={handleGenerateEpics} disabled={isGenerating}>
                <Icon name="refresh" className="mr-2 size-4" />
                Regenerar
              </Button>
            </div>

            {/* Accordion List */}
            <Accordion
              type="multiple"
              value={openEpics}
              onValueChange={setOpenEpics}
              className="space-y-4"
            >
              {epics.map((epic, i) => (
                <EpicItem
                  key={epic.id}
                  epic={epic}
                  index={i}
                  onEdit={handleEditEpic}
                  onDelete={(id) => setShowDeleteConfirm(id)}
                  onAddStory={handleAddStory}
                />
              ))}
            </Accordion>

            {/* Add Epic Button */}
            <button
              onClick={handleAddEpic}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/30 p-6 text-muted-foreground transition-colors hover:border-[var(--studio-teal)] hover:text-foreground"
              style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
            >
              <Icon name="plus" className="size-5" />
              Adicionar Épico
            </button>

            {/* Navigation */}
            <div className="flex items-center justify-between border-t border-border pt-8">
              <Button variant="outline" onClick={() => navigate(`/prd/${slug}/prd`)}>
                <Icon name="arrow-left" className="mr-2 size-4" />
                Voltar ao PRD
              </Button>

              <Button
                size="lg"
                onClick={handleAdvance}
                disabled={epics.length === 0 || isAdvancing}
                className="px-8 text-white"
                style={{ backgroundColor: epics.length > 0 ? STUDIO_TEAL : undefined }}
              >
                {isAdvancing ? (
                  <>
                    <Icon name="refresh" className="mr-2 size-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    Validar e Gerar Stories
                    <Icon name="arrow-right" className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deletar Épico?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Esta ação não pode ser desfeita. O épico e todas as suas stories serão removidos.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => showDeleteConfirm && handleDeleteEpic(showDeleteConfirm)}
            >
              Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PRDEpicsTemplate;
