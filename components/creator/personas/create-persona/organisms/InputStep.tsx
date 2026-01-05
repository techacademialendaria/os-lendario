import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';
import { QUICK_TAGS } from '../types';
import type { InputStepProps } from '../types';

/**
 * Input step for describing the target persona
 */
export const InputStep: React.FC<InputStepProps> = ({
  inputText,
  onInputChange,
  onGenerate,
  onCancel,
  isGenerating,
}) => {
  const handleTagClick = (tag: string) => {
    onInputChange(inputText + (inputText ? ' ' : '') + tag);
  };

  return (
    <div className="flex w-full max-w-2xl animate-fade-in flex-col gap-8">
      <div className="flex flex-col gap-2 text-center md:text-left">
        <h1 className="text-3xl font-black tracking-tight md:text-4xl">Criar Nova Persona</h1>
        <p className="text-lg font-medium text-studio-primary/70">
          Descreva seu cliente ideal e a IA criara um perfil completo.
        </p>
      </div>

      <Card className={cn(STUDIO_CARD_CLASSES, 'overflow-hidden')}>
        {/* Decorative Top Line */}
        <div className="h-1 w-full bg-studio-primary" />

        <CardContent className="flex flex-col gap-6 p-6 md:p-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-studio-accent/20 text-studio-primary">
              <Icon name="magic-wand" size="size-5" />
            </div>
            <h3 className="text-lg font-bold">Quem e seu cliente ideal?</h3>
          </div>

          <AutosizeTextarea
            placeholder="Descreva seu cliente: idade, profissao, o que tira o sono dele, o que ele sonha..."
            className="min-h-[150px] resize-none border-border/50 bg-muted/20 p-4 text-base focus:border-studio-primary/50"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
          />

          {/* Quick Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="mr-2 text-sm text-muted-foreground">Sugestoes:</span>
            {QUICK_TAGS.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer transition-colors hover:border-studio-primary/30 hover:bg-studio-primary/10 hover:text-studio-primary"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between pb-10 pt-4">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground"
        >
          Cancelar
        </Button>
        <Button
          onClick={onGenerate}
          disabled={!inputText.trim() || isGenerating}
          className="gap-2 bg-studio-primary text-white shadow-lg shadow-studio-primary/20 transition-all hover:scale-105 hover:bg-studio-primary/90"
        >
          <Icon name="magic-wand" size="size-4" />
          <span>Gerar com IA</span>
          <Icon name="arrow-right" size="size-4" />
        </Button>
      </div>
    </div>
  );
};
