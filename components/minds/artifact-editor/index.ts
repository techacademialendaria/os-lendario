// Main component
export { default as ArtifactEditorTemplate, default } from './ArtifactEditorTemplate';

// Types
export type {
  ArtifactEditorProps,
  ContentType,
  SidebarTab,
  ArtifactFormValues,
} from './types';

// Hooks (for custom compositions)
export { useArtifactForm, useArtifactSave } from './hooks';

// Organisms (for custom layouts)
export { ArtifactEditorHeader, ArtifactEditorSidebar } from './organisms';
