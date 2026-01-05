// Export Content Hook
// Generates export content based on format and project data

import { useCallback, useMemo } from 'react';
import type { PRDProject } from '@/types/prd';
import { ExportFormat, STUDIO_TEAL } from '../types';

interface UseExportContentProps {
  project: PRDProject;
  selectedFormat: ExportFormat;
}

export function useExportContent({ project, selectedFormat }: UseExportContentProps) {
  const generateContent = useCallback(() => {
    const brief = project.project_metadata?.brief;
    const epics = project.project_metadata?.epics || [];
    const stories = project.project_metadata?.stories || [];

    const epicsText = epics
      .map(
        (e, i) =>
          `### Epico ${i + 1}: ${e.title}\n${e.description}\n${(e.stories || []).map((s) => `- ${s}`).join('\n')}`
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
- Primary color: Teal (${STUDIO_TEAL})

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

## 1. Visao Geral
${brief?.superProblem || brief?.structure?.problem || 'Not defined'}

## 2. Solucao Proposta
${brief?.solution || brief?.structure?.solution || 'Not defined'}

## 3. Escopo
### Incluso
${brief?.scopeIn?.join('\n- ') || 'Not defined'}

### Excluso
${brief?.scopeOut?.map((s) => s.item).join('\n- ') || 'Not defined'}

## 4. Epicos
${epicsText}

## 5. User Stories
${storiesText}

---
Gerado pelo PRD Studio em ${new Date().toLocaleDateString('pt-BR')}`;
  }, [project, selectedFormat]);

  const content = useMemo(() => generateContent(), [generateContent]);

  return { content };
}
