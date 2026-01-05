/**
 * ForgotPasswordForm - Password recovery form organism
 */

import React from 'react';
import { LuxuryInput, LuxuryButton, LuxuryLabel } from '../molecules';
import type { ForgotPasswordFormProps } from '../types';

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  isLoading,
  isTransitioning,
  onEmailChange,
  onSubmit,
}) => {
  const formClasses = `
    space-y-6
    transition-all duration-300 ease-out
    ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
  `;

  return (
    <form onSubmit={onSubmit} className={formClasses}>
      <div>
        <LuxuryLabel htmlFor="reset-email">Email de Recuperacao</LuxuryLabel>
        <LuxuryInput
          id="reset-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={onEmailChange}
          icon="envelope"
          autoComplete="email"
          disabled={isLoading}
        />
      </div>
      <p className="text-xs text-zinc-600 font-light leading-relaxed tracking-wide">
        Enviaremos instrucoes de recuperacao para o email cadastrado.
      </p>
      <div className="pt-4">
        <LuxuryButton type="submit" isLoading={isLoading}>
          Enviar
        </LuxuryButton>
      </div>
    </form>
  );
};
