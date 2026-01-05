import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface BookDescriptionProps {
  description: string;
  displayedDescription: string;
  shouldTruncate: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

export const BookDescription: React.FC<BookDescriptionProps> = ({
  displayedDescription,
  shouldTruncate,
  isExpanded,
  onToggle,
}) => {
  if (!displayedDescription) return null;

  return (
    <div className="space-y-4">
      <p className="font-serif text-lg leading-relaxed text-muted-foreground md:text-xl">
        {displayedDescription}
        {shouldTruncate && !isExpanded && '...'}
      </p>
      {shouldTruncate && (
        <button
          onClick={onToggle}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:text-primary"
        >
          {isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
          <Icon
            name="chevron-down"
            size="size-3"
            className={cn('transition-transform duration-300', isExpanded && 'rotate-180')}
          />
        </button>
      )}
    </div>
  );
};
