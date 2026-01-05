import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

// ============================================================================
// Types
// ============================================================================

export type RoleId = 'owner' | 'admin' | 'collaborator' | 'student' | 'free_user';
export type ScopeType = 'global' | 'mind' | 'project';
export type AreaType = 'mkt' | 'pedagogico' | 'financeiro' | 'conteudo' | 'suporte' | 'tech';

export interface Role {
  id: RoleId;
  display_name: string;
  description: string | null;
  hierarchy_level: number;
  permissions: Record<string, boolean>;
}

export interface UserRole {
  id: string;
  user_id: string;
  role_id: RoleId;
  scope_type: ScopeType;
  scope_id: string | null;
  areas: AreaType[];
  granted_by: string | null;
  granted_at: string;
  expires_at: string | null;
  notes: string | null;
}

export interface RBACState {
  // Current user's role info
  currentRole: RoleId | null;
  hierarchyLevel: number;
  areas: AreaType[];

  // Role checks
  isOwner: boolean;
  isAdminOrAbove: boolean;
  isCollaboratorOrAbove: boolean;
  isStudentOrAbove: boolean;

  // Loading state
  loading: boolean;
  error: string | null;
}

export interface UseRBACReturn extends RBACState {
  // Refresh
  refresh: () => Promise<void>;

  // Permission checks
  hasArea: (area: AreaType) => boolean;
  hasPermission: (permission: string) => boolean;
  canAccessRoute: (route: string) => boolean;

  // Role management (for admin UI)
  grantRole: (userId: string, roleId: RoleId, options?: GrantRoleOptions) => Promise<string>;
  revokeRole: (userId: string, roleId: RoleId, scopeType?: ScopeType, scopeId?: string | null) => Promise<boolean>;
  updateUserAreas: (userId: string, areas: AreaType[]) => Promise<boolean>;

  // Data fetching
  fetchAllRoles: () => Promise<Role[]>;
  fetchUserRoles: (userId: string) => Promise<UserRole[]>;
}

export interface GrantRoleOptions {
  scopeType?: ScopeType;
  scopeId?: string | null;
  areas?: AreaType[];
  expiresAt?: string | null;
  notes?: string | null;
}

// ============================================================================
// Route Access Configuration
// ============================================================================

const ROUTE_ACCESS: Record<string, { minHierarchy: number; areas?: AreaType[] }> = {
  // Owner only
  '/studio/ops/db': { minHierarchy: 100 },
  '/studio/ops/users': { minHierarchy: 100 },

  // Admin+
  '/studio/ops': { minHierarchy: 80 },
  '/studio/admin': { minHierarchy: 80 },
  '/studio/analytics': { minHierarchy: 80 },

  // Collaborator+ (with area check)
  '/studio/content': { minHierarchy: 60, areas: ['conteudo', 'pedagogico'] },
  '/studio/marketing': { minHierarchy: 60, areas: ['mkt'] },
  '/studio/finance': { minHierarchy: 60, areas: ['financeiro'] },

  // Student+
  '/books': { minHierarchy: 40 },
  '/lms': { minHierarchy: 40 },

  // Free user+
  '/explore': { minHierarchy: 20 },
  '/public': { minHierarchy: 0 },
};

// ============================================================================
// Hook Implementation
// ============================================================================

export function useRBAC(): UseRBACReturn {
  const { user } = useAuth();

  const [state, setState] = useState<RBACState>({
    currentRole: null,
    hierarchyLevel: 0,
    areas: [],
    isOwner: false,
    isAdminOrAbove: false,
    isCollaboratorOrAbove: false,
    isStudentOrAbove: false,
    loading: true,
    error: null,
  });

  // --------------------------------------------------------------------------
  // Fetch current user's RBAC state
  // --------------------------------------------------------------------------

  const fetchRBACState = useCallback(async () => {
    if (!user) {
      setState(prev => ({
        ...prev,
        currentRole: null,
        hierarchyLevel: 0,
        areas: [],
        isOwner: false,
        isAdminOrAbove: false,
        isCollaboratorOrAbove: false,
        isStudentOrAbove: false,
        loading: false,
        error: null,
      }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Fetch user's roles
      const { data: userRolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select(`
          *,
          role:roles (
            id,
            display_name,
            hierarchy_level,
            permissions
          )
        `)
        .eq('user_id', user.id)
        .eq('scope_type', 'global')
        .or('expires_at.is.null,expires_at.gt.now()');

      if (rolesError) throw rolesError;

      // Type assertion for the joined query result
      const userRoles = userRolesData as unknown as Array<UserRole & { role: Role | null }>;

      // Calculate max hierarchy and collect areas
      let maxHierarchy = 0;
      let primaryRole: RoleId | null = null;
      const allAreas: AreaType[] = [];

      if (userRoles && userRoles.length > 0) {
        for (const ur of userRoles) {
          const role = ur.role;
          if (role && role.hierarchy_level > maxHierarchy) {
            maxHierarchy = role.hierarchy_level;
            primaryRole = role.id as RoleId;
          }
          if (ur.areas) {
            allAreas.push(...ur.areas);
          }
        }
      }

      // Admin+ has all areas
      const finalAreas = maxHierarchy >= 80
        ? ['mkt', 'pedagogico', 'financeiro', 'conteudo', 'suporte', 'tech'] as AreaType[]
        : [...new Set(allAreas)];

      setState({
        currentRole: primaryRole,
        hierarchyLevel: maxHierarchy,
        areas: finalAreas,
        isOwner: maxHierarchy >= 100,
        isAdminOrAbove: maxHierarchy >= 80,
        isCollaboratorOrAbove: maxHierarchy >= 60,
        isStudentOrAbove: maxHierarchy >= 40,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('Error fetching RBAC state:', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Erro ao carregar permissões',
      }));
    }
  }, [user]);

  // Fetch on mount and when user changes
  useEffect(() => {
    fetchRBACState();
  }, [fetchRBACState]);

  // --------------------------------------------------------------------------
  // Permission checks
  // --------------------------------------------------------------------------

  const hasArea = useCallback((area: AreaType): boolean => {
    return state.isAdminOrAbove || state.areas.includes(area);
  }, [state.isAdminOrAbove, state.areas]);

  const hasPermission = useCallback((permission: string): boolean => {
    // Owner has all permissions
    if (state.isOwner) return true;

    // TODO: Check specific permission in role.permissions JSONB
    // For now, simplified check based on hierarchy
    return state.isAdminOrAbove;
  }, [state.isOwner, state.isAdminOrAbove]);

  const canAccessRoute = useCallback((route: string): boolean => {
    // Find matching route config
    const config = Object.entries(ROUTE_ACCESS)
      .sort((a, b) => b[0].length - a[0].length) // Longest match first
      .find(([pattern]) => route.startsWith(pattern));

    if (!config) return true; // No restriction defined

    const [, { minHierarchy, areas: requiredAreas }] = config;

    // Check hierarchy
    if (state.hierarchyLevel < minHierarchy) return false;

    // Check areas if required
    if (requiredAreas && requiredAreas.length > 0) {
      return requiredAreas.some(area => hasArea(area));
    }

    return true;
  }, [state.hierarchyLevel, hasArea]);

  // --------------------------------------------------------------------------
  // Role management (for admin UI)
  // --------------------------------------------------------------------------

  const grantRole = useCallback(async (
    userId: string,
    roleId: RoleId,
    options: GrantRoleOptions = {}
  ): Promise<string> => {
    // @ts-expect-error - RPC types not fully inferred by Supabase
    const { data, error } = await supabase.rpc('grant_user_role', {
      p_user_id: userId,
      p_role_id: roleId,
      p_scope_type: options.scopeType || 'global',
      p_scope_id: options.scopeId || null,
      p_areas: options.areas || [],
      p_expires_at: options.expiresAt || null,
      p_notes: options.notes || null,
    });

    if (error) throw error;
    return data as string;
  }, []);

  const revokeRole = useCallback(async (
    userId: string,
    roleId: RoleId,
    scopeType: ScopeType = 'global',
    scopeId: string | null = null
  ): Promise<boolean> => {
    // @ts-expect-error - RPC types not fully inferred by Supabase
    const { data, error } = await supabase.rpc('revoke_user_role', {
      p_user_id: userId,
      p_role_id: roleId,
      p_scope_type: scopeType,
      p_scope_id: scopeId,
    });

    if (error) throw error;
    return data as boolean;
  }, []);

  const updateUserAreas = useCallback(async (
    userId: string,
    areas: AreaType[]
  ): Promise<boolean> => {
    // @ts-expect-error - RPC types not fully inferred by Supabase
    const { data, error } = await supabase.rpc('update_user_areas', {
      p_user_id: userId,
      p_areas: areas,
    });

    if (error) throw error;
    return data as boolean;
  }, []);

  // --------------------------------------------------------------------------
  // Data fetching helpers
  // --------------------------------------------------------------------------

  const fetchAllRoles = useCallback(async (): Promise<Role[]> => {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .order('hierarchy_level', { ascending: false });

    if (error) throw error;
    return data as Role[];
  }, []);

  const fetchUserRoles = useCallback(async (userId: string): Promise<UserRole[]> => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data as UserRole[];
  }, []);

  // --------------------------------------------------------------------------
  // Return
  // --------------------------------------------------------------------------

  return {
    ...state,
    refresh: fetchRBACState,
    hasArea,
    hasPermission,
    canAccessRoute,
    grantRole,
    revokeRole,
    updateUserAreas,
    fetchAllRoles,
    fetchUserRoles,
  };
}

// ============================================================================
// Utility: Role Badge Color
// ============================================================================

export function getRoleBadgeColor(roleId: RoleId | null): string {
  switch (roleId) {
    case 'owner': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'admin': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'collaborator': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'student': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'free_user': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

export function getRoleDisplayName(roleId: RoleId | null): string {
  switch (roleId) {
    case 'owner': return 'Owner';
    case 'admin': return 'Admin';
    case 'collaborator': return 'Colaborador';
    case 'student': return 'Aluno';
    case 'free_user': return 'Free';
    default: return 'Sem role';
  }
}
