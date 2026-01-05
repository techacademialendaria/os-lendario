import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface BatchLoadingStateProps {
  className?: string;
}

export const BatchLoadingState: React.FC<BatchLoadingStateProps> = ({ className }) => (
  <div className={cn('flex items-center justify-center py-12', className)}>
    <Icon name="spinner" size="size-8" className="animate-spin text-muted-foreground" />
    <span className="ml-2 text-muted-foreground">Carregando progresso do batch...</span>
  </div>
);
