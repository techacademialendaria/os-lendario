// ============================================================================
// BatchProgress Types
// ============================================================================

export interface PhaseOption {
  value: number;
  label: string;
}

export interface NewBook {
  title: string;
  author: string;
  slug: string;
}

export interface LogsBookInfo {
  slug: string;
  title: string;
}

export interface RemoveConfirmInfo {
  slug: string;
  title: string;
}

export interface BatchProgressPanelProps {
  className?: string;
}

// ============================================================================
// Phase Configuration
// ============================================================================

export const PHASE_OPTIONS: PhaseOption[] = [
  { value: 1, label: 'Research' },
  { value: 2, label: 'Enrichment' },
  { value: 3, label: 'Extraction' },
  { value: 4, label: 'Gap Analysis' },
  { value: 5, label: 'Curation' },
  { value: 6, label: 'Architecture' },
  { value: 7, label: 'Commentary' },
  { value: 8, label: 'Action Design' },
  { value: 9, label: 'Final Writer' },
  { value: 10, label: 'Quality Gate' },
  { value: 11, label: 'Premium Output' },
];

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos os Status' },
  { value: 'in_progress', label: 'Em Progresso' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'completed', label: 'Concluidos' },
  { value: 'failed', label: 'Falhas' },
];
