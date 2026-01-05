import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { LessonsHeaderProps } from '../types';

export const LessonsHeader: React.FC<LessonsHeaderProps> = ({
  selectedCount,
  isGenerating,
  canProceed,
  onGenerateSelected,
  onNavigateValidation,
}) => {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div>
        <h1 className="text-lg font-bold">Licoes do Curso</h1>
        <p className="text-xs text-muted-foreground">
          Gerencie e edite o conteudo de cada licao
        </p>
      </div>
      <div className="flex items-center gap-3">
        {selectedCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onGenerateSelected}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Icon name="refresh" className="mr-2 size-4 animate-spin" />
            ) : (
              <Icon name="magic-wand" className="mr-2 size-4" />
            )}
            Gerar {selectedCount} Selecionadas
          </Button>
        )}
        <Button
          onClick={onNavigateValidation}
          className="bg-studio-primary hover:bg-studio-primary/90 text-white"
          disabled={!canProceed}
        >
          Ir para Validacao
          <Icon name="arrow-right" className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
};
