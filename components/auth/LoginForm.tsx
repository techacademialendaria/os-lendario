/**
 * LoginForm - Formulário de login com email/senha
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Icon } from '../ui/icon';
import { useAuth, getAuthErrorMessage } from '../../lib/AuthContext';

interface LoginFormProps {
  onError?: (message: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onError }) => {
  const { signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      const msg = 'Por favor, preencha todos os campos';
      setError(msg);
      onError?.(msg);
      return;
    }

    setIsLoading(true);
    try {
      const { error: authError } = await signInWithEmail(email, password);

      if (authError) {
        // Error is displayed to user via setError - no console.error needed
        const msg = getAuthErrorMessage(authError);
        setError(msg);
      } else {
        // Redirect to previous page or home
        const state = location.state as { from?: Location } | undefined;
        const from = state?.from?.pathname || '/books';
        navigate(from, { replace: true });
      }
    } catch (err) {
      // Network errors or unexpected failures - show to user
      const msg = err instanceof Error ? getAuthErrorMessage(err) : 'Erro inesperado. Tente novamente.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Icon
            name="envelope"
            size="size-4"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="login-email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoComplete="email"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Senha</Label>
          <Link
            to="/auth/forgot-password"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Esqueci minha senha
          </Link>
        </div>
        <div className="relative">
          <Icon
            name="lock"
            size="size-4"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="current-password"
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon name={showPassword ? 'eye-crossed' : 'eye'} size="size-4" />
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          'Entrar'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
