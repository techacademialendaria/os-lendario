// Main component
export { WritingStylesTab } from './WritingStylesTab';

// Types
export type {
  WritingStylesTabProps,
  WritingProfile,
  SidebarSection,
  WriteChannel,
  VoiceDNA,
  Psycholinguistics,
  BehavioralOS,
  BehavioralTrait,
  RhetoricalDevice,
  ContextualItem,
  SystemPrompt,
  Catchphrase,
  Semantics,
  SemanticTier,
  Linguistics,
  PunctuationItem,
  WritingSample,
  BlueprintPhase,
  AnalysisItem,
} from './types';

// Hooks (for advanced usage)
export { useWritingStylesState } from './hooks';

// Molecules (for reuse)
export { ToneBar } from './molecules';

// Organisms (for customization)
export {
  OverviewSection,
  SemanticsSection,
  ExamplesSection,
  CatchphrasesSection,
  PromptsSection,
  SidebarNavigation,
} from './organisms';
