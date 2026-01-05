/**
 * Hook for login form fields and submission
 */

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, getAuthErrorMessage } from '@/lib/AuthContext';

interface UseLoginFormOptions {
  setError: (error: string | null) => void;
}

export function useLoginForm({ setError }: UseLoginFormOptions) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    try {
      const { error: authError } = await signInWithEmail(email, password);
      if (authError) {
        setError(getAuthErrorMessage(authError));
      } else {
        const state = location.state as { from?: Location } | undefined;
        const from = state?.from?.pathname || '/books';
        navigate(from, { replace: true });
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
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    handleLogin,
  };
}
