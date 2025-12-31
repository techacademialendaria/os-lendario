import React from 'react';
import { Icon, type IconName } from '../../ui/icon';
import { cn } from '../../../lib/utils';

export interface Collection {
  id: string;
  title: string;
  bookCount: number;
  icon: IconName;
  color: string; // Tailwind bg class e.g., 'bg-yellow-500'
}

interface CollectionCardProps {
  collection: Collection;
  onClick?: () => void;
  className?: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onClick, className }) => {
  return (
    <div
      className={cn(
        'group flex cursor-pointer items-center gap-6 rounded-xl border border-border/50 bg-card p-6 transition-colors hover:bg-muted/10',
        className
      )}
      onClick={onClick}
    >
      {/* Stacked Book Effect */}
      <div className="relative">
        {/* Back cards (stack effect) */}
        <div className="absolute right-0 top-0 h-24 w-20 translate-x-2 rotate-6 rounded border border-border bg-card shadow-sm"></div>
        <div className="absolute right-0 top-0 h-24 w-20 -rotate-3 translate-x-1 rounded border border-border bg-card shadow-sm"></div>

        {/* Main Cover with Icon */}
        <div
          className={cn(
            'relative flex h-24 w-20 items-center justify-center rounded text-black shadow-lg',
            collection.color
          )}
        >
          <Icon name={collection.icon} size="size-8" />
        </div>
      </div>

      {/* Collection Info */}
      <div>
        <h4 className="text-lg font-bold leading-tight transition-colors group-hover:text-primary">
          {collection.title}
        </h4>
        <p className="mt-1 text-xs text-muted-foreground">{collection.bookCount} livros</p>
      </div>
    </div>
  );
};

export default CollectionCard;
