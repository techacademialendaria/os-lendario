/**
 * ObjectivesHeader
 * Section header with title and regenerate action
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface ObjectivesHeaderProps {
  hasContent: boolean;
  isGenerating: boolean;
  onRegenerate: () => void;
}

export const ObjectivesHeader: React.FC<ObjectivesHeaderProps> = ({
  hasContent,
  isGenerating,
  onRegenerate,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <Icon name="target" className="text-studio-primary" />
          Objetivos do Projeto
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Defina o que o projeto deve alcancar e o que nao faz parte do escopo
        </p>
      </div>
      {hasContent && (
        <Button variant="outline" size="sm" onClick={onRegenerate} disabled={isGenerating}>
          <Icon name="refresh" className="mr-1.5 size-4" />
          Regenerar
        </Button>
      )}
    </div>
  );
};
