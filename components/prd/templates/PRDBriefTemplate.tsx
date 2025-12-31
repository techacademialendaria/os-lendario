import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Section } from '../../../types';
import { PRDStatus } from '../../../types/prd';
import { usePRDProject } from '../../../hooks/prd/usePRDProject';
import PRDTopbar from '../PRDTopbar';

import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { AutosizeTextarea } from '../../ui/autosize-textarea';
import { Input } from '../../ui/input';
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
// CONSTANTS
// =============================================================================

const STUDIO_TEAL = '#00C7BE';
const MIN_CHARS_REQUIRED = 50;

const PIPELINE_STEPS = [
  { id: 'upload', label: 'Upload', status: 'done' as const },
  { id: 'brief', label: 'Brief', status: 'active' as const },
  { id: 'prd', label: 'PRD', status: 'pending' as const },
  { id: 'epics', label: 'Épicos', status: 'pending' as const },
  { id: 'stories', label: 'Stories', status: 'pending' as const },
  { id: 'export', label: 'Export', status: 'pending' as const },
];

// =============================================================================
// TYPES
// =============================================================================

interface PRDBriefTemplateProps {
  setSection: (section: Section) => void;
}

type EditorMode = 'edit' | 'preview';
type ProjectDecision = 'task' | 'project' | null;

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

const NotFoundState: React.FC<{ setSection: (s: Section) => void }> = ({ setSection }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <PRDTopbar currentSection={Section.STUDIO_PRD_EDITOR} setSection={setSection} />
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-4 text-center">
        <Icon name="folder-open" size="size-16" className="mx-auto text-muted-foreground/30" />
        <h2 className="text-xl font-bold">Projeto não encontrado</h2>
        <p className="text-muted-foreground">O projeto que você está procurando não existe.</p>
        <Button variant="outline" onClick={() => window.history.back()}>
          <Icon name="arrow-left" className="mr-2 size-4" />
          Voltar
        </Button>
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

export const PRDBriefTemplate: React.FC<PRDBriefTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateBrief, advancePhase } = usePRDProject(slug || '');

  // Local state
  const [viewMode, setViewMode] = useState<EditorMode>('edit');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [differentials, setDifferentials] = useState('');
  const [scopeIn, setScopeIn] = useState('');
  const [scopeOut, setScopeOut] = useState('');
  const [metrics, setMetrics] = useState('');
  const [decision, setDecision] = useState<ProjectDecision>(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Initialize from project data
  useEffect(() => {
    if (project?.project_metadata?.brief) {
      const brief = project.project_metadata.brief;
      setProblem(brief.superProblem || brief.structure?.problem || '');
      setSolution(brief.solution || brief.structure?.solution || '');
      setDifferentials(brief.differentials?.join('\n') || '');
      setScopeIn(brief.scopeIn?.join('\n') || '');
      setScopeOut(brief.scopeOut?.map((s) => s.item).join('\n') || '');
      setMetrics(brief.successMetrics?.map((m) => `${m.metric}: ${m.target}`).join('\n') || '');
      setDecision(brief.structure?.classification || null);
    }
  }, [project]);

  // NOTE: Auto-redirect removed to allow free navigation between phases

  // Computed
  const uploadContent = project?.project_metadata?.upload?.content || '';
  const isValid = problem.length >= MIN_CHARS_REQUIRED && solution.length >= MIN_CHARS_REQUIRED;

  // Research insights (mock - would be AI-generated)
  const researchInsights =
    uploadContent.length > 20
      ? [
          'Identificar o público-alvo específico pode aumentar a clareza do projeto.',
          'Considere definir métricas de sucesso mensuráveis.',
          'Quais integrações serão necessárias?',
        ]
      : [];

  // Generate markdown
  const generateMarkdown = () => {
    return `# Project Brief

## Problema
${problem || '_Não definido_'}

## Solução Proposta
${solution || '_Não definido_'}

## Diferenciais
${differentials || '_Não definido_'}

## Escopo (In)
${scopeIn || '_Não definido_'}

## Escopo (Out)
${scopeOut || '_Não definido_'}

## Métricas de Sucesso
${metrics || '_Não definido_'}
`;
  };

  // Download markdown
  const handleDownload = useCallback(() => {
    const element = document.createElement('a');
    const file = new Blob([generateMarkdown()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'brief.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [problem, solution, differentials, scopeIn, scopeOut, metrics]);

  // Save brief data
  const handleSave = useCallback(async () => {
    if (!project) return;

    await updateBrief({
      superProblem: problem,
      solution: solution,
      differentials: differentials.split('\n').filter(Boolean),
      scopeIn: scopeIn.split('\n').filter(Boolean),
      scopeOut: scopeOut
        .split('\n')
        .filter(Boolean)
        .map((item) => ({ item, reason: '' })),
      successMetrics: metrics
        .split('\n')
        .filter(Boolean)
        .map((line) => {
          const [metric, target] = line.split(':').map((s) => s.trim());
          return { metric: metric || line, definition: '', target: target || '' };
        }),
      structure: {
        problem,
        solution,
        targetAudience: '',
        differentials: differentials.split('\n').filter(Boolean),
        risks: [],
        successMetrics: [],
        classification: decision || 'project',
        estimatedComplexity: 'medium',
      },
    });
  }, [
    project,
    updateBrief,
    problem,
    solution,
    differentials,
    scopeIn,
    scopeOut,
    metrics,
    decision,
  ]);

  // AI Generation handlers (mock)
  const handleRegenerate = useCallback(
    async (field: string) => {
      setIsGenerating(field);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (field === 'problem') {
        setProblem(
          `Baseado na análise do briefing, o problema central é:\n\n${uploadContent.slice(0, 150)}...\n\nOs usuários enfrentam dificuldades específicas que resultam em perda de tempo e recursos.`
        );
      } else if (field === 'solution') {
        setSolution(
          `A solução proposta aborda o problema através de:\n\n1. Abordagem Principal: Desenvolvimento de uma plataforma focada em...\n2. Funcionalidades Chave: Login, Dashboard, Relatórios\n3. Benefícios: Redução de tempo, melhoria na UX`
        );
      }
      setIsGenerating(null);
    },
    [uploadContent]
  );

  // Task selection
  const handleTaskSelection = useCallback(() => {
    setDecision('task');
    setShowTaskDialog(true);
  }, []);

  // Project selection
  const handleProjectSelection = useCallback(async () => {
    setDecision('project');
    setIsAdvancing(true);
    await handleSave();
    const success = await advancePhase();
    if (success) {
      navigate(`/prd/${slug}/prd`);
    }
    setIsAdvancing(false);
  }, [handleSave, advancePhase, navigate, slug]);

  // Confirm task export
  const confirmTaskExport = useCallback(async () => {
    setShowTaskDialog(false);
    setIsAdvancing(true);
    await handleSave();
    navigate(`/prd/${slug}/exportar`);
    setIsAdvancing(false);
  }, [handleSave, navigate, slug]);

  // Loading state
  if (loading) {
    return <LoadingState setSection={setSection} />;
  }

  // Not found state
  if (!project) {
    return <NotFoundState setSection={setSection} />;
  }

  // NOTE: Status check removed to allow free navigation between phases

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
                onClick={() => navigate(`/prd/${slug}`)}
              >
                {project.name}
              </span>
              <Icon name="angle-small-right" size="size-3" />
              <span className="font-medium text-foreground">Brief Builder</span>
            </div>
            <Badge
              variant="outline"
              className="border-[var(--studio-teal)]/30 bg-[var(--studio-teal)]/5 w-fit text-[var(--studio-teal)]"
              style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
            >
              90% Você · 10% IA
            </Badge>
          </div>

          {/* Pipeline Stepper */}
          <PipelineStepper />
        </div>
      </header>

      {/* Main Content - Split View */}
      <main className="container mx-auto grid max-w-7xl flex-1 grid-cols-1 items-start gap-8 py-8 lg:grid-cols-12">
        {/* LEFT: CONTEXT (Sticky) */}
        <aside className="space-y-6 lg:sticky lg:top-32 lg:col-span-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Contexto & Insights</h2>
            <p className="font-serif text-sm text-muted-foreground">
              A base de informações que a IA usou para estruturar o brief ao lado.
            </p>
          </div>

          {/* Original Input Card */}
          <Card className="border-dashed border-border bg-muted/10">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <Icon name="cloud-upload" size="size-4" /> Input Original
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-sm italic text-foreground/80">
                "{uploadContent || 'Nenhum conteúdo do upload'}"
              </p>
            </CardContent>
          </Card>

          {/* Insights Card */}
          {researchInsights.length > 0 && (
            <Card
              className="border-[var(--studio-teal)]/20 bg-[var(--studio-teal)]/5"
              style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                  style={{ color: STUDIO_TEAL }}
                >
                  <Icon name="lightbulb" size="size-4" /> Insights (WOWs)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {researchInsights.map((insight, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div
                      className="mt-1.5 size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: STUDIO_TEAL }}
                    />
                    <p className="leading-snug text-foreground/90">{insight}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Warning Tip */}
          <div className="flex gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-xs font-medium text-yellow-600">
            <Icon name="info-circle" size="size-4" className="mt-0.5 shrink-0" />
            <p>
              Lembre-se: O Brief é o contrato entre sua visão e a execução técnica. Seja específico.
            </p>
          </div>
        </aside>

        {/* RIGHT: THE BRIEF (Editable) */}
        <div className="space-y-8 lg:col-span-8">
          {/* Header with tabs and download */}
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">Seu Brief Estruturado</h1>
              <Badge
                variant="outline"
                className="border-[var(--studio-teal)]/20 bg-[var(--studio-teal)]/5 gap-2 text-[var(--studio-teal)]"
                style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
              >
                <Icon name="magic-wand" size="size-3" /> IA Generated
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="flex rounded-lg border border-border bg-muted/50 p-1">
                <button
                  onClick={() => setViewMode('edit')}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-bold transition-all',
                    viewMode === 'edit'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Editor
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-bold transition-all',
                    viewMode === 'preview'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Markdown
                </button>
              </div>
              {/* Download Button */}
              <Button variant="outline" size="icon" onClick={handleDownload} title="Baixar .md">
                <Icon name="download" size="size-4" />
              </Button>
            </div>
          </div>

          {viewMode === 'edit' ? (
            /* Editable Sections */
            <div className="animate-fade-in space-y-8">
              {/* Problem */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Super Problema
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 gap-1 text-xs opacity-50 hover:opacity-100"
                    onClick={() => handleRegenerate('problem')}
                    disabled={isGenerating !== null}
                  >
                    {isGenerating === 'problem' ? (
                      <Icon name="refresh" size="size-3" className="animate-spin" />
                    ) : (
                      <Icon name="refresh" size="size-3" />
                    )}
                    Regenerar
                  </Button>
                </div>
                <AutosizeTextarea
                  className="bg-card font-serif text-base leading-relaxed"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Qual problema você está resolvendo? Descreva a dor do usuário..."
                  disabled={isGenerating === 'problem'}
                />
                <p className="text-xs text-muted-foreground">
                  {problem.length}/{MIN_CHARS_REQUIRED} caracteres mínimos
                  {problem.length >= MIN_CHARS_REQUIRED && (
                    <Icon name="check" className="ml-1 inline size-3 text-green-500" />
                  )}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Solução Proposta
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 gap-1 text-xs opacity-50 hover:opacity-100"
                    onClick={() => handleRegenerate('solution')}
                    disabled={isGenerating !== null}
                  >
                    {isGenerating === 'solution' ? (
                      <Icon name="refresh" size="size-3" className="animate-spin" />
                    ) : (
                      <Icon name="refresh" size="size-3" />
                    )}
                    Regenerar
                  </Button>
                </div>
                <AutosizeTextarea
                  className="bg-card font-serif text-base leading-relaxed"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="Como você vai resolver o problema? Descreva a abordagem..."
                  disabled={isGenerating === 'solution'}
                />
                <p className="text-xs text-muted-foreground">
                  {solution.length}/{MIN_CHARS_REQUIRED} caracteres mínimos
                  {solution.length >= MIN_CHARS_REQUIRED && (
                    <Icon name="check" className="ml-1 inline size-3 text-green-500" />
                  )}
                </p>
              </div>

              {/* Differentials */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Diferenciais Críticos
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 gap-1 text-xs opacity-50 hover:opacity-100"
                  >
                    <Icon name="refresh" size="size-3" /> Regenerar
                  </Button>
                </div>
                <AutosizeTextarea
                  className="border-l-4 bg-card font-mono text-sm leading-relaxed"
                  style={{ borderLeftColor: STUDIO_TEAL }}
                  value={differentials}
                  onChange={(e) => setDifferentials(e.target.value)}
                  placeholder="1. Diferencial 1&#10;2. Diferencial 2&#10;3. Diferencial 3"
                />
              </div>

              {/* Scope In / Out */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-green-600">
                    <Icon name="check-circle" size="size-4" /> Escopo - O que FAZ
                  </label>
                  <AutosizeTextarea
                    className="min-h-[150px] border-green-500/20 bg-green-500/5 text-sm"
                    value={scopeIn}
                    onChange={(e) => setScopeIn(e.target.value)}
                    placeholder="- Funcionalidade 1&#10;- Funcionalidade 2&#10;- Funcionalidade 3"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-destructive">
                    <Icon name="x-circle" size="size-4" /> Escopo - O que NÃO FAZ
                  </label>
                  <AutosizeTextarea
                    className="min-h-[150px] border-destructive/20 bg-destructive/5 text-sm"
                    value={scopeOut}
                    onChange={(e) => setScopeOut(e.target.value)}
                    placeholder="- Não inclui X&#10;- Não inclui Y&#10;- Não inclui Z"
                  />
                </div>
              </div>

              {/* Success Metrics */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Métricas de Sucesso
                </label>
                <AutosizeTextarea
                  className="bg-card text-sm"
                  value={metrics}
                  onChange={(e) => setMetrics(e.target.value)}
                  placeholder="- Redução de X em Y%&#10;- Aumento de Z em W%&#10;- Tempo de tarefa < N segundos"
                />
              </div>
            </div>
          ) : (
            /* Preview Section */
            <div className="animate-fade-in">
              <Card className="overflow-hidden border border-border shadow-sm">
                <CardHeader className="border-b border-border bg-muted/30 py-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <Icon name="code" size="size-3" /> brief.md
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-foreground">
                    {generateMarkdown()}
                  </pre>
                </CardContent>
              </Card>
            </div>
          )}

          {/* --- DECISOR: TASK vs PROJECT --- */}
          <div className="mt-12 border-t border-border pt-12">
            <h3 className="mb-8 text-center text-2xl font-bold">
              Decisão Estratégica: O que estamos construindo?
            </h3>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Task Card */}
              <button
                onClick={handleTaskSelection}
                disabled={!isValid || isAdvancing}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-border p-8 text-left transition-all hover:border-muted-foreground/50 hover:bg-card disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-muted text-3xl transition-transform group-hover:scale-110">
                  <Icon name="check" />
                </div>
                <h4 className="mb-2 text-2xl font-bold">É uma TAREFA</h4>
                <p className="mb-6 font-serif text-muted-foreground">
                  Uma ação macro com resultado verificável e isolado.
                  <br />
                  <span className="text-xs opacity-70">
                    (Ex: Landing page, Automação simples, Chatbot básico)
                  </span>
                </p>
                <Badge
                  variant="outline"
                  className="bg-muted text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background"
                >
                  Fluxo Rápido: ~30 min
                </Badge>
              </button>

              {/* Project Card */}
              <button
                onClick={handleProjectSelection}
                disabled={!isValid || isAdvancing}
                className="hover:bg-[var(--studio-teal)]/10 group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-8 text-left shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50"
                style={
                  {
                    '--studio-teal': STUDIO_TEAL,
                    borderColor: STUDIO_TEAL,
                    backgroundColor: `${STUDIO_TEAL}08`,
                    boxShadow: `0 10px 40px ${STUDIO_TEAL}15`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="absolute right-4 top-4 animate-pulse"
                  style={{ color: STUDIO_TEAL }}
                >
                  <Icon name="star" />
                </div>
                <div
                  className="mb-6 flex size-16 items-center justify-center rounded-full text-3xl text-white transition-transform group-hover:scale-110"
                  style={{ backgroundColor: STUDIO_TEAL }}
                >
                  <Icon name="multi-window" />
                </div>
                <h4 className="mb-2 text-2xl font-bold text-foreground">É um PROJETO</h4>
                <p className="mb-6 font-serif text-muted-foreground">
                  Múltiplas ações interconectadas, banco de dados ou sistemas.
                  <br />
                  <span className="text-xs opacity-70">(Ex: CRM, SaaS, App Multi-tela)</span>
                </p>
                <Badge
                  className="text-white hover:opacity-90"
                  style={{ backgroundColor: STUDIO_TEAL }}
                >
                  {isAdvancing ? (
                    <>
                      <Icon name="refresh" className="mr-1 size-3 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    'Fluxo Completo: Detalhar PRD →'
                  )}
                </Badge>
              </button>
            </div>

            {!isValid && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Preencha Problema e Solução (mínimo {MIN_CHARS_REQUIRED} caracteres cada) para
                continuar.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Task Export Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Fluxo de Tarefa</DialogTitle>
            <DialogDescription>
              Como isso é uma tarefa única, vamos pular as etapas de PRD, Épicos e Stories e ir
              direto para a exportação do prompt de execução.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
              <Icon name="rocket" className="size-8 text-primary" />
              <div>
                <p className="text-sm font-bold">Próximo Passo: Exportar</p>
                <p className="text-xs text-muted-foreground">
                  Gerar prompt otimizado para Lovable/Cursor.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowTaskDialog(false)}>
              Voltar
            </Button>
            <Button onClick={confirmTaskExport} disabled={isAdvancing}>
              {isAdvancing ? (
                <>
                  <Icon name="refresh" className="mr-2 size-4 animate-spin" />
                  Processando...
                </>
              ) : (
                'Ir para Exportação'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PRDBriefTemplate;
