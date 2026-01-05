import { useMemo, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook } from '@/hooks/useBooks';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useBookInteractions, type ReadingStatus } from '@/hooks/useMyBooks';
import { useAuth } from '@/lib/AuthContext';
import { useHighlights } from '@/hooks/useHighlights';
import { toast } from '@/hooks/use-toast';
import {
  calculateReadingTime,
  extractTLDR,
  extractQuotes,
  extractChapters,
} from '@/lib/reading-utils';
import { getCoverGradient } from '../../reader';
import type { UseBookReaderReturn, BookInteractions } from '../types';

export function useBookReader(): UseBookReaderReturn {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();

  // Data fetching
  const { book, loading, error } = useBook(bookSlug || '');
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Highlights
  const { addHighlight, book: highlightBook, isLoading: highlightLoading } = useHighlights(bookSlug || '');
  const canHighlight = !highlightLoading && !!highlightBook;

  // Interactions
  const {
    interactions,
    isLoading: interactionsLoading,
    toggleFavorite,
    setReadingStatus: setStatus,
  } = useBookInteractions(book?.id || '');

  // Local state
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [isMarkingRead, setIsMarkingRead] = useState(false);

  // Page title
  usePageTitle(book?.title ? `Lendo: ${book.title}` : 'Carregando...');

  // Derived data
  const showFullContent = !authLoading && isAuthenticated;
  const displayContent = book?.content || book?.summary || null;
  const fallbackGradient = getCoverGradient(bookSlug || '');

  const keyQuotes = useMemo(() => extractQuotes(book?.content || null), [book?.content]);
  const chapters = useMemo(() => extractChapters(book?.content || null), [book?.content]);
  const readingTime = useMemo(() => calculateReadingTime(book?.content || null), [book?.content]);
  const tldrSummary = useMemo(() => extractTLDR(book?.content || null), [book?.content]);

  // Handlers
  const handleHighlight = useCallback(async (text: string, note?: string): Promise<string | null> => {
    if (!isAuthenticated) {
      toast({
        title: 'Login necessario',
        description: 'Faca login para salvar highlights.',
        variant: 'destructive',
      });
      return null;
    }
    if (!canHighlight) {
      toast({
        title: 'Aguarde',
        description: 'Carregando dados do livro...',
      });
      return null;
    }
    try {
      const highlightId = await addHighlight(text, note);
      toast({
        title: note ? 'Nota salva!' : 'Destacado!',
        description: 'Seu highlight foi salvo.',
      });
      return highlightId;
    } catch (err) {
      console.error('Failed to highlight:', err);
      toast({
        title: 'Erro',
        description: 'Nao foi possivel salvar o highlight.',
        variant: 'destructive',
      });
      return null;
    }
  }, [isAuthenticated, canHighlight, addHighlight]);

  const handleCopy = useCallback((text: string) => {
    toast({ title: 'Copiado!', description: 'Texto copiado para a area de transferencia.' });
  }, []);

  const handleToggleFavorite = useCallback(async () => {
    if (!book?.id || isTogglingFavorite) return;
    setIsTogglingFavorite(true);
    try {
      await toggleFavorite();
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    } finally {
      setIsTogglingFavorite(false);
    }
  }, [book?.id, isTogglingFavorite, toggleFavorite]);

  const handleMarkAsRead = useCallback(async () => {
    if (!book?.id || isMarkingRead) return;

    // If already read, toggle back to reading (no rating prompt)
    if (interactions?.readingStatus === 'read') {
      setIsMarkingRead(true);
      try {
        await setStatus('reading');
      } catch (err) {
        console.error('Failed to update status:', err);
      } finally {
        setIsMarkingRead(false);
      }
      return;
    }

    // Marking as read for the first time - go to rating page
    setIsMarkingRead(true);
    try {
      await setStatus('read');
      navigate(`/books/${bookSlug}/rate`);
    } catch (err) {
      console.error('Failed to mark as read:', err);
      setIsMarkingRead(false);
    }
  }, [book?.id, isMarkingRead, interactions?.readingStatus, setStatus, navigate, bookSlug]);

  const setReadingStatus = useCallback(async (status: ReadingStatus) => {
    await setStatus(status);
  }, [setStatus]);

  // Navigation
  const navigateToDetails = useCallback(() => navigate(`/books/${bookSlug}`), [navigate, bookSlug]);
  const navigateToLibrary = useCallback(() => navigate('/books'), [navigate]);
  const navigateToLogin = useCallback(() => {
    navigate('/auth/login', { state: { from: { pathname: `/books/${bookSlug}/read` } } });
  }, [navigate, bookSlug]);
  const navigateToRating = useCallback(() => navigate(`/books/${bookSlug}/rate`), [navigate, bookSlug]);
  const navigateToCategory = useCallback((slug: string) => navigate(`/books?category=${slug}`), [navigate]);

  return {
    // Params
    bookSlug: bookSlug || '',

    // Data
    book: book as UseBookReaderReturn['book'],
    loading,
    error,

    // Auth
    isAuthenticated,
    authLoading,
    showFullContent,

    // Interactions
    interactions: interactions as BookInteractions | null,
    interactionsLoading,
    isTogglingFavorite,
    isMarkingRead,

    // Highlights
    canHighlight,

    // Content
    displayContent,
    chapters,
    keyQuotes,
    readingTime,
    tldrSummary,
    fallbackGradient,

    // Handlers
    handleHighlight,
    handleCopy,
    handleToggleFavorite,
    handleMarkAsRead,
    setReadingStatus,

    // Navigation
    navigateToDetails,
    navigateToLibrary,
    navigateToLogin,
    navigateToRating,
    navigateToCategory,
  };
}
