// GroupsReports Types and Interfaces

export interface GroupsReportsProps {
  onBack: () => void;
}

export interface SentimentPieDataItem {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

export interface GroupBarDataItem {
  name: string;
  score: number;
  positivo: number;
  negativo: number;
  [key: string]: string | number;
}

// Sentiment color constants
export const SENTIMENT_COLORS = {
  positivo: '#22c55e',
  misto: '#f59e0b',
  neutro: '#6b7280',
  negativo: '#ef4444',
} as const;

export const PIE_COLORS = ['#22c55e', '#f59e0b', '#6b7280', '#ef4444'];

// Tab value type
export type TabValue = 'overview' | 'members' | 'health' | 'hubs' | 'complaints';
