import type { SocialIconName } from '@/components/ui/social-icon';

// ============================================================================
// Icon Section Types
// ============================================================================

/**
 * UI Icon categories organized by function
 */
export type UIIconCategories = Record<string, string[]>;

/**
 * Hook return type for icon search functionality
 */
export interface UseIconSearchReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCategories: UIIconCategories;
  hasResults: boolean;
  clearSearch: () => void;
}

/**
 * Props for IconoirLibraryView
 */
export interface IconoirLibraryViewProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCategories: UIIconCategories;
  hasResults: boolean;
  clearSearch: () => void;
}

/**
 * Props for SocialIconsView
 */
export interface SocialIconsViewProps {
  socialIcons: SocialIconName[];
}

/**
 * Symbol item for display
 */
export interface SymbolItem {
  name: 'infinity' | 'star' | 'diamond' | 'bullet';
  label: string;
  description: string;
}
