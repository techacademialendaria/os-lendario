// @ts-nocheck
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../ui/button';
import { Icon } from '../../../../ui/icon';
import { Switch } from '../../../../ui/switch';
import { STUDIO_PRIMARY, STUDIO_GOLD } from '../../../studio-tokens';

interface LessonSubHeaderProps {
  courseSlug: string;
  moduleIndex: number;
  lessonIndex: number;
  moduleTitle: string;
  isPublished: boolean;
  onPublishedChange: (published: boolean) => void;
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
}

export const LessonSubHeader: React.FC<LessonSubHeaderProps> = ({
  courseSlug,
  moduleIndex,
  lessonIndex,
  moduleTitle,
  isPublished,
  onPublishedChange,
  hasChanges,
  isSaving,
  onSave,
}) => {
  const navigate = useNavigate();

  return (
    <div className="z-20 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/creator/cursos/${courseSlug}`)}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Icon name="arrow-left" size="size-4" /> Voltar
        </Button>
        <div className="h-5 w-px bg-border" />
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Editando Aula {moduleIndex + 1}.{lessonIndex + 1}
          </span>
          <span className="text-sm font-semibold text-foreground">{moduleTitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5">
          <span className="text-xs text-muted-foreground">
            {isPublished ? 'Publicado' : 'Rascunho'}
          </span>
          <Switch checked={isPublished} onCheckedChange={onPublishedChange} className="scale-90" />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Icon name="eye" size="size-4" /> Preview
        </Button>
        <Button
          size="sm"
          onClick={onSave}
          disabled={!hasChanges || isSaving}
          className="gap-2 font-semibold text-[#0A0A0F]"
          style={{
            backgroundColor: hasChanges ? STUDIO_GOLD : STUDIO_PRIMARY,
            color: hasChanges ? '#0A0A0F' : 'white',
          }}
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
