import type { OpsStats } from '@/hooks/useOpsStats';

// =============================================================================
// Component Props
// =============================================================================

export interface GapsSectionProps {
  stats?: OpsStats;
  loading?: boolean;
}

// =============================================================================
// Re-export external types
// =============================================================================

export type {
  GapRecord,
  GapImpactRecord,
  RoadmapStep,
  QuickWin,
  ProposedTable,
} from '../data/tables';

export type { OpsStats };
