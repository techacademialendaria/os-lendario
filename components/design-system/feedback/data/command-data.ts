import type { CommandGroup } from '../types';

export const commandGroups: CommandGroup[] = [
  {
    heading: 'Sugestoes',
    items: [
      { icon: 'calendar', label: 'Agendar Mentoria' },
      { icon: 'rocket', label: 'Novo Projeto' },
      { icon: 'magic-wand', label: 'Gerar com IA', shortcut: 'P' },
    ],
  },
  {
    heading: 'Configuracoes',
    items: [
      { icon: 'user', label: 'Perfil', shortcut: 'P' },
      { icon: 'credit-card', label: 'Faturamento', shortcut: 'B' },
      { icon: 'settings', label: 'Preferencias', shortcut: 'S' },
    ],
  },
];
