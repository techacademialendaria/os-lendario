import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { ReaderErrorViewProps } from '../types';

export const ReaderErrorView: React.FC<ReaderErrorViewProps> = ({ message, onNavigateBack }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="space-y-4 text-center">
        <Icon name="exclamation" className="mx-auto text-destructive" size="size-12" />
        <h2 className="text-xl font-bold">Livro nao encontrado</h2>
        <p className="text-muted-foreground">{message}</p>
        <Button onClick={onNavigateBack}>Voltar a Biblioteca</Button>
      </div>
    </div>
  );
};
