import { Section } from '../../../types';

// ============================================================================
// Props Types
// ============================================================================

export interface SalesObjectionsTemplateProps {
  setSection: (s: Section) => void;
}

// ============================================================================
// Period Type
// ============================================================================

export type PeriodFilter = '7d' | '30d' | '90d' | 'custom';

// ============================================================================
// Data Types
// ============================================================================

export interface ObjectionRanking {
  name: string;
  count: number;
  trend: number[];
  color: string;
  stroke: string;
}

export interface MatrixRow {
  objection: string;
  values: number[];
}

export interface ObjectionAlert {
  objection: string;
  freq: number;
  growth: string;
}

// ============================================================================
// Component Props
// ============================================================================

export interface SparklineProps {
  data: number[];
  color?: string;
}
