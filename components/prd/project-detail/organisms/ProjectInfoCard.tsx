// PRD Project Detail - Info Card organism
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ProjectInfoCardProps } from '../types';

export const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({ project, statusLabel }) => {
  return (
    <Card className="border-border bg-muted/10 shadow-sm">
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Informacoes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <Badge variant="outline" className="border-blue-500/30 text-[10px] text-blue-500">
            {statusLabel}
          </Badge>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tipo</span>
          <span className="font-medium">
            {project.project_metadata?.brief?.structure?.classification || 'Projeto'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Criado em</span>
          <span className="font-mono text-xs">
            {project.created_at ? new Date(project.created_at).toLocaleDateString('pt-BR') : '-'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Atualizado</span>
          <span className="font-mono text-xs">
            {project.updated_at ? new Date(project.updated_at).toLocaleDateString('pt-BR') : '-'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Exports</span>
          <span className="font-mono text-xs">0</span>
        </div>
      </CardContent>
    </Card>
  );
};
