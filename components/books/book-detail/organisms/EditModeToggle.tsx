import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface EditModeToggleProps {
  isEditMode: boolean;
  isSaving: boolean;
  onToggle: () => void;
}

export const EditModeToggle: React.FC<EditModeToggleProps> = ({
  isEditMode,
  isSaving,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      disabled={isSaving}
      className={cn(
        'fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 md:bottom-8',
        isEditMode
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'border border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground',
        isSaving && 'cursor-not-allowed opacity-70'
      )}
      title={isEditMode ? 'Sair do modo de edição' : 'Editar livro'}
    >
      {isSaving ? (
        <Icon name="spinner" size="size-5" className="animate-spin" />
      ) : isEditMode ? (
        <Icon name="check" size="size-5" />
      ) : (
        <Icon name="edit" size="size-5" />
      )}
    </button>
  );
};
