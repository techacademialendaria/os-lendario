import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useToast } from '../../../hooks/use-toast';
import { usePRDProject } from '../../../hooks/prd/usePRDProject';
import PRDTopbar from '../PRDTopbar';

interface PRDProjectDetailTemplateProps {
  setSection: (s: Section) => void;
}

const STUDIO_TEAL = '#00C7BE';

// Status to phase mapping
const STATUS_TO_PHASE: Record<string, number> = {
  upload: 1,
  brief: 2,
  prd: 3,
  epics: 4,
  stories: 5,
  exported: 6,
  completed: 6,
};

const PRDProjectDetailTemplate: React.FC<PRDProjectDetailTemplateProps> = ({ setSection }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { project, epics, stories, loading } = usePRDProject(slug || '');

  const handleDownloadZip = () => {
    toast({
      title: 'Preparando Download...',
      description: 'Compactando especificações, pesquisas e assets em docs.zip.',
    });
    setTimeout(() => {
      const element = document.createElement('a');
      element.href =
        'data:text/plain;charset=utf-8,Simulação de arquivo ZIP com documentos do projeto.';
      element.download = 'docs.zip';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast({
        title: 'Download Concluído',
        description: 'O arquivo docs.zip foi baixado com sucesso.',
      });
    }, 1500);
  };

  const handleContinueProduction = () => {
    if (!project || !slug) return;
    const status = project.status || 'upload';
    const routes: Record<string, string> = {
      upload: `/prd/${slug}/upload`,
      brief: `/prd/${slug}/brief`,
      prd: `/prd/${slug}/prd`,
      epics: `/prd/${slug}/epicos`,
      stories: `/prd/${slug}/stories`,
      exported: `/prd/${slug}/exportar`,
      completed: `/prd/${slug}/exportar`,
    };
    navigate(routes[status] || `/prd/${slug}/upload`);
  };

  const handleNavigateToPhase = (phase: string) => {
    if (!slug) return;
    const routes: Record<string, string> = {
      upload: `/prd/${slug}/upload`,
      brief: `/prd/${slug}/brief`,
      prd: `/prd/${slug}/prd`,
      epics: `/prd/${slug}/epicos`,
      stories: `/prd/${slug}/stories`,
      export: `/prd/${slug}/exportar`,
    };
    navigate(routes[phase] || `/prd/${slug}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />
        <main className="flex flex-1 items-center justify-center">
          <Icon name="refresh" className="size-8 animate-spin text-muted-foreground" />
        </main>
      </div>
    );
  }

  // Not found state
  if (!project) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />
        <main className="flex flex-1 items-center justify-center">
          <div className="space-y-4 text-center">
            <Icon name="folder-open" className="mx-auto size-12 text-muted-foreground" />
            <p className="text-muted-foreground">Projeto não encontrado</p>
            <Button variant="outline" onClick={() => navigate('/prd')}>
              Voltar aos Projetos
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Calculate stats
  const totalEpics = epics.length;
  const totalStories = stories.length;
  const completedStories = stories.filter((s) => s.metadata?.isValidated).length;
  const currentPhase = STATUS_TO_PHASE[project.status || 'upload'] || 1;
  const progress = Math.round((currentPhase / 6) * 100);

  const stats = [
    { label: 'Épicos', value: String(totalEpics), subtext: `${totalEpics} total` },
    {
      label: 'Stories',
      value: String(totalStories),
      subtext: `${completedStories} concluídas`,
    },
    { label: 'Pesquisas', value: '0', subtext: 'docs apoio' },
    { label: 'Qualidade', value: '--', subtext: 'sem score' },
  ];

  const pipelineSteps = [
    { id: 'upload', label: 'Upload', status: currentPhase >= 1 ? 'done' : 'pending' },
    { id: 'brief', label: 'Brief', status: currentPhase >= 2 ? 'done' : 'pending' },
    { id: 'prd', label: 'PRD', status: currentPhase >= 3 ? 'done' : 'pending' },
    { id: 'epics', label: 'Épicos', status: currentPhase >= 4 ? 'done' : 'pending' },
    {
      id: 'stories',
      label: 'Stories',
      status: currentPhase === 5 ? 'active' : currentPhase > 5 ? 'done' : 'pending',
    },
    {
      id: 'export',
      label: 'Exportado',
      status: currentPhase >= 6 ? 'done' : 'pending',
    },
  ];

  // Group stories by epic
  const storiesByEpic = epics.map((epic) => ({
    ...epic,
    stories: stories.filter((s) => s.parent_content_id === epic.id),
  }));

  const statusLabel =
    project.status === 'exported' || project.status === 'completed' ? 'Exportado' : 'Em Produção';

  return (
    <div className="flex min-h-screen animate-fade-in flex-col bg-background font-sans text-foreground">
      <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />

      <main className="container w-full flex-1 space-y-8 py-6 md:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span
            className="cursor-pointer transition-colors hover:text-foreground"
            onClick={() => navigate('/prd')}
          >
            Projetos
          </span>
          <Icon name="angle-small-right" size="size-3" />
          <span className="truncate font-medium text-foreground">{project.title}</span>
        </div>

        {/* Hero Header */}
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="flex-1 space-y-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-500"
                  >
                    <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500"></span>
                    {statusLabel}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {project.title}
                </h1>
                <p className="max-w-2xl font-serif text-muted-foreground">
                  {project.project_metadata?.brief?.solution ||
                    project.project_metadata?.upload?.content?.slice(0, 150) ||
                    'Sem descrição'}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => navigate('/prd')}>
                  <Icon name="arrow-left" size="size-3" /> Voltar
                </Button>
                <Button
                  className="gap-2 text-white shadow-lg"
                  style={{ backgroundColor: STUDIO_TEAL }}
                  onClick={handleContinueProduction}
                >
                  <Icon name="play" size="size-3" /> Continuar Produção
                </Button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat, i) => (
                <Card key={i} className="border border-border bg-card p-4 shadow-sm">
                  <div className="flex flex-col">
                    <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold" style={{ color: STUDIO_TEAL }}>
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{stat.subtext}</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pipeline */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Pipeline de Produção
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {progress}% completo
                </span>
              </div>
              <div className="relative mb-6">
                <Progress value={progress} className="h-1 bg-muted" />
              </div>
              <div className="relative flex items-center justify-between">
                {pipelineSteps.map((step, i) => (
                  <div
                    key={i}
                    className="group relative z-10 flex cursor-pointer flex-col items-center gap-2"
                    onClick={() => handleNavigateToPhase(step.id)}
                  >
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors',
                        step.status === 'done'
                          ? 'border-[#00C7BE] bg-card text-foreground'
                          : step.status === 'active'
                            ? 'border-[#00C7BE] bg-[#00C7BE] text-white shadow-lg ring-4 ring-[#00C7BE]/20'
                            : 'border-border bg-card text-muted-foreground'
                      )}
                    >
                      {step.status === 'done' ? <Icon name="check" size="size-3" /> : i + 1}
                    </div>
                    <span
                      className={cn(
                        'text-[10px] font-bold uppercase tracking-wider',
                        step.status === 'active' ? 'text-[#00C7BE]' : 'text-muted-foreground'
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Structure */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Estrutura do Projeto</h3>
                  <p className="text-xs text-muted-foreground">
                    {totalEpics} épicos · {totalStories} stories
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  style={{ color: STUDIO_TEAL }}
                  onClick={() => navigate(`/prd/${slug}/epicos`)}
                >
                  <Icon name="pencil" size="size-3" /> Editar
                </Button>
              </div>

              <div className="space-y-4">
                {storiesByEpic.length > 0 ? (
                  <Accordion
                    type="multiple"
                    defaultValue={[storiesByEpic[0]?.id]}
                    className="space-y-4"
                  >
                    {storiesByEpic.map((epic, idx) => {
                      const epicStories = epic.stories || [];
                      const completedCount = epicStories.filter(
                        (s) => s.metadata?.isValidated
                      ).length;
                      const totalCount = epicStories.length || 1;
                      const epicProgress = Math.round((completedCount / totalCount) * 100);

                      return (
                        <AccordionItem
                          key={epic.id}
                          value={epic.id}
                          className="overflow-hidden rounded-xl border border-border bg-card"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 hover:no-underline">
                            <div className="flex flex-1 items-center gap-4">
                              <Badge variant="outline" className="font-mono text-xs">
                                E{idx + 1}
                              </Badge>
                              <span className="text-sm font-bold uppercase tracking-wide text-foreground">
                                {epic.title}
                              </span>
                              <div className="ml-auto mr-4 flex items-center gap-4 text-xs font-normal text-muted-foreground">
                                <span>{epicStories.length} stories</span>
                                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      width: `${epicProgress}%`,
                                      backgroundColor:
                                        epicProgress === 100 ? '#10B981' : STUDIO_TEAL,
                                    }}
                                  ></div>
                                </div>
                                <span>{epicProgress}%</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="border-t border-border bg-muted/10 p-0">
                            <div className="divide-y divide-border/50">
                              {epicStories.length > 0 ? (
                                epicStories.map((story, sIdx) => (
                                  <div
                                    key={story.id}
                                    className="group flex cursor-pointer items-center justify-between p-3 pl-6 transition-colors hover:bg-muted/20"
                                    onClick={() => navigate(`/prd/${slug}/stories`)}
                                  >
                                    <div className="flex items-center gap-4">
                                      <span className="w-8 font-mono text-xs text-muted-foreground">
                                        {idx + 1}.{sIdx + 1}
                                      </span>
                                      <span className="text-sm font-medium text-foreground transition-colors group-hover:text-[#00C7BE]">
                                        {story.title}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <Badge
                                        variant="outline"
                                        className={cn(
                                          'border-0 text-[10px] font-normal',
                                          story.metadata?.isValidated
                                            ? 'bg-green-500/10 text-green-500'
                                            : 'bg-muted text-muted-foreground'
                                        )}
                                      >
                                        {story.metadata?.isValidated ? 'Concluído' : 'Rascunho'}
                                      </Badge>
                                      <Icon
                                        name="angle-small-right"
                                        className="text-muted-foreground group-hover:text-foreground"
                                        size="size-3"
                                      />
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="p-4 text-center text-xs italic text-muted-foreground">
                                  Nenhuma história criada neste épico.
                                </div>
                              )}
                              <div className="flex justify-center p-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-muted-foreground hover:text-[#00C7BE]"
                                >
                                  <Icon name="plus" size="size-3" className="mr-1" /> Adicionar
                                  Story
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                ) : (
                  <div className="rounded-xl border border-dashed border-border p-8 text-center">
                    <Icon name="layers" className="mx-auto mb-4 size-12 text-muted-foreground" />
                    <p className="text-muted-foreground">Nenhum épico criado ainda.</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => navigate(`/prd/${slug}/epicos`)}
                    >
                      Criar Épicos
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full space-y-6 lg:w-80">
            {/* Quick Actions */}
            <Card className="border-border shadow-sm">
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  <button
                    className="flex w-full items-center gap-3 p-3 text-left text-sm transition-colors hover:bg-muted/30"
                    onClick={() => navigate(`/prd/${slug}/brief`)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500/10 text-blue-500">
                      <Icon name="edit" size="size-4" />
                    </div>
                    <span>Editar Brief</span>
                  </button>
                  <button
                    className="flex w-full items-center gap-3 p-3 text-left text-sm transition-colors hover:bg-muted/30"
                    onClick={() => navigate(`/prd/${slug}/prd`)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500/10 text-orange-500">
                      <Icon name="list" size="size-4" />
                    </div>
                    <span>Editar PRD</span>
                  </button>
                  <button
                    className="flex w-full items-center gap-3 p-3 text-left text-sm transition-colors hover:bg-muted/30"
                    onClick={() => navigate(`/prd/${slug}/stories`)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500/10 text-green-500">
                      <Icon name="check-circle" size="size-4" />
                    </div>
                    <span>Ver Stories</span>
                  </button>
                  <button
                    className="group flex w-full items-center gap-3 p-3 text-left text-sm transition-colors hover:bg-muted/30"
                    onClick={handleDownloadZip}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-500/10 text-indigo-500 transition-transform group-hover:scale-110">
                      <Icon name="download" size="size-4" />
                    </div>
                    <span className="transition-colors group-hover:text-indigo-500">
                      Baixar Docs (.zip)
                    </span>
                  </button>
                  <button
                    className="group flex w-full items-center gap-3 p-3 text-left text-sm transition-colors hover:bg-muted/30"
                    onClick={() => navigate(`/prd/${slug}/exportar`)}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded"
                      style={{ backgroundColor: `${STUDIO_TEAL}15`, color: STUDIO_TEAL }}
                    >
                      <Icon name="rocket" size="size-4" />
                    </div>
                    <span
                      className="font-bold transition-colors group-hover:text-[#00C7BE]"
                      style={{ color: STUDIO_TEAL }}
                    >
                      Exportar Projeto
                    </span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-border bg-muted/10 shadow-sm">
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className="border-blue-500/30 text-[10px] text-blue-500">
                    {statusLabel}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="font-medium">
                    {project.project_metadata?.brief?.structure?.classification || 'Projeto'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Criado em</span>
                  <span className="font-mono text-xs">
                    {project.created_at
                      ? new Date(project.created_at).toLocaleDateString('pt-BR')
                      : '-'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Atualizado</span>
                  <span className="font-mono text-xs">
                    {project.updated_at
                      ? new Date(project.updated_at).toLocaleDateString('pt-BR')
                      : '-'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Exports</span>
                  <span className="font-mono text-xs">0</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PRDProjectDetailTemplate;
