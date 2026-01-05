// Types for TableSection components

export interface RankingContributor {
  position: number;
  positionStyle: 'gold' | 'silver' | 'bronze';
  initials: string;
  name: string;
  role: string;
  promptsApproved: number;
  avgScore: number;
  views: number;
  favorites: number;
  reviews: number;
}

export interface Invoice {
  id: string;
  status: 'paid' | 'pending' | 'cancelled';
  method: 'credit-card' | 'pix' | 'boleto';
  methodLabel: string;
  methodIcon: string;
  date: string;
  amount: string;
  isCancelled?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials: string;
  status: 'active' | 'offline';
}

export interface TechnicalSpec {
  label: string;
  value: string;
  icon?: string;
  isStatus?: boolean;
  statusColor?: string;
  isItalic?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  hasCheckin?: boolean;
  city: string;
  specialty: string;
  specialtyVariant: 'secondary' | 'outline';
  skills: string[];
  permission: 'admin' | 'mentor' | 'participant';
  team?: string;
}

export interface PerformanceRow {
  id: number;
  name: string;
  tag: string;
  avatar: string;
  scores: number[];
  total: number;
}

export interface KPICard {
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
  label: string;
  sublabel?: string;
  value: number;
}

export const POSITION_STYLES = {
  gold: 'border-brand-yellow/50 bg-brand-yellow text-black',
  silver: 'border-border bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100',
  bronze: 'border-brand-orange/50 bg-brand-orange text-white',
} as const;

export const STATUS_BADGE_VARIANTS = {
  paid: 'success',
  pending: 'warning',
  cancelled: 'destructive',
} as const;

export const STATUS_LABELS = {
  paid: 'Pago',
  pending: 'Pendente',
  cancelled: 'Cancelado',
} as const;

export const PERMISSION_STYLES = {
  admin: {
    variant: 'destructive' as const,
    className: '',
    icon: 'shield-check',
    label: 'Admin',
  },
  mentor: {
    variant: 'default' as const,
    className: 'bg-brand-blue text-white hover:bg-brand-blue/90',
    icon: 'badge-check',
    label: 'Mentor',
  },
  participant: {
    variant: 'outline' as const,
    className: '',
    icon: 'graduation-cap',
    label: 'Participante',
  },
} as const;
