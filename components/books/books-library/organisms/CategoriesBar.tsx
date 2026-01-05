/**
 * CategoriesBar - Floating category filter bar
 * Mobile: Shows 2 rows with fade-out, "Ver mais" button
 * Desktop: Shows all categories
 */

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { CategorySkeleton } from '../../ui/BookSkeletons';
import { getCategoryName } from '../../constants';
import type { CategoriesBarProps } from '../types';

// Number of categories to show initially on mobile (roughly 2 rows)
const MOBILE_INITIAL_COUNT = 6;

export const CategoriesBar: React.FC<CategoriesBarProps> = ({
  categories,
  onCategoryClick,
  onAllClick,
  isLoading,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return <CategorySkeleton />;
  }

  const shouldShowExpander = isMobile && categories.length > MOBILE_INITIAL_COUNT;
  const visibleCategories = isMobile && !isExpanded
    ? categories.slice(0, MOBILE_INITIAL_COUNT)
    : categories;
  const hiddenCount = categories.length - MOBILE_INITIAL_COUNT;

  return (
    <div className="relative">
      {/* Categories Container */}
      <div className={cn(
        "flex justify-center relative",
        // On mobile when collapsed, add fade-out mask
        isMobile && !isExpanded && shouldShowExpander && "mask-fade-bottom"
      )}>
        <div className={cn(
          "flex flex-wrap justify-center gap-2",
          // On mobile when collapsed, limit height to ~2 rows
          isMobile && !isExpanded && "max-h-[88px] overflow-hidden"
        )}>
          {/* "Todos" button */}
          <button
            className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-foreground text-background shadow-lg transition-all duration-300 hover:opacity-90"
            onClick={onAllClick}
          >
            Todos
          </button>

          {/* Category buttons */}
          {visibleCategories.map((cat) => (
            <button
              key={cat.slug}
              className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground bg-card/60 backdrop-blur-sm border border-border hover:text-foreground hover:border-foreground/30 transition-all duration-300"
              onClick={() => onCategoryClick(cat.slug)}
            >
              {getCategoryName(cat.slug)}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: "Ver mais" / "Ver menos" button */}
      {shouldShowExpander && (
        <div className="flex justify-center mt-3 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground gap-1.5"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                Ver menos
                <Icon name="angle-small-up" size="size-4" />
              </>
            ) : (
              <>
                Ver mais {hiddenCount} categorias
                <Icon name="angle-small-down" size="size-4" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* CSS for fade-out effect */}
      <style>{`
        .mask-fade-bottom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 32px;
          background: linear-gradient(to bottom, transparent, hsl(var(--background)));
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};
