// EpicsEmptyState Organism
// Shows when no epics have been generated

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { STUDIO_TEAL } from '../types';

interface EpicsEmptyStateProps {
  onGenerate: () => void;
}

export const EpicsEmptyState: React.FC<EpicsEmptyStateProps> = ({ onGenerate }) => (
  <Card className="flex flex-col items-center justify-center gap-6 border-2 border-dashed py-16">
    <div
      className="flex size-20 items-center justify-center rounded-full"
      style={{ backgroundColor: `${STUDIO_TEAL}15`, color: STUDIO_TEAL }}
    >
      <Icon name="layers" size="size-10" />
    </div>
    <div className="space-y-2 text-center">
      <h3 className="text-xl font-bold">Pronto para gerar o plano</h3>
      <p className="text-sm text-muted-foreground">
        Baseado nas especificacoes tecnicas aprovadas.
      </p>
    </div>
    <Button
      size="lg"
      onClick={onGenerate}
      className="gap-2 text-white shadow-lg"
      style={{ backgroundColor: STUDIO_TEAL }}
    >
      <Icon name="magic-wand" /> Gerar Epicos e Stories
    </Button>
  </Card>
);
