/**
 * Book Editor Types
 * Type definitions for the Book Editor module
 */

import type { BookLanguage, AdminBook } from '@/hooks/useAdminBooks';
import type { BookFormState, VersionFormState, BookFormErrors } from '../admin/types';

// Re-export types from admin for convenience
export type { BookFormState, VersionFormState, BookFormErrors };

/**
 * Props for the main BookEditorView component
 */
export interface BookEditorViewProps {
  // Form state
  formState: BookFormState;
  formErrors: BookFormErrors;
  selectedBook: AdminBook | null;
  saving: boolean;

  // Language tab
  activeLangTab: BookLanguage;
  onActiveLangTabChange: (lang: BookLanguage) => void;

  // Editor preview
  editorPreview: boolean;
  onEditorPreviewChange: (preview: boolean) => void;

  // Author search
  authorResults: { id: string; name: string; avatarUrl?: string | null }[];
  authorSearchLoading: boolean;
  showAuthorDropdown: boolean;
  onAuthorSearch: (query: string) => void;
  onSelectAuthor: (author: { id: string; name: string }) => void;

  // Form updates
  onUpdateFormField: <K extends keyof BookFormState>(field: K, value: BookFormState[K]) => void;
  onUpdateVersionField: (lang: BookLanguage, field: keyof VersionFormState, value: string) => void;
  onUpdateMetadataField: <K extends keyof BookFormState['metadata']>(
    field: K,
    value: BookFormState['metadata'][K]
  ) => void;
  onClearFieldError: (field: keyof BookFormErrors) => void;
  setFormErrors: React.Dispatch<React.SetStateAction<BookFormErrors>>;

  // Category & Collection
  categoryOptions: { name: string; slug: string }[];
  collections: { name: string; slug: string }[];
  onToggleCategory: (slug: string) => void;
  onToggleCollection: (slug: string) => void;

  // Cover upload
  onCoverUpload: (file: File | null) => void;

  // Actions
  onSave: () => void;
  onDelete: (bookId: string, bookTitle: string) => void;
}

/**
 * Props for GeneralInfoCard organism
 */
export interface GeneralInfoCardProps {
  formState: BookFormState;
  formErrors: BookFormErrors;
  authorResults: { id: string; name: string; avatarUrl?: string | null }[];
  authorSearchLoading: boolean;
  showAuthorDropdown: boolean;
  onAuthorSearch: (query: string) => void;
  onSelectAuthor: (author: { id: string; name: string }) => void;
  onUpdateFormField: <K extends keyof BookFormState>(field: K, value: BookFormState[K]) => void;
  onClearFieldError: (field: keyof BookFormErrors) => void;
  categoryOptions: { name: string; slug: string }[];
  collections: { name: string; slug: string }[];
  onToggleCategory: (slug: string) => void;
  onToggleCollection: (slug: string) => void;
}

/**
 * Props for LanguageTabsSection organism
 */
export interface LanguageTabsSectionProps {
  formState: BookFormState;
  formErrors: BookFormErrors;
  selectedBook: AdminBook | null;
  activeLangTab: BookLanguage;
  onActiveLangTabChange: (lang: BookLanguage) => void;
  editorPreview: boolean;
  onEditorPreviewChange: (preview: boolean) => void;
  onUpdateVersionField: (lang: BookLanguage, field: keyof VersionFormState, value: string) => void;
  setFormErrors: React.Dispatch<React.SetStateAction<BookFormErrors>>;
}

/**
 * Props for CoverUploadCard organism
 */
export interface CoverUploadCardProps {
  coverUrl: string | null;
  onCoverUpload: (file: File | null) => void;
}

/**
 * Props for MetadataCard organism
 */
export interface MetadataCardProps {
  metadata: BookFormState['metadata'];
  onUpdateMetadataField: <K extends keyof BookFormState['metadata']>(
    field: K,
    value: BookFormState['metadata'][K]
  ) => void;
}

/**
 * Props for SettingsCard organism
 */
export interface SettingsCardProps {
  formState: BookFormState;
  selectedBook: AdminBook | null;
  onUpdateFormField: <K extends keyof BookFormState>(field: K, value: BookFormState[K]) => void;
  onUpdateMetadataField: <K extends keyof BookFormState['metadata']>(
    field: K,
    value: BookFormState['metadata'][K]
  ) => void;
  onDelete: (bookId: string, bookTitle: string) => void;
}

/**
 * Props for AuthorSearchDropdown molecule
 */
export interface AuthorSearchDropdownProps {
  authorName: string;
  authorResults: { id: string; name: string; avatarUrl?: string | null }[];
  authorSearchLoading: boolean;
  showAuthorDropdown: boolean;
  onAuthorSearch: (query: string) => void;
  onSelectAuthor: (author: { id: string; name: string }) => void;
}

/**
 * Props for TagSelector molecule
 */
export interface TagSelectorProps {
  label: string;
  selectedSlugs: string[];
  options: { name: string; slug: string }[];
  onToggle: (slug: string) => void;
  variant?: 'category' | 'collection';
  singleSelect?: boolean;
}

/**
 * Props for VersionContentEditor molecule
 */
export interface VersionContentEditorProps {
  lang: BookLanguage;
  version: VersionFormState | null;
  formErrors: BookFormErrors;
  editorPreview: boolean;
  onEditorPreviewChange: (preview: boolean) => void;
  onUpdateVersionField: (lang: BookLanguage, field: keyof VersionFormState, value: string) => void;
  setFormErrors: React.Dispatch<React.SetStateAction<BookFormErrors>>;
}
