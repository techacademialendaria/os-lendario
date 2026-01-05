/**
 * CategoriesSection - Browse books by category
 */

import React from 'react';
import CategoryCard from '../../ui/CategoryCard';
import { getCategoryStyle, getCategoryName } from '../../constants';
import type { CategoriesSectionProps } from '../types';

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onCategoryClick,
  onViewAll,
  isLoading,
}) => {
  if (categories.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-6">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">Explorar</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Categorias</h2>
        </div>
        <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
        <button
          onClick={onViewAll}
          className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground shrink-0"
        >
          Ver todas &rarr;
        </button>
      </div>

      {/* Mobile: horizontal scroll, Desktop: grid */}
      <div className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 min-w-[260px] shrink-0 animate-pulse snap-start rounded-2xl bg-muted/50 md:h-24 md:min-w-0"></div>
            ))
          : categories.slice(0, 8).map((cat) => {
              const style = getCategoryStyle(cat.slug);
              return (
                <div key={cat.slug} className="min-w-[260px] shrink-0 snap-start md:min-w-0">
                  <CategoryCard
                    category={{
                      slug: cat.slug,
                      name: getCategoryName(cat.slug),
                      bookCount: cat.count,
                      icon: style.icon,
                      color: style.color,
                    }}
                    onClick={() => onCategoryClick(cat.slug)}
                  />
                </div>
              );
            })}
      </div>
    </section>
  );
};
