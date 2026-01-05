/**
 * RegisterForm - Registration form organism
 */

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { LuxuryInput, LuxuryButton, LuxuryLabel } from '../molecules';
import type { RegisterFormProps } from '../types';

export const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  email,
  password,
  inviteInfo,
  inviteLoading,
  isLoading,
  isTransitioning,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  const formClasses = `
    space-y-6
    transition-all duration-300 ease-out
    ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
  `;

  return (
    <form onSubmit={onSubmit} className={formClasses}>
      {/* Invite Banner */}
      {inviteInfo && (
        <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="envelope-open" className="text-primary" size="size-4" />
            <span className="font-semibold text-foreground">Convite recebido</span>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Voce foi convidado como <strong className="text-primary">{inviteInfo.role_display_name}</strong>
            {inviteInfo.areas.length > 0 && (
              <> com acesso as areas: {inviteInfo.areas.join(', ')}</>
            )}
          </p>
          {inviteInfo.message && (
            <p className="mt-2 text-xs italic text-muted-foreground">"{inviteInfo.message}"</p>
          )}
        </div>
      )}

      {inviteLoading && (
        <div className="mb-6 flex items-center justify-center gap-2 text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-xs">Carregando convite...</span>
        </div>
      )}

      <div>
        <LuxuryLabel htmlFor="reg-name">Nome Completo</LuxuryLabel>
        <LuxuryInput
          id="reg-name"
          placeholder="Seu nome"
          value={name}
          onChange={onNameChange}
          icon="user"
          disabled={isLoading}
        />
      </div>

      <div>
        <LuxuryLabel htmlFor="reg-email">Email</LuxuryLabel>
        <LuxuryInput
          id="reg-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={onEmailChange}
          icon="envelope"
          autoComplete="email"
          disabled={isLoading}
        />
        {inviteInfo && (
          <p className="mt-1 text-xs text-muted-foreground">
            O email deve ser: <strong>{inviteInfo.email}</strong>
          </p>
        )}
      </div>

      <div>
        <LuxuryLabel htmlFor="reg-password">Senha</LuxuryLabel>
        <LuxuryInput
          id="reg-password"
          type="password"
          placeholder="********"
          value={password}
          onChange={onPasswordChange}
          icon="lock"
          disabled={isLoading}
        />
      </div>

      <div className="pt-4">
        <LuxuryButton type="submit" isLoading={isLoading}>
          {inviteInfo ? 'Aceitar Convite' : 'Criar Conta'}
        </LuxuryButton>
      </div>
    </form>
  );
};
