/**
 * AccessDeniedPage - Página exibida quando usuário não tem permissão
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { useRBAC, getRoleDisplayName } from '../../hooks/useRBAC';

type DenialReason = 'role' | 'area' | 'permission' | 'unknown';

const REASON_MESSAGES: Record<DenialReason, { title: string; description: string }> = {
  role: {
    title: 'Nível de acesso insuficiente',
    description: 'Você não tem o nível de permissão necessário para acessar esta área.',
  },
  area: {
    title: 'Área não autorizada',
    description: 'Você não tem acesso a esta área específica do sistema.',
  },
  permission: {
    title: 'Permissão negada',
    description: 'Você não possui a permissão específica necessária para esta ação.',
  },
  unknown: {
    title: 'Acesso negado',
    description: 'Você não tem permissão para acessar esta página.',
  },
};

export const AccessDeniedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { currentRole, areas } = useRBAC();

  // Get reason from navigation state
  const state = location.state as { from?: Location; reason?: DenialReason } | undefined;
  const reason = state?.reason || 'unknown';
  const { title, description } = REASON_MESSAGES[reason];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <svg
            className="h-10 w-10 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>

        {/* Description */}
        <p className="mt-3 text-muted-foreground">{description}</p>

        {/* User info */}
        {user && (
          <div className="mt-6 rounded-lg border border-border/50 bg-muted/30 p-4 text-left text-sm">
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Usuário:</span> {user.email}
            </p>
            <p className="mt-1 text-muted-foreground">
              <span className="font-medium text-foreground">Nível:</span>{' '}
              {getRoleDisplayName(currentRole)}
            </p>
            {areas.length > 0 && (
              <p className="mt-1 text-muted-foreground">
                <span className="font-medium text-foreground">Áreas:</span> {areas.join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Voltar
          </button>
          <button
            onClick={() => navigate('/books')}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ir para início
          </button>
        </div>

        {/* Contact admin */}
        <p className="mt-8 text-xs text-muted-foreground">
          Se você acredita que deveria ter acesso, entre em contato com o administrador.
        </p>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
