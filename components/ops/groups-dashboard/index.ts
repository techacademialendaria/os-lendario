// Main component
export { GroupsDashboard, GroupsDashboard as default } from './GroupsDashboard';

// Types
export type {
  GroupsDashboardProps,
  ChartDataPoint,
  SentimentDataPoint,
  ParticipantsDataPoint,
  ParticipantStats,
  ComplaintRecord,
  SentimentRecord,
} from './types';
export { SENTIMENT_COLORS, SENTIMENT_FILTER_OPTIONS } from './types';

// Hooks
export { useGroupsDashboardData } from './hooks';

// Molecules (reusable charts)
export { SentimentChart, ParticipantsChart, SentimentBadge } from './molecules';

// Organisms
export {
  DashboardHeader,
  SentimentCard,
  TopParticipantsCard,
  SentimentEvolutionCard,
  ParticipantsEvolutionCard,
  ComplaintsSection,
  DailyRecordsSection,
  LoadingState,
} from './organisms';
