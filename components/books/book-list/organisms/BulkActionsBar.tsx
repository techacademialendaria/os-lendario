import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import type { BulkActionsBarProps } from '../types';

/**
 * BulkActionsBar - Floating action bar for bulk operations
 */
export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedCount,
  onBulkPublish,
  onBulkArchive,
  onClearSelection,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-slide-in-right">
      <div className="flex items-center gap-6 rounded-full bg-foreground px-6 py-3 text-background shadow-2xl ring-4 ring-primary/20">
        {/* Selection Count */}
        <div className="flex items-center gap-3 border-r border-background/20 pr-6">
          <Badge className="flex h-6 w-6 items-center justify-center rounded-full bg-primary p-0 font-bold text-black">
            {selectedCount}
          </Badge>
          <span className="text-sm font-bold uppercase tracking-widest">Selecionados</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-9 gap-2 font-bold text-background hover:bg-background/10"
            onClick={onBulkPublish}
          >
            <Icon name="check-circle" size="size-4" /> Publicar
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-9 gap-2 font-bold text-background hover:bg-background/10"
            onClick={onBulkArchive}
          >
            <Icon name="archive" size="size-4" /> Arquivar
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-9 gap-2 font-bold text-destructive hover:bg-destructive/10"
          >
            <Icon name="trash" size="size-4" /> Excluir
          </Button>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-background/50 hover:text-background"
          onClick={onClearSelection}
        >
          <Icon name="cross" size="size-3" />
        </Button>
      </div>
    </div>
  );
};
