// Task Dialog Component
// Confirmation dialog for task export flow

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isAdvancing: boolean;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  isAdvancing,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmar Fluxo de Tarefa</DialogTitle>
        <DialogDescription>
          Como isso e uma tarefa unica, vamos pular as etapas de PRD, Epicos e Stories e ir
          direto para a exportacao do prompt de execucao.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
          <Icon name="rocket" className="size-8 text-primary" />
          <div>
            <p className="text-sm font-bold">Proximo Passo: Exportar</p>
            <p className="text-xs text-muted-foreground">
              Gerar prompt otimizado para Lovable/Cursor.
            </p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          Voltar
        </Button>
        <Button onClick={onConfirm} disabled={isAdvancing}>
          {isAdvancing ? (
            <>
              <Icon name="refresh" className="mr-2 size-4 animate-spin" />
              Processando...
            </>
          ) : (
            'Ir para Exportacao'
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
