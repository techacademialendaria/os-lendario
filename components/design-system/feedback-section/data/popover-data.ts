import type { PopoverSettingsField } from '../types';

export const dimensionFields: PopoverSettingsField[] = [
  { id: 'width', label: 'Width', defaultValue: '100%' },
  { id: 'height', label: 'Height', defaultValue: 'Auto' },
];

export const profileMenuItems = [
  { icon: 'user', label: 'Perfil', variant: 'default' as const },
  { icon: 'credit-card', label: 'Faturamento', variant: 'default' as const },
  { icon: 'sign-out-alt', label: 'Sair', variant: 'destructive' as const },
];
