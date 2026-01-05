import React from 'react';
import { useToast } from '../../hooks/use-toast';
import { Toast } from './toast';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  // Only show open toasts
  const visibleToasts = toasts.filter((t) => t.open !== false);

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-4 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {visibleToasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast
            key={id}
            id={id}
            title={title}
            description={description}
            action={action}
            variant={variant}
            onClose={() => dismiss(id)}
            {...props}
          />
        );
      })}
    </div>
  );
}
