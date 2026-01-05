// Types for FeedbackSection components

export interface CommandItem {
  icon: string;
  label: string;
  shortcut?: string;
}

export interface CommandGroup {
  heading: string;
  items: CommandItem[];
}

export interface PopoverSettingsField {
  id: string;
  label: string;
  defaultValue: string;
}

export interface NotificationToggle {
  id: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
}

export interface ToastVariant {
  label: string;
  title: string;
  description: string;
  variant?: 'success' | 'warning' | 'destructive' | 'default';
}

export interface ModalGalleryItem {
  id: string;
  icon: string;
  label: string;
}
