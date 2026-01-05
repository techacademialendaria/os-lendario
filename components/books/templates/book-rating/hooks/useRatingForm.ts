import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBook } from '../../../../../hooks/useBooks';
import { useBookInteractions } from '../../../../../hooks/useMyBooks';
import { toast } from '../../../../../hooks/use-toast';
import type { RatingState, FeedbackState, SubmissionState } from '../types';

interface UseRatingFormResult {
  // Data
  book: ReturnType<typeof useBook>['book'];
  bookLoading: boolean;
  slug: string | undefined;

  // Rating state
  rating: RatingState;
  setSelectedRating: (value: number | null) => void;
  setHoveredRating: (value: number | null) => void;

  // Feedback state
  feedback: FeedbackState;
  toggleTag: (tag: string) => void;
  setComment: (value: string) => void;
  setLearnedSomething: (value: boolean | null) => void;

  // Submission
  submission: SubmissionState;
  handleSubmit: () => Promise<void>;
  handleSkip: () => void;

  // Computed
  displayRating: number | null;
  isNegativeRating: boolean;
  isPositiveRating: boolean;
  showFeedbackSection: boolean;
}

export function useRatingForm(): UseRatingFormResult {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { book, loading: bookLoading } = useBook(slug || '');
  const { rateBook } = useBookInteractions(book?.id || '');

  // Rating state
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  // Feedback state
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [learnedSomething, setLearnedSomething] = useState<boolean | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle tag selection
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  // Handle rating selection (also clears tags)
  const handleSetSelectedRating = useCallback((value: number | null) => {
    setSelectedRating(value);
    setSelectedTags([]);
  }, []);

  // Submit rating
  const handleSubmit = useCallback(async () => {
    if (!selectedRating || !book) return;

    setIsSubmitting(true);
    try {
      await rateBook(selectedRating);
      // TODO: Save tags, comment, and learnedSomething to database
      toast({
        title: 'Avaliacao enviada!',
        description: 'Obrigado pelo seu feedback.',
        variant: 'success',
      });
      navigate(`/books/${slug}`);
    } catch (err) {
      console.error('Failed to submit rating:', err);
      toast({
        title: 'Erro ao enviar',
        description: 'Nao foi possivel salvar. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedRating, book, rateBook, slug, navigate]);

  // Skip rating
  const handleSkip = useCallback(() => {
    navigate(`/books/${slug}`);
  }, [navigate, slug]);

  // Computed values
  const displayRating = hoveredRating ?? selectedRating;
  const isNegativeRating = selectedRating !== null && selectedRating <= 2;
  const isPositiveRating = selectedRating !== null && selectedRating >= 4;
  const showFeedbackSection = isNegativeRating || isPositiveRating;

  return {
    book,
    bookLoading,
    slug,
    rating: { selectedRating, hoveredRating },
    setSelectedRating: handleSetSelectedRating,
    setHoveredRating,
    feedback: { selectedTags, comment, learnedSomething },
    toggleTag,
    setComment,
    setLearnedSomething,
    submission: { isSubmitting },
    handleSubmit,
    handleSkip,
    displayRating,
    isNegativeRating,
    isPositiveRating,
    showFeedbackSection,
  };
}
