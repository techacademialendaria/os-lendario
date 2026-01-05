// InitialState - Empty state prompting user to generate brief
// Shows when no structure exists yet

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface InitialStateProps {
  onGenerate: () => void;
}

export const InitialState: React.FC<InitialStateProps> = ({ onGenerate }) => {
  return (
    <Card className="p-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-studio-primary/20">
        <Icon name="document" size="size-8" className="text-studio-primary" />
      </div>
      <h3 className="mb-2 text-lg font-bold">Gerar Brief Estruturado</h3>
      <p className="mx-auto mb-6 max-w-md text-muted-foreground">
        A IA vai analisar seu upload, pontos cegos, pesquisa e WOWs para gerar um brief completo
      </p>
      <Button onClick={onGenerate} className="bg-studio-primary hover:bg-studio-primary/90">
        <Icon name="magic-wand" className="mr-2 size-4" />
        Gerar Brief
      </Button>
    </Card>
  );
};

export default InitialState;
