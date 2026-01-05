import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import type { UserManagementView, RoleId, AreaType } from '../types';

interface UseRoleDialogReturn {
  isOpen: boolean;
  selectedUser: UserManagementView | null;
  selectedRoleId: RoleId | null;
  selectedAreas: AreaType[];
  saving: boolean;
  error: string | null;
  open: (user: UserManagementView) => void;
  close: () => void;
  setSelectedRoleId: (roleId: RoleId | null) => void;
  setSelectedAreas: (areas: AreaType[]) => void;
  toggleArea: (area: AreaType) => void;
  save: () => Promise<boolean>;
}

export function useRoleDialog(onSuccess: () => void): UseRoleDialogReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserManagementView | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<AreaType[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = (user: UserManagementView) => {
    setSelectedUser(user);
    setSelectedRoleId(user.role_id);
    setSelectedAreas(user.areas || []);
    setError(null);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setSelectedUser(null);
    setSelectedRoleId(null);
    setSelectedAreas([]);
    setError(null);
  };

  const toggleArea = (area: AreaType) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const save = async (): Promise<boolean> => {
    if (!selectedUser) return false;

    setSaving(true);
    setError(null);

    try {
      if (selectedRoleId) {
        // Grant or update role using RPC
        // @ts-expect-error - RPC types not fully inferred by Supabase
        const { error: rpcError } = await supabase.rpc('grant_user_role', {
          p_user_id: selectedUser.user_id,
          p_role_id: selectedRoleId,
          p_scope_type: 'global',
          p_scope_id: null,
          p_areas: selectedAreas,
          p_expires_at: null,
          p_notes: null,
        });

        if (rpcError) throw rpcError;
      } else if (selectedUser.role_id) {
        // Revoke existing role
        // @ts-expect-error - RPC types not fully inferred by Supabase
        const { error: rpcError } = await supabase.rpc('revoke_user_role', {
          p_user_id: selectedUser.user_id,
          p_role_id: selectedUser.role_id,
          p_scope_type: 'global',
          p_scope_id: null,
        });

        if (rpcError) throw rpcError;
      }

      onSuccess();
      close();
      return true;
    } catch (err: unknown) {
      console.error('Error saving role:', err);
      let errorMessage = 'Erro ao salvar role';
      if (err && typeof err === 'object') {
        if ('message' in err && typeof err.message === 'string') {
          errorMessage = err.message;
        } else if ('details' in err && typeof err.details === 'string') {
          errorMessage = err.details;
        }
      }
      setError(errorMessage);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    isOpen,
    selectedUser,
    selectedRoleId,
    selectedAreas,
    saving,
    error,
    open,
    close,
    setSelectedRoleId,
    setSelectedAreas,
    toggleArea,
    save,
  };
}
