// PreviewDialog - Modal dialog showing markdown preview
// Allows viewing and copying the full brief content

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preview: string;
  onCopy: () => void;
}

export const PreviewDialog: React.FC<PreviewDialogProps> = ({
  open,
  onOpenChange,
  preview,
  onCopy,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onClose={() => onOpenChange(false)}
        className="max-h-[80vh] max-w-2xl overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Preview do Brief</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm">
            {preview}
          </pre>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCopy}>
            <Icon name="clipboard" className="mr-2 size-4" />
            Copiar
          </Button>
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
