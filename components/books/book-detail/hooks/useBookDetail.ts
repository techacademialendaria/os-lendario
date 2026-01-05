import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook, useBooks } from '@/hooks/useBooks';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useBookInteractions, ReadingStatus } from '@/hooks/useMyBooks';
import { useAuthor } from '@/hooks/useAuthor';
import { useRBAC } from '@/hooks/useRBAC';
import { toast } from '@/hooks/use-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { STATUS_CONFIG, COVER_GRADIENTS, DESCRIPTION_LIMIT, AUTHOR_BIO_LIMIT } from '../data';

// Debounce helper
function useDebouncedCallback<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFn;
}

export function useBookDetail() {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();

  // Data fetching
  const { book, loading, error } = useBook(bookSlug || '');
  const { books: allBooks } = useBooks();
  const {
    interactions,
    isLoading: interactionsLoading,
    toggleFavorite,
    setReadingStatus,
  } = useBookInteractions(book?.id || '');
  const { author, loading: authorLoading } = useAuthor(book?.authorSlug || null);

  // RBAC for edit permissions
  const { isCollaboratorOrAbove } = useRBAC();

  // Local state
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAuthorBioExpanded, setIsAuthorBioExpanded] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedTitle, setEditedTitle] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState<string | null>(null);

  // Sync edited values when book changes or edit mode is toggled off
  useEffect(() => {
    if (!isEditMode) {
      setEditedTitle(null);
      setEditedDescription(null);
    }
  }, [isEditMode]);

  // Save field to database
  const saveField = useCallback(
    async (field: 'title' | 'description', value: string) => {
      if (!book?.id || !isSupabaseConfigured()) return;

      setIsSaving(true);
      try {
        const updateData =
          field === 'title'
            ? { title: value }
            : { metadata: { ...((book as any).rawMetadata || {}), description: value } };

        // For description, we need to update the metadata.description field
        if (field === 'description') {
          // Fetch current metadata first
          const { data: currentData } = await supabase
            .from('contents')
            .select('metadata')
            .eq('id', book.id)
            .single();

          const currentMetadata = (currentData?.metadata as Record<string, unknown>) || {};

          const { error } = await (supabase as any)
            .from('contents')
            .update({
              metadata: { ...currentMetadata, description: value },
              updated_at: new Date().toISOString(),
            })
            .eq('id', book.id);

          if (error) throw error;
        } else {
          const { error } = await (supabase as any)
            .from('contents')
            .update({
              title: value,
              updated_at: new Date().toISOString(),
            })
            .eq('id', book.id);

          if (error) throw error;
        }

        toast({
          title: 'Salvo',
          description: field === 'title' ? 'Título atualizado.' : 'Descrição atualizada.',
          variant: 'success',
        });
      } catch (err) {
        console.error(`Failed to save ${field}:`, err);
        toast({
          title: 'Erro ao salvar',
          description: 'Não foi possível salvar as alterações.',
          variant: 'destructive',
        });
        // Revert on error
        if (field === 'title') setEditedTitle(null);
        else setEditedDescription(null);
      } finally {
        setIsSaving(false);
      }
    },
    [book?.id]
  );

  // Debounced save (500ms)
  const debouncedSaveTitle = useDebouncedCallback((value: string) => {
    saveField('title', value);
  }, 500);

  const debouncedSaveDescription = useDebouncedCallback((value: string) => {
    saveField('description', value);
  }, 500);

  // Update handlers for inline editing
  const updateTitle = useCallback(
    (value: string) => {
      setEditedTitle(value);
      debouncedSaveTitle(value);
    },
    [debouncedSaveTitle]
  );

  const updateDescription = useCallback(
    (value: string) => {
      setEditedDescription(value);
      debouncedSaveDescription(value);
    },
    [debouncedSaveDescription]
  );

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

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
  const handleChangeStatus = useCallback(
    async (status: ReadingStatus) => {
      if (!book?.id || isChangingStatus) return;
      setIsChangingStatus(true);
      try {
        await setReadingStatus(status);
        toast({
          title: status === 'none' ? 'Removido da lista' : 'Status atualizado',
          description:
            status === 'none'
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
    },
    [book?.id, isChangingStatus, setReadingStatus]
  );

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

  const navigateToCategory = useCallback(
    (slug: string) => {
      navigate(`/books?category=${slug}`);
    },
    [navigate]
  );

  const navigateToBook = useCallback(
    (slug: string) => {
      navigate(`/books/${slug}`);
    },
    [navigate]
  );

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
