/**
 * Views Data Types
 *
 * Comprehensive type definitions for the Views section of the OPS interface.
 * Includes types for all data entities, filters, columns, and UI states.
 */

import { Mind, Content, Framework } from './database';

// ============================================================================
// ENTITY TYPES
// ============================================================================

/**
 * Mind entity with operations-specific fields
 */
export interface MindView extends Mind {
  version?: number;
  status?: 'active' | 'archived' | 'processing' | 'draft';
  completion_percentage?: number;
}

/**
 * Content entity with operations-specific fields
 */
export interface ContentView extends Content {
  created_by?: string;
  word_count?: number;
  // Note: file_path is already defined in Content as string | null
}

/**
 * Driver entity (cognitive trait/behavioral characteristic)
 */
export interface Driver {
  id: string;
  slug: string;
  name: string;
  driver_type: 'trait' | 'behavioral' | 'cognitive';
  description?: string;
  short_description?: string;
  domain?: string;
  stability?: number;
  polarity?: 'high' | 'low';
  evidence_level?: 'A' | 'B' | 'C' | 'anecdotal' | 'unknown';
  assessment_systems?: string[];
  is_active?: boolean;
}

/**
 * Tool (mental model, framework, methodology, etc)
 */
export interface Tool {
  id: string;
  slug: string;
  name: string;
  tool_type: 'mental_model' | 'framework' | 'methodology' | 'heuristic' | 'principle' | 'worldview' | 'bias' | 'protocol' | 'checklist' | 'technique';
  description?: string;
  domain?: string;
  domains?: string[];
  axis_prescriptive?: number;
  evidence_level?: 'A' | 'B' | 'C' | 'anecdotal' | 'unknown';
  year_originated?: number;
  origin_author?: string;
  is_active?: boolean;
}

/**
 * Tool-Driver affinity relationship
 */
export interface ToolDriverAffinity {
  id: string;
  tool_id: string;
  driver_id: string;
  tool_name?: string;
  driver_name?: string;
  affinity_type?: string;
  strength?: number;
  rationale?: string;
  tools?: { id: string; name: string };
  drivers?: { id: string; name: string };
}

/**
 * Mapping system (psychometric, typological, etc)
 */
export interface MappingSystem {
  id: string;
  slug: string;
  name: string;
  system_type: 'psychometric' | 'typological' | 'dimensional' | 'behavioral' | 'cognitive';
  category: 'core' | 'complementary' | 'emerging' | 'legacy';
  structure_type: 'dimensional' | 'typological' | 'hierarchical' | 'trait-based';
  scientific_validity: 'high' | 'moderate' | 'low' | 'unknown';
  origin_author?: string;
  origin_year?: number;
  is_active?: boolean;
}

// ============================================================================
// VIEW TYPES
// ============================================================================

/**
 * Complete data structure returned from useViewsData hook
 */
export interface ViewsData {
  minds: MindView[];
  contents: ContentView[];
  fragments: any[];
  drivers: Driver[];
  driverRelationships: any[];
  tools: Tool[];
  toolAffinities: ToolDriverAffinity[];
  mappingSystems: MappingSystem[];
  inferenceBridges: any[];
  mentalModels: any[];
  toolStacks: any[];
  mindToolMappings: any[];
  assessmentProfiles: any[];
  systemConvergence: any[];
  jobExecutions: any[];
  processingQueue: any[];
  loading: boolean;
  error: Error | null;
}

// ============================================================================
// TABLE CONFIGURATION TYPES
// ============================================================================

/**
 * Column definition for data tables
 */
export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  type?: 'text' | 'numeric' | 'badge' | 'tags' | 'progress' | 'date';
  sortable?: boolean;
  render?: (value: any, row?: any) => React.ReactNode;
}

/**
 * Filter option for dropdown filters
 */
export interface FilterOption {
  label: string;
  value: string;
}

/**
 * Filter configuration for a single filter control
 */
export interface FilterConfig {
  label: string;
  key: string;
  type?: 'select' | 'multiselect' | 'checkbox';
  options: FilterOption[];
}

/**
 * Statistics card configuration
 */
export interface StatCard {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
  format?: 'number' | 'percentage' | 'count';
}

/**
 * Complete view configuration
 */
export interface ViewConfig {
  id: 'minds' | 'contents' | 'drivers' | 'tools' | 'mapping' | 'affinity';
  label: string;
  icon?: string;
  columns: TableColumn[];
  stats: StatCard[] | ((data: any) => StatCard[]);
  filters: FilterConfig[] | ((data: any) => FilterConfig[]);
  searchField: string;
  searchPlaceholder: string;
  itemsPerPage?: number;
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

/**
 * Table loading state
 */
export interface TableLoadingState {
  isLoading: boolean;
  skeletonRows?: number;
}

/**
 * Table empty state
 */
export interface TableEmptyState {
  isEmpty: boolean;
  message?: string;
  icon?: string;
}

/**
 * Table error state
 */
export interface TableErrorState {
  hasError: boolean;
  error?: Error | null;
  message?: string;
  retryable?: boolean;
}

/**
 * Complete table state
 */
export interface TableState extends TableLoadingState, TableEmptyState, TableErrorState {
  filteredCount?: number;
  totalCount?: number;
}

// ============================================================================
// PROPS TYPES
// ============================================================================

/**
 * Props for ViewsSection component
 */
export interface ViewsSectionProps {
  activeView?: 'tools' | 'drivers' | 'mapping' | 'affinity' | 'minds' | 'contents';
  data?: ViewsData;
  loading?: boolean;
  error?: Error | null;
  onViewChange?: (view: string) => void;
}

/**
 * Props for individual data table
 */
export interface DataTableProps<T = any> {
  columns: TableColumn[];
  data: T[];
  searchPlaceholder?: string;
  searchField?: string;
  stats?: StatCard[];
  filters?: FilterConfig[];
  itemsPerPage?: number;
  loading?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
  onRowClick?: (row: T) => void;
}

// ============================================================================
// HOOK RETURN TYPES
// ============================================================================

/**
 * Return type for useViewsData hook
 */
export interface UseViewsDataReturn {
  data: ViewsData;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  isLoading: boolean; // Alias for loading (consistency)
}

/**
 * Return type for useViewFilters hook
 */
export interface UseViewFiltersReturn {
  activeFilters: Record<string, string[]>;
  setFilter: (key: string, values: string[]) => void;
  clearFilters: () => void;
  applyFilters: <T>(data: T[], filters: FilterConfig[]) => T[];
}

/**
 * Return type for useTableSearch hook
 */
export interface UseTableSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: <T>(data: T[], field: string) => T[];
}

/**
 * Return type for useTableSort hook
 */
export interface UseTableSortReturn {
  sortKey?: string;
  sortDirection: 'asc' | 'desc';
  setSortKey: (key: string) => void;
  toggleSortDirection: () => void;
  sortData: <T>(data: T[], key: string) => T[];
}

/**
 * Return type for useTablePagination hook
 */
export interface UseTablePaginationReturn {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  getPaginatedData: <T>(data: T[]) => T[];
}
