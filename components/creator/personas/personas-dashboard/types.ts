// =============================================================================
// PERSONAS DASHBOARD TYPES
// =============================================================================

export type PersonasView = 'dashboard' | 'list' | 'create' | 'detail' | 'analytics' | 'pain-editor';

// =============================================================================
// STATS
// =============================================================================

export interface PersonasStats {
  total: number;
  active: number;
  drafts: number;
  withDisc: number;
  withEnneagram: number;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface PersonasDashboardProps {
  onViewChange: (view: PersonasView) => void;
  stats?: PersonasStats;
}

// =============================================================================
// SUB-COMPONENT PROPS
// =============================================================================

export interface TriggerItemProps {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  tagColors: TagColor[];
}

export type TagColor = 'indigo' | 'purple' | 'emerald';

export interface LegendItemProps {
  color: string;
  label: string;
  value: string;
}

export interface ValidationBarProps {
  icon: string;
  iconColor: string;
  label: string;
  value: number;
  barColor: string;
}

export interface InsightItemProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  highlighted?: boolean;
}

// =============================================================================
// DEFAULT VALUES
// =============================================================================

export const DEFAULT_STATS: PersonasStats = {
  total: 12,
  active: 8,
  drafts: 4,
  withDisc: 12,
  withEnneagram: 8,
};
