import React, { useState } from 'react';
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
import { cn } from '../../../lib/utils';
import {
  MindFragment,
  FRAGMENT_TYPE_LABELS,
  FRAGMENT_TYPE_ICONS,
  FRAGMENT_TYPE_COLORS,
} from '../../../hooks/useMindFragments';

interface FragmentDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fragment: MindFragment | null;
  onConfirm: (id: string) => Promise<boolean>;
}

export const FragmentDeleteDialog: React.FC<FragmentDeleteDialogProps> = ({
  open,
  onOpenChange,
  fragment,
  onConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!fragment) return;

    setIsDeleting(true);
    const success = await onConfirm(fragment.id);
    setIsDeleting(false);

    if (success) {
      onOpenChange(false);
    }
  };

  if (!fragment) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-400">
            <Icon name="exclamation-triangle" size="size-5" />
            Excluir Fragmento
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O fragmento será permanentemente removido do sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Fragment preview */}
        <div className="my-4 p-4 rounded-lg bg-muted/20 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Icon
              name={FRAGMENT_TYPE_ICONS[fragment.type] || 'file'}
              size="size-3.5"
              className={FRAGMENT_TYPE_COLORS[fragment.type] || 'text-muted-foreground'}
            />
            <Badge variant="secondary" className="text-[10px] h-5 px-2">
              {FRAGMENT_TYPE_LABELS[fragment.type] || fragment.type}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] h-5 px-2",
                fragment.relevance >= 8 ? "text-emerald-400 border-emerald-400/30" :
                fragment.relevance >= 5 ? "text-amber-400 border-amber-400/30" :
                "text-zinc-400 border-zinc-400/30"
              )}
            >
              Relevância: {fragment.relevance}/10
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3 italic">
            "{fragment.content}"
          </p>
        </div>

        {/* Warning about relationships */}
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
          <div className="flex items-start gap-2">
            <Icon name="info" size="size-4" className="text-amber-400 mt-0.5" />
            <div className="text-amber-200/80">
              <p>Se este fragmento tiver relações com outros fragmentos, essas conexões também serão removidas.</p>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isDeleting ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Excluindo...
              </>
            ) : (
              <>
                <Icon name="trash" size="size-3" className="mr-2" />
                Excluir Fragmento
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FragmentDeleteDialog;
