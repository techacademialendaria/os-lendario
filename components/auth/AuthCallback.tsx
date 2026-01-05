/**
 * AuthCallback - Handler para callbacks de OAuth, Magic Link e Convites
 *
 * Processa tokens da URL, aceita convites e redireciona o usuário
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Processando autenticação...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for error in URL
        const errorParam = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (errorParam) {
          setError(errorDescription || 'Erro na autenticação');
          return;
        }

        // Get the type of callback (recovery = password reset)
        const type = searchParams.get('type');
        // Get invite token if present
        const inviteToken = searchParams.get('invite');

        // Supabase handles the token exchange automatically
        // when onAuthStateChange fires
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          setError('Erro ao processar autenticação');
          return;
        }

        if (session) {
          // If there's an invite token, accept the invite
          if (inviteToken) {
            setStatus('Processando convite...');
            try {
              // @ts-expect-error - RPC types not fully inferred by Supabase
              const { error: inviteError } = await supabase.rpc('accept_invite', {
                p_token: inviteToken,
              });

              if (inviteError) {
                console.error('Error accepting invite:', inviteError);
                // Don't block login, just log the error
                // User can contact admin if role wasn't assigned
              } else {
                setStatus('Convite aceito! Redirecionando...');
              }
            } catch (err) {
              console.error('Error accepting invite:', err);
            }
          }

          // Determine redirect destination
          const state = location.state as { from?: Location } | undefined;
          const from = state?.from?.pathname || '/books';

          // If password recovery, redirect to settings
          if (type === 'recovery') {
            navigate('/settings', { replace: true });
            return;
          }

          // Small delay to show success message
          setTimeout(() => {
            navigate(from, { replace: true });
          }, inviteToken ? 1000 : 0);
        } else {
          // Wait a bit for the session to be established
          // (Supabase might still be processing)
          setTimeout(async () => {
            const {
              data: { session: retrySession },
            } = await supabase.auth.getSession();
            if (retrySession) {
              // Try to accept invite if present
              if (inviteToken) {
                try {
                  // @ts-expect-error - RPC types not fully inferred by Supabase
                  await supabase.rpc('accept_invite', { p_token: inviteToken });
                } catch (err) {
                  console.error('Error accepting invite:', err);
                }
              }

              const state = location.state as { from?: Location } | undefined;
              const from = state?.from?.pathname || '/books';
              navigate(from, { replace: true });
            } else {
              setError('Sessão não encontrada. Tente fazer login novamente.');
            }
          }, 2000);
        }
      } catch (err) {
        setError('Erro inesperado na autenticação');
      }
    };

    handleCallback();
  }, [navigate, location, searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
          <h2 className="text-lg font-semibold text-destructive">Erro na autenticação</h2>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <button
            onClick={() => navigate('/auth/login')}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Voltar para login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">{status}</p>
      </div>
    </div>
  );
};

export default AuthCallback;
