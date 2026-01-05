/**
 * Hook for forgot password form
 */

import { useState } from 'react';
import { useAuth, getAuthErrorMessage } from '@/lib/AuthContext';

interface UseForgotPasswordFormOptions {
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
}

export function useForgotPasswordForm({ setError, setSuccess }: UseForgotPasswordFormOptions) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Informe seu email');
      return;
    }

    setIsLoading(true);
    try {
      const { error: authError } = await resetPassword(email);
      if (authError) {
        setError(getAuthErrorMessage(authError));
      } else {
        setSuccess('Instrucoes enviadas para seu email!');
      }
    } catch (err) {
      setError(err instanceof Error ? getAuthErrorMessage(err) : 'Erro inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    isLoading,
    handleForgotPassword,
  };
}
