/**
 * Centralized style mappings for book categories and collections
 *
 * Used by:
 * - BooksCategoryTemplate
 * - BookCollectionTemplate
 * - AllCollectionsTemplate
 * - BooksLibraryTemplate
 */

import type { IconName } from '../../ui/icon';

export interface StyleConfig {
  icon: IconName;
  color: string;
}

export interface CategoryInfo {
  name: string;
  description: string;
}

/**
 * Category names and descriptions in Portuguese
 */
export const CATEGORY_INFO: Record<string, CategoryInfo> = {
  negocios: {
    name: 'Negócios',
    description: 'Estratégias, liderança e insights para empreendedores e executivos que querem transformar ideias em resultados.',
  },
  psicologia: {
    name: 'Psicologia',
    description: 'Compreenda a mente humana, comportamentos e emoções para viver com mais consciência e equilíbrio.',
  },
  filosofia: {
    name: 'Filosofia',
    description: 'Questões fundamentais sobre existência, ética e conhecimento que moldaram o pensamento humano.',
  },
  tecnologia: {
    name: 'Tecnologia',
    description: 'Inovação, inteligência artificial e tendências que estão redefinindo o futuro.',
  },
  biografias: {
    name: 'Biografias',
    description: 'Histórias inspiradoras de pessoas que deixaram sua marca no mundo.',
  },
  autoajuda: {
    name: 'Autoajuda',
    description: 'Ferramentas práticas para desenvolvimento pessoal, produtividade e bem-estar.',
  },
  produtividade: {
    name: 'Produtividade',
    description: 'Técnicas e sistemas para fazer mais com menos esforço e alcançar seus objetivos.',
  },
  lideranca: {
    name: 'Liderança',
    description: 'Princípios e práticas para inspirar equipes e liderar com propósito.',
  },
  financas: {
    name: 'Finanças',
    description: 'Investimentos, independência financeira e mentalidade de abundância.',
  },
  criatividade: {
    name: 'Criatividade',
    description: 'Desbloqueie seu potencial criativo e aprenda a pensar de forma inovadora.',
  },
  comunicacao: {
    name: 'Comunicação',
    description: 'A arte de se expressar, persuadir e conectar com as pessoas.',
  },
  espiritualidade: {
    name: 'Espiritualidade',
    description: 'Reflexões sobre propósito, consciência e a busca por significado.',
  },
};

/**
 * Get category name in Portuguese (falls back to capitalized slug)
 */
export const getCategoryName = (slug: string): string =>
  CATEGORY_INFO[slug]?.name || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/_/g, ' ');

/**
 * Get category description in Portuguese
 */
export const getCategoryDescription = (slug: string): string | null =>
  CATEGORY_INFO[slug]?.description || null;

/**
 * Category visual styles mapped by slug
 */
export const CATEGORY_STYLES: Record<string, StyleConfig> = {
  negocios: { icon: 'trend-up', color: 'bg-emerald-500' },
  psicologia: { icon: 'brain', color: 'bg-purple-500' },
  filosofia: { icon: 'bulb', color: 'bg-amber-500' },
  tecnologia: { icon: 'code', color: 'bg-blue-500' },
  biografias: { icon: 'user', color: 'bg-rose-500' },
  autoajuda: { icon: 'heart', color: 'bg-pink-500' },
  produtividade: { icon: 'clock', color: 'bg-cyan-500' },
  lideranca: { icon: 'crown', color: 'bg-orange-500' },
  financas: { icon: 'coins', color: 'bg-green-500' },
  criatividade: { icon: 'spark', color: 'bg-fuchsia-500' },
  comunicacao: { icon: 'comments', color: 'bg-indigo-500' },
  espiritualidade: { icon: 'peace', color: 'bg-violet-500' },
  default: { icon: 'book', color: 'bg-brand-gold' },
};

/**
 * Collection names and descriptions in Portuguese
 */
export const COLLECTION_INFO: Record<string, CategoryInfo> = {
  mente_alta_performance: {
    name: 'Mente de Alta Performance',
    description: 'Desenvolva foco, disciplina e mentalidade vencedora para alcançar resultados extraordinários.',
  },
  visoes_do_futuro: {
    name: 'Visões do Futuro',
    description: 'Explore tendências e previsões que moldarão os próximos anos.',
  },
  mentes_brilhantes: {
    name: 'Mentes Brilhantes',
    description: 'Aprenda com os maiores pensadores e inovadores da história.',
  },
  leituras_essenciais_ia_2026: {
    name: 'Leituras Essenciais de IA 2026',
    description: 'Os livros fundamentais para entender a revolução da inteligência artificial.',
  },
  estoicismo: {
    name: 'Estoicismo',
    description: 'Sabedoria antiga para enfrentar os desafios modernos com serenidade.',
  },
  classicos_negocios: {
    name: 'Clássicos de Negócios',
    description: 'Os livros atemporais que todo empreendedor deveria ler.',
  },
  startups_inovacao: {
    name: 'Startups & Inovação',
    description: 'Estratégias e histórias do ecossistema de startups e tecnologia.',
  },
};

/**
 * Get collection name in Portuguese (falls back to formatted slug)
 */
export const getCollectionName = (slug: string): string =>
  COLLECTION_INFO[slug]?.name || slug.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

/**
 * Get collection description in Portuguese
 */
export const getCollectionDescription = (slug: string): string | null =>
  COLLECTION_INFO[slug]?.description || null;

/**
 * Collection visual styles mapped by slug
 */
export const COLLECTION_STYLES: Record<string, StyleConfig> = {
  mente_alta_performance: { icon: 'brain', color: 'bg-purple-500' },
  visoes_do_futuro: { icon: 'rocket', color: 'bg-blue-500' },
  mentes_brilhantes: { icon: 'bulb', color: 'bg-yellow-500' },
  leituras_essenciais_ia_2026: { icon: 'book', color: 'bg-brand-gold' },
  estoicismo: { icon: 'scale', color: 'bg-stone-500' },
  classicos_negocios: { icon: 'briefcase', color: 'bg-emerald-500' },
  startups_inovacao: { icon: 'rocket', color: 'bg-pink-500' },
  default: { icon: 'book-stack', color: 'bg-brand-gold' },
};

/**
 * Get style config for a category by slug
 */
export const getCategoryStyle = (slug: string): StyleConfig =>
  CATEGORY_STYLES[slug] || CATEGORY_STYLES.default;

/**
 * Get style config for a collection by slug
 */
export const getCollectionStyle = (slug: string): StyleConfig =>
  COLLECTION_STYLES[slug] || COLLECTION_STYLES.default;
