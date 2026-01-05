import type { BookData } from '@/hooks/useBooks';

// ============================================================================
// Domain Types
// ============================================================================

export interface Chapter {
  id: number;
  title: string;
  slug: string;
  level: number;
}

export interface BookInteractions {
  isFavorite: boolean;
  readingStatus: 'none' | 'want_to_read' | 'reading' | 'read';
}

export type ReadingStatus = 'none' | 'want_to_read' | 'reading' | 'read';

// ============================================================================
// Component Props Types
// ============================================================================

export interface ReaderSidebarProps {
  isOpen: boolean;
  isDesktop: boolean;
  book: BookData;
  chapters: Chapter[];
  keyQuotes: string[];
  activeTab: string;
  interactions: BookInteractions | null;
  interactionsLoading: boolean;
  isTogglingFavorite: boolean;
  isMarkingRead: boolean;
  fallbackGradient: string;
  onClose: () => void;
  onTabChange: (tab: string) => void;
  onScrollToChapter: (slug: string) => void;
  onToggleFavorite: () => void;
  onMarkAsRead: () => void;
  onSetReadingStatus: (status: 'reading' | 'read') => void;
  onNavigateBack: () => void;
  onNavigateToCategory: (slug: string) => void;
}

// ============================================================================
// Organism Props Types
// ============================================================================

export interface SidebarHeaderProps {
  book: BookData;
  fallbackGradient: string;
  interactions: BookInteractions | null;
  interactionsLoading: boolean;
  isTogglingFavorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

export interface SidebarTabsProps {
  activeTab: string;
  chapters: Chapter[];
  keyQuotes: string[];
  book: BookData;
  interactions: BookInteractions | null;
  interactionsLoading: boolean;
  isMarkingRead: boolean;
  onTabChange: (tab: string) => void;
  onScrollToChapter: (slug: string) => void;
  onSetReadingStatus: (status: 'reading' | 'read') => void;
  onMarkAsRead: () => void;
  onNavigateToCategory: (slug: string) => void;
}

export interface ChaptersListProps {
  chapters: Chapter[];
  onScrollToChapter: (slug: string) => void;
}

export interface ReadingStatusCardProps {
  readingStatus: ReadingStatus;
  isMarkingRead: boolean;
  interactionsLoading: boolean;
  onSetReadingStatus: (status: 'reading' | 'read') => void;
  onMarkAsRead: () => void;
}

export interface QuotesSectionProps {
  quotes: string[];
  book: BookData;
}

export interface ActionPlanCardProps {
  // Currently no props needed, but defined for future extensibility
}

export interface TagsSectionProps {
  tags: { slug: string; name: string }[];
  onNavigateToCategory: (slug: string) => void;
}

export interface SidebarFooterProps {
  onNavigateBack: () => void;
}
