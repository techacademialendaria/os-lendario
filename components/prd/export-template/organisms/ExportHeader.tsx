// Export Header Component
// Header with breadcrumbs, badge, and pipeline stepper

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { PipelineStepper } from './PipelineStepper';

interface ExportHeaderProps {
  slug: string;
}

export const ExportHeader: React.FC<ExportHeaderProps> = ({ slug }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container py-4">
        {/* Breadcrumbs + Badge */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className="cursor-pointer hover:text-foreground"
              onClick={() => navigate('/prd')}
            >
              Projetos
            </span>
            <Icon name="angle-small-right" size="size-3" />
            <span
              className="cursor-pointer hover:text-foreground"
              onClick={() => navigate(`/prd/${slug}/stories`)}
            >
              Stories
            </span>
            <Icon name="angle-small-right" size="size-3" />
            <span className="font-medium text-foreground">Exportacao</span>
          </div>
          <Badge
            variant="outline"
            className="w-fit border-green-500/20 bg-green-500/10 text-green-500"
          >
            <Icon name="check-circle" className="mr-1 size-3" />
            Projeto Pronto
          </Badge>
        </div>

        {/* Pipeline Stepper */}
        <PipelineStepper />
      </div>
    </header>
  );
};
