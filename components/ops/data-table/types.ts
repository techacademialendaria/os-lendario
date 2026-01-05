// ============================================================================
// DataTable Types
// ============================================================================

export interface Column {
  key: string;
  header: string;
  width?: string;
  type?: 'text' | 'badge' | 'tags' | 'numeric' | 'progress' | 'custom';
  sortable?: boolean;
}

export interface StatConfig {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
}

export interface FilterConfig {
  label: string;
  key: string;
  options: { label: string; value: string }[];
}

export interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  searchPlaceholder?: string;
  searchField?: string;
  stats?: StatConfig[];
  filters?: FilterConfig[];
  onRowClick?: (row: Record<string, unknown>) => void;
  itemsPerPage?: number;
}

export type SortOrder = 'asc' | 'desc';
