import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../../ui/alert-dialog';
import { Icon } from '../../../../ui/icon';
import type { MindProfile as Mind } from '../../../../../hooks/useMind';

interface MindDeleteDialogProps {
  mind: Mind;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
}

export const MindDeleteDialog: React.FC<MindDeleteDialogProps> = ({
  mind,
  open,
  onOpenChange,
  isDeleting,
  onDelete,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar Mente</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja deletar <strong>{mind.name}</strong>? Esta acao pode ser
            revertida posteriormente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {isDeleting ? (
              <>
                <Icon name="refresh" className="animate-spin mr-2" size="size-4" />
                Deletando...
              </>
            ) : (
              <>
                <Icon name="trash" className="mr-2" size="size-4" />
                Deletar
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
