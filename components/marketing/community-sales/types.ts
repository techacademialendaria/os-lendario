// ============================================================================
// CommunitySales Types
// ============================================================================

export interface Module {
  icon: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
  sublabel: string;
}

export interface AuthorityMetric {
  value: string;
  label: string;
}
