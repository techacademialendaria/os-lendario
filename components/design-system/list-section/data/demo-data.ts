// Static demo data for ListSection showcase
// Centralized data for all demo sections

import type { CheckStyle, ColorVariant, Shape } from '../types';

// Pricing Card Features
export const pricingFeatures = [
  'Acesso Ilimitado a IA',
  'Templates de Alta Conversao',
  'Suporte Prioritario 24/7',
  'Comunidade Exclusiva',
  'Certificacao Oficial',
];

// Project Setup Checklist
export const projectSetupCompleted = [
  'Definicao de Dominio',
  'Configuracao de DNS',
  'Instalacao de Certificado SSL',
];

export const projectSetupPending = [
  'Integracao de Pagamento',
  'Testes de Carga',
];

// Pros and Cons
export const prosItems = [
  'Alta Performance',
  'Escalabilidade Infinita',
  'Custo Beneficio',
];

export const consItems = [
  'Curva de aprendizado',
  'Requer internet ativa',
];

// Style Gallery Items
export interface StyleGalleryItem {
  label: string;
  style: CheckStyle;
  color: ColorVariant;
  shape?: Shape;
}

export const solidStyleItems: StyleGalleryItem[] = [
  { label: 'Primary Feature', style: 'solid', color: 'primary' },
  { label: 'Success State', style: 'solid', color: 'green' },
  { label: 'Alert / Critical', style: 'solid', color: 'red' },
  { label: 'Info Highlight', style: 'solid', color: 'blue' },
  { label: 'Neutral / Dark', style: 'solid', color: 'dark' },
];

export const softStyleItems: StyleGalleryItem[] = [
  { label: 'Primary Feature', style: 'soft', color: 'primary' },
  { label: 'Success State', style: 'soft', color: 'green' },
  { label: 'Alert / Critical', style: 'soft', color: 'red' },
  { label: 'Info Highlight', style: 'soft', color: 'blue' },
  { label: 'Neutral / Gray', style: 'soft', color: 'gray' },
];

export const outlinedStyleItems: StyleGalleryItem[] = [
  { label: 'Primary Feature', style: 'outlined', color: 'primary' },
  { label: 'Success State', style: 'outlined', color: 'green' },
  { label: 'Alert / Critical', style: 'outlined', color: 'red' },
  { label: 'Info Highlight', style: 'outlined', color: 'blue' },
  { label: 'Neutral / Gray', style: 'outlined', color: 'gray' },
];

// Shapes Demo Items
export const roundedShapeItems: StyleGalleryItem[] = [
  { label: 'Soft Rounded', style: 'soft', color: 'blue', shape: 'rounded' },
  { label: 'Solid Rounded', style: 'solid', color: 'blue', shape: 'rounded' },
  { label: 'Outlined Rounded', style: 'outlined', color: 'blue', shape: 'rounded' },
  { label: 'White Rounded', style: 'white', color: 'blue', shape: 'rounded' },
];

export const circleShapeItems: StyleGalleryItem[] = [
  { label: 'Soft Circle', style: 'soft', color: 'primary', shape: 'circle' },
  { label: 'Solid Circle', style: 'solid', color: 'primary', shape: 'circle' },
  { label: 'Outlined Circle', style: 'outlined', color: 'primary', shape: 'circle' },
  { label: 'White Circle', style: 'white', color: 'primary', shape: 'circle' },
];

// List Group Menu Items
export interface MenuItemConfig {
  label: string;
  icon?: string;
  badge?: string | number;
  isActive?: boolean;
  isDisabled?: boolean;
  isHover?: boolean;
}

export const basicMenuItems: MenuItemConfig[] = [
  { label: 'Profile' },
  { label: 'Active', isActive: true },
  { label: 'Hover', isHover: true },
  { label: 'Disabled', isDisabled: true },
];

export const iconMenuItems: MenuItemConfig[] = [
  { label: 'Profile', icon: 'user' },
  { label: 'Settings', icon: 'settings' },
  { label: 'Newsletter', icon: 'bell', badge: 'New' },
  { label: 'Team', icon: 'users-alt', badge: '99+', isActive: true },
];

export const stripedMenuItems: MenuItemConfig[] = [
  { label: 'Profile', icon: 'user' },
  { label: 'Settings', icon: 'settings', badge: 'New' },
  { label: 'Newsletter', icon: 'bell', badge: 2 },
  { label: 'Team', icon: 'users-alt', badge: '9+' },
];

// Metadata Contact Info
export interface ContactInfo {
  icon: string;
  text: string;
  isLink?: boolean;
}

export const contactMetadata: ContactInfo[] = [
  { icon: 'envelope', text: 'contato@academialendaria.com' },
  { icon: 'map-marker', text: 'Sao Paulo, SP - Brasil' },
  { icon: 'globe', text: 'www.academialendaria.com', isLink: true },
];
