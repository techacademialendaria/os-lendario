import React from 'react';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Switch } from '../../../ui/switch';

interface ArtifactEditorHeaderProps {
  mindSlug: string;
  mindName: string;
  isEditing: boolean;
  isPublished: boolean;
  onPublishedChange: (published: boolean) => void;
  hasChanges: boolean;
  isSaving: boolean;
  onBack: () => void;
  onSave: () => void;
}

export const ArtifactEditorHeader: React.FC<ArtifactEditorHeaderProps> = ({
  mindSlug,
  mindName,
  isEditing,
  isPublished,
  onPublishedChange,
  hasChanges,
  isSaving,
  onBack,
  onSave,
}) => {
  return (
    <div className="z-20 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
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
            {isEditing ? 'Editando Artefato' : 'Novo Artefato'}
          </span>
          <span className="text-sm font-semibold text-foreground">{mindName}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5">
          <span className="text-xs text-muted-foreground">
            {isPublished ? 'Publicado' : 'Rascunho'}
          </span>
          <Switch checked={isPublished} onCheckedChange={onPublishedChange} className="scale-90" />
        </div>
        <Button
          size="sm"
          onClick={onSave}
          disabled={!hasChanges || isSaving}
          className="gap-2"
        >
          {isSaving ? (
            <Icon name="refresh" className="animate-spin" size="size-4" />
          ) : (
            <Icon name="check" size="size-4" />
          )}
          Salvar
        </Button>
      </div>
    </div>
  );
};
