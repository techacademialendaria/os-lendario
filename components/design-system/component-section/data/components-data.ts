/**
 * Static data for ComponentSection
 * Design System - Component Showcase
 */

import type { FaqItem, CourseModule, GuidelineItem, TagItem } from '../types';

// FAQ Data
export const faqItems: FaqItem[] = [
  {
    value: 'item-1',
    question: 'O que e a Academia Lendaria?',
    answer:
      'E um ecossistema de educacao focado em unir Inteligencia Artificial Generativa com mentalidade de alta performance para criar negocios e carreiras a prova de futuro.',
  },
  {
    value: 'item-2',
    question: 'Posso acessar offline?',
    answer:
      'Sim, atraves do nosso aplicativo mobile voce pode baixar aulas para assistir quando estiver sem conexao.',
  },
  {
    value: 'item-3',
    question: 'Qual a politica de reembolso?',
    answer:
      'Oferecemos garantia incondicional de 7 dias. Se nao ficar satisfeito, devolvemos 100% do seu investimento.',
  },
];

// Course Modules Data
export const courseModules: CourseModule[] = [
  {
    value: 'mod-1',
    number: '01',
    title: 'Fundamentos da IA',
    lessons: [
      { icon: 'play-circle', label: 'Aula 1: O que e LLM?' },
      { icon: 'play-circle', label: 'Aula 2: Engenharia de Prompt' },
    ],
  },
  {
    value: 'mod-2',
    number: '02',
    title: 'Aplicacoes de Negocio',
    lessons: [{ icon: 'lock', label: 'Conteudo Bloqueado', locked: true }],
  },
];

// Terms of Use sections
export const termsOfUseSections = [
  {
    title: '1. Introducao',
    paragraphs: [
      'Bem-vindo a Academia Lendaria. Ao acessar este sistema, voce concorda com...',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
  },
  {
    title: '2. Propriedade Intelectual',
    paragraphs: [
      'Todo o conteudo disponibilizado, incluindo textos, videos e codigos, e propriedade exclusiva...',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    ],
  },
  {
    title: '3. Responsabilidades',
    paragraphs: [
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },
];

// Generate tag items
export const generateTagItems = (count: number): TagItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    label: `Tag #${i + 1}`,
    count: 100 + i,
  }));

// Badge variants for showcase
export const semanticBadges = [
  { variant: 'default', label: 'Default' },
  { variant: 'secondary', label: 'Secondary' },
  { variant: 'outline', label: 'Outline' },
  { variant: 'destructive', label: 'Destructive' },
  { variant: 'success', label: 'Success' },
  { variant: 'warning', label: 'Warning' },
  { variant: 'info', label: 'Info' },
] as const;

export const roleBadges = [
  { variant: 'admin', label: 'Admin' },
  { variant: 'editor', label: 'Editor' },
  { variant: 'viewer', label: 'Viewer' },
] as const;

export const statusBadges = [
  { variant: 'active', label: 'Active' },
  { variant: 'pending', label: 'Pending' },
  { variant: 'inactive', label: 'Inactive' },
] as const;

// Guidelines data
export const doGuidelines: GuidelineItem[] = [
  {
    title: 'Hierarquia de Botoes',
    description:
      'Use apenas um botao primario (Gold) por secao ou card. Use variantes Secondary, Outline ou Ghost para acoes secundarias.',
  },
  {
    title: 'Rotulos Claros',
    description:
      'Use verbos de acao nos botoes (ex: "Salvar", "Criar", "Enviar"). Evite termos vagos como "Ok" ou "Sim".',
  },
  {
    title: 'Badges Semanticas',
    description:
      'Use Badges para status (Ativo/Pendente) ou categorias. Nao use para botoes clicaveis.',
  },
];

export const dontGuidelines: GuidelineItem[] = [
  {
    title: 'Excesso de Primarios',
    description:
      'Nao coloque varios botoes Default (Gold) lado a lado. O usuario nao sabera onde clicar.',
  },
  {
    title: 'Icones Isolados',
    description:
      'Em botoes com texto, o icone deve servir de apoio, nao substituir o rotulo (exceto em toolbars).',
  },
  {
    title: 'Tamanhos Misturados',
    description: 'Nao misture botoes de tamanho sm e lg na mesma linha de acao.',
  },
];

// Avatar data for showcase
export const avatarUsers = [
  { src: 'https://i.pravatar.cc/150?u=1', fallback: 'U1' },
  { src: 'https://i.pravatar.cc/150?u=2', fallback: 'U2' },
  { src: 'https://i.pravatar.cc/150?u=3', fallback: 'U3' },
  { fallback: 'U4' },
  { fallback: 'U5' },
];

export const onlineUsers = [
  { fallback: 'A', className: 'bg-green-100 text-green-700' },
  { fallback: 'B', className: 'bg-blue-100 text-blue-700' },
  { fallback: 'C', className: 'bg-blue-100 text-blue-700' },
  { fallback: 'D', className: 'bg-orange-100 text-orange-700' },
  { fallback: 'E' },
];
