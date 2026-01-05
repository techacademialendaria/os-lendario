import type { FragmentCreate, MindFragment } from '../../../hooks/useMindFragments';

// Re-export types from useMindFragments
export type { FragmentCreate, MindFragment };

// ============================================================================
// Props Types
// ============================================================================

export interface FragmentCreateSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mindId: string;
  onCreate: (data: FragmentCreate) => Promise<MindFragment | null>;
}

// ============================================================================
// Form Types
// ============================================================================

export interface FragmentFormValues {
  type: string;
  content: string;
  context: string;
  insight: string;
  location: string;
  relevance: number;
  confidence: number;
  tags: string[];
}

// ============================================================================
// Hook Return Types
// ============================================================================

export interface UseFragmentCreateFormReturn {
  // Form values
  type: string;
  setType: (type: string) => void;
  content: string;
  setContent: (content: string) => void;
  context: string;
  setContext: (context: string) => void;
  insight: string;
  setInsight: (insight: string) => void;
  location: string;
  setLocation: (location: string) => void;
  relevance: number;
  setRelevance: (relevance: number) => void;
  confidence: number;
  setConfidence: (confidence: number) => void;
  // UI state
  isCreating: boolean;
  error: string | null;
  // Actions
  reset: () => void;
  setError: (error: string | null) => void;
  setIsCreating: (creating: boolean) => void;
  // Validation
  validate: () => boolean;
}

export interface UseTagsInputReturn {
  tags: string[];
  newTag: string;
  setNewTag: (tag: string) => void;
  addTag: () => void;
  removeTag: (tag: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  reset: () => void;
}
