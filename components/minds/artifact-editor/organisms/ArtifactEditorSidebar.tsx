import React, { useState } from 'react';
import { Label } from '../../../ui/label';
import { Select } from '../../../ui/select';
import { Separator } from '../../../ui/separator';
import { ScrollArea } from '../../../ui/scroll-area';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../../../../hooks/useMindArtifacts';
import type { ContentType, SidebarTab } from '../types';
import { CONTENT_TYPE_OPTIONS } from '../types';

interface Mind {
  avatar: string;
  name: string;
  signatureSkill?: string;
}

interface ArtifactEditorSidebarProps {
  mind: Mind;
  contentType: ContentType;
  onContentTypeChange: (type: ContentType) => void;
  category: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const ArtifactEditorSidebar: React.FC<ArtifactEditorSidebarProps> = ({
  mind,
  contentType,
  onContentTypeChange,
  category,
  onCategoryChange,
}) => {
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('settings');

  return (
    <div className="flex w-80 shrink-0 flex-col border-l border-border bg-card/50">
      {/* Tab Switcher */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setSidebarTab('settings')}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
            sidebarTab === 'settings'
              ? 'border-b-2 border-primary text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Icon name="settings-sliders" size="size-3" />
          Configuracoes
        </button>
        <button
          onClick={() => setSidebarTab('info')}
          className={cn(
            'flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
            sidebarTab === 'info'
              ? 'border-b-2 border-primary text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Icon name="info" size="size-3" />
          Info
        </button>
      </div>

      {/* Sidebar Content */}
      <ScrollArea className="flex-1">
        {sidebarTab === 'settings' ? (
          <div className="space-y-6 p-4">
            {/* Type */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tipo
              </Label>
              <Select
                value={contentType}
                onValueChange={(v) => onContentTypeChange(v as ContentType)}
                options={CONTENT_TYPE_OPTIONS}
                placeholder="Selecione o tipo"
              />
            </div>

            <Separator />

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Categoria
              </Label>
              <Select
                value={category}
                onValueChange={onCategoryChange}
                options={CATEGORY_OPTIONS}
                placeholder="Selecione a categoria"
              />
            </div>

            <Separator />

            {/* Category Preview */}
            <div className="rounded-lg bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon
                    name={CATEGORY_ICONS[category] || 'folder'}
                    size="size-5"
                    className="text-primary"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">{CATEGORY_LABELS[category]}</div>
                  <div className="text-xs text-muted-foreground">Artefato</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 p-4">
            {/* Mind Info */}
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Mente
              </Label>
              <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
                <img
                  src={mind.avatar}
                  alt={mind.name}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div>
                  <div className="font-medium">{mind.name}</div>
                  <div className="text-xs text-muted-foreground">{mind.signatureSkill}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tips */}
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Dicas
              </Label>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Icon name="lightbulb" size="size-4" className="mt-0.5 text-amber-500" />
                  <span>Use Markdown para formatar o conteudo</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="lightbulb" size="size-4" className="mt-0.5 text-amber-500" />
                  <span>Artefatos sao documentos, prompts sao instrucoes para IA</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="lightbulb" size="size-4" className="mt-0.5 text-amber-500" />
                  <span>Categorize para facilitar a busca</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
