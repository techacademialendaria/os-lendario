// ============================================================================
// Groups Dashboard Types
// ============================================================================

import type { GroupRecord } from '../../../types/groups';

export interface GroupsDashboardProps {
  groupName: string;
  onBack: () => void;
}

// ============================================================================
// Chart Data Types
// ============================================================================

export interface ChartDataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface SentimentDataPoint {
  data: string;
  valor: number;
}

export interface ParticipantsDataPoint {
  data: string;
  total: number;
}

// ============================================================================
// Dashboard Data Types
// ============================================================================

export interface ParticipantStats {
  nome: string;
  participacoes: number;
}

export interface ComplaintRecord {
  data: string;
  texto: string;
  sentimento: string;
}

export interface SentimentRecord {
  data_resumo: string;
  Sentimento: string;
}

// ============================================================================
// Dashboard State
// ============================================================================

export interface GroupsDashboardState {
  datas: string[];
  dataSelecionada: string | null;
  registros: GroupRecord[];
  sentimentoAtual: string | null;
  ultimosTresSentimentos: SentimentRecord[];
  graficoData: SentimentDataPoint[];
  participantesAtivos: ParticipantStats[];
  evolucaoDiaria: ParticipantsDataPoint[];
  ultimasReclamacoes: ComplaintRecord[];
  loading: boolean;
}

export interface GroupsDashboardActions {
  loadGroupData: () => Promise<void>;
  handleDataSelect: (data: string) => Promise<void>;
}

// ============================================================================
// Component Props
// ============================================================================

export interface DashboardHeaderProps {
  groupName: string;
  dataSelecionada: string | null;
  datas: string[];
  registros: GroupRecord[];
  onDataSelect: (data: string) => void;
  onBack: () => void;
  onChatOpen: () => void;
}

export interface SentimentCardProps {
  sentimentoAtual: string | null;
  ultimosTresSentimentos: SentimentRecord[];
}

export interface TopParticipantsCardProps {
  participantes: ParticipantStats[];
}

export interface SentimentChartCardProps {
  data: SentimentDataPoint[];
}

export interface ParticipantsChartCardProps {
  data: ParticipantsDataPoint[];
}

export interface ComplaintsSectionProps {
  complaints: ComplaintRecord[];
}

export interface DailyRecordsSectionProps {
  registros: GroupRecord[];
  filtroSentimento: string;
  onFiltroChange: (filtro: string) => void;
}

export interface DailyRecordCardProps {
  record: GroupRecord;
  index: number;
}

// ============================================================================
// Utility Functions Types
// ============================================================================

export type SentimentType = 'positivo' | 'negativo' | 'neutro' | 'misto';

export const SENTIMENT_COLORS: Record<SentimentType | 'default', string> = {
  positivo: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  negativo: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  neutro: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  misto: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  default: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

export const SENTIMENT_FILTER_OPTIONS = [
  { label: 'Todos sentimentos', value: 'todos' },
  { label: 'Positivo', value: 'positivo' },
  { label: 'Negativo', value: 'negativo' },
  { label: 'Neutro', value: 'neutro' },
  { label: 'Misto', value: 'misto' },
];
