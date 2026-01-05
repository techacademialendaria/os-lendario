import type { Section } from '@/types';
import type { ReadingStatus } from '@/hooks/useMyBooks';

// ============================================================================
// Component Props
// ============================================================================

export interface BookDetailTemplateProps {
  setSection: (s: Section) => void;
}

export interface BookCoverProps {
  book: {
    title: string;
    coverUrl?: string | null;
  } | null;
  loading: boolean;
  fallbackGradient: string;
}

export interface BookInfoProps {
  book: {
    title: string;
    author: string;
    authorSlug?: string | null;
    rating?: number | null;
  } | null;
  loading: boolean;
  onAuthorClick: () => void;
}

export interface BookDescriptionProps {
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export interface BookTagsProps {
  tags: Array<{ slug: string; name: string }>;
  isFavorite: boolean;
  isLoading: boolean;
  onTagClick: (slug: string) => void;
  onToggleFavorite: () => void;
}

export interface BookMetadataProps {
  pageCount?: number | null;
  publishedYear?: number | null;
  hasAudio?: boolean;
}

export interface BookActionsDesktopProps {
  bookSlug: string;
  currentStatus: ReadingStatus | 'none';
  isChangingStatus: boolean;
  interactionsLoading: boolean;
  book: {
    title?: string;
    author?: string;
  };
  onChangeStatus: (status: ReadingStatus) => void;
  onNavigateToReader: () => void;
}

export interface BookActionsMobileProps {
  bookSlug: string;
  currentStatus: ReadingStatus | 'none';
  isFavorite: boolean;
  isChangingStatus: boolean;
  isTogglingFavorite: boolean;
  interactionsLoading: boolean;
  onChangeStatus: (status: ReadingStatus) => void;
  onToggleFavorite: () => void;
  onNavigateToReader: () => void;
}

export interface AuthorSectionProps {
  book: {
    author: string;
    authorSlug?: string | null;
  };
  author: {
    name?: string;
    avatarUrl?: string | null;
    shortBio?: string | null;
    bookCount?: number;
  } | null;
  authorLoading: boolean;
  isAuthorBioExpanded: boolean;
  onToggleBio: () => void;
  onNavigateToAuthor: () => void;
}

export interface RelatedBooksProps {
  books: Array<{
    id: string;
    slug: string;
    title: string;
    author: string;
    coverUrl?: string | null;
  }>;
  onBookClick: (slug: string) => void;
}

// ============================================================================
// Data Types
// ============================================================================

export interface StatusConfig {
  label: string;
  icon: string;
  color: string;
}

export type StatusConfigMap = Record<ReadingStatus | 'none', StatusConfig>;
