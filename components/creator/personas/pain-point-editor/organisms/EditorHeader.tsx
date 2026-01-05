import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { EditorHeaderProps } from '../types';

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  personaName,
  isSaving,
  onBack,
  onSave,
  onAiSuggest,
}) => {
  return (
    <header className="z-20 flex h-16 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button
          onClick={onBack}
          className="flex items-center gap-1 transition-colors hover:text-foreground"
        >
          <Icon name="angle-left" size="size-4" />
          <span>Personas</span>
        </button>
        <Icon name="chevron-right" size="size-3" />
        <span className="font-medium text-foreground">Dores: {personaName}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onAiSuggest} className="gap-2">
          <Icon name="magic-wand" size="size-4" className="text-studio-accent" />
          Sugestao IA
        </Button>
        <Button
          size="sm"
          onClick={onSave}
          disabled={isSaving}
          className="gap-2 bg-studio-accent text-background shadow-lg shadow-studio-accent/20"
        >
          {isSaving ? (
            <Icon name="spinner" size="size-4" className="animate-spin" />
          ) : (
            <Icon name="save" size="size-4" />
          )}
          Salvar
        </Button>
      </div>
    </header>
  );
};
