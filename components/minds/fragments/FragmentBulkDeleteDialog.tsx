import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '../../ui/alert-dialog';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';

interface ContentGroup {
  contentId: string;
  contentTitle: string;
  fragmentCount: number;
}

interface FragmentBulkDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentGroup: ContentGroup | null;
  onConfirm: (contentId: string) => Promise<{ success: boolean; count: number }>;
}

export const FragmentBulkDeleteDialog: React.FC<FragmentBulkDeleteDialogProps> = ({
  open,
  onOpenChange,
  contentGroup,
  onConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  // Reset confirm text when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setConfirmText('');
    }
  }, [open]);

  const handleDelete = async () => {
    if (!contentGroup) return;

    setIsDeleting(true);
    const result = await onConfirm(contentGroup.contentId);
    setIsDeleting(false);

    if (result.success) {
      setConfirmText('');
      onOpenChange(false);
    }
  };

  if (!contentGroup) return null;

  // Check if the typed text matches the content title (case insensitive)
  const isConfirmValid = confirmText.toLowerCase().trim() === contentGroup.contentTitle.toLowerCase().trim();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-400">
            <Icon name="exclamation-triangle" size="size-5" />
            Excluir Todos os Fragmentos
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação marcará todos os fragmentos como excluídos. Eles não aparecerão mais na interface.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Content info */}
        <div className="my-4 p-4 rounded-lg bg-muted/20 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="document" size="size-4" className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {contentGroup.contentTitle || 'Conteúdo sem título'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="text-xs">
              {contentGroup.fragmentCount} fragmento{contentGroup.fragmentCount !== 1 ? 's' : ''} será{contentGroup.fragmentCount !== 1 ? 'ão' : ''} excluído{contentGroup.fragmentCount !== 1 ? 's' : ''}
            </Badge>
          </div>
        </div>

        {/* Confirmation input */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Para confirmar, digite o nome do conteúdo: <span className="font-mono text-foreground">"{contentGroup.contentTitle}"</span>
          </label>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Digite o nome do conteúdo..."
            className="bg-black/20 border-white/10 focus:border-red-500/50"
            autoComplete="off"
            disabled={isDeleting}
          />
          {confirmText && !isConfirmValid && (
            <p className="text-xs text-amber-400">
              O texto digitado não corresponde ao nome do conteúdo
            </p>
          )}
          {isConfirmValid && (
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <Icon name="check" size="size-3" />
              Confirmação válida
            </p>
          )}
        </div>

        {/* Soft delete notice */}
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs mt-4">
          <div className="flex items-start gap-2">
            <Icon name="info" size="size-4" className="text-blue-400 mt-0.5" />
            <div className="text-blue-200/80">
              <p className="font-medium">Soft Delete</p>
              <p className="mt-1 opacity-70">
                Os fragmentos serão marcados como excluídos, mas permanecerão no banco de dados.
                Isso permite recuperação futura se necessário.
              </p>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel disabled={isDeleting} onClick={() => setConfirmText('')}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting || !isConfirmValid}
            className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Excluindo {contentGroup.fragmentCount}...
              </>
            ) : (
              <>
                <Icon name="trash" size="size-3" className="mr-2" />
                Excluir {contentGroup.fragmentCount} Fragmento{contentGroup.fragmentCount !== 1 ? 's' : ''}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FragmentBulkDeleteDialog;
