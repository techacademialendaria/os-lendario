import type { Module } from '../types';

export const initialModules: Module[] = [
  {
    id: 1,
    title: 'O Desafio do Engajamento',
    description: 'Por que 70% dos alunos abandonam cursos.',
    isExpanded: true,
    lessons: [
      {
        id: '1.1',
        title: 'Introducao ao Desafio',
        duration: '8 min',
        type: 'video',
        status: 'completed',
      },
      {
        id: '1.2',
        title: 'A Curva da Atencao',
        duration: '7 min',
        type: 'video',
        status: 'completed',
      },
      { id: '1.3', title: 'Erros Comuns', duration: '8 min', type: 'video', status: 'in_progress' },
      { id: '1.4', title: 'Case de Sucesso', duration: '7 min', type: 'video', status: 'draft' },
    ],
  },
  {
    id: 2,
    title: 'Metodo GPS',
    description: 'Dominar Destino + Origem + Rota.',
    isExpanded: true,
    lessons: [
      { id: '2.1', title: 'Destino Claro', duration: '10 min', type: 'video', status: 'draft' },
      { id: '2.2', title: 'Origem (Empatia)', duration: '8 min', type: 'video', status: 'draft' },
      { id: '2.3', title: 'Rota Otimizada', duration: '9 min', type: 'video', status: 'draft' },
      { id: '2.4', title: 'Workshop GPS', duration: '8 min', type: 'practice', status: 'draft' },
    ],
  },
  {
    id: 3,
    title: 'Didatica para o Aluno Lendario',
    description: 'Adaptar para o ICP da Academia.',
    isExpanded: false,
    lessons: [
      { id: '3.1', title: 'Perfil do Aluno', duration: '10 min', type: 'video', status: 'draft' },
      { id: '3.2', title: 'Linguagem e Tom', duration: '8 min', type: 'video', status: 'draft' },
      { id: '3.3', title: 'Exemplos Praticos', duration: '12 min', type: 'video', status: 'draft' },
      { id: '3.4', title: 'Andragogia', duration: '10 min', type: 'video', status: 'draft' },
      { id: '3.5', title: 'Gamificacao', duration: '10 min', type: 'video', status: 'draft' },
      { id: '3.6', title: 'Feedback Loop', duration: '5 min', type: 'video', status: 'draft' },
      { id: '3.7', title: 'Conclusao do Modulo', duration: '5 min', type: 'text', status: 'draft' },
    ],
  },
  {
    id: 4,
    title: 'Semiotica da Imagem',
    description: 'Transformar conceitos em imagens mentais.',
    isExpanded: false,
    lessons: [
      {
        id: '4.1',
        title: 'Fundamentos da Semiotica',
        duration: '10 min',
        type: 'video',
        status: 'draft',
      },
      { id: '4.2', title: 'Metaforas Visuais', duration: '10 min', type: 'video', status: 'draft' },
      {
        id: '4.3',
        title: 'Storytelling Visual',
        duration: '10 min',
        type: 'video',
        status: 'draft',
      },
      { id: '4.4', title: 'Exercicio Pratico', duration: '10 min', type: 'quiz', status: 'draft' },
    ],
  },
  {
    id: 5,
    title: 'Estrutura de Aula Completa',
    description: 'As 7 partes de uma aula perfeita.',
    isExpanded: false,
    lessons: [
      { id: '5.1', title: 'O Hook (Gancho)', duration: '8 min', type: 'video', status: 'draft' },
      { id: '5.2', title: 'Desenvolvimento', duration: '12 min', type: 'video', status: 'draft' },
      { id: '5.3', title: 'Climax', duration: '8 min', type: 'video', status: 'draft' },
      { id: '5.4', title: 'Call to Action', duration: '7 min', type: 'video', status: 'draft' },
      { id: '5.5', title: 'Revisao', duration: '10 min', type: 'quiz', status: 'draft' },
    ],
  },
];

export const defaultPipeline = [
  { key: 'brief' as const, label: 'Brief', status: 'completed' as const },
  { key: 'research' as const, label: 'Research', status: 'completed' as const },
  { key: 'overview' as const, label: 'Curriculo', status: 'current' as const },
  { key: 'lessons' as const, label: 'Licoes', status: 'pending' as const },
  { key: 'validation' as const, label: 'Validacao', status: 'pending' as const },
];
