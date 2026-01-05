import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook, useBooks } from '@/hooks/useBooks';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useBookInteractions, ReadingStatus } from '@/hooks/useMyBooks';
import { useAuthor } from '@/hooks/useAuthor';
import { toast } from '@/hooks/use-toast';
import { STATUS_CONFIG, COVER_GRADIENTS, DESCRIPTION_LIMIT, AUTHOR_BIO_LIMIT } from '../data';

export function useBookDetail() {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();

  // Data fetching
  const { book, loading, error } = useBook(bookSlug || '');
  const { books: allBooks } = useBooks();
  const { interactions, isLoading: interactionsLoading, toggleFavorite, setReadingStatus } = useBookInteractions(book?.id || '');
  const { author, loading: authorLoading } = useAuthor(book?.authorSlug || null);

  // Local state
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAuthorBioExpanded, setIsAuthorBioExpanded] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  // Page title
  usePageTitle(book?.title || 'Carregando...');

  // Derived data
  const currentStatus = interactions?.readingStatus || 'none';
  const description = book?.summary || '';
  const shouldTruncateDescription = description.length > DESCRIPTION_LIMIT;
  const displayedDescription = isDescriptionExpanded
    ? description
    : description.substring(0, DESCRIPTION_LIMIT);

  const authorBio = author?.shortBio || '';
  const shouldTruncateAuthorBio = authorBio.length > AUTHOR_BIO_LIMIT;
  const displayedAuthorBio = isAuthorBioExpanded
    ? authorBio
    : authorBio.substring(0, AUTHOR_BIO_LIMIT);

  const gradientIndex = (bookSlug?.charCodeAt(0) || 0) % COVER_GRADIENTS.length;
  const fallbackGradient = COVER_GRADIENTS[gradientIndex];

  const relatedBooks = allBooks
    .filter((b) => b.id !== book?.id && b.categorySlug === book?.categorySlug)
    .slice(0, 4);

  // Handlers
  const handleChangeStatus = useCallback(async (status: ReadingStatus) => {
    if (!book?.id || isChangingStatus) return;
    setIsChangingStatus(true);
    try {
      await setReadingStatus(status);
      toast({
        title: status === 'none' ? 'Removido da lista' : 'Status atualizado',
        description: status === 'none'
          ? 'Livro removido da sua lista.'
          : `Livro marcado como "${STATUS_CONFIG[status].label}".`,
        variant: 'success',
      });
    } catch (err) {
      console.error('Failed to change reading status:', err);
      toast({
        title: 'Erro ao atualizar status',
        description: 'Nao foi possivel salvar. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsChangingStatus(false);
    }
  }, [book?.id, isChangingStatus, setReadingStatus]);

  const handleToggleFavorite = useCallback(async () => {
    if (!book?.id || isTogglingFavorite) return;
    setIsTogglingFavorite(true);
    try {
      const isFavorite = await toggleFavorite();
      toast({
        title: isFavorite ? 'Adicionado aos favoritos' : 'Removido dos favoritos',
        description: isFavorite
          ? 'Livro salvo nos seus favoritos.'
          : 'Livro removido dos favoritos.',
        variant: 'success',
      });
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
      toast({
        title: 'Erro ao favoritar',
        description: 'Nao foi possivel salvar. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsTogglingFavorite(false);
    }
  }, [book?.id, isTogglingFavorite, toggleFavorite]);

  // Navigation
  const navigateToAuthor = useCallback(() => {
    if (book?.authorSlug) {
      navigate(`/books/author/${book.authorSlug}`);
    }
  }, [navigate, book?.authorSlug]);

  const navigateToReader = useCallback(() => {
    navigate(`/books/${bookSlug}/read`);
  }, [navigate, bookSlug]);

  const navigateToCategory = useCallback((slug: string) => {
    navigate(`/books?category=${slug}`);
  }, [navigate]);

  const navigateToBook = useCallback((slug: string) => {
    navigate(`/books/${slug}`);
  }, [navigate]);

  const navigateToLibrary = useCallback(() => {
    navigate('/books');
  }, [navigate]);

  return {
    // Data
    bookSlug,
    book,
    loading,
    error,
    author,
    authorLoading,
    interactions,
    interactionsLoading,
    relatedBooks,

    // Status
    currentStatus,
    isChangingStatus,
    isTogglingFavorite,

    // Description
    description,
    displayedDescription,
    shouldTruncateDescription,
    isDescriptionExpanded,
    toggleDescription: () => setIsDescriptionExpanded((prev) => !prev),

    // Author bio
    displayedAuthorBio,
    shouldTruncateAuthorBio,
    isAuthorBioExpanded,
    toggleAuthorBio: () => setIsAuthorBioExpanded((prev) => !prev),

    // Styling
    fallbackGradient,

    // Handlers
    handleChangeStatus,
    handleToggleFavorite,
    navigateToAuthor,
    navigateToReader,
    navigateToCategory,
    navigateToBook,
    navigateToLibrary,
  };
}
