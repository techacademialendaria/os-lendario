import type { StatusConfigMap } from '../types';

export const STATUS_CONFIG: StatusConfigMap = {
  none: { label: 'Quero Ler', icon: 'bookmark', color: 'bg-brand-green hover:bg-brand-green/90 text-black' },
  want_to_read: { label: 'Quero Ler', icon: 'bookmark', color: 'bg-brand-green text-black' },
  reading: { label: 'Lendo', icon: 'book-open', color: 'bg-blue-500 text-white' },
  read: { label: 'Lido', icon: 'check-circle', color: 'bg-brand-gold text-black' },
};

export const COVER_GRADIENTS = [
  'from-amber-600 to-orange-800',
  'from-blue-600 to-indigo-800',
  'from-emerald-600 to-teal-800',
  'from-purple-600 to-violet-800',
  'from-rose-600 to-pink-800',
];

export const DESCRIPTION_LIMIT = 300;
export const AUTHOR_BIO_LIMIT = 200;
