import type {
  MindFragment,
  MindFragmentsResult,
  FragmentUpdate,
  FragmentCreate,
} from '../../../hooks/useMindFragments';

// Re-export base types from hook
export type { MindFragment, MindFragmentsResult, FragmentUpdate, FragmentCreate };

// ============================================================================
// Props Types
// ============================================================================

export interface FragmentsTabProps {
  fragmentsData: MindFragmentsResult | null;
  loading: boolean;
  mindId: string;
  onUpdateFragment: (id: string, updates: FragmentUpdate) => Promise<boolean>;
  onDeleteFragment: (id: string) => Promise<boolean>;
  onDeleteFragmentsByContentId: (contentId: string) => Promise<{ success: boolean; count: number }>;
  onCreateFragment: (data: FragmentCreate) => Promise<MindFragment | null>;
}

// ============================================================================
// Internal Types
// ============================================================================

export interface ContentGroup {
  contentId: string;
  contentTitle: string;
  fragmentCount: number;
}

export type RelevanceFilter = 'all' | 'high' | 'medium' | 'low';

// ============================================================================
// Hook Return Types
// ============================================================================

export interface UseFragmentsStateReturn {
  // Selection
  selectedFragment: MindFragment | null;
  setSelectedFragment: (f: MindFragment | null) => void;
  // Expansion
  expandedContents: Set<string>;
  toggleContent: (contentId: string) => void;
  setExpandedContents: React.Dispatch<React.SetStateAction<Set<string>>>;
  // Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterType: string | null;
  setFilterType: (t: string | null) => void;
  filterRelevance: RelevanceFilter;
  setFilterRelevance: (r: RelevanceFilter) => void;
  // Derived data
  filteredFragments: MindFragment[];
  groupedByContent: Record<string, MindFragment[]>;
  sortedContentIds: string[];
  getContentTitle: (contentId: string) => string;
}

export interface UseFragmentDialogsReturn {
  // Single delete
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  fragmentToDelete: MindFragment | null;
  handleDeleteRequest: (id: string) => void;
  handleDeleteConfirm: (id: string) => Promise<boolean>;
  // Bulk delete
  bulkDeleteDialogOpen: boolean;
  setBulkDeleteDialogOpen: (open: boolean) => void;
  contentToDelete: ContentGroup | null;
  handleBulkDeleteRequest: (contentId: string) => void;
  handleBulkDeleteConfirm: (contentId: string) => Promise<{ success: boolean; count: number }>;
  // Create
  createSheetOpen: boolean;
  setCreateSheetOpen: (open: boolean) => void;
}

// ============================================================================
// Granular Hook Return Types (for individual hooks)
// ============================================================================

export interface UseFragmentsFiltersReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: string | null;
  setFilterType: (type: string | null) => void;
  filterRelevance: RelevanceFilter;
  setFilterRelevance: (relevance: RelevanceFilter) => void;
  clearFilters: () => void;
  filteredFragments: MindFragment[];
}

export interface UseFragmentSelectionReturn {
  selectedFragment: MindFragment | null;
  expandedContents: Set<string>;
  select: (fragment: MindFragment) => void;
  clear: () => void;
  toggleContent: (contentId: string) => void;
  expandContent: (contentId: string) => void;
  initializeExpanded: (contentIds: string[]) => void;
}

export interface UseDeleteDialogReturn {
  isOpen: boolean;
  fragment: MindFragment | null;
  open: (fragment: MindFragment) => void;
  close: () => void;
  confirm: (id: string) => Promise<boolean>;
}

export interface UseBulkDeleteDialogReturn {
  isOpen: boolean;
  contentGroup: ContentGroup | null;
  open: (contentGroup: ContentGroup) => void;
  close: () => void;
  confirm: (contentId: string) => Promise<{ success: boolean; count: number }>;
}

export interface UseCreateSheetReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}
