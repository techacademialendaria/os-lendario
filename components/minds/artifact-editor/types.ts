import { Section } from '../../../types';

// ============================================================================
// Props Types
// ============================================================================

export interface ArtifactEditorProps {
  setSection: (s: Section) => void;
}

// ============================================================================
// Form Types
// ============================================================================

export type ContentType = 'other';

export type SidebarTab = 'settings' | 'info';

export interface ArtifactFormValues {
  title: string;
  content: string;
  contentType: ContentType;
  category: string;
  isPublished: boolean;
}

// ============================================================================
// Hook Return Types
// ============================================================================

export interface UseArtifactFormReturn {
  // Form values
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  contentType: ContentType;
  setContentType: (type: ContentType) => void;
  category: string;
  setCategory: (category: string) => void;
  isPublished: boolean;
  setIsPublished: (published: boolean) => void;
  // Derived
  hasChanges: boolean;
  // Actions
  reset: () => void;
}

export interface UseArtifactSaveReturn {
  isSaving: boolean;
  error: string | null;
  save: (mindId: string, mindSlug: string, values: ArtifactFormValues) => Promise<boolean>;
  clearError: () => void;
}

// ============================================================================
// Constants
// ============================================================================

export const CONTENT_TYPE_OPTIONS = [{ value: 'other', label: 'Artefato' }];
