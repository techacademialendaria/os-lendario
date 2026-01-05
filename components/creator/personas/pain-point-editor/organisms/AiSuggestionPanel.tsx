import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';
import type { AiSuggestionPanelProps } from '../types';

export const AiSuggestionPanel: React.FC<AiSuggestionPanelProps> = ({
  onClose,
  onAddSuggested,
}) => {
  return (
    <Card
      className={cn(
        STUDIO_CARD_CLASSES,
        'animate-in fade-in slide-in-from-top-4 overflow-hidden duration-500'
      )}
    >
      <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-studio-accent/50 to-transparent" />
      <CardContent className="p-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg border border-studio-accent/10 bg-gradient-to-br from-studio-accent/20 to-studio-accent/5 text-studio-accent">
                <Icon name="magic-wand" size="size-4" />
              </div>
              <span className="text-sm font-bold tracking-wide text-foreground">
                Sugestao de Melhoria da IA
              </span>
            </div>
            <Button variant="ghost" size="icon" className="size-6" onClick={onClose}>
              <Icon name="cross" size="size-4" />
            </Button>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/20 p-3">
            <Icon name="lightbulb" size="size-4" className="mt-0.5 text-muted-foreground" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-foreground">Dica</span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Adicione dores especificas com prazos e objetivos mensuraveis para qualificar
                melhor o lead desde a busca.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Dispensar
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-studio-accent text-background"
              onClick={onAddSuggested}
            >
              <Icon name="plus" size="size-4" />
              Adicionar Dor Sugerida
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
