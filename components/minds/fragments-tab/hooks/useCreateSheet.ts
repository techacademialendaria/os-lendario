import { useState, useCallback } from 'react';
import type { UseCreateSheetReturn } from '../types';

export function useCreateSheet(): UseCreateSheetReturn {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    open,
    close,
  };
}
