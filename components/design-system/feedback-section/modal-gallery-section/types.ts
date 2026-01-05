// =============================================================================
// MODAL GALLERY SECTION TYPES
// =============================================================================

export type GalleryModalId = 'cookie' | 'image' | 'notification' | 'payment';
export type LegacyModalId = 'terms' | 'form' | 'success' | 'destructive';

export interface ModalGalleryState {
  cookie: boolean;
  image: boolean;
  notification: boolean;
  payment: boolean;
}

export interface LegacyModalState {
  terms: boolean;
  form: boolean;
  success: boolean;
  destructive: boolean;
}
