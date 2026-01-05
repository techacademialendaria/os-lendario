import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';

interface BookRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: BookFeedback) => void;
  onSkip: () => void;
  bookTitle: string;
  bookAuthor: string;
}

export interface BookFeedback {
  rating: number;
  tags: string[];
  comment: string;
  learnedSomething: boolean | null;
}

const RATING_LABELS = [
  { value: 1, label: 'Péssimo' },
  { value: 2, label: 'Ruim' },
  { value: 3, label: 'Ok' },
  { value: 4, label: 'Bom' },
  { value: 5, label: 'Incrível' },
];

const NEGATIVE_TAGS = [
  'Muito curto',
  'Chato / Perdi interesse',
  'Difícil de acompanhar',
  'Visões tendenciosas',
  'Não reflete o livro',
  'Narração ruim',
  'Pontos-chave confusos',
  'Outro',
];

const POSITIVE_TAGS = [
  'Nível de detalhe ideal',
  'Parece confiável',
  'Interessante / Envolvente',
  'Fácil de acompanhar',
  'Alinhado com minhas visões',
  'Boa narração',
  'Pontos-chave claros',
  'Outro',
];

const BookRatingModal: React.FC<BookRatingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSkip,
  bookTitle,
  bookAuthor,
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [learnedSomething, setLearnedSomething] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (selectedRating) {
      onSubmit({
        rating: selectedRating,
        tags: selectedTags,
        comment,
        learnedSomething,
      });
      resetForm();
    }
  };

  const handleSkip = () => {
    resetForm();
    onSkip();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSelectedRating(null);
    setSelectedTags([]);
    setComment('');
    setLearnedSomething(null);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const displayRating = hoveredRating ?? selectedRating;
  const isNegativeRating = selectedRating !== null && selectedRating <= 2;
  const isPositiveRating = selectedRating !== null && selectedRating >= 4;
  const showFeedbackSection = isNegativeRating || isPositiveRating;
  const feedbackTags = isNegativeRating ? NEGATIVE_TAGS : POSITIVE_TAGS;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto p-0">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8">
          <DialogHeader>
            <DialogTitle className="text-left text-2xl font-bold text-slate-800">
              O que você achou de
              <br />
              <span className="font-serif italic text-slate-600">{bookTitle}</span>
              <br />
              <span className="text-slate-800">de {bookAuthor}?</span>
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Rating section */}
        <div className="space-y-6 p-8">
          <h3 className="text-center text-lg font-semibold text-foreground">
            Como você avalia?
          </h3>

          {/* Stars */}
          <div className="flex justify-center gap-2">
            {RATING_LABELS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className="group flex flex-col items-center gap-1"
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(null)}
                onClick={() => {
                  setSelectedRating(value);
                  setSelectedTags([]); // Reset tags when rating changes
                }}
              >
                <Icon
                  name={displayRating && displayRating >= value ? 'star-solid' : 'star'}
                  size="size-10"
                  className={cn(
                    'transition-all',
                    displayRating && displayRating >= value
                      ? 'text-blue-500'
                      : 'text-blue-200 hover:text-blue-300'
                  )}
                />
                <span
                  className={cn(
                    'text-xs transition-colors',
                    displayRating === value
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Feedback tags section - only show after rating */}
          {showFeedbackSection && (
            <>
              <div className="space-y-3">
                <h4 className="text-center font-semibold text-foreground">
                  {isNegativeRating
                    ? 'O que você não gostou?'
                    : 'Que bom! O que você gostou?'}
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {feedbackTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'rounded-full border px-4 py-2 text-sm transition-all',
                        selectedTags.includes(tag)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-border bg-muted/50 text-muted-foreground hover:border-blue-300'
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment textarea */}
              <div className="space-y-2">
                <h4 className="text-center font-semibold text-foreground">
                  Mais alguma coisa?
                </h4>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Compartilhe seus pensamentos..."
                  className="min-h-[100px] w-full resize-none rounded-lg border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Did you learn something */}
              <div className="space-y-3">
                <h4 className="text-center font-semibold text-foreground">
                  Você aprendeu algo novo?
                </h4>
                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setLearnedSomething(false)}
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full transition-all',
                      learnedSomething === false
                        ? 'bg-red-100 text-red-600'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    <Icon name="thumbs-down" size="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLearnedSomething(true)}
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full transition-all',
                      learnedSomething === true
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    <Icon name="thumbs-up" size="size-5" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Submit button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedRating}
            className="w-full bg-slate-800 py-6 text-base font-semibold text-white hover:bg-slate-700 disabled:bg-slate-300"
          >
            Enviar Avaliação
          </Button>

          {/* Skip link */}
          <button
            onClick={handleSkip}
            className="mx-auto block text-sm text-muted-foreground hover:text-foreground"
          >
            Pular
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookRatingModal;
