import { useState, useCallback } from 'react';
import type { ModalGalleryState, LegacyModalState, GalleryModalId, LegacyModalId } from '../types';

// =============================================================================
// GALLERY MODALS HOOK
// =============================================================================

interface UseGalleryModalsReturn {
  state: ModalGalleryState;
  open: (id: GalleryModalId) => void;
  close: (id: GalleryModalId) => void;
  toggle: (id: GalleryModalId) => void;
}

export function useGalleryModals(): UseGalleryModalsReturn {
  const [state, setState] = useState<ModalGalleryState>({
    cookie: false,
    image: false,
    notification: false,
    payment: false,
  });

  const open = useCallback((id: GalleryModalId) => {
    setState((prev) => ({ ...prev, [id]: true }));
  }, []);

  const close = useCallback((id: GalleryModalId) => {
    setState((prev) => ({ ...prev, [id]: false }));
  }, []);

  const toggle = useCallback((id: GalleryModalId) => {
    setState((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return { state, open, close, toggle };
}

// =============================================================================
// LEGACY MODALS HOOK
// =============================================================================

interface UseLegacyModalsReturn {
  state: LegacyModalState;
  open: (id: LegacyModalId) => void;
  close: (id: LegacyModalId) => void;
  toggle: (id: LegacyModalId) => void;
}

export function useLegacyModals(): UseLegacyModalsReturn {
  const [state, setState] = useState<LegacyModalState>({
    terms: false,
    form: false,
    success: false,
    destructive: false,
  });

  const open = useCallback((id: LegacyModalId) => {
    setState((prev) => ({ ...prev, [id]: true }));
  }, []);

  const close = useCallback((id: LegacyModalId) => {
    setState((prev) => ({ ...prev, [id]: false }));
  }, []);

  const toggle = useCallback((id: LegacyModalId) => {
    setState((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return { state, open, close, toggle };
}
