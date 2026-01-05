import React from 'react';
import { Icon } from '../../../../ui/icon';
import { cn } from '../../../../../lib/utils';
import { NEGATIVE_TAGS, POSITIVE_TAGS } from '../types';

interface FeedbackSectionProps {
  isNegative: boolean;
  selectedTags: string[];
  comment: string;
  learnedSomething: boolean | null;
  onToggleTag: (tag: string) => void;
  onCommentChange: (value: string) => void;
  onLearnedChange: (value: boolean) => void;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  isNegative,
  selectedTags,
  comment,
  learnedSomething,
  onToggleTag,
  onCommentChange,
  onLearnedChange,
}) => {
  const feedbackTags = isNegative ? NEGATIVE_TAGS : POSITIVE_TAGS;

  return (
    <>
      {/* Tags Section */}
      <div className="space-y-4">
        <h2 className="text-center text-xl font-semibold text-foreground">
          {isNegative ? 'O que voce nao gostou?' : 'Que bom! O que voce gostou?'}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {feedbackTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onToggleTag(tag)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-sm transition-all',
                selectedTags.includes(tag)
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  : 'border-border bg-muted/50 text-muted-foreground hover:border-blue-300'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Comment textarea */}
      <div className="space-y-4">
        <h2 className="text-center text-xl font-semibold text-foreground">
          Mais alguma coisa?
        </h2>
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Compartilhe seus pensamentos..."
          className="min-h-[120px] w-full resize-none rounded-xl border border-border bg-background p-4 text-base placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Did you learn something */}
      <div className="space-y-4">
        <h2 className="text-center text-xl font-semibold text-foreground">
          Voce aprendeu algo novo?
        </h2>
        <div className="flex justify-center gap-6">
          <button
            type="button"
            onClick={() => onLearnedChange(false)}
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-full transition-all',
              learnedSomething === false
                ? 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            <Icon name="thumbs-down" size="size-6" />
          </button>
          <button
            type="button"
            onClick={() => onLearnedChange(true)}
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-full transition-all',
              learnedSomething === true
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            <Icon name="thumbs-up" size="size-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedbackSection;
