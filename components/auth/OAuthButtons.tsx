/**
 * OAuthButtons - Botões de login social (Google, etc.)
 */

import React from 'react';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { useAuth, getAuthErrorMessage } from '../../lib/AuthContext';

interface OAuthButtonsProps {
  onError?: (message: string) => void;
  disabled?: boolean;
}

export const OAuthButtons: React.FC<OAuthButtonsProps> = ({ onError, disabled }) => {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      if (!signInWithGoogle) {
        onError?.('Login com Google não está configurado');
        return;
      }
      const { error } = await signInWithGoogle();
      if (error) {
        onError?.(getAuthErrorMessage(error));
      }
    } catch (err) {
      onError?.('Erro ao conectar com Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        onClick={handleGoogleLogin}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Icon name="google" size="size-5" />
        )}
        Continuar com Google
      </Button>
    </div>
  );
};

export default OAuthButtons;
