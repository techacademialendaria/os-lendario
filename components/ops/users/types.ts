// ============================================================================
// RBAC Types
// ============================================================================

export type RoleId = 'owner' | 'admin' | 'collaborator' | 'student' | 'free_user';

export type AreaType = 'mkt' | 'pedagogico' | 'financeiro' | 'conteudo' | 'suporte' | 'tech';

export type ScopeType = 'global' | 'mind' | 'project';

export interface Role {
  id: RoleId;
  display_name: string;
  description?: string;
  hierarchy_level: number;
  permissions: Record<string, boolean>;
}

// ============================================================================
// User Management View (v_user_management)
// ============================================================================

export interface UserManagementView {
  user_id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  mind_id: string | null;
  mind_name: string | null;
  mind_slug: string | null;
  mind_avatar_url: string | null;
  role_id: RoleId | null;
  role_display_name: string | null;
  hierarchy_level: number | null;
  areas: AreaType[];
  scope_type: ScopeType | null;
  scope_id: string | null;
  granted_at: string | null;
  expires_at: string | null;
  registered_at: string;
  last_sign_in_at: string | null;
}

// ============================================================================
// Legacy Types (for backwards compatibility)
// ============================================================================

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  mind_id: string | null;
  created_at: string;
  updated_at: string;
  mind?: {
    id: string;
    name: string;
    slug: string;
    avatar_url: string | null;
    privacy_level: string;
  } | null;
}

export interface Mind {
  id: string;
  name: string;
  slug: string;
  avatar_url: string | null;
  privacy_level: string;
  short_bio: string | null;
}

export type MindOption = 'create_new' | 'link_existing' | 'none';

export interface SelectOption {
  label: string;
  value: string;
}

// ============================================================================
// Role Configuration
// ============================================================================

export const ROLE_CONFIG: Record<RoleId, { color: string; bgColor: string; label: string }> = {
  owner: {
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-500/10',
    label: 'Proprietário',
  },
  admin: { color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-500/10', label: 'Admin' },
  collaborator: {
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-500/10',
    label: 'Colaborador',
  },
  student: {
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500/10',
    label: 'Aluno',
  },
  free_user: {
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-500/10',
    label: 'Free',
  },
};

export const AREA_CONFIG: Record<AreaType, { color: string; label: string }> = {
  mkt: { color: 'bg-pink-500/20 text-pink-700 dark:text-pink-300', label: 'MKT' },
  pedagogico: {
    color: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300',
    label: 'Pedagógico',
  },
  financeiro: {
    color: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
    label: 'Financeiro',
  },
  conteudo: { color: 'bg-orange-500/20 text-orange-700 dark:text-orange-300', label: 'Conteúdo' },
  suporte: { color: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300', label: 'Suporte' },
  tech: { color: 'bg-violet-500/20 text-violet-700 dark:text-violet-300', label: 'Tech' },
};

export const ALL_AREAS: AreaType[] = [
  'mkt',
  'pedagogico',
  'financeiro',
  'conteudo',
  'suporte',
  'tech',
];

export const ALL_ROLES: RoleId[] = ['owner', 'admin', 'collaborator', 'student', 'free_user'];

// ============================================================================
// Sorting Types
// ============================================================================

export type UserSortKey = 'user' | 'role' | 'last_login';
export type SortOrder = 'asc' | 'desc';
