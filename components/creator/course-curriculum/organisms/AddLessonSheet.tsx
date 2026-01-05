import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import type { AddLessonSheetProps, LessonType } from '../types';

export const AddLessonSheet: React.FC<AddLessonSheetProps> = ({
  isOpen,
  onOpenChange,
  title,
  duration,
  type,
  onTitleChange,
  onDurationChange,
  onTypeChange,
  onSubmit,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nova Licao</SheetTitle>
          <SheetDescription>Adicione uma nova licao ao modulo</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <Label>Titulo da Licao</Label>
            <Input
              placeholder="Ex: Introducao ao Conceito"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duracao Estimada</Label>
              <Input
                placeholder="Ex: 10 min"
                value={duration}
                onChange={(e) => onDurationChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo de Conteudo</Label>
              <Select
                value={type}
                onValueChange={(v) => onTypeChange(v as LessonType)}
                options={[
                  { label: 'Video', value: 'video' },
                  { label: 'Texto', value: 'text' },
                  { label: 'Quiz', value: 'quiz' },
                  { label: 'Pratico', value: 'practice' },
                ]}
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSubmit} disabled={!title}>
            Criar Licao
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
