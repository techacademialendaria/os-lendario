import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import type { AddModuleSheetProps } from '../types';

export const AddModuleSheet: React.FC<AddModuleSheetProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Novo Modulo</SheetTitle>
          <SheetDescription>Adicione um novo modulo ao curriculo</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <Label>Titulo do Modulo</Label>
            <Input
              placeholder="Ex: Fundamentos do Metodo GPS"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Descricao</Label>
            <Textarea
              placeholder="Uma breve descricao do que sera abordado..."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSubmit} disabled={!title}>
            Criar Modulo
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
