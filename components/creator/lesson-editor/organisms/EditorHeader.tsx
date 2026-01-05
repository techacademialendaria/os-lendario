/**
 * EditorHeader Organism
 * Top bar with navigation, status toggle, and action buttons.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import type { EditorHeaderProps } from '../types';

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  lessonId,
  status,
  onBack,
  onStatusChange,
}) => {
  return (
    <header className="z-20 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Icon name="arrow-left" size="size-4" /> Voltar
        </Button>
        <div className="h-5 w-px bg-border" />
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Editando Aula {lessonId}
          </span>
          <span className="text-sm font-semibold text-foreground">Organizacao Inteligente</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5">
          <span className="text-xs text-muted-foreground">
            {status ? 'Publicado' : 'Rascunho'}
          </span>
          <Switch
            id="status-mode"
            checked={status}
            onCheckedChange={onStatusChange}
            className="scale-90"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Icon name="eye" size="size-4" /> Preview
        </Button>
        <Button
          size="sm"
          className="gap-2 bg-studio-primary text-white hover:bg-studio-primary-dark"
        >
          <Icon name="check" size="size-4" /> Salvar Alteracoes
        </Button>
      </div>
    </header>
  );
};
