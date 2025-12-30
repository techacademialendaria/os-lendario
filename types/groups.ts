/**
 * Types for WhatsApp Groups Dashboard
 * Source: Dashboard de Grupos - Academia Lendária
 */

/**
 * Raw record from Supabase table `resumo_de_grupo`
 */
export interface GroupRecord {
  id: number;
  grupo: string;
  data_resumo: string;
  Participantes?: string;
  participantes_do_dia?: string;
  Sentimento: string;
  Resumo: string;
  'Insights futuros'?: string;
  'reclamacao/queixas'?: string;
}

/**
 * Processed summary for a group (latest state)
 */
export interface GroupSummary {
  grupo: string;
  lastSentiment: string;
  lastSummary: string;
  memberCount: number;
  lastActivityDate: string;
  hasComplaints: boolean;
}

/**
 * Chat message for AI assistant
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Sentiment type values
 */
export type SentimentType = 'Positivo' | 'Negativo' | 'Neutro' | 'Misto';

/**
 * Aggregated sentiment statistics
 */
export interface SentimentStats {
  positivo: number;
  negativo: number;
  neutro: number;
  misto: number;
  total: number;
}

/**
 * General statistics for overview
 */
export interface GeneralStats {
  totalRecords: number;
  totalGroups: number;
  uniqueMembers: number;
  sentimentDistribution: SentimentStats;
}

/**
 * Member ranking entry
 */
export interface MemberRanking {
  name: string;
  participationCount: number;
  groupsCount: number;
}

/**
 * Group health score
 */
export interface GroupHealthScore {
  grupo: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  mixedCount: number;
}

/**
 * Complaint entry
 */
export interface ComplaintEntry {
  date: string;
  grupo: string;
  complaint: string;
  sentiment: string;
}

/**
 * Hub comparison data
 */
export interface HubComparison {
  hub: string;
  groups: string[];
  averageScore: number;
  sentimentDistribution: SentimentStats;
}

/**
 * Sentiment trend data point
 */
export interface SentimentTrendPoint {
  week: string;
  positivo: number;
  negativo: number;
  neutro: number;
  misto: number;
}

/**
 * Chat request to Edge Function
 */
export interface ChatRequest {
  grupo: string;
  query: string;
  history: ChatMessage[];
}

/**
 * Chat response from Edge Function
 */
export interface ChatResponse {
  answer: string;
  sources?: string[];
  error?: string;
}

/**
 * View mode for GroupsSection
 */
export type GroupsViewMode = 'overview' | 'detail' | 'reports';

/**
 * Reports tab type
 */
export type ReportsTab = 'overview' | 'members' | 'health' | 'hubs' | 'complaints';
