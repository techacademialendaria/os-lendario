import type { TabConfig } from '../types';

export const TABS_CONFIG: TabConfig[] = [
  { value: 'advertorial', label: 'Advertorial', icon: 'file-edit' },
  { value: 'salespage', label: 'Pagina de Vendas', icon: 'shopping-cart' },
  { value: 'capture', label: 'Captura (Lead)', icon: 'magnet' },
  { value: 'vsl', label: 'VSL & Video', icon: 'play-circle' },
  { value: 'webinar', label: 'Webinario', icon: 'presentation' },
  { value: 'thankyou', label: 'Obrigado / Upsell', icon: 'check-circle' },
  {
    value: 'checklist',
    label: 'Checklist Cientifico',
    icon: 'list-check',
    isHighlighted: true,
  },
];

export const HEADER_MASTERS = [
  'Hopkins',
  'Reeves',
  'Schwartz',
  'Hormozi',
  'Georgi',
  'Dunford',
];
