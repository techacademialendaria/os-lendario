/**
 * ObjectivesEmptyState
 * Initial state when no objectives exist
 */

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface ObjectivesEmptyStateProps {
  onGenerate: () => void;
}

export const ObjectivesEmptyState: React.FC<ObjectivesEmptyStateProps> = ({ onGenerate }) => {
  return (
    <Card className="p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-studio-primary/20">
        <Icon name="target" size="size-6" className="text-studio-primary" />
      </div>
      <h4 className="mb-2 font-bold">Gerar Objetivos</h4>
      <p className="mb-4 text-sm text-muted-foreground">
        A IA vai definir objetivos baseados no brief
      </p>
      <Button onClick={onGenerate} className="bg-studio-primary hover:bg-studio-primary/90">
        <Icon name="magic-wand" className="mr-2 size-4" />
        Gerar Objetivos
      </Button>
    </Card>
  );
};
