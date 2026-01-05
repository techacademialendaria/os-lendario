// EpicsGenerating Organism
// Shows loading state while generating epics

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { STUDIO_TEAL } from '../types';

export const EpicsGenerating: React.FC = () => (
  <div className="flex animate-pulse flex-col items-center justify-center gap-6 py-16">
    <Icon
      name="brain"
      size="size-10"
      className="animate-spin"
      style={{ color: STUDIO_TEAL }}
    />
    <p className="font-mono text-muted-foreground">Quebrando PRD em tarefas atomicas...</p>
  </div>
);
