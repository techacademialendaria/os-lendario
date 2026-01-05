import { useState, useCallback } from 'react';
import type { ContentGroup, UseBulkDeleteDialogReturn } from '../types';

interface UseBulkDeleteDialogOptions {
  onDelete: (contentId: string) => Promise<{ success: boolean; count: number }>;
  onDeleteSuccess?: (contentId: string) => void;
}

export function useBulkDeleteDialog({ onDelete, onDeleteSuccess }: UseBulkDeleteDialogOptions): UseBulkDeleteDialogReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [contentGroup, setContentGroup] = useState<ContentGroup | null>(null);

  const open = useCallback((group: ContentGroup) => {
    setContentGroup(group);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setContentGroup(null);
  }, []);

  const confirm = useCallback(async (contentId: string): Promise<{ success: boolean; count: number }> => {
    const result = await onDelete(contentId);
    if (result.success) {
      onDeleteSuccess?.(contentId);
      setContentGroup(null);
    }
    return result;
  }, [onDelete, onDeleteSuccess]);

  return {
    isOpen,
    contentGroup,
    open,
    close,
    confirm,
  };
}
