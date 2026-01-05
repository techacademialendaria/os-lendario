import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { BookLanguage } from '@/hooks/useAdminBooks';
import { VersionContentEditor } from '../molecules';
import type { LanguageTabsSectionProps } from '../types';

const LANGUAGES: BookLanguage[] = ['pt', 'en', 'es'];

const LANG_CONFIG = {
  pt: { label: 'Portugues', badgeVariant: 'success' as const },
  en: { label: 'English', badgeVariant: 'info' as const },
  es: { label: 'Espanol', badgeVariant: 'outline' as const },
};

export const LanguageTabsSection: React.FC<LanguageTabsSectionProps> = ({
  formState,
  formErrors,
  selectedBook,
  activeLangTab,
  onActiveLangTabChange,
  editorPreview,
  onEditorPreviewChange,
  onUpdateVersionField,
  setFormErrors,
}) => {
  const hasLanguage = (lang: BookLanguage) => selectedBook?.languages[lang];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Conteudo Traduzido
        </h3>
        <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase text-primary">
          + Adicionar Idioma
        </Button>
      </div>

      <Tabs
        value={activeLangTab}
        onValueChange={(v) => onActiveLangTabChange(v as BookLanguage)}
        className="w-full"
      >
        <TabsList className="mb-6 h-12 w-full justify-start gap-2 rounded-xl bg-muted/50 p-1">
          {LANGUAGES.map((lang) => {
            const config = LANG_CONFIG[lang];
            const hasLang = hasLanguage(lang);
            const isDisabled = !hasLang && !!selectedBook;

            return (
              <TabsTrigger
                key={lang}
                value={lang}
                className={cn(
                  'flex items-center gap-2 px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm',
                  lang === 'es' && !hasLang && 'text-muted-foreground/50 opacity-60'
                )}
                disabled={isDisabled}
              >
                <Badge variant={config.badgeVariant} size="sm">
                  {lang.toUpperCase()}
                </Badge>{' '}
                {config.label}{' '}
                {hasLang ? (
                  <Icon name="check-circle" size="size-3" className="text-brand-green" />
                ) : lang === 'es' ? (
                  <div className="h-2 w-2 rounded-full border border-border bg-muted"></div>
                ) : null}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {LANGUAGES.map((lang) => (
          <TabsContent key={lang} value={lang} className="animate-fade-in space-y-6">
            <Card>
              <CardContent className="space-y-6 p-6">
                <VersionContentEditor
                  lang={lang}
                  version={formState.versions[lang]}
                  formErrors={formErrors}
                  editorPreview={editorPreview}
                  onEditorPreviewChange={onEditorPreviewChange}
                  onUpdateVersionField={onUpdateVersionField}
                  setFormErrors={setFormErrors}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
