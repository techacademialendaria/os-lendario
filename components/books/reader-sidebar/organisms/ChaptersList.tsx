import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { ChaptersListProps } from '../types';

/**
 * ChaptersList - Navigable list of book chapters
 */
export const ChaptersList: React.FC<ChaptersListProps> = ({
  chapters,
  onScrollToChapter,
}) => {
  if (chapters.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        <Icon name="document" className="mx-auto mb-2" size="size-8" />
        <p>Sem capitulos identificados</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {chapters.map((chapter, i) => {
        const isH3 = chapter.level === 3;
        return (
          <button
            key={chapter.id}
            onClick={() => onScrollToChapter(chapter.slug)}
            className={cn(
              'flex w-full items-start border-b border-border/50 text-left transition-colors hover:bg-muted/30',
              isH3 ? 'py-2.5 pl-10 pr-6 text-xs' : 'px-6 py-4 text-sm',
              i === 0
                ? 'border-l-4 border-l-primary bg-primary/5'
                : 'text-muted-foreground'
            )}
          >
            <span
              className={cn(
                'block leading-snug',
                i === 0 && 'font-bold text-foreground',
                isH3 && 'text-muted-foreground/80'
              )}
            >
              {isH3 && '> '}{chapter.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ChaptersList;
