import type { ModalGalleryItem, NotificationSetting } from '../types';

export const modalGalleryItems: ModalGalleryItem[] = [
  { id: 'cookie', icon: 'cookie', label: 'Cookies (Filled)' },
  { id: 'image', icon: 'image', label: 'Image Top' },
  { id: 'notification', icon: 'settings', label: 'Switch Settings' },
  { id: 'payment', icon: 'credit-card', label: 'Transacional' },
];

export const notificationSettings: NotificationSetting[] = [
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

export const ALAN_AVATAR_URL =
  'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

export const FEATURE_IMAGE_URL =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop';
