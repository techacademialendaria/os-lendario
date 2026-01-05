// Re-export Mind from CloneCardSelect
export type { Mind } from '../templates/CloneCardSelect';

// ============================================================================
// Config Types
// ============================================================================

export interface DebateConfig {
  clone1Id: string;
  clone2Id: string;
  topic: string;
  frameworkId: string;
}

export interface Framework {
  id: string;
  name: string;
  rounds: number;
  desc: string;
}

// ============================================================================
// Props Types
// ============================================================================

export interface ArenaCreateProps {
  minds: Mind[];
  frameworks: Framework[];
  onBack: () => void;
  onStart: (config: DebateConfig) => void;
}

// ============================================================================
// Hook Return Types
// ============================================================================

export interface UseArenaSelectionReturn {
  // Player selections
  selectedClone1: string | null;
  selectedClone2: string | null;
  selectClone1: (id: string) => void;
  selectClone2: (id: string) => void;
  // Image errors
  imgError1: boolean;
  imgError2: boolean;
  // Randomize
  isRandomizing: boolean;
  randomize: (minds: Mind[]) => void;
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export interface UseArenaConfigReturn {
  topic: string;
  setTopic: (topic: string) => void;
  framework: string;
  setFramework: (framework: string) => void;
}

// Import Mind type for the full interface
import type { Mind } from '../templates/CloneCardSelect';
