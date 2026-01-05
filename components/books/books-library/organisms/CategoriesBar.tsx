/**
 * CategoriesBar - Floating category filter bar
 * Displays category buttons for filtering books
 */

import React from 'react';
import { CategorySkeleton } from '../../ui/BookSkeletons';
import type { CategoriesBarProps } from '../types';

export const CategoriesBar: React.FC<CategoriesBarProps> = ({
  categories,
  onCategoryClick,
  onAllClick,
  isLoading,
}) => {
  if (isLoading) {
    return <CategorySkeleton />;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-foreground text-background shadow-lg transition-all duration-300 hover:opacity-90"
          onClick={onAllClick}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground bg-card/60 backdrop-blur-sm border border-border hover:text-foreground hover:border-foreground/30 transition-all duration-300"
            onClick={() => onCategoryClick(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};
