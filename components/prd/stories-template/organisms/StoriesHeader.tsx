// StoriesHeader organism for Stories Template
import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { STUDIO_TEAL } from '../types';
import { PipelineStepper } from './PipelineStepper';

interface StoriesHeaderProps {
  onNavigateToProjects: () => void;
  onNavigateToEpics: () => void;
}

export const StoriesHeader: React.FC<StoriesHeaderProps> = ({
  onNavigateToProjects,
  onNavigateToEpics,
}) => (
  <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
    <div className="container py-4">
      {/* Breadcrumbs + Effort Badge */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span
            className="cursor-pointer hover:text-foreground"
            onClick={onNavigateToProjects}
          >
            Projetos
          </span>
          <Icon name="angle-small-right" size="size-3" />
          <span
            className="cursor-pointer hover:text-foreground"
            onClick={onNavigateToEpics}
          >
            Epicos
          </span>
          <Icon name="angle-small-right" size="size-3" />
          <span className="font-medium text-foreground">User Stories</span>
        </div>
        <Badge
          variant="outline"
          className="border-[var(--studio-teal)]/30 bg-[var(--studio-teal)]/5 w-fit text-[var(--studio-teal)]"
          style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
        >
          10% Voce - 90% IA
        </Badge>
      </div>

      {/* Pipeline Stepper */}
      <PipelineStepper />
    </div>
  </header>
);
