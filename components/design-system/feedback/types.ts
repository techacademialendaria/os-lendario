// Feedback Section Types and Configuration

export interface CommandItem {
  icon: string;
  label: string;
  shortcut?: string;
}

export interface CommandGroup {
  heading: string;
  items: CommandItem[];
}

export interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
}

export interface ModalGalleryItem {
  id: string;
  icon: string;
  label: string;
}

export interface ToastDemo {
  label: string;
  title: string;
  description: string;
  variant?: 'success' | 'warning' | 'destructive' | 'default';
}

export interface TooltipDemo {
  type: 'simple' | 'text' | 'rich' | 'status';
}
