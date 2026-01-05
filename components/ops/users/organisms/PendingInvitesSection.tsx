import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { RoleBadge } from '../molecules/RoleBadge';
import { AreasTags } from '../molecules/AreasTags';
import { supabase } from '../../../../lib/supabase';
import type { RoleId, AreaType } from '../types';

interface PendingInvite {
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

interface PendingInvitesSectionProps {
  onRefresh?: () => void;
}

export const PendingInvitesSection: React.FC<PendingInvitesSectionProps> = ({ onRefresh }) => {
  const [invites, setInvites] = useState<PendingInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchInvites = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: rpcError } = await supabase.rpc('list_pending_invites');

      if (rpcError) throw rpcError;

      setInvites((data as PendingInvite[]) || []);
    } catch (err) {
      console.error('Error fetching invites:', err);
      setError('Erro ao carregar convites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const handleCancel = async (inviteId: string) => {
    try {
      setCancellingId(inviteId);

      // @ts-expect-error - RPC types not fully inferred by Supabase
      const { error: cancelError } = await supabase.rpc('cancel_invite', {
        p_invite_id: inviteId,
      });

      if (cancelError) throw cancelError;

      await fetchInvites();
      onRefresh?.();
    } catch (err) {
      console.error('Error cancelling invite:', err);
    } finally {
      setCancellingId(null);
    }
  };

  const handleCopyUrl = async (inviteId: string) => {
    try {
      // Get invite token
      const { data: inviteData, error: fetchError } = await supabase
        .from('user_invites')
        .select('token')
        .eq('id', inviteId)
        .single();

      const invite = inviteData as unknown as { token: string } | null;
      if (fetchError || !invite) throw new Error('Convite não encontrado');

      const inviteUrl = `${window.location.origin}/auth/signup?invite=${invite.token}`;
      await navigator.clipboard.writeText(inviteUrl);

      setCopiedId(inviteId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Error copying URL:', err);
    }
  };

  const getDaysRemaining = (expiresAt: string): number => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex items-center justify-center py-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="flex items-center gap-2 py-4">
          <Icon name="exclamation-triangle" className="size-4 text-destructive" />
          <span className="text-sm text-destructive">{error}</span>
          <Button variant="ghost" size="sm" onClick={fetchInvites}>
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (invites.length === 0) {
    return null; // Don't show section if no pending invites
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon name="envelope" className="size-4 text-muted-foreground" />
            Convites Pendentes
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
              {invites.length}
            </span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={fetchInvites}>
            <Icon name="refresh" className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {invites.map((invite) => {
          const daysRemaining = getDaysRemaining(invite.expires_at);
          const isExpiringSoon = daysRemaining <= 2;

          return (
            <div
              key={invite.id}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-3"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">{invite.email}</span>
                  <RoleBadge roleId={invite.role_id} size="sm" />
                  {invite.areas.length > 0 && (
                    <AreasTags areas={invite.areas} size="sm" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    Convidado por {invite.invited_by_email.split('@')[0]}
                  </span>
                  <span>•</span>
                  <span className={isExpiringSoon ? 'text-amber-500' : ''}>
                    {daysRemaining > 0 ? `Expira em ${daysRemaining} dias` : 'Expira hoje'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyUrl(invite.id)}
                  title="Copiar link do convite"
                >
                  {copiedId === invite.id ? (
                    <Icon name="check" className="size-4 text-green-500" />
                  ) : (
                    <Icon name="link" className="size-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCancel(invite.id)}
                  disabled={cancellingId === invite.id}
                  title="Cancelar convite"
                  className="text-destructive hover:text-destructive"
                >
                  {cancellingId === invite.id ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Icon name="trash" className="size-4" />
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
