import React from 'react';
import { Icon } from '../../ui/icon';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertMessageProps {
  variant: AlertVariant;
  message: string;
  onDismiss?: () => void;
  className?: string;
  title?: string;
}

const variantStyles: Record<AlertVariant, {
  container: string;
  icon: string;
  dismissClass: string;
}> = {
  success: {
    container: 'bg-green-500/10 text-green-600 dark:text-green-400',
    icon: 'check-circle',
    dismissClass: 'text-green-600/70 hover:text-green-600 dark:text-green-400/70 dark:hover:text-green-400',
  },
  error: {
    container: 'bg-destructive/10 text-destructive',
    icon: 'exclamation-circle',
    dismissClass: 'text-destructive/70 hover:text-destructive',
  },
  warning: {
    container: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    icon: 'exclamation-triangle',
    dismissClass: 'text-amber-600/70 hover:text-amber-600 dark:text-amber-400/70 dark:hover:text-amber-400',
  },
  info: {
    container: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    icon: 'information-circle',
    dismissClass: 'text-blue-600/70 hover:text-blue-600 dark:text-blue-400/70 dark:hover:text-blue-400',
  },
};

export const AlertMessage: React.FC<AlertMessageProps> = ({
  variant,
  message,
  onDismiss,
  className,
  title,
}) => {
  const styles = variantStyles[variant];

  return (
    <div className={`flex items-start gap-3 rounded-lg p-4 text-sm ${styles.container} ${className || ''}`}>
      <Icon name={styles.icon} className="mt-0.5 size-5 shrink-0" />
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        <p className={title ? 'mt-1' : ''}>{message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={`ml-auto shrink-0 ${styles.dismissClass}`}
        >
          <Icon name="cross" className="size-4" />
        </button>
      )}
    </div>
  );
};
