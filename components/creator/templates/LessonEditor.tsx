import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { AutosizeTextarea } from '../../ui/autosize-textarea';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import { Progress } from '../../ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { cn } from '../../../lib/utils';
import { FileUpload } from '../../ui/file-upload';
import { STUDIO_PRIMARY, STUDIO_ACCENT, STUDIO_CARD_CLASSES, INPUT_CLASSES, TEXTAREA_CLASSES } from '../studio-tokens';

interface LessonEditorProps {
  onBack: () => void;
  courseSlug?: string;
  lessonId?: string;
}

const LessonEditor: React.FC<LessonEditorProps> = ({
  onBack,
  courseSlug = 'curso-exemplo',
  lessonId = '1.1',
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'index' | 'audit'>('index');

  // Mock State for Lesson Content
  const [title, setTitle] = useState('3.1 - Pastas - Estrutura Minimalista que Funciona');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [script, setScript] = useState(`**Fala, Lendário!**

Bem-vindo ao **Módulo 3: Organização Inteligente!**
Essa é uma das partes mais críticas do curso. Por quê?
**Porque 90% das pessoas que abandonam sistemas de segundo cérebro abandonam por causa de organização errada.**

Você já viveu isso? Começa super empolgado, cria pastas, subpastas, sub-subpastas... e depois de 2 meses, não encontra mais nada. Vira um caos. Você desiste.

**Não vai acontecer com você.** Porque nessa aula eu vou te ensinar a estrutura minimalista que **escala**.
Funciona com 50 notas. Funciona com 5.000 notas.
Vamos lá!

## 🎯 Objetivos da Aula

Ao final dessa aula, você vai:
✅ **Implementar** estrutura de pastas minimalista e escalável
✅ **Entender** quando usar pastas vs. tags vs. links
✅ **Evitar** anti-padrões que quebram sistemas
✅ **Organizar** 20+ notas na estrutura definitiva

## ❌ Os Erros Que Você NÃO Pode Cometer

Antes de mostrar o que fazer, deixa eu te mostrar o que **não fazer.**

### Erro #1: Organização Prematura

Você tem 5 notas e já cria:
\`\`\`
vault/
├── Trabalho/
│   ├── Projetos/
│   │   ├── 2024/
\`\`\``);
  const [status, setStatus] = useState(false);

  // Mock Data for Sidebar (Modules) - Matching the screenshot
  const modules = [
    {
      id: 4,
      title: 'Conexões e Grafo',
      lessons: [
        { id: '4.1', title: 'Links Internos - A Alma do Segundo Cérebro', active: false },
        { id: '4.3', title: 'Canvas - Pensamento Visual', active: false },
        { id: '4.2', title: 'O Grafo do Conhecimento', active: false },
      ],
    },
    {
      id: 5,
      title: 'Superpoderes com IA',
      lessons: [
        { id: '5.2', title: 'Integrando ChatGPT no Obsidian', active: false },
        { id: '5.4', title: 'Templates Inteligentes com IA', active: false },
        { id: '5.1', title: 'Plugins Essenciais da Comunidade', active: false },
        { id: '5.3', title: 'Smart Connections - Converse com Seu Cérebro', active: false },
      ],
    },
    {
      id: 6,
      title: 'Execução e Maestria',
      lessons: [
        { id: '6.3', title: 'Importando de Outras Ferramentas', active: false },
        { id: '6.4', title: 'Os 4 Níveis de Maestria e Próximos Passos', active: false },
        { id: '6.2', title: 'Casos de Uso por Arquétipo', active: false },
        { id: '6.1', title: 'Workflows Diários - Do Caos à Clareza', active: false },
      ],
    },
    {
      id: 1,
      title: 'Fundamentos e Instalação',
      lessons: [
        { id: '1.4', title: 'Configurações Essenciais e Interface', active: false },
        { id: '1.1', title: 'Por Que Você Precisa de um Segundo Cérebro (Agora)', active: false },
        { id: '1.2', title: 'Por Que Obsidian é a Escolha Definitiva', active: false },
        { id: '1.3', title: 'Instalação Multi-Plataforma Completa', active: false },
      ],
    },
    {
      id: 2,
      title: 'Escrita e Formatação',
      lessons: [
        { id: '2.2', title: 'Tipos de Notas e Quando Usar Cada Uma', active: false },
        { id: '2.3', title: 'Trabalhando com Arquivos e Anexos', active: false },
        { id: '2.1', title: 'Markdown em 30 Minutos (O Essencial)', active: false },
      ],
    },
    {
      id: 3,
      title: 'Organização Inteligente',
      lessons: [
        { id: '3.2', title: 'Tags e Hierarquias de Tags', active: false },
        { id: '3.1', title: 'Pastas - Estrutura Minimalista que Funciona', active: true },
        { id: '3.3', title: 'Combinando Pastas + Tags + Links', active: false },
        { id: '3.4', title: 'Migrando Conteúdo Existente', active: false },
      ],
    },
  ];

  // Mock Data for AI Audit
  const aiAudit = {
    hasAnalysis: false, // No analysis yet
    overallScore: null as number | null,
    metrics: [] as { label: string; score: number; status: string }[],
    suggestions: [] as string[],
  };

  // Sidebar width
  const sidebarWidth = sidebarCollapsed ? 'w-12' : 'w-72';

  return (
    <div className="flex h-screen animate-fade-in flex-col bg-background">
      {/* --- TOP BAR --- */}
      <header className="z-20 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="arrow-left" size="size-4" /> Voltar
          </Button>
          <div className="h-5 w-px bg-border" />
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Editando Aula {lessonId}
            </span>
            <span className="text-sm font-semibold text-foreground">Organização Inteligente</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5">
            <span className="text-xs text-muted-foreground">
              {status ? 'Publicado' : 'Rascunho'}
            </span>
            <Switch
              id="status-mode"
              checked={status}
              onCheckedChange={setStatus}
              className="scale-90"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Icon name="eye" size="size-4" /> Preview
          </Button>
          <Button
            size="sm"
            className="gap-2 text-white bg-studio-primary hover:bg-studio-primary-dark"
          >
            <Icon name="check" size="size-4" /> Salvar Alterações
          </Button>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex flex-1 overflow-hidden">
        {/* UNIFIED LEFT SIDEBAR (Index + Audit) */}
        <div
          className={cn(
            'flex shrink-0 flex-col border-r border-border bg-card/50 transition-all duration-300 ease-in-out',
            sidebarWidth
          )}
        >
          {/* Sidebar Header with Toggle */}
          {!sidebarCollapsed ? (
            <>
              {/* Tab Switcher */}
              <div className="flex border-b border-border">
                <Button
                  variant="ghost"
                  onClick={() => setSidebarTab('index')}
                  className={cn(
                    'flex-1 rounded-none px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
                    sidebarTab === 'index'
                      ? 'border-b-2 border-studio-primary text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Índice
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setSidebarTab('audit')}
                  className={cn(
                    'flex h-auto flex-1 items-center justify-center gap-1.5 rounded-none px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
                    sidebarTab === 'audit'
                      ? 'border-b-2 border-studio-primary text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon name="sparkles" size="size-3" />
                  Auditoria
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarCollapsed(true)}
                  className="rounded-none border-l border-border px-3 py-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon name="angle-double-left" size="size-4" />
                </Button>
              </div>

              {/* Sidebar Content */}
              <ScrollArea className="flex-1">
                {sidebarTab === 'index' ? (
                  /* INDEX TAB */
                  <div className="space-y-3 p-3">
                    {modules.map((mod) => (
                      <div key={mod.id} className="space-y-1">
                        <div
                          className="flex items-center justify-between px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-studio-primary"
                        >
                          <span className="truncate">{mod.title}</span>
                          <span className="font-mono text-[10px] font-normal text-muted-foreground">
                            /{mod.lessons.length}
                          </span>
                        </div>
                        {mod.lessons.map((lesson) => (
                          <Button
                            key={lesson.id}
                            variant="ghost"
                            className={cn(
                              'flex h-auto w-full items-start justify-start gap-2 rounded-lg px-2 py-2 text-left text-xs transition-all',
                              lesson.active
                                ? 'bg-studio-primary/10 font-medium text-foreground'
                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                            )}
                          >
                            <span
                              className={cn(
                                'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all',
                                lesson.active
                                  ? 'border-studio-primary bg-studio-primary'
                                  : 'border-muted-foreground/30'
                              )}
                            >
                              {lesson.active && (
                                <Icon name="check" size="size-2" className="text-white" />
                              )}
                            </span>
                            <span className="line-clamp-2 leading-tight">{lesson.title}</span>
                          </Button>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* AUDIT TAB */
                  <div className="space-y-6 p-4">
                    {!aiAudit.hasAnalysis ? (
                      /* No Analysis State */
                      <div className="py-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
                          <Icon name="sparkles" size="size-7" className="text-muted-foreground" />
                        </div>
                        <h4 className="mb-2 text-sm font-semibold">Sem análise</h4>
                        <p className="mb-6 px-4 text-xs text-muted-foreground">
                          Esta lição ainda não foi analisada pelo sistema de auditoria didática.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 border-studio-primary/40 text-studio-primary hover:bg-studio-primary/5 hover:text-studio-primary"
                        >
                          <Icon name="sparkles" size="size-3" />
                          Analisar Conteúdo
                        </Button>
                        <p className="mt-4 text-[10px] text-muted-foreground">
                          Funcionalidade em desenvolvimento
                        </p>
                      </div>
                    ) : (
                      /* Has Analysis */
                      <div className="space-y-6">
                        {/* Overall Score */}
                        <div className="rounded-xl border border-border bg-muted/20 p-4 text-center">
                          <div className="relative mx-auto mb-2 flex h-20 w-20 items-center justify-center">
                            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-muted"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={STUDIO_PRIMARY}
                                strokeWidth="3"
                                strokeDasharray={`${aiAudit.overallScore || 0}, 100`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-2xl font-bold text-studio-primary">
                                {aiAudit.overallScore}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Score de Fidelidade</p>
                        </div>

                        {/* Metrics */}
                        <div className="space-y-3">
                          {aiAudit.metrics.map((metric, i) => (
                            <div key={i} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">{metric.label}</span>
                                <span className="font-medium">{metric.score}%</span>
                              </div>
                              <Progress value={metric.score} className="h-1" />
                            </div>
                          ))}
                        </div>

                        {/* Suggestions */}
                        {aiAudit.suggestions.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              Sugestões
                            </h5>
                            {aiAudit.suggestions.map((sug, i) => (
                              <div
                                key={i}
                                className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2 text-xs"
                              >
                                {sug}
                              </div>
                            ))}
                          </div>
                        )}

                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <Icon name="refresh" className="mr-2" size="size-3" /> Re-analisar
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </>
          ) : (
            /* COLLAPSED STATE */
            <div className="flex flex-col items-center gap-2 py-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon name="angle-double-right" size="size-4" />
              </Button>
              <div className="my-1 h-px w-6 bg-border" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSidebarCollapsed(false);
                      setSidebarTab('index');
                    }}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                      sidebarTab === 'index'
                        ? 'bg-studio-primary/20 text-studio-primary'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <Icon name="list" size="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Índice do Curso</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSidebarCollapsed(false);
                      setSidebarTab('audit');
                    }}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                      sidebarTab === 'audit'
                        ? 'bg-studio-primary/20 text-studio-primary'
                        : 'text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <Icon name="sparkles" size="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Auditoria Didática</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>

        {/* CENTER STAGE (Editor) - Now takes more space */}
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-background">
          <div className="mx-auto w-full max-w-4xl space-y-6 p-8">
            {/* Title Input */}
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={cn(INPUT_CLASSES, "h-auto border-none bg-transparent px-0 text-2xl font-bold shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0")}
              placeholder="Título da Aula"
            />

            {/* Metadata Row */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                <strong>Módulo:</strong> 3 - Organização Inteligente
              </span>
              <span>
                <strong>Duração:</strong> 40 minutos
              </span>
              <span>
                <strong>Tipo:</strong> Estratégico + Hands-on
              </span>
            </div>

            {/* Editor Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center gap-4 border-b border-border">
                <TabsList className="h-auto gap-1 bg-transparent p-0">
                  <TabsTrigger
                    value="content"
                    className={cn(
                      'rounded-lg px-4 py-2 text-sm data-[state=active]:bg-muted data-[state=active]:text-foreground',
                      'data-[state=inactive]:text-muted-foreground'
                    )}
                  >
                    <Icon name="eye" size="size-4" className="mr-2" />
                    Visual
                  </TabsTrigger>
                  <TabsTrigger
                    value="markdown"
                    className={cn(
                      'rounded-lg px-4 py-2 text-sm data-[state=active]:bg-muted data-[state=active]:text-foreground',
                      'data-[state=inactive]:text-muted-foreground'
                    )}
                  >
                    Markdown
                  </TabsTrigger>
                </TabsList>

                {/* Formatting Toolbar */}
                <div className="ml-auto flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="bold" size="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="italic" size="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="strikethrough" size="size-4" />
                  </Button>
                  <div className="mx-1 h-5 w-px bg-border" />
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-semibold">
                    H2
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-semibold">
                    H3
                  </Button>
                  <div className="mx-1 h-5 w-px bg-border" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="list" size="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="quote-left" size="size-4" />
                  </Button>
                  <div className="mx-1 h-5 w-px bg-border" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="undo" size="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="redo" size="size-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="content" className="animate-fade-in pt-6">
                {/* App Icon/Logo (like ClickUp in screenshot) */}
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-pink-500">
                    <Icon name="folder" size="size-8" className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <Badge variant="secondary" className="mt-1">
                      ClickUp
                    </Badge>
                  </div>
                </div>

                {/* Rich Content Area */}
                <div className="prose prose-invert max-w-none">
                  <AutosizeTextarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    className={cn(TEXTAREA_CLASSES, "min-h-[500px] w-full resize-none border-none bg-transparent p-0 font-sans text-base leading-relaxed focus-visible:ring-0")}
                    placeholder="Escreva o conteúdo da aula..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="markdown" className="animate-fade-in pt-6">
                <Card className={STUDIO_CARD_CLASSES}>
                  <CardContent className="p-0">
                    <AutosizeTextarea
                      value={script}
                      onChange={(e) => setScript(e.target.value)}
                      className={cn(TEXTAREA_CLASSES, "min-h-[500px] resize-none border-none p-6 font-mono text-sm leading-relaxed focus-visible:ring-0")}
                      placeholder="Escreva em Markdown..."
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonEditor;
