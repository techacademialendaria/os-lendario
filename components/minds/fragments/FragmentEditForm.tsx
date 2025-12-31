import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Slider } from '../../ui/slider';
import { Select } from '../../ui/select';
import { Input } from '../../ui/input';
import { Spinner } from '../../ui/spinner';
import { cn } from '../../../lib/utils';
import {
  getRelevanceTextColor,
  getConfidenceTextColor,
  confidenceToPercent,
  percentToConfidence,
} from '../../../lib/fragment-utils';
import {
  MindFragment,
  FragmentUpdate,
  FRAGMENT_TYPE_LABELS,
} from '../../../hooks/useMindFragments';

interface FragmentEditFormProps {
  fragment: MindFragment;
  onSave: (updates: FragmentUpdate) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

// Build type options from FRAGMENT_TYPE_LABELS
const typeOptions = Object.entries(FRAGMENT_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const FragmentEditForm: React.FC<FragmentEditFormProps> = ({
  fragment,
  onSave,
  onCancel,
  isSaving,
}) => {
  // Form state
  const [relevance, setRelevance] = useState(fragment.relevance);
  const [confidence, setConfidence] = useState(confidenceToPercent(fragment.confidence));
  const [type, setType] = useState(fragment.type);
  const [tags, setTags] = useState<string[]>(
    (fragment.metadata?.tags as string[]) || []
  );
  const [newTag, setNewTag] = useState('');

  // Reset form when fragment changes
  useEffect(() => {
    setRelevance(fragment.relevance);
    setConfidence(confidenceToPercent(fragment.confidence));
    setType(fragment.type);
    setTags((fragment.metadata?.tags as string[]) || []);
  }, [fragment]);

  const handleAddTag = () => {
    const trimmedTag = newTag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updates: FragmentUpdate = {
      relevance,
      confidence: percentToConfidence(confidence),
      type,
      metadata: {
        ...(fragment.metadata || {}),
        tags,
      },
    };

    await onSave(updates);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Read-only content notice */}
      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-2">
          <Icon name="info" size="size-4" className="text-amber-400 mt-0.5" />
          <div className="text-xs text-amber-200/80">
            <p className="font-medium">Conteúdo, contexto e insight são somente leitura</p>
            <p className="mt-1 opacity-70">
              Esses campos são gerados pelo pipeline e não podem ser editados diretamente.
            </p>
          </div>
        </div>
      </div>

      {/* Content preview (read-only) */}
      <div className="opacity-60">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Conteúdo (somente leitura)
        </h4>
        <div className="p-3 rounded bg-muted/10 border border-border text-sm text-muted-foreground line-clamp-3">
          "{fragment.content}"
        </div>
      </div>

      {/* Editable fields */}
      <div className="space-y-5 pt-4 border-t border-border">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Icon name="pencil" size="size-3" />
          Campos Editáveis
        </h4>

        {/* Relevance slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground">Relevância</label>
            <span className={cn("text-sm font-mono font-bold", getRelevanceTextColor(relevance))}>
              {relevance}/10
            </span>
          </div>
          <Slider
            min={1}
            max={10}
            step={1}
            value={relevance}
            onChange={(e) => setRelevance(Number(e.target.value))}
            className="accent-brand-gold"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground/50">
            <span>Baixa</span>
            <span>Média</span>
            <span>Alta</span>
          </div>
        </div>

        {/* Confidence slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground">Confiança</label>
            <span className={cn("text-sm font-mono font-bold", getConfidenceTextColor(confidence))}>
              {confidence}%
            </span>
          </div>
          <Slider
            min={0}
            max={100}
            step={5}
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="accent-brand-gold"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground/50">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Type select */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Tipo do Fragmento</label>
          <Select
            value={type}
            onValueChange={setType}
            options={typeOptions}
            placeholder="Selecione um tipo"
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Tags</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs h-6 px-2 gap-1 bg-muted/20 hover:bg-muted/30"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:text-red-400"
                >
                  <Icon name="times" size="size-2.5" />
                </button>
              </Badge>
            ))}
            {tags.length === 0 && (
              <span className="text-[10px] text-muted-foreground/50">Nenhuma tag adicionada</span>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Adicionar tag..."
              className="h-8 text-xs"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddTag}
              disabled={!newTag.trim()}
              className="h-8 px-3"
            >
              <Icon name="plus" size="size-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSaving}
          className="h-9"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSaving}
          className="h-9 bg-brand-gold hover:bg-brand-gold/90 text-black"
        >
          {isSaving ? (
            <>
              <Spinner size="sm" variant="dark" className="mr-2" />
              Salvando...
            </>
          ) : (
            <>
              <Icon name="check" size="size-3" className="mr-1.5" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default FragmentEditForm;
