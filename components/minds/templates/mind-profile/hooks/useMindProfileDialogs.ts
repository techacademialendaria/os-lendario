import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../../../../lib/supabase';
import type { MindProfile as Mind } from '../../../../../hooks/useMind';

export interface UseMindProfileDialogsReturn {
  // State
  isEditAvatarOpen: boolean;
  isEditSettingsOpen: boolean;
  isDeleteDialogOpen: boolean;
  isDeleting: boolean;
  // Actions
  openEditAvatar: () => void;
  closeEditAvatar: () => void;
  setEditAvatarOpen: (value: boolean) => void;
  openEditSettings: () => void;
  closeEditSettings: () => void;
  setEditSettingsOpen: (value: boolean) => void;
  openDeleteDialog: () => void;
  closeDeleteDialog: () => void;
  setDeleteDialogOpen: (value: boolean) => void;
  handleDeleteMind: () => Promise<void>;
}

export function useMindProfileDialogs(mind: Mind | null): UseMindProfileDialogsReturn {
  const navigate = useNavigate();

  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isEditSettingsOpen, setIsEditSettingsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openEditAvatar = useCallback(() => setIsEditAvatarOpen(true), []);
  const closeEditAvatar = useCallback(() => setIsEditAvatarOpen(false), []);
  const setEditAvatarOpen = useCallback((value: boolean) => setIsEditAvatarOpen(value), []);

  const openEditSettings = useCallback(() => setIsEditSettingsOpen(true), []);
  const closeEditSettings = useCallback(() => setIsEditSettingsOpen(false), []);
  const setEditSettingsOpen = useCallback((value: boolean) => setIsEditSettingsOpen(value), []);

  const openDeleteDialog = useCallback(() => setIsDeleteDialogOpen(true), []);
  const closeDeleteDialog = useCallback(() => setIsDeleteDialogOpen(false), []);
  const setDeleteDialogOpen = useCallback((value: boolean) => setIsDeleteDialogOpen(value), []);

  const handleDeleteMind = useCallback(async () => {
    if (!mind || !isSupabaseConfigured()) return;

    setIsDeleting(true);
    try {
      const { error: deleteError } = await (
        supabase.from('minds') as any
      ).update({ deleted_at: new Date().toISOString() }).eq('id', mind.id);

      if (deleteError) throw deleteError;

      setIsDeleteDialogOpen(false);
      navigate('/minds');
    } catch (err) {
      console.error('Error deleting mind:', err);
    } finally {
      setIsDeleting(false);
    }
  }, [mind, navigate]);

  return {
    isEditAvatarOpen,
    isEditSettingsOpen,
    isDeleteDialogOpen,
    isDeleting,
    openEditAvatar,
    closeEditAvatar,
    setEditAvatarOpen,
    openEditSettings,
    closeEditSettings,
    setEditSettingsOpen,
    openDeleteDialog,
    closeDeleteDialog,
    setDeleteDialogOpen,
    handleDeleteMind,
  };
}
