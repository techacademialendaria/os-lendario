import { OpsTableStatus } from '../ops-tokens';
import type { OpsStats } from '@/hooks/useOpsStats';
import type { DbPolicy } from '@/hooks/useSchema';
import type { Section } from '@/types';

// =============================================================================
// Component Props
// =============================================================================

export interface OpsSchemaTemplateProps {
  setSection: (s: Section) => void;
}

// =============================================================================
// Data Types
// =============================================================================

export interface TableInfo {
  name: string;
  records: number | string;
  status: OpsTableStatus;
  description: string;
  fields?: number;
}

export interface ModuleStats {
  title: string;
  icon: string;
  description: string;
  tables: TableInfo[];
}

export interface CriticalGap {
  table: string;
  impact: string;
  solution: string;
  priority: 'P0' | 'P1';
}

export interface FieldGap {
  field: string;
  filled: number;
  missing: number;
  pct: number;
}

export interface EnumInfo {
  name: string;
  values: string[];
}

export interface CheckConstraint {
  table: string;
  field: string;
  values: string;
}

// =============================================================================
// Tab Configuration
// =============================================================================

export type SchemaTab = 'overview' | 'modules' | 'gaps' | 'policies' | 'enums';

export interface TabConfig {
  value: SchemaTab;
  label: string;
  icon: string;
}

export const SCHEMA_TABS: TabConfig[] = [
  { value: 'overview', label: 'Overview', icon: 'grid' },
  { value: 'modules', label: 'Modules', icon: 'layer-group' },
  { value: 'gaps', label: 'Gaps', icon: 'warning' },
  { value: 'policies', label: 'RLS Policies', icon: 'shield-check' },
  { value: 'enums', label: 'Enums & Views', icon: 'list' },
];

// =============================================================================
// Re-export hooks types
// =============================================================================

export type { OpsStats, DbPolicy };
