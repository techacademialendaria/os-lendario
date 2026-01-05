import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import type { MindOption, Mind, RoleId, AreaType } from '../types';

interface UseCreateUserDialogReturn {
  isOpen: boolean;
  email: string;
  name: string;
  mindOption: MindOption;
  selectedMindId: string;
  // RBAC fields
  selectedRoleId: RoleId;
  selectedAreas: AreaType[];
  message: string;
  // State
  saving: boolean;
  error: string | null;
  inviteUrl: string | null;
  // Actions
  open: () => void;
  close: () => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setMindOption: (option: MindOption) => void;
  setSelectedMindId: (id: string) => void;
  setSelectedRoleId: (role: RoleId) => void;
  toggleArea: (area: AreaType) => void;
  setMessage: (message: string) => void;
  save: (minds: Mind[]) => Promise<string | null>;
  copyInviteUrl: () => void;
}

export function useCreateUserDialog(onSuccess: () => void): UseCreateUserDialogReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mindOption, setMindOption] = useState<MindOption>('create_new');
  const [selectedMindId, setSelectedMindId] = useState('');
  // RBAC state
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId>('student');
  const [selectedAreas, setSelectedAreas] = useState<AreaType[]>([]);
  const [message, setMessage] = useState('');
  // UI state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);

  const open = () => {
    setEmail('');
    setName('');
    setMindOption('create_new');
    setSelectedMindId('');
    setSelectedRoleId('student');
    setSelectedAreas([]);
    setMessage('');
    setError(null);
    setInviteUrl(null);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setError(null);
    setInviteUrl(null);
  };

  const toggleArea = (area: AreaType) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const copyInviteUrl = () => {
    if (inviteUrl) {
      navigator.clipboard.writeText(inviteUrl);
    }
  };

  const save = async (minds: Mind[]): Promise<string | null> => {
    // Validation
    if (!email.trim()) {
      setError('Email é obrigatório');
      return null;
    }
    if (!name.trim()) {
      setError('Nome é obrigatório');
      return null;
    }
    if (mindOption === 'link_existing' && !selectedMindId) {
      setError('Selecione um Mind para vincular');
      return null;
    }
    // Collaborator needs at least one area
    if (selectedRoleId === 'collaborator' && selectedAreas.length === 0) {
      setError('Colaboradores precisam de pelo menos uma área de acesso');
      return null;
    }

    setSaving(true);
    setError(null);

    try {
      // Create invite using RPC
      // @ts-expect-error - RPC types not fully inferred by Supabase
      const { data: inviteId, error: inviteError } = await supabase.rpc('create_user_invite', {
        p_email: email.trim().toLowerCase(),
        p_role_id: selectedRoleId,
        p_areas: selectedAreas,
        p_message: message.trim() || null,
        p_expires_days: 7,
      });

      if (inviteError) throw inviteError;

      // Get the invite token
      const { data: inviteData, error: fetchError } = await supabase
        .from('user_invites')
        .select('token')
        .eq('id', inviteId)
        .single();

      const invite = inviteData as unknown as { token: string } | null;

      if (fetchError || !invite) {
        throw new Error('Erro ao obter token do convite');
      }

      // Generate invite URL
      const generatedInviteUrl = `${window.location.origin}/auth/signup?invite=${invite.token}`;
      setInviteUrl(generatedInviteUrl);

      // Try to send email (if Edge Function is configured)
      try {
        const { error: emailError } = await supabase.functions.invoke('send-invite-email', {
          body: {
            email: email.trim(),
            name: name.trim(),
            inviteUrl: generatedInviteUrl,
            roleDisplayName: getRoleDisplayName(selectedRoleId),
            areas: selectedAreas,
            message: message.trim() || null,
          },
        });

        if (emailError) {
          console.warn('Email sending failed, user can copy link manually:', emailError);
        }
      } catch (emailErr) {
        console.warn('Email Edge Function not available:', emailErr);
        // Don't fail - user can copy URL manually
      }

      let successMessage = `Convite criado para ${email}!`;

      if (mindOption === 'create_new') {
        successMessage +=
          ' Um Mind será criado automaticamente quando o usuário aceitar o convite.';
      } else if (mindOption === 'link_existing') {
        const selectedMind = minds.find((m) => m.id === selectedMindId);
        successMessage += ` Após aceitar o convite, vincule manualmente ao Mind "${selectedMind?.name}".`;
      }

      onSuccess();
      // Don't close - let user copy URL
      return successMessage;
    } catch (err: unknown) {
      console.error('Error creating invite:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar convite';
      setError(errorMessage);
      return null;
    } finally {
      setSaving(false);
    }
  };

  return {
    isOpen,
    email,
    name,
    mindOption,
    selectedMindId,
    selectedRoleId,
    selectedAreas,
    message,
    saving,
    error,
    inviteUrl,
    open,
    close,
    setEmail,
    setName,
    setMindOption,
    setSelectedMindId,
    setSelectedRoleId,
    toggleArea,
    setMessage,
    save,
    copyInviteUrl,
  };
}

// Helper function
function getRoleDisplayName(roleId: RoleId): string {
  const names: Record<RoleId, string> = {
    owner: 'Proprietário',
    admin: 'Administrador',
    collaborator: 'Colaborador',
    student: 'Aluno',
    free_user: 'Usuário Free',
  };
  return names[roleId];
}
