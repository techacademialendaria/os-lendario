import { Section } from '../../../../types';
import type { MindProfile as Mind } from '../../../../hooks/useMind';

export interface MindProfileProps {
  setSection: (s: Section) => void;
  mindSlug?: string;
}

export interface MindProfileDialogsState {
  isEditAvatarOpen: boolean;
  isEditSettingsOpen: boolean;
  isDeleteDialogOpen: boolean;
  isDeleting: boolean;
}

export interface MindProfileDialogsActions {
  openEditAvatar: () => void;
  closeEditAvatar: () => void;
  openEditSettings: () => void;
  closeEditSettings: () => void;
  openDeleteDialog: () => void;
  closeDeleteDialog: () => void;
  setIsDeleting: (value: boolean) => void;
}

export interface MindProfileTabState {
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

export interface MindProfileImageState {
  imgError: boolean;
  setImgError: (value: boolean) => void;
  avatarSrc: string;
}

// Valid tab IDs for URL hash
export const VALID_TABS = [
  'overview',
  'psychometrics',
  'communication',
  'history',
  'artifacts',
  'contents',
  'fragments',
  'prompts',
  'recommended-tools',
] as const;

export type ValidTab = (typeof VALID_TABS)[number];

// DiceBear fallback for missing images
export const getDiceBearUrl = (slug: string): string => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${slug}&backgroundColor=0d9488`;
};
