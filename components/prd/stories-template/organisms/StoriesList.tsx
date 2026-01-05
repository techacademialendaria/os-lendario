// StoriesList organism for Stories Template
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { StoriesListProps, STUDIO_TEAL, COMPLEXITY_CONFIG } from '../types';

export const StoriesList: React.FC<StoriesListProps> = ({
  epic,
  stories,
  selectedStoryId,
  onSelectStory,
  onGenerateStories,
  isGenerating,
}) => (
  <div className="flex-1 overflow-auto border-r border-border">
    <div className="sticky top-0 flex items-center justify-between border-b border-border bg-background/80 p-4 backdrop-blur-sm">
      <div>
        <h3 className="font-bold">{epic?.title || 'Selecione um epico'}</h3>
        <p className="text-xs text-muted-foreground">{stories.length} stories</p>
      </div>
      {epic && (
        <Button
          variant="outline"
          size="sm"
          onClick={onGenerateStories}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Icon name="refresh" className="mr-2 size-3 animate-spin" />
          ) : (
            <Icon name="magic-wand" className="mr-2 size-3" />
          )}
          {stories.length > 0 ? 'Regenerar' : 'Gerar Stories'}
        </Button>
      )}
    </div>

    <div className="p-4">
      {stories.length === 0 ? (
        <Card className="p-8 text-center">
          <Icon
            name="list"
            size="size-12"
            className="mx-auto mb-4 text-muted-foreground/30"
          />
          <p className="mb-4 text-muted-foreground">Nenhuma story para este epico</p>
          {epic && (
            <Button
              onClick={onGenerateStories}
              disabled={isGenerating}
              style={{ backgroundColor: STUDIO_TEAL }}
              className="text-white"
            >
              <Icon name="magic-wand" className="mr-2 size-4" />
              Gerar Stories com IA
            </Button>
          )}
        </Card>
      ) : (
        <div className="space-y-2">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => onSelectStory(story.id)}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all',
                selectedStoryId === story.id
                  ? 'bg-[var(--studio-teal)]/5 border-[var(--studio-teal)]'
                  : 'border-border hover:border-muted-foreground/50'
              )}
              style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
            >
              <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                #{story.sequence_order}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="mb-1 flex items-center gap-2">
                  <span className="truncate font-medium">{story.title}</span>
                  <Badge
                    className={cn(
                      'text-[10px]',
                      COMPLEXITY_CONFIG[story.complexity || 'M'].bg,
                      COMPLEXITY_CONFIG[story.complexity || 'M'].color
                    )}
                  >
                    {story.complexity || 'M'}
                  </Badge>
                </div>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {story.userStory}
                </p>
              </div>
              <Icon name="angle-small-right" className="size-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
);
