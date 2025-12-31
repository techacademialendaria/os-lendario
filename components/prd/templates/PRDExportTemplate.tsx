import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Section } from '../../../types';
import { PRDStatus } from '../../../types/prd';
import { usePRDProject } from '../../../hooks/prd/usePRDProject';
import PRDTopbar from '../PRDTopbar';

import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { cn } from '../../../lib/utils';

// =============================================================================
// CONSTANTS
// =============================================================================

const STUDIO_TEAL = '#00C7BE';

const PIPELINE_STEPS = [
  { id: 'upload', label: 'Upload', status: 'done' as const },
  { id: 'brief', label: 'Brief', status: 'done' as const },
  { id: 'prd', label: 'PRD', status: 'done' as const },
  { id: 'epics', label: 'Épicos', status: 'done' as const },
  { id: 'stories', label: 'Stories', status: 'done' as const },
  { id: 'export', label: 'Export', status: 'active' as const },
];

type ExportFormat = 'lovable' | 'cursor' | 'claude' | 'generic';

const EXPORT_FORMATS: Record<
  ExportFormat,
  { title: string; icon: string; desc: string; badge: string }
> = {
  lovable: {
    title: 'Lovable / GPT Engineer',
    icon: 'magic-wand',
    desc: 'Otimizado para Knowledge Base + Prompt Inicial.',
    badge: 'Recomendado',
  },
  cursor: {
    title: 'Cursor (.cursorrules)',
    icon: 'terminal',
    desc: 'Regras de projeto e contexto para o editor.',
    badge: '.cursorrules',
  },
  claude: {
    title: 'Claude Code (CLI)',
    icon: 'cpu',
    desc: 'Markdown estruturado para CLAUDE.md.',
    badge: 'CLAUDE.md',
  },
  generic: {
    title: 'Documentação Padrão',
    icon: 'document-text',
    desc: 'PRD completo em Markdown para qualquer uso.',
    badge: '.md',
  },
};

// =============================================================================
// TYPES
// =============================================================================

interface PRDExportTemplateProps {
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

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const PRDExportTemplate: React.FC<PRDExportTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { project, loading, advancePhase } = usePRDProject(slug || '');

  // Local state
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('lovable');
  const [copied, setCopied] = useState(false);

  // Generate export content based on format
  const generateContent = useCallback(() => {
    if (!project) return '';

    const brief = project.project_metadata?.brief;
    const epics = project.project_metadata?.epics || [];
    const stories = project.project_metadata?.stories || [];

    const epicsText = epics
      .map(
        (e, i) =>
          `### Épico ${i + 1}: ${e.title}\n${e.description}\n${(e.stories || []).map((s) => `- ${s}`).join('\n')}`
      )
      .join('\n\n');

    const storiesText = stories
      .map((s) => `- **${s.title}** (${s.complexity}): ${s.userStory}`)
      .join('\n');

    if (selectedFormat === 'lovable') {
      return `[KNOWLEDGE BASE]
# Project Context
${project.name}

## Problem
${brief?.superProblem || brief?.structure?.problem || 'Not defined'}

## Solution
${brief?.solution || brief?.structure?.solution || 'Not defined'}

## Tech Stack
- Frontend: React + Vite + Tailwind
- Backend: Supabase
- Auth: Supabase Auth

## Epics
${epicsText}

---

[INITIAL PROMPT]
I want to build the "${project.name}" project.
Use the context provided in the knowledge base.

Start by implementing Epic 1.
Please allow me to review the structure before generating code.`;
    }

    if (selectedFormat === 'cursor') {
      return `# Cursor Rules - ${project.name}

## Project Context
${brief?.superProblem || 'Project description'}

## Style Guide
- Use modern React patterns (hooks, functional components)
- Use Tailwind CSS for styling
- Follow shadcn/ui component patterns
- Primary color: Teal (#00C7BE)

## Architecture
- Use Supabase for backend/auth
- RLS enabled on all tables
- TypeScript strict mode

## Workflow
- Always state which Epic/Story you're working on
- Ask before deleting files
- Run tests before committing

## Epics Overview
${epicsText}`;
    }

    if (selectedFormat === 'claude') {
      return `# CLAUDE.md - ${project.name}

## Commands
- Run dev: \`npm run dev\`
- Build: \`npm run build\`
- Test: \`npm test\`

## Project Structure
- /src/components: UI components
- /src/lib: Utilities
- /src/hooks: Custom hooks
- /src/types: TypeScript types

## Current Focus
${epics[0]?.title || 'Initial setup'}

## Context
### Problem
${brief?.superProblem || brief?.structure?.problem || 'Not defined'}

### Solution
${brief?.solution || brief?.structure?.solution || 'Not defined'}

## Stories
${storiesText}`;
    }

    // Generic markdown
    return `# PRD: ${project.name}

## 1. Visão Geral
${brief?.superProblem || brief?.structure?.problem || 'Not defined'}

## 2. Solução Proposta
${brief?.solution || brief?.structure?.solution || 'Not defined'}

## 3. Escopo
### Incluso
${brief?.scopeIn?.join('\n- ') || 'Not defined'}

### Excluso
${brief?.scopeOut?.map((s) => s.item).join('\n- ') || 'Not defined'}

## 4. Épicos
${epicsText}

## 5. User Stories
${storiesText}

---
Gerado pelo PRD Studio em ${new Date().toLocaleDateString('pt-BR')}`;
  }, [project, selectedFormat]);

  const content = useMemo(() => generateContent(), [generateContent]);

  // Copy to clipboard
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [content]);

  // Download file
  const handleDownload = useCallback(() => {
    const ext = selectedFormat === 'cursor' ? 'cursorrules' : 'md';
    const filename =
      selectedFormat === 'claude'
        ? 'CLAUDE.md'
        : selectedFormat === 'cursor'
          ? '.cursorrules'
          : `prd-${project?.slug || 'export'}.md`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [content, selectedFormat, project?.slug]);

  // Download all as ZIP (mock)
  const handleDownloadAll = useCallback(() => {
    // TODO: Implement ZIP generation
    alert('ZIP download coming soon!');
  }, []);

  // Mark as complete
  const handleComplete = useCallback(async () => {
    await advancePhase();
    navigate('/prd');
  }, [advancePhase, navigate]);

  // Loading state
  if (loading) {
    return <LoadingState setSection={setSection} />;
  }

  // Stats
  const epicsCount = project?.project_metadata?.epics?.length || 0;
  const storiesCount = project?.project_metadata?.stories?.length || 0;

  return (
    <div className="flex min-h-screen animate-fade-in flex-col bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container py-4">
          {/* Breadcrumbs + Badge */}
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
                onClick={() => navigate(`/prd/${slug}/stories`)}
              >
                Stories
              </span>
              <Icon name="angle-small-right" size="size-3" />
              <span className="font-medium text-foreground">Exportação</span>
            </div>
            <Badge
              variant="outline"
              className="w-fit border-green-500/20 bg-green-500/10 text-green-500"
            >
              <Icon name="check-circle" className="mr-1 size-3" />
              Projeto Pronto
            </Badge>
          </div>

          {/* Pipeline Stepper */}
          <PipelineStepper />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl flex-1 py-8">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Seu Kit de Execução está pronto</h1>
          <p className="font-serif text-muted-foreground">
            Escolha sua ferramenta de IA preferida e copie o prompt otimizado.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold" style={{ color: STUDIO_TEAL }}>
              {epicsCount}
            </div>
            <div className="text-sm text-muted-foreground">Épicos</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold" style={{ color: STUDIO_TEAL }}>
              {storiesCount}
            </div>
            <div className="text-sm text-muted-foreground">Stories</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold" style={{ color: STUDIO_TEAL }}>
              100%
            </div>
            <div className="text-sm text-muted-foreground">Completo</div>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Format Selector */}
          <div className="space-y-4 lg:col-span-4">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Destino
            </h3>

            {(Object.keys(EXPORT_FORMATS) as ExportFormat[]).map((key) => {
              const format = EXPORT_FORMATS[key];
              const isSelected = selectedFormat === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedFormat(key)}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all',
                    isSelected
                      ? 'bg-[var(--studio-teal)]/5 border-[var(--studio-teal)] shadow-md'
                      : 'border-border hover:border-muted-foreground/50'
                  )}
                  style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                >
                  <div
                    className={cn(
                      'flex size-10 items-center justify-center rounded-lg',
                      isSelected ? 'bg-[var(--studio-teal)] text-white' : 'bg-muted'
                    )}
                    style={isSelected ? { backgroundColor: STUDIO_TEAL } : {}}
                  >
                    <Icon name={format.icon} size="size-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">{format.title}</h4>
                      {key === 'lovable' && (
                        <Badge className="text-[10px]" style={{ backgroundColor: STUDIO_TEAL }}>
                          {format.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{format.desc}</p>
                  </div>
                </button>
              );
            })}

            <Button
              variant="outline"
              className="mt-4 h-12 w-full gap-2 border-dashed"
              onClick={handleDownloadAll}
            >
              <Icon name="download" size="size-4" />
              Baixar Tudo (.zip)
            </Button>
          </div>

          {/* Right: Code Preview */}
          <div className="lg:col-span-8">
            <Card className="flex h-full flex-col overflow-hidden shadow-lg">
              <div className="flex items-center justify-between border-b border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2">
                  <Icon name="code" className="text-muted-foreground" size="size-4" />
                  <span className="font-mono text-sm font-bold">prompt_output.md</span>
                </div>
                <Button
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2 text-white"
                  style={{ backgroundColor: STUDIO_TEAL }}
                >
                  <Icon name={copied ? 'check' : 'copy'} size="size-3" />
                  {copied ? 'Copiado!' : 'Copiar Prompt'}
                </Button>
              </div>

              <ScrollArea className="flex-1 bg-zinc-900">
                <pre className="p-6 font-mono text-sm leading-relaxed text-zinc-300">{content}</pre>
              </ScrollArea>

              <div className="border-t border-border bg-muted/10 p-3 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-muted-foreground"
                  onClick={handleDownload}
                >
                  <Icon name="download" size="size-3" className="mr-2" />
                  Baixar como arquivo
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            onClick={handleComplete}
            className="px-12 text-white shadow-lg"
            style={{ backgroundColor: STUDIO_TEAL }}
          >
            <Icon name="check-circle" className="mr-2 size-5" />
            Marcar como Concluído
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Seu projeto ficará salvo no dashboard para referência futura.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border p-6 text-center">
        <Button variant="ghost" onClick={() => navigate('/prd')}>
          <Icon name="arrow-left" className="mr-2 size-4" />
          Voltar ao Dashboard
        </Button>
      </footer>
    </div>
  );
};

export default PRDExportTemplate;
