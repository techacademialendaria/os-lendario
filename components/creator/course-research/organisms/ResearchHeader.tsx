import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { ResearchHeaderProps } from '../types';

export const ResearchHeader: React.FC<ResearchHeaderProps> = ({
  isRunningAI,
  onRunAIResearch,
  onNavigateToCurriculum,
}) => {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div>
        <h1 className="text-lg font-bold">Inteligencia de Mercado</h1>
        <p className="text-xs text-muted-foreground">
          Analise concorrencia e identifique oportunidades
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onRunAIResearch}
          disabled={isRunningAI}
        >
          {isRunningAI ? (
            <>
              <Icon name="refresh" className="mr-2 size-4 animate-spin" />
              Analisando...
            </>
          ) : (
            <>
              <Icon name="magic-wand" className="mr-2 size-4" />
              Rodar IA Research
            </>
          )}
        </Button>
        <Button
          onClick={onNavigateToCurriculum}
          className="bg-studio-primary hover:bg-studio-primary/90 text-white"
        >
          Aprovar e Gerar Curriculo
          <Icon name="arrow-right" className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
};
