/**
 * SubscriptionGuard - Restricts non-admin users to /books only
 *
 * Only admin (hierarchy >= 80) and owner (hierarchy >= 100) can access
 * routes outside /books. All other users (free, student, collaborator)
 * are restricted to /books routes only.
 *
 * Usage:
 * <SubscriptionGuard>
 *   <ProtectedContent />
 * </SubscriptionGuard>
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { useRBAC } from '../../hooks/useRBAC';

interface SubscriptionGuardProps {
  children: React.ReactNode;
  /**
   * Custom redirect path for restricted users (default: /books)
   */
  redirectTo?: string;
}

// Routes that all authenticated users CAN access
const PUBLIC_ALLOWED_ROUTES = [
  '/books',
  '/auth',
  '/access-denied',
];

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({
  children,
  redirectTo = '/books',
}) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { loading: rbacLoading, isAdminOrAbove } = useRBAC();
  const location = useLocation();

  // Show loading state while checking auth and RBAC
  if (authLoading || rbacLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - let AuthGuard handle this
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Check if current path is allowed for all users
  const isAllowedRoute = PUBLIC_ALLOWED_ROUTES.some(
    (route) => location.pathname === route || location.pathname.startsWith(route + '/')
  );

  // Non-admin user trying to access restricted route
  if (!isAdminOrAbove && !isAllowedRoute) {
    return (
      <Navigate
        to={redirectTo}
        state={{
          from: location,
          reason: 'subscription',
          message: 'Acesso restrito a administradores',
        }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default SubscriptionGuard;
