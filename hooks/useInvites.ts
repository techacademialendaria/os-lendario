/**
 * useInvites - Hook para gerenciamento de convites
 *
 * Permite criar, listar e cancelar convites de usuários
 */

import { useCallback, useState } from 'react';
import { supabase } from '../lib/supabase';
import { RoleId, AreaType } from './useRBAC';

// ============================================================================
// Types
// ============================================================================

export interface UserInvite {
  id: string;
  email: string;
  role_id: RoleId;
  role_display_name: string;
  areas: AreaType[];
  invited_by_email: string;
  invited_at: string;
  expires_at: string;
  message: string | null;
}

export interface CreateInviteOptions {
  email: string;
  roleId: RoleId;
  areas?: AreaType[];
  message?: string;
  expiresDays?: number;
}

export interface UseInvitesReturn {
  // State
  pendingInvites: UserInvite[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchPendingInvites: () => Promise<void>;
  createInvite: (options: CreateInviteOptions) => Promise<{ inviteId: string; inviteUrl: string }>;
  cancelInvite: (inviteId: string) => Promise<boolean>;
  resendInvite: (inviteId: string) => Promise<{ inviteId: string; inviteUrl: string }>;

  // Utils
  generateInviteUrl: (token: string) => string;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useInvites(): UseInvitesReturn {
  const [pendingInvites, setPendingInvites] = useState<UserInvite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // Generate invite URL
  // --------------------------------------------------------------------------

  const generateInviteUrl = useCallback((token: string): string => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/auth/signup?invite=${token}`;
  }, []);

  // --------------------------------------------------------------------------
  // Fetch pending invites
  // --------------------------------------------------------------------------

  const fetchPendingInvites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: rpcError } = await supabase.rpc('list_pending_invites');

      if (rpcError) throw rpcError;

      setPendingInvites((data as UserInvite[]) || []);
    } catch (err) {
      console.error('Error fetching invites:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar convites');
    } finally {
      setLoading(false);
    }
  }, []);

  // --------------------------------------------------------------------------
  // Create invite
  // --------------------------------------------------------------------------

  const createInvite = useCallback(
    async (options: CreateInviteOptions): Promise<{ inviteId: string; inviteUrl: string }> => {
      const { email, roleId, areas = [], message, expiresDays = 7 } = options;

      // @ts-expect-error - RPC types not fully inferred by Supabase
      const { data, error: rpcError } = await supabase.rpc('create_user_invite', {
        p_email: email.toLowerCase().trim(),
        p_role_id: roleId,
        p_areas: areas,
        p_message: message || null,
        p_expires_days: expiresDays,
      });

      if (rpcError) {
        throw new Error(rpcError.message);
      }

      const inviteId = data as string;

      // Get the token for the invite
      const { data: inviteData, error: fetchError } = await supabase
        .from('user_invites')
        .select('token')
        .eq('id', inviteId)
        .single();

      const invite = inviteData as unknown as { token: string } | null;

      if (fetchError || !invite) {
        throw new Error('Erro ao obter token do convite');
      }

      const inviteUrl = generateInviteUrl(invite.token);

      // Refresh list
      await fetchPendingInvites();

      return { inviteId, inviteUrl };
    },
    [generateInviteUrl, fetchPendingInvites]
  );

  // --------------------------------------------------------------------------
  // Cancel invite
  // --------------------------------------------------------------------------

  const cancelInvite = useCallback(
    async (inviteId: string): Promise<boolean> => {
      // @ts-expect-error - RPC types not fully inferred by Supabase
      const { data, error: rpcError } = await supabase.rpc('cancel_invite', {
        p_invite_id: inviteId,
      });

      if (rpcError) {
        throw new Error(rpcError.message);
      }

      // Refresh list
      await fetchPendingInvites();

      return data as boolean;
    },
    [fetchPendingInvites]
  );

  // --------------------------------------------------------------------------
  // Resend invite (cancel old + create new)
  // --------------------------------------------------------------------------

  const resendInvite = useCallback(
    async (inviteId: string): Promise<{ inviteId: string; inviteUrl: string }> => {
      // Get invite details
      const invite = pendingInvites.find((i) => i.id === inviteId);
      if (!invite) {
        throw new Error('Convite não encontrado');
      }

      // Cancel old invite
      await cancelInvite(inviteId);

      // Create new invite with same details
      return createInvite({
        email: invite.email,
        roleId: invite.role_id,
        areas: invite.areas,
      });
    },
    [pendingInvites, cancelInvite, createInvite]
  );

  // --------------------------------------------------------------------------
  // Return
  // --------------------------------------------------------------------------

  return {
    pendingInvites,
    loading,
    error,
    fetchPendingInvites,
    createInvite,
    cancelInvite,
    resendInvite,
    generateInviteUrl,
  };
}

// ============================================================================
// Email Templates (for reference - actual sending is via Supabase)
// ============================================================================

export function getInviteEmailSubject(roleDisplayName: string): string {
  return `Convite para acessar a plataforma como ${roleDisplayName}`;
}

export function getInviteEmailBody(params: {
  inviteUrl: string;
  roleDisplayName: string;
  inviterName: string;
  message?: string;
  expiresAt: string;
}): string {
  const { inviteUrl, roleDisplayName, inviterName, message, expiresAt } = params;

  return `
Olá!

${inviterName} convidou você para acessar a plataforma como ${roleDisplayName}.

${message ? `Mensagem: "${message}"` : ''}

Clique no link abaixo para criar sua conta:
${inviteUrl}

Este convite expira em ${new Date(expiresAt).toLocaleDateString('pt-BR')}.

Se você não esperava este convite, pode ignorar este email.
  `.trim();
}
