import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { PersonasView } from '../types';

interface DashboardHeaderProps {
  onViewChange: (view: PersonasView) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onViewChange }) => (
  <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
    <div>
      <h2 className="font-sans text-2xl font-bold">Dashboard ICP & Personas</h2>
      <p className="text-sm text-muted-foreground">
        Visão geral estratégica e psicografia avançada.
      </p>
    </div>
    <Button
      onClick={() => onViewChange('create')}
      className="gap-2 bg-studio-accent text-background shadow-lg shadow-studio-accent/20 transition-all hover:scale-105"
    >
      <Icon name="plus-circle" size="size-4" /> Nova Persona
    </Button>
  </div>
);
