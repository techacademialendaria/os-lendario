import { Section } from '../../../types';

// ============================================================================
// Props Types
// ============================================================================

export interface SalesSettingsTemplateProps {
  setSection: (s: Section) => void;
}

// ============================================================================
// Tab Type
// ============================================================================

export type SettingsTab =
  | 'integrations'
  | 'ai'
  | 'distribution'
  | 'team'
  | 'objections'
  | 'logs';

// ============================================================================
// Data Types
// ============================================================================

export interface Integration {
  name: string;
  status: 'connected' | 'error' | 'pending';
  lastSync: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  email: string;
  calls: number;
  active: boolean;
}

export interface LogEntry {
  time: string;
  type: 'info' | 'warning' | 'error';
  msg: string;
}

export interface ObjectionCategory {
  name: string;
  desc: string;
}

// ============================================================================
// Config Types
// ============================================================================

export const STATUS_COLORS: Record<string, string> = {
  connected: 'text-success border-success/20 bg-success/10',
  error: 'text-destructive border-destructive/20 bg-destructive/10',
  pending: 'text-muted-foreground border-border bg-muted/10',
};

export const LOG_COLORS: Record<string, string> = {
  info: 'text-blue-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
};
