import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface BookTagsRowProps {
  tags: Array<{ slug: string; name: string }>;
  isFavorite: boolean;
  isLoading: boolean;
  isTogglingFavorite: boolean;
  onTagClick: (slug: string) => void;
  onToggleFavorite: () => void;
}

export const BookTagsRow: React.FC<BookTagsRowProps> = ({
  tags,
  isFavorite,
  isLoading,
  isTogglingFavorite,
  onTagClick,
  onToggleFavorite,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Tags/Genres */}
      {tags.length > 0 && tags.map((tag) => (
        <Badge
          key={tag.slug}
          variant="outline"
          className="cursor-pointer rounded-full border-border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
          onClick={() => onTagClick(tag.slug)}
        >
          {tag.name}
        </Badge>
      ))}
      {/* Favorite Button - Compact */}
      <button
        onClick={onToggleFavorite}
        disabled={isLoading || isTogglingFavorite}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.1em] transition-all duration-300 disabled:opacity-50",
          isFavorite
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
        )}
      >
        <Icon
          name={isFavorite ? 'star-solid' : 'star'}
          size="size-3"
          className={isFavorite ? 'text-primary' : ''}
        />
        {isFavorite ? 'Favorito' : 'Favoritar'}
      </button>
    </div>
  );
};
