import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES, INPUT_CLASSES, TEXTAREA_CLASSES } from '../../../studio-tokens';
import type { AddPainPointFormProps } from '../types';
import { getRelevanceColor, getRelevanceLabel } from '../types';

export const AddPainPointForm: React.FC<AddPainPointFormProps> = ({
  newPainPoint,
  onNewPainPointChange,
  onAdd,
  onCancel,
}) => {
  const handleCancel = () => {
    onNewPainPointChange({ superficial: '', deep: '', relevance: 50 });
    onCancel();
  };

  return (
    <Card
      className={cn(
        STUDIO_CARD_CLASSES,
        'animate-in fade-in slide-in-from-top-2 border-studio-accent/30 duration-300'
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon name="plus-circle" size="size-4" className="text-studio-accent" />
            Nova Dor
          </CardTitle>
          <Button variant="ghost" size="icon" className="size-8" onClick={handleCancel}>
            <Icon name="cross" size="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-muted-foreground">Dor Superficial</Label>
          <Input
            className={INPUT_CLASSES}
            placeholder="O que o cliente diz que e o problema..."
            value={newPainPoint.superficial}
            onChange={(e) =>
              onNewPainPointChange((prev) => ({ ...prev, superficial: e.target.value }))
            }
          />
          <p className="text-xs text-muted-foreground">
            A dor que o cliente expressa verbalmente ou em buscas.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-muted-foreground">Dor Profunda</Label>
          <Textarea
            className={TEXTAREA_CLASSES}
            placeholder="O que ele realmente sente por baixo..."
            value={newPainPoint.deep}
            onChange={(e) => onNewPainPointChange((prev) => ({ ...prev, deep: e.target.value }))}
          />
          <p className="text-xs text-muted-foreground">
            A dor emocional ou psicologica real por tras da superficial.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-muted-foreground">Relevancia</Label>
            <Badge
              variant="outline"
              className={cn('text-xs', getRelevanceColor(newPainPoint.relevance))}
            >
              {newPainPoint.relevance}% - {getRelevanceLabel(newPainPoint.relevance)}
            </Badge>
          </div>
          <Slider
            min={0}
            max={100}
            step={5}
            value={newPainPoint.relevance}
            onChange={(e) =>
              onNewPainPointChange((prev) => ({
                ...prev,
                relevance: parseInt(e.target.value, 10),
              }))
            }
            className="accent-studio-accent"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Baixa Prioridade</span>
            <span>Alta Prioridade</span>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            onClick={onAdd}
            disabled={!newPainPoint.superficial.trim()}
            className="gap-2 bg-studio-accent text-background"
          >
            <Icon name="check" size="size-4" />
            Adicionar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
