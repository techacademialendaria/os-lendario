import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { EmptyStateProps } from '../types';

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateClick }) => (
  <div className="flex min-h-[50vh] animate-fade-in flex-col items-center justify-center space-y-6 text-center">
    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-studio-primary/20">
      <Icon name="clipboard-list" size="size-12" className="text-studio-primary" />
    </div>
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-foreground">Nenhum projeto PRD ainda</h2>
      <p className="max-w-md text-muted-foreground">
        Comece criando seu primeiro documento de requisitos. O PRD Studio vai te guiar em cada
        etapa.
      </p>
    </div>
    <Button
      onClick={onCreateClick}
      className="bg-studio-primary shadow-lg hover:bg-studio-primary/90"
    >
      <Icon name="plus" className="mr-2 size-4" />
      Criar Primeiro Projeto
    </Button>
  </div>
);
