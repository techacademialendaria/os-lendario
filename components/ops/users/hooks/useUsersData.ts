import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../../lib/supabase';
import type { UserManagementView, Mind, Role } from '../types';

interface UseUsersDataReturn {
  users: UserManagementView[];
  minds: Mind[];
  roles: Role[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUsersData(): UseUsersDataReturn {
  const [users, setUsers] = useState<UserManagementView[]>([]);
  const [minds, setMinds] = useState<Mind[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('v_user_management')
        .select('*');

      if (error) throw error;
      setUsers((data as UserManagementView[]) || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Erro ao carregar usuários');
    }
  }, []);

  const fetchMinds = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('minds')
        .select('id, name, slug, avatar_url, privacy_level, short_bio')
        .is('deleted_at', null)
        .order('name');

      if (error) throw error;
      setMinds((data as Mind[]) || []);
    } catch (err) {
      console.error('Error fetching minds:', err);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('hierarchy_level', { ascending: false });

      if (error) throw error;
      setRoles((data as Role[]) || []);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  }, []);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    await Promise.all([fetchUsers(), fetchMinds(), fetchRoles()]);
    setLoading(false);
  }, [fetchUsers, fetchMinds, fetchRoles]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { users, minds, roles, loading, error, refetch };
}
