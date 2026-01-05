import type { Persona } from '@/hooks/useAudienceProfiles';

// =============================================================================
// VIEW TYPES
// =============================================================================

export type PersonasView = 'dashboard' | 'analytics' | 'create' | 'detail';

// =============================================================================
// PERSONA SELECTION
// =============================================================================

export interface SelectedPersona {
  id: string;
  name: string;
  color: string;
}

export interface PersonaColorInfo {
  bg: string;
  bgLight: string;
  border: string;
  text: string;
}

// =============================================================================
// MATRIX & ANALYTICS
// =============================================================================

export interface MatrixCell {
  value: string;
  highlight?: 'green' | 'red' | null;
  icon?: string;
  iconColor?: string;
  isQuote?: boolean;
}

export interface MatrixRow {
  metric: string;
  values: MatrixCell[];
}

export interface LtvData {
  name: string;
  value: number;
  color: string;
}

export interface ChannelEngagementSegment {
  name: string;
  value: number;
  colorInfo: PersonaColorInfo;
}

export interface ConsciousnessData {
  name: string;
  level: string;
  distribution: {
    unaware: number;
    problem: number;
    solution: number;
    product: number;
  };
}

export interface JourneyStep {
  step: number;
  label: string;
  final?: boolean;
}

export interface JourneyData {
  name: string;
  type: string;
  cycle: string;
  color: PersonaColorInfo;
  steps: JourneyStep[];
}

export interface AnalyticsData {
  ltv: LtvData[];
  channelEngagement: {
    email: ChannelEngagementSegment[];
    social: ChannelEngagementSegment[];
    blog: ChannelEngagementSegment[];
  };
  consciousness: ConsciousnessData[];
  journeys: JourneyData[];
  matrix: MatrixRow[];
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface PersonasAnalyticsProps {
  onViewChange: (view: PersonasView) => void;
  personas: Persona[];
}

export interface PersonasAnalyticsHeaderProps {
  onBack: () => void;
}

export interface PersonaSelectorProps {
  selectedPersonas: SelectedPersona[];
  personas: Persona[];
  showSelector: boolean;
  onToggleSelector: () => void;
  onRemovePersona: (id: string) => void;
  onTogglePersona: (persona: Persona) => void;
  getPersonaColor: (index: number) => PersonaColorInfo;
}

export interface PeriodFilterProps {
  period: string;
  onPeriodChange: (period: string) => void;
}

export interface LtvChartProps {
  data: LtvData[];
  maxLtv: number;
  getPersonaColor: (index: number) => PersonaColorInfo;
}

export interface ChannelBarProps {
  icon: string;
  label: string;
  benchmark: string;
  segments: ChannelEngagementSegment[];
}

export interface EngagementChartProps {
  channelEngagement: {
    email: ChannelEngagementSegment[];
    social: ChannelEngagementSegment[];
    blog: ChannelEngagementSegment[];
  };
  getPersonaColor: (index: number) => PersonaColorInfo;
}

export interface ConsciousnessChartProps {
  data: ConsciousnessData[];
}

export interface JourneyCardProps {
  journey: JourneyData;
}

export interface JourneysChartProps {
  journeys: JourneyData[];
}

export interface ComparisonMatrixProps {
  matrix: MatrixRow[];
  selectedPersonaData: Array<{
    id: string;
    name: string;
    color: string;
    data: Persona | undefined;
    colorInfo: PersonaColorInfo;
  }>;
}
