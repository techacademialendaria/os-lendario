import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AuthorSearchDropdown, TagSelector } from '../molecules';
import type { GeneralInfoCardProps } from '../types';

export const GeneralInfoCard: React.FC<GeneralInfoCardProps> = ({
  formState,
  formErrors,
  authorResults,
  authorSearchLoading,
  showAuthorDropdown,
  onAuthorSearch,
  onSelectAuthor,
  onUpdateFormField,
  onClearFieldError,
  categoryOptions,
  collections,
  onToggleCategory,
  onToggleCollection,
}) => {
  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border/50 pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon name="info" size="size-4" className="text-primary" /> Informacoes Gerais
        </CardTitle>
        <CardDescription>
          Dados compartilhados entre todas as versoes de idioma.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Titulo Original <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="The Psychology of Money"
              value={formState.originalTitle}
              onChange={(e) => {
                onUpdateFormField('originalTitle', e.target.value);
                if (formErrors.originalTitle) onClearFieldError('originalTitle');
              }}
              className={cn(
                formErrors.originalTitle && 'border-destructive focus-visible:ring-destructive'
              )}
            />
            {formErrors.originalTitle ? (
              <p className="text-[10px] font-medium text-destructive">
                {formErrors.originalTitle}
              </p>
            ) : (
              <p className="text-[10px] text-muted-foreground">
                Utilizado para vincular traducoes automaticamente.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Autor <span className="text-destructive">*</span>
            </Label>
            <AuthorSearchDropdown
              authorName={formState.authorName}
              authorResults={authorResults}
              authorSearchLoading={authorSearchLoading}
              showAuthorDropdown={showAuthorDropdown}
              onAuthorSearch={onAuthorSearch}
              onSelectAuthor={onSelectAuthor}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TagSelector
            label="Categoria"
            selectedSlugs={formState.categorySlug ? [formState.categorySlug] : []}
            options={categoryOptions}
            onToggle={onToggleCategory}
            variant="category"
            singleSelect
          />
          <TagSelector
            label="Colecoes"
            selectedSlugs={formState.collectionSlugs}
            options={collections}
            onToggle={onToggleCollection}
            variant="collection"
          />
        </div>
      </CardContent>
    </Card>
  );
};
