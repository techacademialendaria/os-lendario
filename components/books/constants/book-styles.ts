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
  default: { icon: 'book', color: 'bg-brand-gold' },
};

/**
 * Collection visual styles mapped by slug
 */
export const COLLECTION_STYLES: Record<string, StyleConfig> = {
  mente_alta_performance: { icon: 'brain', color: 'bg-purple-500' },
  visoes_do_futuro: { icon: 'rocket', color: 'bg-blue-500' },
  mentes_brilhantes: { icon: 'bulb', color: 'bg-yellow-500' },
  leituras_essenciais_ia_2026: { icon: 'book', color: 'bg-brand-gold' },
  estoicismo: { icon: 'scale', color: 'bg-stone-500' },
  negocios: { icon: 'briefcase', color: 'bg-emerald-500' },
  psicologia: { icon: 'user', color: 'bg-pink-500' },
  produtividade: { icon: 'clock', color: 'bg-cyan-500' },
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
