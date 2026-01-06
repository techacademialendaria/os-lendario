import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface EditModeToggleProps {
  isEditMode: boolean;
  isSaving: boolean;
  saveSuccess: boolean;
  onToggle: () => void;
}

export const EditModeToggle: React.FC<EditModeToggleProps> = ({
  isEditMode,
  isSaving,
  saveSuccess,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      disabled={isSaving || saveSuccess}
      className={cn(
        'fixed bottom-8 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 md:flex',
        // Success state - green
        saveSuccess && 'bg-emerald-500 text-white scale-110',
        // Edit mode - primary
        !saveSuccess && isEditMode && 'bg-primary text-primary-foreground hover:bg-primary/90',
        // Default - card style
        !saveSuccess && !isEditMode && 'border border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground',
        // Disabled state
        (isSaving || saveSuccess) && 'cursor-not-allowed'
      )}
      title={isEditMode ? 'Salvar e sair' : 'Editar conteúdo'}
    >
      {isSaving ? (
        <Icon name="spinner" size="size-5" className="animate-spin" />
      ) : saveSuccess ? (
        <Icon name="check" size="size-5" />
      ) : isEditMode ? (
        <Icon name="check" size="size-5" />
      ) : (
        <Icon name="edit" size="size-5" />
      )}
    </button>
  );
};
