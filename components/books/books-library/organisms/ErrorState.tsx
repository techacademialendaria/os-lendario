/**
 * ErrorState - Error display for Books Library
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { ErrorStateProps } from '../types';

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="max-w-md space-y-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10">
          <Icon name="exclamation" className="text-destructive" size="size-8" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Erro ao carregar biblioteca</h2>
          <p className="font-serif text-base italic text-muted-foreground">{message}</p>
        </div>
        <Button
          onClick={onRetry}
          className="h-14 px-10 bg-foreground font-black uppercase tracking-[0.2em] text-sm text-background hover:bg-foreground/90 active:scale-[0.98] transition-all duration-300"
        >
          Tentar novamente
        </Button>
      </div>
    </div>
  );
};
