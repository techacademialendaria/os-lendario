import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { VersionContentEditorProps } from '../types';

const LANG_LABELS: Record<string, string> = {
  pt: 'Portugues',
  en: 'Ingles',
  es: 'Espanhol',
};

export const VersionContentEditor: React.FC<VersionContentEditorProps> = ({
  lang,
  version,
  formErrors,
  editorPreview,
  onEditorPreviewChange,
  onUpdateVersionField,
  setFormErrors,
}) => {
  const clearVersionTitleError = () => {
    if (formErrors.versionTitle?.[lang]) {
      setFormErrors((prev) => ({
        ...prev,
        versionTitle: { ...prev.versionTitle, [lang]: undefined },
      }));
    }
  };

  const clearVersionSlugError = () => {
    if (formErrors.versionSlug?.[lang]) {
      setFormErrors((prev) => ({
        ...prev,
        versionSlug: { ...prev.versionSlug, [lang]: undefined },
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Titulo da Versao ({lang.toUpperCase()}) <span className="text-destructive">*</span>
          </Label>
          <Input
            value={version?.title || ''}
            onChange={(e) => {
              onUpdateVersionField(lang, 'title', e.target.value);
              clearVersionTitleError();
            }}
            placeholder={`Titulo em ${LANG_LABELS[lang] || lang}`}
            className={cn(
              formErrors.versionTitle?.[lang] && 'border-destructive focus-visible:ring-destructive'
            )}
          />
          {formErrors.versionTitle?.[lang] && (
            <p className="text-[10px] font-medium text-destructive">
              {formErrors.versionTitle[lang]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Slug da URL <span className="text-destructive">*</span>
          </Label>
          <div className="flex">
            <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 font-mono text-xs text-muted-foreground">
              /resumo/{lang}/
            </span>
            <Input
              className={cn(
                'rounded-l-none font-mono text-xs',
                formErrors.versionSlug?.[lang] && 'border-destructive focus-visible:ring-destructive'
              )}
              value={version?.slug || ''}
              onChange={(e) => {
                onUpdateVersionField(lang, 'slug', e.target.value);
                clearVersionSlugError();
              }}
            />
          </div>
          {formErrors.versionSlug?.[lang] && (
            <p className="text-[10px] font-medium text-destructive">
              {formErrors.versionSlug[lang]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Resumo Editorial</Label>
          <AutosizeTextarea
            placeholder="Breve descricao para o catalogo..."
            className="min-h-[80px]"
            value={version?.summary || ''}
            onChange={(e) => onUpdateVersionField(lang, 'summary', e.target.value)}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-bold">Conteudo do Resumo (Markdown)</Label>
          <div className="flex rounded-lg bg-muted/50 p-0.5">
            <Button
              size="sm"
              variant={!editorPreview ? 'secondary' : 'ghost'}
              className="h-7 text-[10px] font-bold uppercase"
              onClick={() => onEditorPreviewChange(false)}
            >
              Editor
            </Button>
            <Button
              size="sm"
              variant={editorPreview ? 'secondary' : 'ghost'}
              className="h-7 text-[10px] font-bold uppercase"
              onClick={() => onEditorPreviewChange(true)}
            >
              Preview
            </Button>
          </div>
        </div>
        {!editorPreview ? (
          <Textarea
            className="min-h-[400px] border-border bg-muted/5 font-mono text-sm leading-relaxed"
            placeholder="# Introducao..."
            value={version?.content || ''}
            onChange={(e) => onUpdateVersionField(lang, 'content', e.target.value)}
          />
        ) : (
          <div className="prose dark:prose-invert min-h-[400px] max-w-none overflow-auto rounded-md border border-border p-6">
            {version?.content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{version.content}</ReactMarkdown>
            ) : (
              <p className="text-center italic text-muted-foreground">
                Nenhum conteudo para visualizar
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
