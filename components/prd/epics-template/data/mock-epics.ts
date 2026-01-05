// Mock Epics Data
// Used for AI generation simulation

import type { EpicWithStories } from '../types';

export const MOCK_EPICS: EpicWithStories[] = [
  {
    id: 'E1',
    sequence_order: 1,
    title: 'FUNDACAO E AUTENTICACAO',
    description: 'Estabelecer base segura para o sistema.',
    storiesCount: 3,
    status: 'pending',
    stories: [],
    detailedStories: [
      {
        id: '1.1',
        title: 'Configurar ambiente Next.js + Supabase',
        verb: 'Configurar',
        complexity: 'M',
        criteria: 3,
      },
      {
        id: '1.2',
        title: 'Implementar login social Google',
        verb: 'Implementar',
        complexity: 'M',
        criteria: 2,
      },
      {
        id: '1.3',
        title: 'Criar sistema de Roles (RBAC)',
        verb: 'Criar',
        complexity: 'G',
        criteria: 4,
      },
    ],
  },
  {
    id: 'E2',
    sequence_order: 2,
    title: 'GESTAO DE DADOS',
    description: 'CRUD completo de entidades principais.',
    storiesCount: 2,
    status: 'pending',
    stories: [],
    detailedStories: [
      {
        id: '2.1',
        title: 'Desenvolver formulario de cadastro',
        verb: 'Desenvolver',
        complexity: 'M',
        criteria: 5,
      },
      {
        id: '2.2',
        title: 'Listar registros com busca e filtro',
        verb: 'Listar',
        complexity: 'P',
        criteria: 2,
      },
    ],
  },
  {
    id: 'E3',
    sequence_order: 3,
    title: 'DASHBOARD E RELATORIOS',
    description: 'Visualizacao de metricas e geracao de relatorios.',
    storiesCount: 2,
    status: 'pending',
    stories: [],
    detailedStories: [
      {
        id: '3.1',
        title: 'Criar componente de Dashboard',
        verb: 'Criar',
        complexity: 'G',
        criteria: 6,
      },
      {
        id: '3.2',
        title: 'Exportar relatorios em PDF',
        verb: 'Exportar',
        complexity: 'M',
        criteria: 3,
      },
    ],
  },
];
