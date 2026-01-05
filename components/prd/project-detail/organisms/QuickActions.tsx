// PRD Project Detail - Quick Actions organism
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import type { QuickActionsProps } from '../types';
import { STUDIO_TEAL } from '../types';

export const QuickActions: React.FC<QuickActionsProps> = ({
  onEditBrief,
  onEditPRD,
  onViewStories,
  onDownload,
  onExport,
}) => {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Acoes Rapidas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          <button
            className="flex w-full items-center gap-3 p-3 text-left text-sm transition-colors hover:bg-muted/30"
            onClick={onEditBrief}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500/10 text-blue-500">
              <Icon name="edit" size="size-4" />
            </div>
            <span>Editar Brief</span>
          </button>
          <button
            className="flex w-full items-center gap-3 p-3 text-left text-sm transition-colors hover:bg-muted/30"
            onClick={onEditPRD}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500/10 text-orange-500">
              <Icon name="list" size="size-4" />
            </div>
            <span>Editar PRD</span>
          </button>
          <button
            className="flex w-full items-center gap-3 p-3 text-left text-sm transition-colors hover:bg-muted/30"
            onClick={onViewStories}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500/10 text-green-500">
              <Icon name="check-circle" size="size-4" />
            </div>
            <span>Ver Stories</span>
          </button>
          <button
            className="group flex w-full items-center gap-3 p-3 text-left text-sm transition-colors hover:bg-muted/30"
            onClick={onDownload}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-500/10 text-indigo-500 transition-transform group-hover:scale-110">
              <Icon name="download" size="size-4" />
            </div>
            <span className="transition-colors group-hover:text-indigo-500">
              Baixar Docs (.zip)
            </span>
          </button>
          <button
            className="group flex w-full items-center gap-3 p-3 text-left text-sm transition-colors hover:bg-muted/30"
            onClick={onExport}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded"
              style={{ backgroundColor: `${STUDIO_TEAL}15`, color: STUDIO_TEAL }}
            >
              <Icon name="rocket" size="size-4" />
            </div>
            <span
              className="font-bold transition-colors"
              style={{ color: STUDIO_TEAL }}
            >
              Exportar Projeto
            </span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
