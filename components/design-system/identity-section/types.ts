// Types for IdentitySection - FIVU Framework v2.0

export interface ToneSliderProps {
  left: string;
  right: string;
  value: number;
  description: string;
}

export interface Archetype {
  name: string;
  icon: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  badgeBorderClass: string;
  badgeBgClass: string;
  badgeTextClass: string;
  level: string;
  motivation: string;
  manifestation: string;
}

export interface LeaderAttribute {
  title: string;
  desc: string;
}

export interface TeamVirtue {
  title: string;
  icon: string;
}

export interface ProductiveTension {
  left: string;
  right: string;
}

export interface ToneRegister {
  icon: string;
  label: string;
  quote: string;
}

export interface VocabularyEntry {
  term: string;
  neverUse: string;
}

export interface MarketingCharacteristic {
  title: string;
  icon: string;
  desc: string;
}

export interface ValueAlignment {
  val: string;
  desc: string;
}

export interface PracticalApplication {
  icon: string;
  title: string;
  desc: string;
}

export interface VoiceDimension {
  left: string;
  right: string;
  value: number;
  description: string;
}
