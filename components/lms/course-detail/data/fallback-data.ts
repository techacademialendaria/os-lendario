// Fallback/Mock data for LMS Course Detail
// Extracted from LmsCourseDetailTemplate.tsx

import type { Course, Resource, Student, StudentStatus, StatusStyle } from '../types';

export const fallbackCourse: Course = {
  title: 'Vibecoding - Apps Sem Codigo',
  author: 'Alan Nicolas',
  description:
    'Aprenda a construir aplicacoes web completas usando ferramentas No-Code e inteligencia artificial. Do zero ao deploy em semanas, nao meses.',
  progress: 35,
  totalLessons: 42,
  completedLessons: 12,
  rating: 4.9,
  students: 1240,
  lastUpdated: 'Out 2025',
  cover:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
  modules: [
    {
      id: 'm1',
      title: 'Modulo 1: Fundamentos',
      duration: '1h 20m',
      lessons: [
        {
          id: 'l1',
          title: 'Boas Vindas & Mindset',
          duration: '10:05',
          status: 'completed' as const,
        },
        { id: 'l2', title: 'O que e No-Code?', duration: '15:20', status: 'completed' as const },
        {
          id: 'l3',
          title: 'Configurando o Ambiente',
          duration: '12:10',
          status: 'completed' as const,
        },
      ],
    },
    {
      id: 'm2',
      title: 'Modulo 2: Banco de Dados',
      duration: '2h 15m',
      lessons: [
        { id: 'l4', title: 'Estrutura Relacional', duration: '25:00', status: 'current' as const },
        { id: 'l5', title: 'Tipos de Dados', duration: '18:45', status: 'locked' as const },
        { id: 'l6', title: 'Tabelas e Conexoes', duration: '32:10', status: 'locked' as const },
      ],
    },
    {
      id: 'm3',
      title: 'Modulo 3: Automacoes',
      duration: '3h 40m',
      lessons: [
        { id: 'l7', title: 'Logica de Workflows', duration: '20:00', status: 'locked' as const },
        { id: 'l8', title: 'Integrando APIs', duration: '45:00', status: 'locked' as const },
      ],
    },
  ],
};

export const resources: Resource[] = [
  {
    id: 1,
    title: 'Slide Deck: Fundamentos No-Code',
    type: 'PDF',
    size: '2.4 MB',
    icon: 'file-pdf',
    color: 'text-red-400',
  },
  {
    id: 2,
    title: 'Comunidade Discord (Vibecoding)',
    type: 'Link',
    size: 'Externo',
    icon: 'discord',
    color: 'text-indigo-400',
  },
  {
    id: 3,
    title: 'Template de Banco de Dados',
    type: 'CSV',
    size: '15 KB',
    icon: 'file-csv',
    color: 'text-green-400',
  },
  {
    id: 4,
    title: 'Checklist de Lancamento de App',
    type: 'Notion',
    size: 'Link',
    icon: 'file-check',
    color: 'text-foreground',
  },
  {
    id: 5,
    title: 'Codigo Fonte: Aula 12',
    type: 'ZIP',
    size: '120 MB',
    icon: 'folder-zip',
    color: 'text-yellow-400',
  },
];

export const studentsList: Student[] = [
  {
    id: 1,
    name: 'Mariana Costa',
    email: 'mariana@example.com',
    status: 'active',
    progress: 85,
    lastAccess: '2h atras',
    avatar: 'https://i.pravatar.cc/150?u=mc',
  },
  {
    id: 2,
    name: 'Joao Pedro',
    email: 'joao@example.com',
    status: 'risk',
    progress: 42,
    lastAccess: '1 dia atras',
    avatar: 'https://i.pravatar.cc/150?u=jp',
  },
  {
    id: 3,
    name: 'Lucas Silva',
    email: 'lucas@example.com',
    status: 'completed',
    progress: 100,
    lastAccess: '3 dias atras',
    avatar: 'https://i.pravatar.cc/150?u=ls',
  },
  {
    id: 4,
    name: 'Ana Beatriz',
    email: 'ana@example.com',
    status: 'inactive',
    progress: 12,
    lastAccess: '15 dias atras',
    avatar: 'https://i.pravatar.cc/150?u=ab',
  },
  {
    id: 5,
    name: 'Carlos Eduardo',
    email: 'carlos@example.com',
    status: 'active',
    progress: 68,
    lastAccess: '5h atras',
    avatar: 'https://i.pravatar.cc/150?u=ce',
  },
  {
    id: 6,
    name: 'Fernanda Lima',
    email: 'fernanda@example.com',
    status: 'active',
    progress: 55,
    lastAccess: '10h atras',
    avatar: 'https://i.pravatar.cc/150?u=fl',
  },
  {
    id: 7,
    name: 'Roberto Dias',
    email: 'roberto@example.com',
    status: 'risk',
    progress: 30,
    lastAccess: '5 dias atras',
    avatar: 'https://i.pravatar.cc/150?u=rd',
  },
];

export const getStatusStyle = (status: StudentStatus): StatusStyle => {
  switch (status) {
    case 'active':
      return { label: 'Online', class: 'bg-green-500/20 text-green-500 border-green-500/30' };
    case 'risk':
      return { label: 'Ausente', class: 'bg-orange-500/20 text-orange-500 border-orange-500/30' };
    case 'completed':
      return { label: 'Concluiu', class: 'bg-blue-500/20 text-blue-500 border-blue-500/30' };
    default:
      return { label: 'Offline', class: 'bg-zinc-500/20 text-zinc-500 border-zinc-500/30' };
  }
};
