import React, { useState } from 'react';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { Section } from '../../../../types';
import BooksTopbar from '../../topbar';
import { useRatingForm } from './hooks';
import { RatingStars, FeedbackSection } from './organisms';
import type { BookRatingTemplateProps } from './types';

/**
 * BookRatingTemplate - Orchestrates book rating flow
 *
 * Responsibilities:
 * - Rating form state management (useRatingForm)
 * - Section navigation
 * - Loading/error states
 *
 * Lines: ~80 (down from 301)
 */
const BookRatingTemplate: React.FC<BookRatingTemplateProps> = ({ setSection }) => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.APP_BOOKS_LIBRARY);

  const handleSetSection = (section: Section) => {
    setCurrentSection(section);
    setSection(section);
  };

  const form = useRatingForm();

  // Loading state
  if (form.bookLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Icon name="spinner" className="animate-spin text-muted-foreground" size="size-8" />
      </div>
    );
  }

  // Book not found
  if (!form.book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Livro nao encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <BooksTopbar currentSection={currentSection} setSection={handleSetSection} />

      {/* Header with gradient background */}
      <div className="bg-gradient-to-br from-blue-100 to-blue-50 px-6 py-12 dark:from-blue-950 dark:to-slate-900">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white md:text-4xl">
            O que voce achou de
          </h1>
          <p className="mt-2 font-serif text-2xl italic text-slate-600 dark:text-slate-300 md:text-3xl">
            {form.book.title}
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-800 dark:text-white">
            de {form.book.author}
          </p>
        </div>
      </div>

      {/* Rating section */}
      <div className="mx-auto max-w-2xl space-y-10 px-6 py-12">
        <RatingStars
          selectedRating={form.rating.selectedRating}
          hoveredRating={form.rating.hoveredRating}
          onSelect={form.setSelectedRating}
          onHover={form.setHoveredRating}
        />

        {form.showFeedbackSection && (
          <FeedbackSection
            isNegative={form.isNegativeRating}
            selectedTags={form.feedback.selectedTags}
            comment={form.feedback.comment}
            learnedSomething={form.feedback.learnedSomething}
            onToggleTag={form.toggleTag}
            onCommentChange={form.setComment}
            onLearnedChange={form.setLearnedSomething}
          />
        )}

        {/* Actions */}
        <div className="space-y-4 pt-4">
          <Button
            onClick={form.handleSubmit}
            disabled={!form.rating.selectedRating || form.submission.isSubmitting}
            className="w-full bg-slate-800 py-6 text-base font-semibold text-white hover:bg-slate-700 disabled:bg-slate-300 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            {form.submission.isSubmitting ? (
              <>
                <Icon name="spinner" className="mr-2 animate-spin" size="size-4" />
                Enviando...
              </>
            ) : (
              'Enviar Avaliacao'
            )}
          </Button>

          <button
            onClick={form.handleSkip}
            className="mx-auto block text-base text-muted-foreground hover:text-foreground"
          >
            Pular
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookRatingTemplate;
