/**
 * Writing Styles Tab - Types & Interfaces
 *
 * Types for the WritingStylesTab component and its sub-components.
 */

// =============================================================================
// CORE TYPES
// =============================================================================

export type SidebarSection = 'overview' | 'semantics' | 'examples' | 'catchphrases' | 'prompts';

export type WriteChannel = 'twitter' | 'linkedin' | 'newsletter' | 'whatsapp';

// =============================================================================
// PROPS INTERFACES
// =============================================================================

export interface WritingStylesTabProps {
  // Using any to match original component's flexibility with mock data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any;
}

export interface WritingProfile {
  voiceDNA: VoiceDNA;
  psycholinguistics?: Psycholinguistics;
  rhetoricalArsenal?: RhetoricalDevice[];
  contextualMatrix?: ContextualItem[];
  systemPrompts?: SystemPrompt[];
  catchphrases?: Catchphrase[];
  semantics?: Semantics;
  behavioralOS?: BehavioralOS;
  linguistics?: Linguistics;
  writingSamples: Record<WriteChannel, WritingSample>;
}

// =============================================================================
// DATA STRUCTURES
// =============================================================================

export interface VoiceDNA {
  provocationActivity?: number;
  truthTemperature?: number;
  validationVsChallenge?: number;
  density?: number;
  keywords: string[];
}

export interface Psycholinguistics {
  traits: string[];
  archetype: string;
  rule?: string;
}

export interface BehavioralOS {
  archetype?: string;
  role?: string;
  traits: BehavioralTrait[];
}

export interface BehavioralTrait {
  name: string;
  desc: string;
  icon: string;
  value: string;
  color?: string;
}

export interface RhetoricalDevice {
  name: string;
  desc: string;
  example: string;
  frequency: string;
}

export interface ContextualItem {
  context: string;
  adaptation: string;
}

export interface SystemPrompt {
  title: string;
  desc: string;
  content: string;
}

export interface Catchphrase {
  text: string;
  tag: string;
  desc: string;
}

export interface Semantics {
  tier1?: SemanticTier;
  tier2?: SemanticTier;
  tier3?: SemanticTier;
}

export interface SemanticTier {
  label?: string;
  words?: string[];
}

export interface Linguistics {
  punctuation?: PunctuationItem[];
  antiPatterns?: string[];
}

export interface PunctuationItem {
  char: string;
  desc: string;
}

export interface WritingSample {
  content: string;
  framework: string;
  blueprint?: BlueprintPhase[];
  analysis: AnalysisItem[];
}

export interface BlueprintPhase {
  phase: string;
  desc: string;
}

export interface AnalysisItem {
  type: string;
  text: string;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface ToneBarProps {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
  color?: 'red' | 'studio-primary';
}

export interface SidebarNavigationProps {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
}

export interface OverviewSectionProps {
  // Using any to match original component's flexibility with mock data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any;
  onNavigateToSemantics: () => void;
}

export interface SemanticsSectionProps {
  semantics: Semantics;
  antiPatterns?: string[];
}

export interface ExamplesSectionProps {
  // Using any to match original component's flexibility with mock data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writingSamples: any;
  activeChannel: WriteChannel;
  onChannelChange: (channel: WriteChannel) => void;
}

export interface CatchphrasesSectionProps {
  catchphrases: Catchphrase[];
}

export interface PromptsSectionProps {
  prompts: SystemPrompt[];
}

// =============================================================================
// MENU ITEM CONFIG
// =============================================================================

export interface MenuItem {
  id: SidebarSection;
  label: string;
  icon: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 'overview', label: 'Visao Geral', icon: 'layout-grid' },
  { id: 'semantics', label: 'Campo Semantico', icon: 'book-alt' },
  { id: 'examples', label: 'Exemplos', icon: 'pencil' },
  { id: 'catchphrases', label: 'Catchphrases', icon: 'quote' },
  { id: 'prompts', label: 'Prompts', icon: 'terminal' },
];

export const WRITE_CHANNELS: WriteChannel[] = ['twitter', 'linkedin', 'newsletter', 'whatsapp'];
