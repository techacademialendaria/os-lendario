// StoryDetail organism for Stories Template
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { StoryDetailProps, STUDIO_TEAL, COMPLEXITY_CONFIG, Complexity } from '../types';

export const StoryDetail: React.FC<StoryDetailProps> = ({ story, onSave, onClose }) => {
  const [title, setTitle] = useState(story?.title || '');
  const [userStory, setUserStory] = useState(story?.userStory || '');
  const [criteria, setCriteria] = useState(story?.acceptanceCriteria?.join('\n') || '');
  const [complexity, setComplexity] = useState<Complexity>(story?.complexity || 'M');

  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setUserStory(story.userStory || '');
      setCriteria(story.acceptanceCriteria?.join('\n') || '');
      setComplexity(story.complexity || 'M');
    }
  }, [story]);

  const handleSave = () => {
    if (!story) return;
    onSave({
      ...story,
      title,
      userStory,
      acceptanceCriteria: criteria.split('\n').filter(Boolean),
      complexity,
    });
  };

  if (!story) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Icon name="cursor" size="size-12" className="mx-auto mb-4 opacity-30" />
          <p>Selecione uma story para editar</p>
        </div>
      </div>
    );
  }

  const criteriaLines = criteria.split('\n').filter(Boolean);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border p-4">
        <h3 className="font-bold">Editar Story</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <Icon name="xmark" className="size-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Titulo
            </label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* User Story */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              User Story
            </label>
            <AutosizeTextarea
              value={userStory}
              onChange={(e) => setUserStory(e.target.value)}
              placeholder="Como [persona], quero [acao], para [beneficio]"
              className="font-serif"
            />
          </div>

          {/* Acceptance Criteria */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Criterios de Aceite (um por linha)
            </label>
            <AutosizeTextarea
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              placeholder="- Criterio 1&#10;- Criterio 2&#10;- Criterio 3"
              className="min-h-[120px] font-mono text-sm"
            />
          </div>

          {/* Complexity */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Complexidade
            </label>
            <div className="flex gap-2">
              {(['P', 'M', 'G'] as Complexity[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setComplexity(c)}
                  className={cn(
                    'flex-1 rounded-lg border-2 p-3 text-center transition-all',
                    complexity === c
                      ? 'bg-[var(--studio-teal)]/10 border-[var(--studio-teal)]'
                      : 'border-border hover:border-muted-foreground'
                  )}
                  style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
                >
                  <div className={cn('text-lg font-bold', COMPLEXITY_CONFIG[c].color)}>{c}</div>
                  <div className="text-xs text-muted-foreground">{COMPLEXITY_CONFIG[c].label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Gherkin Preview */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Preview Gherkin
            </label>
            <Card className="bg-muted/30">
              <CardContent className="p-4 font-mono text-xs">
                <pre className="whitespace-pre-wrap text-muted-foreground">
                  {`Feature: ${title}

Scenario: ${title}
  ${userStory}

  ${criteriaLines
    .map((c: string, i: number) =>
      i === 0
        ? `Given ${c}`
        : i === criteriaLines.length - 1
          ? `Then ${c}`
          : `And ${c}`
    )
    .join('\n  ')}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t border-border p-4">
        <Button
          className="w-full text-white"
          style={{ backgroundColor: STUDIO_TEAL }}
          onClick={handleSave}
        >
          <Icon name="check" className="mr-2 size-4" />
          Salvar Alteracoes
        </Button>
      </div>
    </div>
  );
};
