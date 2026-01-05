// BriefHeader - Header with title and action buttons
// Shows preview and regenerate options when structure exists

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface BriefHeaderProps {
  hasStructure: boolean;
  onPreview: () => void;
  onRegenerate: () => void;
  isGenerating: boolean;
}

export const BriefHeader: React.FC<BriefHeaderProps> = ({
  hasStructure,
  onPreview,
  onRegenerate,
  isGenerating,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Icon name="document" className="text-studio-primary" />
          Brief Estruturado
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Revise e ajuste o brief antes de gerar o PRD
        </p>
      </div>
      {hasStructure && (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onPreview}>
            <Icon name="eye" className="mr-1.5 size-4" />
            Preview
          </Button>
          <Button variant="outline" size="sm" onClick={onRegenerate} disabled={isGenerating}>
            <Icon name="refresh" className="mr-1.5 size-4" />
            Regenerar Tudo
          </Button>
        </div>
      )}
    </div>
  );
};

export default BriefHeader;
