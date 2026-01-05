import type { Competitor, MarketGap, Source, PipelineStep } from '../types';

export const mockCompetitors: Competitor[] = [
  {
    id: '1',
    name: 'Curso de Didatica Premium',
    platform: 'Udemy',
    price: 'R$ 199',
    rating: 4.2,
    students: '12.5k',
    strengths: ['Preco acessivel', 'Muitos alunos'],
    weaknesses: ['Muito teorico', 'Desatualizado (2022)', 'Sem comunidade'],
  },
  {
    id: '2',
    name: 'Masterclass Ensino Online',
    platform: 'Hotmart',
    price: 'R$ 997',
    rating: 4.7,
    students: '3.2k',
    strengths: ['Alta qualidade', 'Comunidade ativa'],
    weaknesses: ['Preco alto', 'Foco em marketing'],
  },
  {
    id: '3',
    name: 'Professor Digital',
    platform: 'Eduzz',
    price: 'R$ 497',
    rating: 3.9,
    students: '8.1k',
    strengths: ['Templates inclusos', 'Suporte'],
    weaknesses: ['Interface ruim', 'Conteudo basico'],
  },
];

export const mockGaps: MarketGap[] = [
  {
    id: '1',
    description: 'Nenhum curso aborda IA aplicada a criacao de aulas',
    opportunity: 'high',
    addressed: false,
  },
  {
    id: '2',
    description: 'Falta de templates praticos prontos para uso',
    opportunity: 'high',
    addressed: false,
  },
  {
    id: '3',
    description: 'Ausencia de framework metodologico estruturado (GPS)',
    opportunity: 'high',
    addressed: true,
  },
  {
    id: '4',
    description: 'Poucos cursos focam em mobile-first learning',
    opportunity: 'medium',
    addressed: false,
  },
  {
    id: '5',
    description: 'Falta integracao com ferramentas modernas (Notion, Obsidian)',
    opportunity: 'medium',
    addressed: false,
  },
];

export const mockSources: Source[] = [
  {
    id: '1',
    title: 'Research: Online Learning Trends 2025',
    url: 'https://example.com/research',
    type: 'article',
    notes: 'Dados sobre retencao',
  },
  {
    id: '2',
    title: 'Livro: Made to Stick',
    url: '',
    type: 'book',
    notes: 'Framework de ideias memoraveis',
  },
  {
    id: '3',
    title: 'Analise de reviews Udemy',
    url: 'https://udemy.com',
    type: 'other',
    notes: 'Principais reclamacoes',
  },
];

export const defaultPipeline: PipelineStep[] = [
  { key: 'brief', label: 'Brief', status: 'completed' },
  { key: 'research', label: 'Research', status: 'current' },
  { key: 'curriculum', label: 'Curriculo', status: 'pending' },
  { key: 'lessons', label: 'Licoes', status: 'pending' },
  { key: 'validation', label: 'Validacao', status: 'pending' },
];
