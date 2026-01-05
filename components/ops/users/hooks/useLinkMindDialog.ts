import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import type { UserManagementView } from '../types';

interface UseLinkMindDialogReturn {
  isOpen: boolean;
  selectedUser: UserManagementView | null;
  selectedMindId: string;
  saving: boolean;
  error: string | null;
  open: (user: UserManagementView) => void;
  close: () => void;
  setSelectedMindId: (id: string) => void;
  save: () => Promise<boolean>;
}

export function useLinkMindDialog(onSuccess: () => void): UseLinkMindDialogReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserManagementView | null>(null);
  const [selectedMindId, setSelectedMindId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = (user: UserManagementView) => {
    setSelectedUser(user);
    setSelectedMindId(user.mind_id || '');
    setError(null);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setSelectedUser(null);
    setSelectedMindId('');
    setError(null);
  };

  const save = async (): Promise<boolean> => {
    if (!selectedUser) return false;

    setSaving(true);
    setError(null);

    try {
      const { error } = await (supabase.from('user_profiles') as ReturnType<typeof supabase.from>)
        .update({
          mind_id: selectedMindId || null,
          updated_at: new Date().toISOString(),
        } as Record<string, unknown>)
        .eq('id', selectedUser.user_id);

      if (error) throw error;

      onSuccess();
      close();
      return true;
    } catch (err) {
      console.error('Error saving link:', err);
      setError('Erro ao salvar vínculo');
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    isOpen,
    selectedUser,
    selectedMindId,
    saving,
    error,
    open,
    close,
    setSelectedMindId,
    save,
  };
}
