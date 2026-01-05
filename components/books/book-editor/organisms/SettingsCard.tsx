import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { formatRelativeDate } from '../../admin/utils';
import type { SettingsCardProps } from '../types';

export const SettingsCard: React.FC<SettingsCardProps> = ({
  formState,
  selectedBook,
  onUpdateFormField,
  onUpdateMetadataField,
  onDelete,
}) => {
  const handleDelete = () => {
    const firstVersion =
      selectedBook?.languages.pt || selectedBook?.languages.en || selectedBook?.languages.es;
    if (firstVersion) {
      onDelete(firstVersion.id, selectedBook?.originalTitle || 'Este livro');
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border/50 pb-3">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Configuracoes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm">Status: No Ar</Label>
            <p className="font-serif text-[10px] italic text-muted-foreground">
              Visivel para todos os assinantes.
            </p>
          </div>
          <Switch
            checked={formState.isPublished}
            onCheckedChange={(checked) => onUpdateFormField('isPublished', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm">Destaque Editorial</Label>
            <p className="font-serif text-[10px] italic text-muted-foreground">
              Exibir na secao de lancamentos.
            </p>
          </div>
          <Switch
            checked={formState.isFeatured}
            onCheckedChange={(checked) => onUpdateFormField('isFeatured', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm">Audiobook Ativo</Label>
            <p className="font-serif text-[10px] italic text-muted-foreground">
              Habilitar player de audio IA.
            </p>
          </div>
          <Switch
            checked={formState.metadata.hasAudio}
            onCheckedChange={(checked) => onUpdateMetadataField('hasAudio', checked)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 border-t border-border bg-muted/10 p-4">
        {selectedBook && (
          <div className="flex w-full justify-between font-mono text-xs text-muted-foreground">
            <span>Ultima Edicao:</span>
            <span>{formatRelativeDate(selectedBook.updatedAt)}</span>
          </div>
        )}
        <Button
          variant="destructive"
          className="h-9 w-full gap-2 text-xs font-bold"
          onClick={handleDelete}
          disabled={!selectedBook}
        >
          <Icon name="trash" size="size-3" /> Excluir permanentemente
        </Button>
      </CardFooter>
    </Card>
  );
};
