// StoriesFooter organism for Stories Template
import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { StoriesFooterProps, STUDIO_TEAL } from '../types';

export const StoriesFooter: React.FC<StoriesFooterProps> = ({
  totalStories,
  hasStories,
  isAdvancing,
  onAdvance,
  onNavigateToEpics,
}) => (
  <footer className="border-t border-border bg-background p-4">
    <div className="container flex items-center justify-between">
      <Button variant="outline" onClick={onNavigateToEpics}>
        <Icon name="arrow-left" className="mr-2 size-4" />
        Voltar aos Epicos
      </Button>

      <div className="text-sm text-muted-foreground">{totalStories} stories geradas</div>

      <Button
        size="lg"
        onClick={onAdvance}
        disabled={!hasStories || isAdvancing}
        className="px-8 text-white"
        style={{ backgroundColor: hasStories ? STUDIO_TEAL : undefined }}
      >
        {isAdvancing ? (
          <>
            <Icon name="refresh" className="mr-2 size-4 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            Exportar Projeto
            <Icon name="arrow-right" className="ml-2 size-4" />
          </>
        )}
      </Button>
    </div>
  </footer>
);
