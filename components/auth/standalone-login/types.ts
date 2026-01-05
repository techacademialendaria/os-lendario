/**
 * Types for StandaloneLogin feature
 */

export type AuthView = 'login' | 'register' | 'forgot-password';

export interface InviteInfo {
  id: string;
  email: string;
  role_id: string;
  role_display_name?: string;
  areas: string[];
  message: string | null;
  expires_at: string;
  status: 'pending' | 'accepted' | 'cancelled' | 'expired';
}

// Molecule Props
export interface LuxuryInputProps {
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
  showToggle?: boolean;
  onToggle?: () => void;
  toggleState?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}

export interface LuxuryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  isLoading?: boolean;
}

export interface LuxuryLabelProps {
  children: React.ReactNode;
  htmlFor: string;
  extra?: React.ReactNode;
}

// Form Props
export interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  isTransitioning: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
}

export interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  inviteInfo: InviteInfo | null;
  inviteLoading: boolean;
  isLoading: boolean;
  isTransitioning: boolean;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface ForgotPasswordFormProps {
  email: string;
  isLoading: boolean;
  isTransitioning: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

// Organism Props
export interface LoginCardProps {
  view: AuthView;
  error: string | null;
  success: string | null;
  children: React.ReactNode;
  onViewChange: (view: AuthView) => void;
}

export interface AuthBackgroundProps {
  children: React.ReactNode;
}
