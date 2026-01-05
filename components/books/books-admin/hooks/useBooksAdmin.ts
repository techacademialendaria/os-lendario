import { useState, useMemo, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  useAdminBooks,
  useAdminCollections,
  useAuthorSearch,
  useCategoryOptions,
  type AdminBook,
  type BookLanguage,
  type SaveBookData,
} from '@/hooks/useAdminBooks';
import { useBookCategories } from '@/hooks/useBooks';
import type { BookFormState, BookFormErrors, VersionFormState } from '../types';
import { createEmptyFormState, createFormStateFromBook } from '../../admin/utils';

export function useBooksAdmin() {
  const { toast } = useToast();

  // Data hooks
  const {
    books,
    stats,
    loading,
    error,
    refetch,
    deleteBook,
    updateBookStatus,
    saveBook,
    uploadCover,
  } = useAdminBooks();
  const { collections, loading: collectionsLoading } = useAdminCollections();
  const { categories } = useBookCategories();
  const { categories: categoryOptions } = useCategoryOptions();
  const {
    authors: authorResults,
    loading: authorSearchLoading,
    search: searchAuthors,
    clear: clearAuthorSearch,
  } = useAuthorSearch();

  // UI state
  const [view, setView] = useState<'list' | 'editor' | 'pipeline'>('list');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeLangTab, setActiveLangTab] = useState<BookLanguage>('pt');
  const [editorPreview, setEditorPreview] = useState(false);
  const [selectedBook, setSelectedBook] = useState<AdminBook | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Form state
  const [formState, setFormState] = useState<BookFormState>(createEmptyFormState());
  const [saving, setSaving] = useState(false);
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  // Form validation errors
  const [formErrors, setFormErrors] = useState<BookFormErrors>({});

  // Initialize form when selectedBook changes
  useEffect(() => {
    if (selectedBook) {
      setFormState(createFormStateFromBook(selectedBook));
    } else {
      setFormState(createEmptyFormState());
    }
  }, [selectedBook]);

  // Debounced author search
  const handleAuthorSearch = useCallback(
    (query: string) => {
      setFormState((prev) => ({ ...prev, authorName: query, authorId: null }));
      if (query.length >= 2) {
        searchAuthors(query);
        setShowAuthorDropdown(true);
      } else {
        clearAuthorSearch();
        setShowAuthorDropdown(false);
      }
    },
    [searchAuthors, clearAuthorSearch]
  );

  // Select author from search results
  const handleSelectAuthor = useCallback(
    (author: { id: string; name: string }) => {
      setFormState((prev) => ({ ...prev, authorId: author.id, authorName: author.name }));
      setShowAuthorDropdown(false);
      clearAuthorSearch();
    },
    [clearAuthorSearch]
  );

  // Update form field
  const updateFormField = useCallback(
    <K extends keyof BookFormState>(field: K, value: BookFormState[K]) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // Update version field
  const updateVersionField = useCallback(
    (lang: BookLanguage, field: keyof VersionFormState, value: string) => {
      setFormState((prev) => {
        const currentVersion = prev.versions[lang] || {
          title: '',
          slug: '',
          content: '',
          summary: '',
          status: 'draft' as const,
        };
        return {
          ...prev,
          versions: {
            ...prev.versions,
            [lang]: { ...currentVersion, [field]: value },
          },
        };
      });
    },
    []
  );

  // Update metadata field
  const updateMetadataField = useCallback(
    <K extends keyof BookFormState['metadata']>(field: K, value: BookFormState['metadata'][K]) => {
      setFormState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, [field]: value },
      }));
    },
    []
  );

  // Add/remove category
  const toggleCategory = useCallback((slug: string) => {
    setFormState((prev) => ({
      ...prev,
      categorySlug: prev.categorySlug === slug ? null : slug,
    }));
  }, []);

  // Add/remove collection
  const toggleCollection = useCallback((slug: string) => {
    setFormState((prev) => ({
      ...prev,
      collectionSlugs: prev.collectionSlugs.includes(slug)
        ? prev.collectionSlugs.filter((s) => s !== slug)
        : [...prev.collectionSlugs, slug],
    }));
  }, []);

  // Validate form
  const validateForm = useCallback((): boolean => {
    const errors: BookFormErrors = {};
    let isValid = true;

    if (!formState.originalTitle.trim()) {
      errors.originalTitle = 'Titulo original e obrigatorio';
      isValid = false;
    }

    const hasVersion = formState.versions.pt || formState.versions.en || formState.versions.es;
    if (!hasVersion) {
      errors.versions = 'Adicione pelo menos uma versao de idioma';
      isValid = false;
    }

    const versionTitleErrors: { [key in BookLanguage]?: string } = {};
    const versionSlugErrors: { [key in BookLanguage]?: string } = {};

    (['pt', 'en', 'es'] as BookLanguage[]).forEach((lang) => {
      const version = formState.versions[lang];
      if (version) {
        if (!version.title.trim()) {
          versionTitleErrors[lang] = 'Titulo e obrigatorio';
          isValid = false;
        }
        if (!version.slug.trim()) {
          versionSlugErrors[lang] = 'Slug e obrigatorio';
          isValid = false;
        } else if (!/^[a-z0-9_-]+$/.test(version.slug)) {
          versionSlugErrors[lang] = 'Slug deve conter apenas letras minusculas, numeros, hifens e underscores';
          isValid = false;
        }
      }
    });

    if (Object.keys(versionTitleErrors).length > 0) {
      errors.versionTitle = versionTitleErrors;
    }
    if (Object.keys(versionSlugErrors).length > 0) {
      errors.versionSlug = versionSlugErrors;
    }

    setFormErrors(errors);
    return isValid;
  }, [formState]);

  // Clear error when field changes
  const clearFieldError = useCallback((field: keyof BookFormErrors) => {
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = book.originalTitle.toLowerCase().includes(query);
        const matchesAuthor = book.author?.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor) return false;
      }

      if (statusFilter !== 'all' && book.status !== statusFilter) {
        return false;
      }

      if (categoryFilter !== 'all' && book.category?.slug !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [books, searchQuery, statusFilter, categoryFilter]);

  // Handlers
  const handleCreate = useCallback(() => {
    setSelectedBook(null);
    setView('editor');
  }, []);

  const handleEdit = useCallback((book: AdminBook) => {
    setSelectedBook(book);
    if (book.languages.pt) setActiveLangTab('pt');
    else if (book.languages.en) setActiveLangTab('en');
    else if (book.languages.es) setActiveLangTab('es');
    setView('editor');
  }, []);

  const handleSave = useCallback(async () => {
    if (!validateForm()) {
      toast({ title: 'Corrija os erros no formulario', variant: 'destructive' });
      return;
    }

    setSaving(true);

    try {
      let coverUrl = formState.coverUrl;
      if (formState.coverFile) {
        const slug =
          formState.versions.pt?.slug ||
          formState.versions.en?.slug ||
          formState.originalTitle.toLowerCase().replace(/\s+/g, '_');
        coverUrl = await uploadCover(formState.coverFile, slug);
      }

      const saveData: SaveBookData = {
        originalTitle: formState.originalTitle,
        authorId: formState.authorId,
        categorySlug: formState.categorySlug,
        collectionSlugs: formState.collectionSlugs,
        coverUrl,
        versions: {
          pt: formState.versions.pt
            ? {
                id: formState.versions.pt.id,
                title: formState.versions.pt.title,
                slug: formState.versions.pt.slug,
                content: formState.versions.pt.content,
                summary: formState.versions.pt.summary,
                status: formState.isPublished ? 'published' : 'draft',
              }
            : undefined,
          en: formState.versions.en
            ? {
                id: formState.versions.en.id,
                title: formState.versions.en.title,
                slug: formState.versions.en.slug,
                content: formState.versions.en.content,
                summary: formState.versions.en.summary,
                status: formState.isPublished ? 'published' : 'draft',
              }
            : undefined,
          es: formState.versions.es
            ? {
                id: formState.versions.es.id,
                title: formState.versions.es.title,
                slug: formState.versions.es.slug,
                content: formState.versions.es.content,
                summary: formState.versions.es.summary,
                status: formState.isPublished ? 'published' : 'draft',
              }
            : undefined,
        },
        metadata: {
          isbn: formState.metadata.isbn || null,
          year: formState.metadata.year || null,
          pageCount: formState.metadata.pageCount ? parseInt(formState.metadata.pageCount) : null,
          readingTime: formState.metadata.readingTime ? parseInt(formState.metadata.readingTime) : null,
          hasAudio: formState.metadata.hasAudio,
        },
      };

      await saveBook(saveData);

      toast({
        title: selectedBook ? 'Livro Atualizado' : 'Livro Criado',
        description: selectedBook
          ? 'As alteracoes foram salvas com sucesso.'
          : 'O livro foi adicionado ao acervo.',
        variant: 'success',
      });

      setView('list');
      setSelectedBook(null);
      refetch();
    } catch (err) {
      console.error('Save error:', err);
      toast({
        title: 'Erro ao Salvar',
        description: 'Ocorreu um erro ao salvar o livro. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }, [formState, selectedBook, validateForm, uploadCover, saveBook, toast, refetch]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;

    try {
      await deleteBook(deleteTarget.id);
      toast({
        title: 'Livro Excluido',
        description: 'O livro foi removido permanentemente.',
        variant: 'success',
      });
      setShowDeleteDialog(false);
      setDeleteTarget(null);
      if (view === 'editor') {
        setView('list');
        setSelectedBook(null);
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Nao foi possivel excluir o livro.',
        variant: 'destructive',
      });
    }
  }, [deleteTarget, deleteBook, toast, view]);

  const handleDelete = useCallback((bookId: string, bookTitle: string) => {
    setDeleteTarget({ id: bookId, title: bookTitle });
    setShowDeleteDialog(true);
  }, []);

  const handleCoverUpload = useCallback((file: File | null) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormState((prev) => ({
        ...prev,
        coverFile: file,
        coverUrl: previewUrl,
      }));
    }
  }, []);

  const handleBulkPublish = useCallback(async () => {
    for (const book of filteredBooks) {
      const firstVersion = book.languages.pt || book.languages.en || book.languages.es;
      if (firstVersion && selectedIds.includes(firstVersion.id)) {
        await updateBookStatus(firstVersion.id, 'published');
      }
    }
    setSelectedIds([]);
    refetch();
    toast({ title: 'Livros Publicados', variant: 'success' });
  }, [filteredBooks, selectedIds, updateBookStatus, refetch, toast]);

  const handleBulkArchive = useCallback(async () => {
    for (const book of filteredBooks) {
      const firstVersion = book.languages.pt || book.languages.en || book.languages.es;
      if (firstVersion && selectedIds.includes(firstVersion.id)) {
        await updateBookStatus(firstVersion.id, 'archived');
      }
    }
    setSelectedIds([]);
    refetch();
    toast({ title: 'Livros Arquivados', variant: 'success' });
  }, [filteredBooks, selectedIds, updateBookStatus, refetch, toast]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedIds.length === filteredBooks.length) {
      setSelectedIds([]);
    } else {
      const ids = filteredBooks
        .map((b) => b.languages.pt?.id || b.languages.en?.id || b.languages.es?.id)
        .filter(Boolean) as string[];
      setSelectedIds(ids);
    }
  }, [selectedIds.length, filteredBooks]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  return {
    // Data
    books,
    filteredBooks,
    stats,
    loading,
    error,
    categories,
    categoryOptions,
    collections,
    collectionsLoading,
    authorResults,
    authorSearchLoading,

    // UI State
    view,
    setView,
    layoutMode,
    setLayoutMode,
    searchQuery,
    setSearchQuery,
    selectedIds,
    activeLangTab,
    setActiveLangTab,
    editorPreview,
    setEditorPreview,
    selectedBook,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,

    // Form State
    formState,
    formErrors,
    setFormErrors,
    saving,
    showAuthorDropdown,
    showDeleteDialog,
    setShowDeleteDialog,
    deleteTarget,

    // Handlers
    handleAuthorSearch,
    handleSelectAuthor,
    updateFormField,
    updateVersionField,
    updateMetadataField,
    toggleCategory,
    toggleCollection,
    clearFieldError,
    handleCreate,
    handleEdit,
    handleSave,
    handleDelete,
    handleDeleteConfirm,
    handleCoverUpload,
    handleBulkPublish,
    handleBulkArchive,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    refetch,
  };
}
