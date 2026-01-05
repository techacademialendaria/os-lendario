import type { Section } from '@/types';
import type { AdminBook, BookLanguage, SaveBookData } from '@/hooks/useAdminBooks';
import type { BookFormState, BookFormErrors, VersionFormState } from '../admin/types';

// ============================================================================
// Component Props
// ============================================================================

export interface BooksAdminTemplateProps {
  onBack?: () => void;
  setSection?: (s: Section) => void;
}

export interface AdminHeaderProps {
  view: 'list' | 'editor' | 'pipeline';
  selectedBook: AdminBook | null;
  saving: boolean;
  onBack?: () => void;
  onViewChange: (view: 'list' | 'editor' | 'pipeline') => void;
  onCreate: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: { id: string; title: string } | null;
  onConfirm: () => void;
}

// Re-export from admin/types for convenience
export type { BookFormState, BookFormErrors, VersionFormState } from '../admin/types';
export type { AdminBook, BookLanguage, SaveBookData } from '@/hooks/useAdminBooks';
