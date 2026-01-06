import type { Section } from '@/types';
import type { ReadingStatus } from '@/hooks/useMyBooks';
import type { BookData } from '@/hooks/useBooks';
import type { Chapter } from '@/lib/reading-utils';
import type { ReadingMode, ThemeStyle } from '../reader';

// Re-export types from their sources for convenience
export type { BookData, ReadingStatus, Chapter, ReadingMode, ThemeStyle };

// ============================================================================
// Component Props
// ============================================================================

export interface BookReaderTemplateProps {
  setSection: (section: Section) => void;
  setSidebarCollapsed?: (collapsed: boolean) => void;
  setSidebarHidden?: (hidden: boolean) => void;
}

export interface ReaderContentAreaProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  articleRef: React.RefObject<HTMLDivElement | null>;
  book: BookData;
  readingMode: ReadingMode;
  currentMode: ThemeStyle;
  fontSize: number;
  isFocusMode: boolean;
  showFullContent: boolean;
  canHighlight: boolean;
  displayContent: string | null;
  tldrSummary: string | null;
  readingTime: { minutes: number; words: number };
  bookSlug: string;
  interactions: BookInteractions | null;
  interactionsLoading: boolean;
  isMarkingRead: boolean;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onHighlight: (text: string, note?: string) => Promise<string | null>;
  onCopy: (text: string) => void;
  onNavigateToLogin: () => void;
  onNavigateToDetails: () => void;
  onMarkAsRead: () => void;
  // Edit mode
  isEditMode: boolean;
  onUpdateContent: (value: string) => void;
}

export interface ChapterSplashProps {
  book: BookData;
  readingTime: { minutes: number; words: number };
  readingMode: ReadingMode;
  currentMode: ThemeStyle;
  isFocusMode: boolean;
}

export interface TldrBoxProps {
  summary: string;
  readingMode: ReadingMode;
  currentMode: ThemeStyle;
}

export interface ReaderArticleProps {
  articleRef: React.RefObject<HTMLDivElement | null>;
  displayContent: string | null;
  showFullContent: boolean;
  canHighlight: boolean;
  book: BookData;
  bookSlug: string;
  fontSize: number;
  currentMode: ThemeStyle;
  onHighlight: (text: string, note?: string) => Promise<string | null>;
  onCopy: (text: string) => void;
  onNavigateToLogin: () => void;
  onNavigateToDetails: () => void;
  // Edit mode
  isEditMode: boolean;
  onUpdateContent: (value: string) => void;
}

export interface NavigationFooterProps {
  bookSlug: string;
  interactions: BookInteractions | null;
  interactionsLoading: boolean;
  isMarkingRead: boolean;
  onNavigateToDetails: () => void;
  onMarkAsRead: () => void;
}

export interface ProgressOverlayProps {
  scrollProgress: number;
  showFullContent: boolean;
  readingMode: ReadingMode;
  currentMode: ThemeStyle;
}

export interface ReaderErrorViewProps {
  message: string;
  onNavigateBack: () => void;
}

// ============================================================================
// Data Types
// ============================================================================

export interface BookInteractions {
  isFavorite: boolean;
  readingStatus: 'none' | 'want_to_read' | 'reading' | 'read';
}

// ============================================================================
// Hook Return Types
// ============================================================================

export interface UseBookReaderReturn {
  // Params
  bookSlug: string;

  // Data
  book: BookData | null;
  loading: boolean;
  error: Error | null;

  // Auth
  isAuthenticated: boolean;
  authLoading: boolean;
  showFullContent: boolean;

  // Interactions
  interactions: BookInteractions | null;
  interactionsLoading: boolean;
  isTogglingFavorite: boolean;
  isMarkingRead: boolean;

  // Highlights
  canHighlight: boolean;

  // Content
  displayContent: string | null;
  chapters: Chapter[];
  keyQuotes: string[];
  readingTime: { minutes: number; words: number };
  tldrSummary: string | null;
  fallbackGradient: string;

  // Handlers
  handleHighlight: (text: string, note?: string) => Promise<string | null>;
  handleCopy: (text: string) => void;
  handleToggleFavorite: () => Promise<void>;
  handleMarkAsRead: () => Promise<void>;
  setReadingStatus: (status: ReadingStatus) => Promise<void>;

  // Navigation
  navigateToDetails: () => void;
  navigateToLibrary: () => void;
  navigateToLogin: () => void;
  navigateToRating: () => void;
  navigateToCategory: (slug: string) => void;

  // Edit mode
  canEdit: boolean;
  isEditMode: boolean;
  isSaving: boolean;
  saveSuccess: boolean;
  toggleEditMode: () => void;
  updateContent: (value: string) => void;
}

export interface UseReaderUIReturn {
  // Refs
  contentRef: React.RefObject<HTMLDivElement | null>;
  articleRef: React.RefObject<HTMLDivElement | null>;

  // Reading mode
  readingMode: ReadingMode;
  setReadingMode: (mode: ReadingMode) => void;
  currentMode: ThemeStyle;

  // Font size
  fontSize: number;
  setFontSize: (size: number) => void;

  // Scroll
  scrollProgress: number;
  isFocusMode: boolean;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  scrollToChapter: (slug: string) => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Responsive
  isDesktop: boolean;
}
