import React, { useState, useCallback, useMemo } from 'react';
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
import { ScrollArea } from '../../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { FileUpload } from '../../ui/file-upload';
import { cn } from '../../../lib/utils';

// =============================================================================
// CONSTANTS
// =============================================================================

const STUDIO_TEAL = '#00C7BE';

const PIPELINE_STEPS = [
  { id: 'upload', label: 'Upload', status: 'done' as const },
  { id: 'brief', label: 'Brief', status: 'done' as const },
  { id: 'prd', label: 'PRD', status: 'active' as const },
  { id: 'epics', label: 'Épicos', status: 'pending' as const },
  { id: 'stories', label: 'Stories', status: 'pending' as const },
  { id: 'export', label: 'Export', status: 'pending' as const },
];

// =============================================================================
// TYPES
// =============================================================================

interface PRDDocumentTemplateProps {
  setSection: (section: Section) => void;
}

interface Requirement {
  id: string;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  category: 'must' | 'should' | 'nice';
}

interface TechStack {
  frontend: string;
  backend: string;
  ai: string;
  hosting: string;
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

// Requirement Card Component
const RequirementCard: React.FC<{
  req: Requirement;
  onApprove: () => void;
  onReject: () => void;
  onUndo: () => void;
}> = ({ req, onApprove, onReject, onUndo }) => {
  const categoryConfig = {
    must: { label: 'Must Have', color: 'bg-red-500/10 text-red-600 border-red-500/20' },
    should: { label: 'Should Have', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
    nice: { label: 'Nice to Have', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
  };

  const cat = categoryConfig[req.category];

  return (
    <Card
      className={cn(
        'border-l-4 transition-all duration-300',
        req.status === 'pending'
          ? 'border-l-blue-500 shadow-sm'
          : req.status === 'approved'
            ? 'border-l-green-500 bg-muted/20 opacity-60'
            : 'border-l-red-500 bg-muted/20 opacity-40'
      )}
    >
      <CardContent className="flex items-start gap-4 p-4">
        <div className="flex-1 space-y-1">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="secondary" className={cn('h-5 text-[10px]', cat.color)}>
              {cat.label}
            </Badge>
            {req.status === 'approved' && (
              <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                <Icon name="check" size="size-3" /> Aprovado
              </span>
            )}
            {req.status === 'rejected' && (
              <span className="flex items-center gap-1 text-xs font-bold text-red-600">
                <Icon name="xmark" size="size-3" /> Rejeitado
              </span>
            )}
          </div>
          <p
            className={cn(
              'text-sm font-medium leading-snug',
              req.status === 'rejected' && 'line-through'
            )}
          >
            {req.text}
          </p>
        </div>

        {req.status === 'pending' ? (
          <div className="flex shrink-0 gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="size-8 text-green-600 hover:bg-green-100 hover:text-green-700"
              onClick={onApprove}
              title="Aprovar"
            >
              <Icon name="check" size="size-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="size-8 text-muted-foreground hover:text-foreground"
              title="Editar"
            >
              <Icon name="edit-pencil" size="size-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="size-8 text-red-600 hover:bg-red-100 hover:text-red-700"
              onClick={onReject}
              title="Rejeitar"
            >
              <Icon name="xmark" size="size-4" />
            </Button>
          </div>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            className="size-8 text-muted-foreground"
            onClick={onUndo}
          >
            <Icon name="undo" size="size-3" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDDocumentTemplate: React.FC<PRDDocumentTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, updateProject, advancePhase } = usePRDProject(slug || '');

  // Local state
  const [activeTab, setActiveTab] = useState('design');
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Design tab state
  const [screens, setScreens] = useState('');
  const [vibe, setVibe] = useState('');

  // Requirements state (mock - would be from project metadata)
  const [requirements, setRequirements] = useState<Requirement[]>([
    { id: 'req1', text: 'Login social com Google e Apple.', status: 'pending', category: 'must' },
    {
      id: 'req2',
      text: 'Dashboard inicial com métricas de vendas e gráficos.',
      status: 'pending',
      category: 'must',
    },
    { id: 'req3', text: 'Sistema de gamificação com badges.', status: 'pending', category: 'nice' },
    {
      id: 'req4',
      text: 'Exportação de relatórios em PDF e CSV.',
      status: 'pending',
      category: 'should',
    },
    { id: 'req5', text: 'Modo escuro automático.', status: 'pending', category: 'should' },
  ]);

  // Tech stack state
  const [techStack, setTechStack] = useState<TechStack>({
    frontend: 'React + Vite + Tailwind',
    backend: 'Supabase (Postgres + Auth)',
    ai: 'OpenAI API (GPT-4o)',
    hosting: 'Vercel',
  });

  const [scopeLimits, setScopeLimits] = useState(
    '- Não teremos app nativo (apenas PWA)\n- Sem suporte a múltiplos idiomas no MVP\n- Pagamentos apenas via Stripe inicialmente'
  );

  // Initialize from project
  React.useEffect(() => {
    if (project?.project_metadata?.prdDocument) {
      // Load existing data if available
      const prdDoc = project.project_metadata.prdDocument;
      if (prdDoc.requirements) {
        setRequirements(prdDoc.requirements);
      }
      if (prdDoc.techStack) {
        setTechStack(prdDoc.techStack);
      }
    }
  }, [project]);

  // Computed
  const brief = project?.project_metadata?.brief;
  const pendingCount = requirements.filter((r) => r.status === 'pending').length;
  const approvedCount = requirements.filter((r) => r.status === 'approved').length;
  const allCriticalReviewed = requirements
    .filter((r) => r.category === 'must')
    .every((r) => r.status !== 'pending');

  // Generate live preview markdown
  const generatePreview = useMemo(() => {
    return `# Especificação Técnica: ${project?.name || 'Projeto'}

**Status:** Draft | **Autor:** Alan Nicolas

---

## 1. Visão Geral
${brief?.superProblem || brief?.structure?.problem || 'Não definido'}

## 2. Solução
${brief?.solution || brief?.structure?.solution || 'Não definido'}

## 3. Requisitos Funcionais
${
  requirements
    .filter((r) => r.status === 'approved')
    .map((r) => `- [x] ${r.text} (${r.category.toUpperCase()})`)
    .join('\n') || '- Nenhum aprovado ainda'
}

${requirements
  .filter((r) => r.status === 'pending')
  .map((r) => `- [ ] ${r.text}`)
  .join('\n')}

## 4. Stack Tecnológico
- **Frontend:** ${techStack.frontend}
- **Backend:** ${techStack.backend}
- **AI:** ${techStack.ai}
- **Hosting:** ${techStack.hosting}

## 5. Limites de Escopo
${scopeLimits}
`;
  }, [project, brief, requirements, techStack, scopeLimits]);

  // Handlers
  const handleRequirementAction = useCallback(
    (id: string, action: 'approve' | 'reject' | 'undo') => {
      setRequirements((prev) =>
        prev.map((req) =>
          req.id === id
            ? {
                ...req,
                status:
                  action === 'undo' ? 'pending' : action === 'approve' ? 'approved' : 'rejected',
              }
            : req
        )
      );
    },
    []
  );

  const handleFinish = useCallback(async () => {
    if (pendingCount > 0) return;

    setIsAdvancing(true);

    // Save PRD document
    await updateProject({
      prdDocument: {
        requirements,
        techStack,
        scopeLimits,
        screens,
        vibe,
      },
    });

    const success = await advancePhase();
    if (success) {
      navigate(`/prd/${slug}/epicos`);
    }
    setIsAdvancing(false);
  }, [
    pendingCount,
    updateProject,
    requirements,
    techStack,
    scopeLimits,
    screens,
    vibe,
    advancePhase,
    navigate,
    slug,
  ]);

  const handleDownload = useCallback(() => {
    const element = document.createElement('a');
    const file = new Blob([generatePreview], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'prd.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [generatePreview]);

  // Loading state
  if (loading) {
    return <LoadingState setSection={setSection} />;
  }

  // Not found state
  if (!project) {
    return <NotFoundState setSection={setSection} />;
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
              <Icon name="nav-arrow-right" size="size-3" />
              <span
                className="cursor-pointer hover:text-foreground"
                onClick={() => navigate(`/prd/${slug}/brief`)}
              >
                Brief
              </span>
              <Icon name="nav-arrow-right" size="size-3" />
              <span className="font-medium text-foreground">Especificação Técnica</span>
            </div>
            <Badge
              variant="outline"
              className="border-[var(--studio-teal)]/30 bg-[var(--studio-teal)]/5 w-fit text-[var(--studio-teal)]"
              style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
            >
              70% Você · 30% IA
            </Badge>
          </div>

          {/* Pipeline Stepper */}
          <PipelineStepper />
        </div>
      </header>

      {/* Main Content - Tabs + Live Preview */}
      <main className="container mx-auto grid max-w-7xl flex-1 grid-cols-1 items-start gap-8 py-8 lg:grid-cols-12">
        {/* LEFT: INTERACTIVE WIZARD (Tabs) */}
        <div className="space-y-6 lg:col-span-7">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start gap-6 overflow-x-auto border-b border-border bg-transparent p-0">
              <TabsTrigger
                value="design"
                className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)]"
                style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
              >
                1. Design & UX
              </TabsTrigger>
              <TabsTrigger
                value="functional"
                className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)]"
                style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
              >
                2. Funcionalidades
              </TabsTrigger>
              <TabsTrigger
                value="tech"
                className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)]"
                style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
              >
                3. Tecnologia
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {/* TAB 1: DESIGN */}
              <TabsContent value="design" className="animate-fade-in space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Identidade Visual & Fluxo</h3>
                  <p className="font-serif text-muted-foreground">
                    A IA tende a criar designs genéricos. Use esta seção para definir a
                    personalidade visual do seu produto.
                  </p>

                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Referências Visuais</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Faça upload de prints de apps que você gosta.
                        </p>
                      </CardHeader>
                      <CardContent>
                        <FileUpload className="h-32" />
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Perguntas Guiadas
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 block text-sm font-medium">
                            Quantas telas principais você imagina?
                          </label>
                          <Input
                            placeholder="Ex: Dashboard, Lista de Clientes, Perfil..."
                            value={screens}
                            onChange={(e) => setScreens(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium">
                            Qual a "vibe" do design?
                          </label>
                          <AutosizeTextarea
                            placeholder="Ex: Minimalista, Clean, Dark Mode, Corporativo, Colorido..."
                            value={vibe}
                            onChange={(e) => setVibe(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={() => setActiveTab('functional')}>
                      Próximo: Funcionalidades <Icon name="arrow-right" className="ml-2" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 2: FUNCTIONAL (1-2-3 SYSTEM) */}
              <TabsContent value="functional" className="animate-fade-in space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">Validação de Requisitos</h3>
                      <p className="font-serif text-sm text-muted-foreground">
                        O sistema "1-2-3": Aprove (✓), Edite (✎) ou Rejeite (✗) cada sugestão da IA.
                      </p>
                    </div>
                    <Badge variant="outline" className="h-fit">
                      {pendingCount} pendentes
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {requirements.map((req) => (
                      <RequirementCard
                        key={req.id}
                        req={req}
                        onApprove={() => handleRequirementAction(req.id, 'approve')}
                        onReject={() => handleRequirementAction(req.id, 'reject')}
                        onUndo={() => handleRequirementAction(req.id, 'undo')}
                      />
                    ))}
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="ghost" onClick={() => setActiveTab('design')}>
                      Voltar
                    </Button>
                    <Button onClick={() => setActiveTab('tech')} disabled={!allCriticalReviewed}>
                      Próximo: Tecnologia <Icon name="arrow-right" className="ml-2" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 3: TECH STACK */}
              <TabsContent value="tech" className="animate-fade-in space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Arquitetura Técnica</h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">
                          Sugestão da IA
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">Frontend</label>
                          <Input
                            value={techStack.frontend}
                            onChange={(e) =>
                              setTechStack({ ...techStack, frontend: e.target.value })
                            }
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">Backend / BaaS</label>
                          <Input
                            value={techStack.backend}
                            onChange={(e) =>
                              setTechStack({ ...techStack, backend: e.target.value })
                            }
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">AI Model</label>
                          <Input
                            value={techStack.ai}
                            onChange={(e) => setTechStack({ ...techStack, ai: e.target.value })}
                            className="bg-background"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                          Limites de Escopo
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <AutosizeTextarea
                          className="min-h-[150px] text-sm"
                          value={scopeLimits}
                          onChange={(e) => setScopeLimits(e.target.value)}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-end gap-3 border-t border-border pt-8">
                    <Button variant="ghost" onClick={() => setActiveTab('functional')}>
                      Voltar
                    </Button>
                    <Button
                      size="lg"
                      className="px-8 font-bold text-white shadow-lg hover:opacity-90"
                      style={{ backgroundColor: STUDIO_TEAL }}
                      onClick={handleFinish}
                      disabled={pendingCount > 0 || isAdvancing}
                    >
                      {isAdvancing ? (
                        <>
                          <Icon name="refresh" className="mr-2 animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        <>
                          Gerar Plano de Execução <Icon name="check-circle" className="ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* RIGHT: LIVE PREVIEW (Sticky) */}
        <aside className="h-fit space-y-6 lg:sticky lg:top-32 lg:col-span-5">
          <div className="flex max-h-[80vh] flex-col overflow-hidden rounded-xl border border-border bg-muted/30 shadow-sm">
            <div className="flex items-center justify-between border-b border-border bg-muted/50 p-3">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Icon name="code" size="size-3" /> Live Preview (PRD.md)
              </span>
              <Badge variant="outline" className="bg-background text-[10px]">
                Auto-Save
              </Badge>
            </div>
            <ScrollArea className="flex-1 bg-card p-6">
              <article className="prose prose-sm dark:prose-invert max-w-none font-mono text-xs leading-relaxed">
                <pre className="whitespace-pre-wrap">{generatePreview}</pre>
              </article>
            </ScrollArea>
            <div className="border-t border-border bg-muted/10 p-3 text-center">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-full text-xs text-muted-foreground"
                onClick={handleDownload}
              >
                <Icon name="download" size="size-3" className="mr-2" /> Baixar Markdown
              </Button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PRDDocumentTemplate;
