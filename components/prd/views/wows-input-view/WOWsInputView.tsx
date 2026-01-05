import React, { useCallback } from 'react';
import { Card } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Textarea } from '../../../ui/textarea';
import { cn } from '../../../../lib/utils';
import { WOWsInputViewProps, MAX_WOWS, MIN_WOWS, PROMPT_SUGGESTIONS } from './types';
import { useWOWs, useWOWInput } from './hooks/useWOWs';
import { WOWCard } from './organisms/WOWCard';
import { CategorySelector } from './organisms/CategorySelector';

// =============================================================================
// MAIN COMPONENT (Orchestrator: ~75 lines)
// =============================================================================

export const WOWsInputView: React.FC<WOWsInputViewProps> = ({ project, onUpdate, onNext }) => {
  const { wows, canAdvance, isAtMax, add, edit, remove } = useWOWs({
    initialWows: project.project_metadata?.brief?.wows || [],
    onUpdate,
  });

  const { text, category, setText, setCategory, reset } = useWOWInput();
  const canAdd = !isAtMax && text.trim().length > 0;

  const handleAdd = useCallback(async () => {
    if (!canAdd) return;
    await add(text, category);
    reset();
  }, [canAdd, add, text, category, reset]);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Icon name="lightbulb" className="text-studio-primary" />
          WOWs - Suas Descobertas
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Registre os insights e descobertas que voce teve durante a pesquisa
        </p>
      </div>

      {/* Input Section */}
      <Card className="space-y-4 p-4">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">O que te surpreendeu?</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Descreva seu insight, duvida, ideia ou risco identificado..."
            className="min-h-[80px] resize-none"
            disabled={isAtMax}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CategorySelector selected={category} onSelect={setCategory} />
          <Button
            onClick={handleAdd}
            disabled={!canAdd}
            className={canAdd ? 'bg-studio-primary hover:bg-studio-primary/90' : ''}
          >
            <Icon name="plus" className="mr-1.5 size-4" />
            Adicionar
          </Button>
        </div>
        {isAtMax && <p className="text-xs text-amber-500">Limite de {MAX_WOWS} WOWs atingido</p>}
      </Card>

      {/* Suggestions */}
      {wows.length === 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Precisa de inspiracao?</p>
          <div className="flex flex-wrap gap-2">
            {PROMPT_SUGGESTIONS.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setText(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* WOWs List */}
      {wows.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              Seus WOWs ({wows.length}/{MAX_WOWS})
            </h3>
          </div>
          <div className="space-y-3">
            {wows.map((wow) => (
              <WOWCard
                key={wow.id}
                wow={wow}
                onEdit={(newText) => edit(wow.id, newText)}
                onDelete={() => remove(wow.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress & Actions */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          <span
            className={cn('font-mono font-medium', canAdvance ? 'text-emerald-500' : 'text-amber-500')}
          >
            {wows.length}/{MAX_WOWS}
          </span>{' '}
          WOWs {!canAdvance && `(minimo ${MIN_WOWS})`}
        </div>
        <Button
          onClick={onNext}
          disabled={!canAdvance}
          className={canAdvance ? 'bg-studio-primary hover:bg-studio-primary/90' : ''}
        >
          Continuar
          <Icon name="arrow-right" className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
};

export default WOWsInputView;
