import type { TechnicalSpec } from '../types';

export const technicalSpecs: TechnicalSpec[] = [
  {
    label: 'Versão do Sistema',
    value: 'v4.1.0-alpha',
  },
  {
    label: 'Status do Servidor',
    value: 'Operacional',
    isStatus: true,
    statusColor: 'success',
  },
  {
    label: 'Framework',
    value: 'React 19 + TailwindCSS',
  },
  {
    label: 'Licença',
    value: 'Proprietária (Enterprise)',
    icon: 'lock',
  },
  {
    label: 'Último Backup',
    value: 'Hoje, 14:30h',
    isItalic: true,
  },
];
