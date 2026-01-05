import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeleteBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: { id: string; title: string } | null;
  onConfirm: () => void;
}

export const DeleteBookDialog: React.FC<DeleteBookDialogProps> = ({
  open,
  onOpenChange,
  target,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="exclamation-triangle" className="text-destructive" />
            Confirmar Exclusao
          </DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir <strong>"{target?.title}"</strong>?
            <br />
            <span className="text-destructive">Esta acao nao pode ser desfeita.</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <Icon name="trash" size="size-3" className="mr-2" />
            Excluir Permanentemente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
