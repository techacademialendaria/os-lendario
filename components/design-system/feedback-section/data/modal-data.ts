import type { ModalGalleryItem, NotificationToggle } from '../types';

export const modalGalleryItems: ModalGalleryItem[] = [
  { id: 'cookie', icon: 'cookie', label: 'Cookies (Filled)' },
  { id: 'image', icon: 'image', label: 'Image Top' },
  { id: 'notification', icon: 'settings', label: 'Switch Settings' },
  { id: 'payment', icon: 'credit-card', label: 'Transacional' },
];

export const notificationToggles: NotificationToggle[] = [
  {
    id: 'activity',
    label: 'Atividade da Conta',
    description: 'Seguranca e logins suspeitos.',
    defaultChecked: true,
  },
  {
    id: 'meetups',
    label: 'Novos Cursos',
    description: 'Lancamentos da Academia.',
    defaultChecked: false,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Ofertas e promocoes.',
    defaultChecked: false,
  },
];

export const paymentDetails = {
  plan: 'Lendario Pro',
  cycle: 'Mensal',
  total: 'R$ 97,00',
  monthlyPrice: 'R$ 97,00/mes',
};

export const legacyModalButtons = [
  { id: 'terms', label: 'Informativo (Terms)' },
  { id: 'form', label: 'Formulario (Edit)' },
  { id: 'success', label: 'Sucesso (Action)' },
  { id: 'destructive', label: 'Critico (Delete)' },
];
