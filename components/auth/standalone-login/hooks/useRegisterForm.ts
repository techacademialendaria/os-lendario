/**
 * Hook for register form fields and submission
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { getAuthErrorMessage } from '@/lib/AuthContext';
import type { InviteInfo, AuthView } from '../types';

interface UseRegisterFormOptions {
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  handleViewChange: (view: AuthView) => void;
  setView: (view: AuthView) => void;
}

export function useRegisterForm({ setError, setSuccess, handleViewChange, setView }: UseRegisterFormOptions) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inviteInfo, setInviteInfo] = useState<InviteInfo | null>(null);
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [inviteLoading, setInviteLoading] = useState(false);

  const [searchParams] = useSearchParams();

  // Check for invite token in URL
  useEffect(() => {
    const token = searchParams.get('invite');
    if (token) {
      setInviteToken(token);
      setView('register');
      loadInviteInfo(token);
    }
  }, [searchParams, setView]);

  // Load invite info from token
  const loadInviteInfo = async (token: string) => {
    setInviteLoading(true);
    try {
      // @ts-expect-error - RPC types not fully inferred by Supabase
      const { data, error } = await supabase.rpc('get_invite_by_token', { p_token: token });

      const inviteData = data as unknown as InviteInfo[] | null;
      if (error || !inviteData || inviteData.length === 0) {
        setError('Convite invalido ou expirado');
        setInviteToken(null);
        return;
      }

      const invite = inviteData[0];

      // Check if expired
      if (new Date(invite.expires_at) < new Date()) {
        setError('Este convite expirou');
        setInviteToken(null);
        return;
      }

      // Check status
      if (invite.status !== 'pending') {
        setError('Este convite ja foi utilizado');
        setInviteToken(null);
        return;
      }

      // Get role display name
      const { data: roleDataResult } = await supabase
        .from('roles')
        .select('display_name')
        .eq('id', invite.role_id)
        .single();

      const roleData = roleDataResult as unknown as { display_name: string } | null;

      setInviteInfo({
        ...invite,
        role_display_name: roleData?.display_name || invite.role_id,
      });
      setEmail(invite.email);
    } catch (err) {
      console.error('Error loading invite:', err);
      setError('Erro ao carregar convite');
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !name) {
      setError('Preencha todos os campos');
      return;
    }

    // If invite, verify email matches
    if (inviteInfo && email.toLowerCase() !== inviteInfo.email.toLowerCase()) {
      setError('O email deve ser o mesmo do convite');
      return;
    }

    setIsLoading(true);
    try {
      // Include invite token in redirect URL so AuthCallback can process it
      const redirectUrl = inviteToken
        ? `${window.location.origin}/auth/callback?invite=${inviteToken}`
        : `${window.location.origin}/auth/callback`;

      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: redirectUrl,
        },
      });

      if (authError) {
        setError(getAuthErrorMessage(authError));
      } else {
        if (inviteInfo) {
          setSuccess(`Conta criada! Verifique seu email para confirmar e acessar como ${inviteInfo.role_display_name}.`);
        } else {
          setSuccess('Conta criada! Verifique seu email para confirmar.');
        }
        handleViewChange('login');
      }
    } catch (err) {
      setError(err instanceof Error ? getAuthErrorMessage(err) : 'Erro inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    inviteInfo,
    inviteLoading,
    handleRegister,
  };
}
