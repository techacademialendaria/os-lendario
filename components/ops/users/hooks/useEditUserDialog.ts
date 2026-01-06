import { useState, useCallback } from 'react';
import { supabase } from '../../../../lib/supabase';
import type { UserManagementView, RoleId, AreaType } from '../types';

interface UseEditUserDialogReturn {
  isOpen: boolean;
  user: UserManagementView | null;
  // Form state
  fullName: string;
  email: string;
  selectedRoleId: RoleId | null;
  selectedAreas: AreaType[];
  selectedMindId: string | null;
  // State
  saving: boolean;
  error: string | null;
  // Actions
  open: (user: UserManagementView) => void;
  close: () => void;
  setFullName: (name: string) => void;
  setEmail: (email: string) => void;
  setSelectedRoleId: (roleId: RoleId | null) => void;
  toggleArea: (area: AreaType) => void;
  setSelectedMindId: (mindId: string | null) => void;
  save: () => Promise<boolean>;
}

export function useEditUserDialog(onSuccess: () => void): UseEditUserDialogReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserManagementView | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<AreaType[]>([]);
  const [selectedMindId, setSelectedMindId] = useState<string | null>(null);

  // UI state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback((userData: UserManagementView) => {
    setUser(userData);
    setFullName(userData.full_name || '');
    setEmail(userData.email || '');
    setSelectedRoleId(userData.role_id);
    setSelectedAreas(userData.areas || []);
    setSelectedMindId(userData.mind_id);
    setError(null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setUser(null);
    setFullName('');
    setEmail('');
    setSelectedRoleId(null);
    setSelectedAreas([]);
    setSelectedMindId(null);
    setError(null);
  }, []);

  const toggleArea = useCallback((area: AreaType) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  }, []);

  const save = useCallback(async (): Promise<boolean> => {
    if (!user) return false;

    setSaving(true);
    setError(null);

    try {
      const updates: Promise<unknown>[] = [];

      // 1. Update mind_id in user_profiles if changed
      if (selectedMindId !== user.mind_id) {
        const { error: upsertError } = await supabase
          .from('user_profiles')
          .upsert(
            {
              id: user.user_id,
              mind_id: selectedMindId,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
          );

        if (upsertError) {
          throw new Error(`Erro ao atualizar mind: ${upsertError.message}`);
        }
      }

      // 2. Handle role changes
      const roleChanged =
        selectedRoleId !== user.role_id ||
        JSON.stringify(selectedAreas.sort()) !== JSON.stringify((user.areas || []).sort());

      if (roleChanged) {
        if (selectedRoleId) {
          // Grant or update role
          // @ts-expect-error - RPC types not fully inferred
          const { data, error: grantError } = await supabase.rpc('grant_user_role', {
            p_user_id: user.user_id,
            p_role_id: selectedRoleId,
            p_scope_type: 'global',
            p_scope_id: null,
            p_areas: selectedAreas,
            p_expires_at: null,
            p_notes: null,
          });

          if (grantError) {
            console.error('Grant role error:', grantError);
            throw new Error(grantError.message || 'Erro ao atualizar role');
          }
        } else if (user.role_id) {
          // Revoke existing role
          // @ts-expect-error - RPC types not fully inferred
          const { error: revokeError } = await supabase.rpc('revoke_user_role', {
            p_user_id: user.user_id,
            p_role_id: user.role_id,
            p_scope_type: 'global',
            p_scope_id: null,
          });

          if (revokeError) {
            console.error('Revoke role error:', revokeError);
            throw new Error(revokeError.message || 'Erro ao remover role');
          }
        }
      }

      onSuccess();
      close();
      return true;
    } catch (err: unknown) {
      console.error('Error saving user:', err);
      let errorMessage = 'Erro ao salvar usuário';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = String(err.message);
      }
      setError(errorMessage);
      return false;
    } finally {
      setSaving(false);
    }
  }, [user, fullName, selectedRoleId, selectedAreas, selectedMindId, onSuccess, close]);

  return {
    isOpen,
    user,
    fullName,
    email,
    selectedRoleId,
    selectedAreas,
    selectedMindId,
    saving,
    error,
    open,
    close,
    setFullName,
    setEmail,
    setSelectedRoleId,
    toggleArea,
    setSelectedMindId,
    save,
  };
}
