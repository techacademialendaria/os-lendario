import { useState, useCallback } from 'react';

export interface DialogState<T = unknown> {
  isOpen: boolean;
  data: T | null;
}

export interface UseDialogStateReturn<T = unknown> {
  isOpen: boolean;
  data: T | null;
  open: (data?: T) => void;
  close: () => void;
  toggle: () => void;
  setData: (data: T | null) => void;
}

/**
 * Generic hook for managing dialog/modal state
 *
 * @example
 * // Simple usage
 * const { isOpen, open, close } = useDialogState();
 *
 * @example
 * // With typed data
 * const { isOpen, data, open, close } = useDialogState<User>();
 * // open({ id: 1, name: 'John' });
 * // data?.name
 */
export function useDialogState<T = unknown>(
  initialState: DialogState<T> = { isOpen: false, data: null }
): UseDialogStateReturn<T> {
  const [state, setState] = useState<DialogState<T>>(initialState);

  const open = useCallback((data?: T) => {
    setState({ isOpen: true, data: data ?? null });
  }, []);

  const close = useCallback(() => {
    setState({ isOpen: false, data: null });
  }, []);

  const toggle = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const setData = useCallback((data: T | null) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  return {
    isOpen: state.isOpen,
    data: state.data,
    open,
    close,
    toggle,
    setData,
  };
}
