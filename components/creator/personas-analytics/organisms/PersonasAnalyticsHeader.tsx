import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface PersonasAnalyticsHeaderProps {
  onBack: () => void;
}

export const PersonasAnalyticsHeader: React.FC<PersonasAnalyticsHeaderProps> = ({ onBack }) => {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-studio-accent"
          >
            <Icon name="arrow-left" size="size-5" />
            <span>Voltar para o Hub</span>
          </button>
          <div className="h-4 w-px bg-border" />
          <nav className="flex items-center text-sm">
            <span className="text-muted-foreground">Persona Studio</span>
            <span className="mx-2 text-muted-foreground/50">/</span>
            <span className="text-muted-foreground">Personas</span>
            <span className="mx-2 text-muted-foreground/50">/</span>
            <span className="font-medium text-foreground">Comparativo de Perfis</span>
          </nav>
        </div>
        <h1 className="text-3xl font-black tracking-tight">Comparativo de Personas</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground md:text-base">
          Analise metricas cruzadas, jornadas e comportamentos para identificar qual perfil gera
          mais valor.
        </p>
      </div>
      <Button
        variant="outline"
        className="flex items-center gap-2 border-border bg-card hover:bg-muted/50"
      >
        <Icon name="download" size="size-4" />
        Exportar Relatorio
      </Button>
    </header>
  );
};
