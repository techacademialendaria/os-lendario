// PRD Project Detail - Header organism
import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import type { ProjectHeaderProps } from '../types';
import { STUDIO_TEAL } from '../types';

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  statusLabel,
  onBack,
  onContinue,
}) => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-500"
          >
            <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500"></span>
            {statusLabel}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {project.name}
        </h1>
        <p className="max-w-2xl font-serif text-muted-foreground">
          {project.project_metadata?.brief?.solution ||
            project.project_metadata?.upload?.content?.slice(0, 150) ||
            'Sem descricao'}
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="gap-2" onClick={onBack}>
          <Icon name="arrow-left" size="size-3" /> Voltar
        </Button>
        <Button
          className="gap-2 text-white shadow-lg"
          style={{ backgroundColor: STUDIO_TEAL }}
          onClick={onContinue}
        >
          <Icon name="play" size="size-3" /> Continuar Producao
        </Button>
      </div>
    </div>
  );
};
