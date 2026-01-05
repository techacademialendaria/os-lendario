import { Section } from '@/types';
import { PRDStatus, PRDProject } from '@/types/prd';

// =============================================================================
// TEMPLATE PROPS
// =============================================================================

export interface PRDDashboardTemplateProps {
  setSection: (section: Section) => void;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface EmptyStateProps {
  onCreateClick: () => void;
}

export interface MetricsRowProps {
  totalProjects: number;
  projectsByStatus: Record<PRDStatus, number>;
}

export interface PipelineVisualProps {
  projectsByStatus: Record<PRDStatus, number>;
}

export interface ProjectCardProps {
  project: PRDProject;
  viewMode: ViewMode;
}

export type ViewMode = 'list' | 'grid';
export type FilterStatus = PRDStatus | 'all';

export interface FiltersBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (s: FilterStatus) => void;
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
}

export interface NoResultsProps {
  hasProjects: boolean;
}

// =============================================================================
// HOOK RETURN TYPES
// =============================================================================

export interface UseDashboardFiltersReturn {
  filterStatus: FilterStatus;
  setFilterStatus: (s: FilterStatus) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
  filteredProjects: PRDProject[];
}

// =============================================================================
// HELPERS
// =============================================================================

export interface MetricItem {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}
