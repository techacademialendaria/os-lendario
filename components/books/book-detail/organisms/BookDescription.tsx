import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface BookDescriptionProps {
  description: string;
  displayedDescription: string;
  shouldTruncate: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  // Edit mode props
  isEditMode?: boolean;
  fullDescription?: string;
  onDescriptionChange?: (value: string) => void;
}

export const BookDescription: React.FC<BookDescriptionProps> = ({
  displayedDescription,
  shouldTruncate,
  isExpanded,
  onToggle,
  isEditMode = false,
  fullDescription,
  onDescriptionChange,
}) => {
  if (!displayedDescription && !isEditMode) return null;

  // In edit mode, always show the full description
  const textToEdit = fullDescription ?? displayedDescription;

  if (isEditMode && onDescriptionChange) {
    return (
      <div className="space-y-4">
        <textarea
          value={textToEdit}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={6}
          className={cn(
            'w-full resize-none bg-transparent font-serif text-lg leading-relaxed text-muted-foreground md:text-xl',
            'rounded-lg border-0 px-3 py-2 -mx-3',
            'ring-2 ring-primary/20 focus:ring-primary/40',
            'bg-primary/5 focus:bg-primary/10',
            'outline-none transition-all duration-200'
          )}
          placeholder="Descrição do livro..."
        />
      </div>
    );
  }

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
