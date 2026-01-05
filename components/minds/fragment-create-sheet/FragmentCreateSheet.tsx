import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '../../ui/sheet';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Slider } from '../../ui/slider';
import { Select } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Spinner } from '../../ui/spinner';
import { cn } from '../../../lib/utils';
import {
  getRelevanceTextColor,
  getConfidenceTextColor,
  percentToConfidence,
} from '../../../lib/fragment-utils';
import { FRAGMENT_TYPE_LABELS } from '../../../hooks/useMindFragments';
import { useFragmentCreateForm, useTagsInput } from './hooks';
import type { FragmentCreateSheetProps, FragmentCreate } from './types';

// Build type options from FRAGMENT_TYPE_LABELS
const typeOptions = Object.entries(FRAGMENT_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

/**
 * FragmentCreateSheet - Orchestrator Component
 *
 * STATE MANAGEMENT (extracted to hooks):
 * - useFragmentCreateForm: type, content, context, insight, location, relevance, confidence, isCreating, error (9 useState -> 1 hook)
 * - useTagsInput: tags, newTag (2 useState -> 1 hook)
 *
 * TOTAL: 12 useState -> 2 custom hooks
 */
export const FragmentCreateSheet: React.FC<FragmentCreateSheetProps> = ({
  open,
  onOpenChange,
  mindId,
  onCreate,
}) => {
  // State management via custom hooks
  const form = useFragmentCreateForm();
  const tagsInput = useTagsInput();

  const resetAll = () => {
    form.reset();
    tagsInput.reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.setError(null);

    if (!form.validate()) return;

    form.setIsCreating(true);

    const fragmentData: FragmentCreate = {
      mindId,
      location: form.location || 'manual',
      type: form.type,
      content: form.content.trim(),
      context: form.context.trim(),
      insight: form.insight.trim(),
      relevance: form.relevance,
      confidence: percentToConfidence(form.confidence),
      metadata: { tags: tagsInput.tags, source: 'manual' },
    };

    const result = await onCreate(fragmentData);

    form.setIsCreating(false);

    if (result) {
      resetAll();
      onOpenChange(false);
    } else {
      form.setError('Erro ao criar fragmento. Tente novamente.');
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Icon name="plus-circle" size="size-5" className="text-brand-gold" />
            Novo Fragmento
          </SheetTitle>
          <SheetDescription>
            Adicione um fragmento manualmente ao perfil desta mente.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <form onSubmit={handleSubmit} className="space-y-5 py-4">
            {/* Error message */}
            {form.error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                <div className="flex items-center gap-2">
                  <Icon name="exclamation" size="size-4" />
                  {form.error}
                </div>
              </div>
            )}

            {/* Type select */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Tipo do Fragmento *
              </label>
              <Select
                value={form.type}
                onValueChange={form.setType}
                options={typeOptions}
                placeholder="Selecione um tipo"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Conteudo *
              </label>
              <Textarea
                value={form.content}
                onChange={(e) => form.setContent(e.target.value)}
                placeholder="A citacao ou declaracao exata extraida..."
                className="min-h-[80px] text-sm"
              />
            </div>

            {/* Context */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Contexto *
              </label>
              <Textarea
                value={form.context}
                onChange={(e) => form.setContext(e.target.value)}
                placeholder="Em que situacao foi dito, quando, com quem..."
                className="min-h-[60px] text-sm"
              />
            </div>

            {/* Insight */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Insight *
              </label>
              <Textarea
                value={form.insight}
                onChange={(e) => form.setInsight(e.target.value)}
                placeholder="O que isso revela sobre a pessoa..."
                className="min-h-[60px] text-sm"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Localizacao / Fonte
              </label>
              <Input
                value={form.location}
                onChange={(e) => form.setLocation(e.target.value)}
                placeholder="manual, entrevista, etc."
                className="text-sm"
              />
            </div>

            {/* Relevance slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">Relevancia</label>
                <span className={cn("text-sm font-mono font-bold", getRelevanceTextColor(form.relevance))}>
                  {form.relevance}/10
                </span>
              </div>
              <Slider
                min={1}
                max={10}
                step={1}
                value={form.relevance}
                onChange={(e) => form.setRelevance(Number(e.target.value))}
                className="accent-brand-gold"
              />
            </div>

            {/* Confidence slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">Confianca</label>
                <span className={cn("text-sm font-mono font-bold", getConfidenceTextColor(form.confidence))}>
                  {form.confidence}%
                </span>
              </div>
              <Slider
                min={0}
                max={100}
                step={5}
                value={form.confidence}
                onChange={(e) => form.setConfidence(Number(e.target.value))}
                className="accent-brand-gold"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Tags (opcional)</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tagsInput.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs h-6 px-2 gap-1 bg-muted/20 hover:bg-muted/30"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => tagsInput.removeTag(tag)}
                      className="ml-1 hover:text-red-400"
                    >
                      <Icon name="times" size="size-2.5" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagsInput.newTag}
                  onChange={(e) => tagsInput.setNewTag(e.target.value)}
                  onKeyDown={tagsInput.handleKeyDown}
                  placeholder="Adicionar tag..."
                  className="h-8 text-xs"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={tagsInput.addTag}
                  disabled={!tagsInput.newTag.trim()}
                  className="h-8 px-3"
                >
                  <Icon name="plus" size="size-3" />
                </Button>
              </div>
            </div>
          </form>
        </ScrollArea>

        <SheetFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={form.isCreating}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={form.isCreating || !form.content.trim() || !form.context.trim() || !form.insight.trim()}
            className="bg-brand-gold hover:bg-brand-gold/90 text-black"
          >
            {form.isCreating ? (
              <>
                <Spinner size="sm" variant="dark" className="mr-2" />
                Criando...
              </>
            ) : (
              <>
                <Icon name="plus" size="size-3" className="mr-1.5" />
                Criar Fragmento
              </>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FragmentCreateSheet;
