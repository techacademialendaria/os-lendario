// PRD Export Template Types
// Types and configurations for the Export phase

import type { PRDProject } from '@/types/prd';
import { PRD_TEAL } from '../prd-tokens';

// =============================================================================
// CONSTANTS
// =============================================================================

export const STUDIO_TEAL = PRD_TEAL;

export const PIPELINE_STEPS = [
  { id: 'upload', label: 'Upload', status: 'done' as const },
  { id: 'brief', label: 'Brief', status: 'done' as const },
  { id: 'prd', label: 'PRD', status: 'done' as const },
  { id: 'epics', label: 'Epicos', status: 'done' as const },
  { id: 'stories', label: 'Stories', status: 'done' as const },
  { id: 'export', label: 'Export', status: 'active' as const },
] as const;

export type ExportFormat = 'lovable' | 'cursor' | 'claude' | 'generic';

export interface ExportFormatConfig {
  title: string;
  icon: string;
  desc: string;
  badge: string;
}

export const EXPORT_FORMATS: Record<ExportFormat, ExportFormatConfig> = {
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
    title: 'Documentacao Padrao',
    icon: 'document-text',
    desc: 'PRD completo em Markdown para qualquer uso.',
    badge: '.md',
  },
};

// =============================================================================
// TYPES
// =============================================================================

export interface PRDExportTemplateProps {
  project: PRDProject;
}

export interface ExportUIState {
  selectedFormat: ExportFormat;
  copied: boolean;
}

export type PipelineStep = (typeof PIPELINE_STEPS)[number];
