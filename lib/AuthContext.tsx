/**
 * AuthContext - Sistema de autenticação centralizado
 *
 * Segue o padrão do ThemeContext.tsx
 * Suporta: Email/Senha
 * TODO: Google OAuth e Magic Link (desativados temporariamente)
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase';

// ============================================================================
// Types
// ============================================================================

export interface AuthUser {
  id: string;
  email: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  mindId: string | null;
}

interface AuthContextType {
  // State
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Auth methods
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;

  // Utils
  refreshUser: () => Promise<void>;

  // OAuth methods (disabled - return error)
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signInWithMagicLink: (email: string) => Promise<{ error: AuthError | null }>;
}

// ============================================================================
// Error Messages (Portuguese)
// ============================================================================

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': 'Email ou senha incorretos',
  'Email not confirmed': 'Por favor, confirme seu email antes de entrar',
  'User already registered': 'Este email já está cadastrado',
  'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres',
  'Unable to validate email address: invalid format': 'Formato de email inválido',
  'Email rate limit exceeded': 'Muitas tentativas. Aguarde alguns minutos.',
  'Signup requires a valid password': 'Por favor, informe uma senha válida',
  'Invalid email or password': 'Email ou senha incorretos',
  'Auth session missing!': 'Sessão expirada. Faça login novamente.',
  'User not found': 'Usuário não encontrado',
  'Network request failed': 'Erro de conexão. Verifique sua internet.',
  'Failed to fetch': 'Erro de conexão. Verifique sua internet.',
  'Database error querying schema': 'Erro no banco de dados. Contate o administrador.',
  'Database error': 'Erro no banco de dados. Contate o administrador.',
  default: 'Ocorreu um erro. Tente novamente.',
};

export function getAuthErrorMessage(error: AuthError | Error | null): string {
  if (!error) return '';
  const message = error.message || '';

  // Direct match
  if (AUTH_ERROR_MESSAGES[message]) {
    return AUTH_ERROR_MESSAGES[message];
  }

  // Partial match (some Supabase errors have extra details)
  for (const [key, value] of Object.entries(AUTH_ERROR_MESSAGES)) {
    if (key !== 'default' && message.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  // Unknown error - return default message
  // In development, you can uncomment the line below to see unmapped errors:
  // console.warn('Unknown auth error message:', message);
  return AUTH_ERROR_MESSAGES['default'];
}

// ============================================================================
// Context
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Transform Supabase User to our AuthUser type
  // Fetches user_profiles to get mind_id, then fetches mind for avatar/name
  const transformUser = useCallback(async (supabaseUser: User | null): Promise<AuthUser | null> => {
    if (!supabaseUser) return null;

    // Default user from auth metadata
    const defaultUser: AuthUser = {
      id: supabaseUser.id,
      email: supabaseUser.email ?? null,
      fullName: supabaseUser.user_metadata?.full_name ?? supabaseUser.email?.split('@')[0] ?? null,
      avatarUrl: supabaseUser.user_metadata?.avatar_url ?? null,
      mindId: null,
    };

    try {
      // Query with timeout to prevent hanging
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout')), 5000)
      );

      const queryPromise = (async () => {
        // 1. Get user_profile to find mind_id
        // Type cast needed as user_profiles is not in generated types yet
        const { data: profile, error: profileError } = await (supabase
          .from('user_profiles' as any)
          .select('mind_id')
          .eq('id', supabaseUser.id)
          .maybeSingle() as unknown as Promise<{ data: { mind_id: string } | null; error: any }>);

        if (profileError || !profile?.mind_id) {
          return defaultUser;
        }

        // 2. Get mind data for avatar and name
        // Type cast needed as minds table may not be in generated types
        const { data: mind, error: mindError } = await (supabase
          .from('minds')
          .select('name, avatar_url')
          .eq('id', profile.mind_id)
          .maybeSingle() as unknown as Promise<{
          data: { name: string | null; avatar_url: string | null } | null;
          error: any;
        }>);

        if (mindError || !mind) {
          return {
            ...defaultUser,
            mindId: profile.mind_id,
          };
        }

        // 3. Return full user with mind data
        const mindData = mind as { name?: string; avatar_url?: string };
        return {
          id: supabaseUser.id,
          email: supabaseUser.email ?? null,
          fullName: mindData.name ?? defaultUser.fullName,
          avatarUrl: mindData.avatar_url ?? defaultUser.avatarUrl,
          mindId: profile.mind_id,
        };
      })();

      return (await Promise.race([queryPromise, timeoutPromise])) as AuthUser;
    } catch (error) {
      // Timeout or any error - use default
      console.warn('Error fetching user profile:', error);
      return defaultUser;
    }
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
          setIsLoading(false);
          return;
        }

        setSession(session);
        if (session?.user) {
          const authUser = await transformUser(session.user);
          setUser(authUser);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      if (session?.user) {
        const authUser = await transformUser(session.user);
        setUser(authUser);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [transformUser]);

  // ============================================================================
  // Auth Methods
  // ============================================================================

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  };

  // OAuth methods - currently disabled, return error message
  const signInWithGoogle = async () => {
    return {
      error: {
        message: 'Google OAuth is temporarily disabled',
        name: 'AuthError',
        status: 501,
      } as AuthError,
    };
  };

  const signInWithMagicLink = async (_email: string) => {
    return {
      error: {
        message: 'Magic Link login is temporarily disabled',
        name: 'AuthError',
        status: 501,
      } as AuthError,
    };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    });
    return { error };
  };

  const refreshUser = async () => {
    if (session?.user) {
      const authUser = await transformUser(session.user);
      setUser(authUser);
    }
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        resetPassword,
        refreshUser,
        signInWithGoogle,
        signInWithMagicLink,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ============================================================================
// Hook
// ============================================================================

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
