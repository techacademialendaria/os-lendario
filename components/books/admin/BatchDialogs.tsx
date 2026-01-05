import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';

// Add Book Dialog
interface AddBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newBook: { title: string; author: string; slug: string };
  onNewBookChange: (book: { title: string; author: string; slug: string }) => void;
  onAdd: () => void;
  adding: boolean;
}

export const AddBookDialog: React.FC<AddBookDialogProps> = ({
  open,
  onOpenChange,
  newBook,
  onNewBookChange,
  onAdd,
  adding,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Livro</DialogTitle>
          <DialogDescription>
            Adicione um novo livro à fila de processamento do pipeline.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Ex: Atomic Habits"
              value={newBook.title}
              onChange={(e) => onNewBookChange({ ...newBook, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Autor *</Label>
            <Input
              id="author"
              placeholder="Ex: James Clear"
              value={newBook.author}
              onChange={(e) => onNewBookChange({ ...newBook, author: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (opcional)</Label>
            <Input
              id="slug"
              placeholder="Ex: atomic_habits (gerado automaticamente se vazio)"
              value={newBook.slug}
              onChange={(e) => onNewBookChange({ ...newBook, slug: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Identificador único do livro. Use apenas letras minúsculas, números e underscores.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={adding}>
            Cancelar
          </Button>
          <Button onClick={onAdd} disabled={adding}>
            {adding ? (
              <>
                <Icon name="spinner" size="size-4" className="mr-2 animate-spin" />
                Adicionando...
              </>
            ) : (
              <>
                <Icon name="plus" size="size-4" className="mr-2" />
                Adicionar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Remove Confirmation Dialog
interface RemoveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookInfo: { slug: string; title: string } | null;
  onConfirm: () => void;
}

export const RemoveDialog: React.FC<RemoveDialogProps> = ({
  open,
  onOpenChange,
  bookInfo,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="exclamation-triangle" size="size-5" className="text-warning" />
            Remover do Pipeline
          </DialogTitle>
          <DialogDescription className="pt-2">
            Tem certeza que deseja remover <strong>"{bookInfo?.title}"</strong> do pipeline?
          </DialogDescription>
        </DialogHeader>
        <div className="bg-muted/50 rounded-md p-3 text-sm text-muted-foreground">
          <p>Os arquivos gerados serão mantidos em:</p>
          <code className="block mt-1 text-xs bg-background px-2 py-1 rounded">
            outputs/books/{bookInfo?.slug}/
          </code>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <Icon name="trash" size="size-4" className="mr-2" />
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default { AddBookDialog, RemoveDialog };
