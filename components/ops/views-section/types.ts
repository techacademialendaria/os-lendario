// ============================================================================
// Views Section Types
// ============================================================================

export type ViewType = 'tools' | 'drivers' | 'mapping' | 'affinity' | 'minds' | 'contents';

export interface ViewData {
  minds: any[];
  contents: any[];
  fragments: any[];
  drivers: any[];
  driverRelationships: any[];
  tools: any[];
  toolAffinities: any[];
  mappingSystems: any[];
  inferenceBridges: any[];
  mentalModels: any[];
  toolStacks: any[];
  mindToolMappings: any[];
  assessmentProfiles: any[];
  systemConvergence: any[];
  jobExecutions: any[];
  processingQueue: any[];
}

export interface ViewsSectionProps {
  activeView?: ViewType;
  data?: ViewData;
  loading?: boolean;
}

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

// Default empty view data
export const EMPTY_VIEW_DATA: ViewData = {
  minds: [],
  contents: [],
  fragments: [],
  drivers: [],
  driverRelationships: [],
  tools: [],
  toolAffinities: [],
  mappingSystems: [],
  inferenceBridges: [],
  mentalModels: [],
  toolStacks: [],
  mindToolMappings: [],
  assessmentProfiles: [],
  systemConvergence: [],
  jobExecutions: [],
  processingQueue: [],
};
