/**
 * MagicLinkForm - Login sem senha via email
 */

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Icon } from '../ui/icon';
import { useAuth, getAuthErrorMessage } from '../../lib/AuthContext';

interface MagicLinkFormProps {
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

export const MagicLinkForm: React.FC<MagicLinkFormProps> = ({ onError, onSuccess }) => {
  const { signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      onError?.('Por favor, informe seu email');
      return;
    }

    setIsLoading(true);
    try {
      if (!signInWithMagicLink) {
        onError?.('Login por link mágico não está configurado');
        return;
      }
      const { error } = await signInWithMagicLink(email);
      if (error) {
        onError?.(getAuthErrorMessage(error));
      } else {
        setIsSent(true);
        onSuccess?.();
      }
    } catch (err) {
      onError?.('Erro ao enviar link. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Icon name="envelope" size="size-6" className="text-primary" />
        </div>
        <h3 className="font-medium text-foreground">Verifique seu email</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Enviamos um link de acesso para <strong>{email}</strong>
        </p>
        <Button variant="ghost" size="sm" className="mt-3" onClick={() => setIsSent(false)}>
          Enviar novamente
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="magic-email">Email</Label>
        <Input
          id="magic-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          autoComplete="email"
        />
      </div>

      <Button type="submit" className="w-full gap-2" disabled={isLoading}>
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Icon name="envelope" size="size-4" />
        )}
        Enviar link de acesso
      </Button>
    </form>
  );
};

export default MagicLinkForm;
