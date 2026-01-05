import React from 'react';
import { Icon, type IconName } from '../../ui/icon';
import { cn } from '../../../lib/utils';

export interface Category {
  slug: string;
  name: string;
  bookCount: number;
  icon: IconName;
  color: string; // Tailwind bg class e.g., 'bg-purple-500'
}

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, className }) => {
  return (
    <div
      className={cn(
        'group relative flex cursor-pointer items-center gap-5 rounded-2xl border border-border/50 bg-card p-5 transition-all duration-500 hover:border-border hover:shadow-xl overflow-hidden',
        className
      )}
      onClick={onClick}
    >
      {/* Background glow on hover */}
      <div className={cn('absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700', category.color.replace('bg-', 'bg-') + '/5')}></div>

      {/* Icon Container */}
      <div className="relative shrink-0 transition-transform duration-500 group-hover:-translate-y-1">
        <div
          className={cn(
            'relative flex h-14 w-14 items-center justify-center rounded-xl text-black shadow-lg transition-transform duration-500 group-hover:scale-105',
            category.color
          )}
        >
          <Icon name={category.icon} size="size-6" />
        </div>
      </div>

      {/* Category Info */}
      <div className="relative min-w-0 flex-1">
        <h4 className="text-base font-bold leading-tight transition-colors duration-300 group-hover:text-primary truncate">
          {category.name}
        </h4>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {category.bookCount} {category.bookCount === 1 ? 'livro' : 'livros'}
        </p>
      </div>

      {/* Arrow on hover */}
      <div className="relative opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <Icon name="chevron-right" className="text-muted-foreground" size="size-5" />
      </div>
    </div>
  );
};

export default CategoryCard;
