/**
 * RBACGuard - Proteção de rotas com RBAC
 *
 * Extende AuthGuard adicionando verificações de role/hierarquia/área
 *
 * Uso:
 * <RBACGuard minRole="admin">
 *   <AdminPanel />
 * </RBACGuard>
 *
 * <RBACGuard requiredAreas={['mkt', 'conteudo']}>
 *   <MarketingDashboard />
 * </RBACGuard>
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { useRBAC, RoleId, AreaType } from '../../hooks/useRBAC';

interface RBACGuardProps {
  children: React.ReactNode;
  /**
   * Minimum role required (checks hierarchy)
   * owner >= admin >= collaborator >= student >= free_user
   */
  minRole?: RoleId;
  /**
   * Minimum hierarchy level required (alternative to minRole)
   */
  minHierarchy?: number;
  /**
   * Required areas (user must have at least one)
   */
  requiredAreas?: AreaType[];
  /**
   * Required permission (from role.permissions JSONB)
   */
  requiredPermission?: string;
  /**
   * Custom redirect path (default: /access-denied)
   */
  redirectTo?: string;
  /**
   * Fallback component instead of redirect
   */
  fallback?: React.ReactNode;
}

const ROLE_HIERARCHY: Record<RoleId, number> = {
  owner: 100,
  admin: 80,
  collaborator: 60,
  student: 40,
  free_user: 20,
};

export const RBACGuard: React.FC<RBACGuardProps> = ({
  children,
  minRole,
  minHierarchy,
  requiredAreas,
  requiredPermission,
  redirectTo = '/access-denied',
  fallback,
}) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    hierarchyLevel,
    areas,
    loading: rbacLoading,
    hasPermission,
  } = useRBAC();
  const location = useLocation();

  // Show loading state while checking auth and RBAC
  if (authLoading || rbacLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check minimum role/hierarchy
  const requiredHierarchy = minRole ? ROLE_HIERARCHY[minRole] : minHierarchy;
  if (requiredHierarchy && hierarchyLevel < requiredHierarchy) {
    if (fallback) return <>{fallback}</>;
    return <Navigate to={redirectTo} state={{ from: location, reason: 'role' }} replace />;
  }

  // Check required areas (user must have at least one)
  if (requiredAreas && requiredAreas.length > 0) {
    const hasRequiredArea = requiredAreas.some((area) => areas.includes(area));
    if (!hasRequiredArea && hierarchyLevel < 80) {
      // Admin+ has all areas
      if (fallback) return <>{fallback}</>;
      return <Navigate to={redirectTo} state={{ from: location, reason: 'area' }} replace />;
    }
  }

  // Check required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    if (fallback) return <>{fallback}</>;
    return <Navigate to={redirectTo} state={{ from: location, reason: 'permission' }} replace />;
  }

  return <>{children}</>;
};

export default RBACGuard;
