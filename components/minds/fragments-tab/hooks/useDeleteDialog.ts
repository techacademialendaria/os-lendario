import { useState, useCallback } from 'react';
import type { MindFragment, UseDeleteDialogReturn } from '../types';

interface UseDeleteDialogOptions {
  onDelete: (id: string) => Promise<boolean>;
  onDeleteSuccess?: (id: string) => void;
}

export function useDeleteDialog({ onDelete, onDeleteSuccess }: UseDeleteDialogOptions): UseDeleteDialogReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [fragment, setFragment] = useState<MindFragment | null>(null);

  const open = useCallback((fragmentToDelete: MindFragment) => {
    setFragment(fragmentToDelete);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setFragment(null);
  }, []);

  const confirm = useCallback(async (id: string): Promise<boolean> => {
    const success = await onDelete(id);
    if (success) {
      onDeleteSuccess?.(id);
      setFragment(null);
    }
    return success;
  }, [onDelete, onDeleteSuccess]);

  return {
    isOpen,
    fragment,
    open,
    close,
    confirm,
  };
}
