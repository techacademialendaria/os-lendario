import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card } from '../../ui/card';
import { Separator } from '../../ui/separator';
import { Section } from '../../../types';
import { useHighlights } from '../../../hooks/useHighlights';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useAuth } from '../../../lib/AuthContext';
import { toast } from '../../../hooks/use-toast';
import BooksTopbar from '../topbar';
import { HighlightCard } from '../highlights';

// ============================================================================
// Main Component
// ============================================================================

interface BookHighlightsTemplateProps {
  setSection: (s: Section) => void;
}

const BookHighlightsTemplate: React.FC<BookHighlightsTemplateProps> = ({ setSection }) => {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    book,
    highlights,
    isLoading,
    error,
    copyAllHighlights,
    deleteHighlight,
    updateHighlight,
  } = useHighlights(bookSlug || '');

  usePageTitle(book?.title ? `Highlights - ${book.title}` : 'Highlights');

  const handleCopyAll = () => {
    const text = copyAllHighlights();
    if (text) {
      navigator.clipboard.writeText(text);
      toast({ title: 'Copiado!', description: 'Todos os destaques foram copiados.' });
    }
  };

  const handleCopyItem = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copiado!', description: 'Destaque copiado.' });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHighlight(id);
      toast({ title: 'Removido', description: 'Destaque removido com sucesso.' });
    } catch {
      toast({ title: 'Erro', description: 'Não foi possível remover.', variant: 'destructive' });
    }
  };

  const handleUpdateNote = async (id: string, note: string) => {
    try {
      await updateHighlight(id, { note: note || undefined });
      toast({ title: 'Nota salva', description: 'Sua nota foi atualizada.' });
    } catch {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar a nota.',
        variant: 'destructive',
      });
      throw new Error('Failed to save note');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <BooksTopbar currentSection={Section.APP_BOOKS_HIGHLIGHTS} setSection={setSection} />
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-12 w-2/3 rounded bg-muted" />
            <div className="h-6 w-1/3 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
            <Separator className="my-8" />
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-lg bg-muted/30" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !book) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <BooksTopbar currentSection={Section.APP_BOOKS_HIGHLIGHTS} setSection={setSection} />
        <div className="flex min-h-[60vh] items-center justify-center p-8">
          <div className="max-w-md space-y-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10">
              <Icon name="exclamation" className="text-destructive" size="size-8" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Erro ao carregar highlights</h2>
              <p className="font-serif text-base italic text-muted-foreground">{error?.message || 'Livro não encontrado'}</p>
            </div>
            <Button 
              onClick={() => navigate('/books')}
              className="h-14 px-10 bg-foreground font-black uppercase tracking-[0.2em] text-sm text-background hover:bg-foreground/90 active:scale-[0.98] transition-all duration-300"
            >
              Voltar para Biblioteca
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <BooksTopbar currentSection={Section.APP_BOOKS_HIGHLIGHTS} setSection={setSection} />
        <div className="flex min-h-[60vh] items-center justify-center p-8">
          <div className="max-w-md space-y-8 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-border bg-muted/30">
              <Icon name="lock" className="text-muted-foreground" size="size-10" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Faça login para ver seus highlights</h2>
              <p className="font-serif text-lg italic text-muted-foreground">Seus destaques são salvos na sua conta.</p>
            </div>
            <div className="flex justify-center gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/books/${bookSlug}`)}
                className="h-14 px-8 rounded-full border-border font-black uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:border-primary/40"
              >
                Ver Livro
              </Button>
              <Button
                onClick={() =>
                  navigate('/auth/login', {
                    state: { from: { pathname: `/books/${bookSlug}/highlights` } },
                  })
                }
                className="h-14 px-10 bg-foreground font-black uppercase tracking-[0.15em] text-sm text-background hover:bg-foreground/90 active:scale-[0.98] transition-all duration-300"
              >
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 font-sans">
      {/* BooksTopbar FORA do container animado para não quebrar position:fixed */}
      <BooksTopbar currentSection={Section.APP_BOOKS_HIGHLIGHTS} setSection={setSection} />

      {/* Breadcrumb */}
      <div className="container mx-auto max-w-7xl px-6 py-8 md:px-8 animate-fade-in">
        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          <span
            className="cursor-pointer transition-colors duration-300 hover:text-primary"
            onClick={() => navigate('/books/my-library')}
          >
            Minha Biblioteca
          </span>
          <Icon name="angle-small-right" size="size-3" />
          <span
            className="cursor-pointer transition-colors duration-300 hover:text-primary"
            onClick={() => navigate(`/books/${bookSlug}`)}
          >
            {book.title}
          </span>
          <Icon name="angle-small-right" size="size-3" />
          <span className="text-foreground">Highlights</span>
        </div>
      </div>

      <main className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          {/* LEFT COLUMN: HIGHLIGHTS LIST */}
          <div className="space-y-12 lg:col-span-8">
            {/* Book Info */}
            <div className="space-y-6">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Destaques</p>
              <h1 className="text-5xl font-bold leading-[0.95] tracking-tighter text-foreground md:text-6xl">
                {book.title}
              </h1>
              <p className="font-serif text-xl italic text-muted-foreground">por {book.author}</p>
              {book.subtitle && (
                <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground/80">
                  {book.subtitle}
                </p>
              )}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Highlights Section */}
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Coleção</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    Seus Highlights
                    {highlights.length > 0 && (
                      <span className="ml-3 text-lg font-normal text-muted-foreground">
                        ({highlights.length})
                      </span>
                    )}
                  </h2>
                </div>
                {highlights.length > 0 && (
                  <button
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:text-primary/80"
                    onClick={handleCopyAll}
                  >
                    <Icon name="copy" size="size-4" /> Copiar todos
                  </button>
                )}
              </div>

              {highlights.length === 0 ? (
                <div className="space-y-6 py-20 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-border bg-muted/30">
                    <Icon name="quote" className="text-muted-foreground/50" size="size-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Nenhum highlight ainda</h3>
                    <p className="mx-auto max-w-sm font-serif italic text-muted-foreground">
                      Selecione trechos durante a leitura para criar seus destaques.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full px-8"
                    onClick={() => navigate(`/books/${bookSlug}/read`)}
                  >
                    <Icon name="book-open" size="size-4" className="mr-2" />
                    Começar a Ler
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {highlights.map((h) => (
                    <HighlightCard
                      key={h.id}
                      highlight={h}
                      bookTitle={book.title}
                      bookAuthor={book.author}
                      bookCover={book.imageUrl || undefined}
                      onCopy={handleCopyItem}
                      onDelete={handleDelete}
                      onUpdateNote={handleUpdateNote}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: BOOK PREVIEW */}
          <aside className="flex flex-col items-center lg:col-span-4">
            {/* Book Cover */}
            <div className="group relative mb-16 flex aspect-square w-full items-center justify-center">
              {/* Background Glow */}
              <div className="absolute inset-0 scale-90 rounded-full bg-primary/10 blur-[100px] transition-all duration-700 group-hover:bg-primary/20" />

              {/* The Book */}
              <div className="relative z-10 w-52 rotate-[-4deg] transform overflow-hidden rounded-2xl border border-border shadow-2xl transition-all duration-700 hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    loading="lazy"
                    className="aspect-[2/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[2/3] w-full flex-col items-center justify-center bg-gradient-to-br from-muted to-muted/50 p-6 text-center">
                    <Icon name="book" size="size-12" className="mb-4 text-muted-foreground/30" />
                    <h3 className="font-serif text-sm font-bold leading-tight text-foreground">{book.title}</h3>
                  </div>
                )}
                {/* Spine effect */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-white/30 via-white/10 to-white/5" />
              </div>
            </div>

            <div className="w-full space-y-4">
              <Button
                className="h-14 w-full rounded-full bg-foreground font-black uppercase tracking-[0.15em] text-sm text-background shadow-lg hover:bg-foreground/90 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
                onClick={() => navigate(`/books/${bookSlug}/read`)}
              >
                <Icon name="book-open" size="size-5" className="mr-3" />
                Continuar Leitura
              </Button>

              <Button
                variant="outline"
                className="h-12 w-full rounded-full border-border font-black uppercase tracking-[0.15em] text-[10px] transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
                onClick={() => navigate(`/books/${bookSlug}`)}
              >
                Ver Detalhes do Livro
              </Button>

              {highlights.length > 0 && (
                <Card className="mt-8 rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center backdrop-blur-sm">
                  <p className="font-serif text-sm italic leading-relaxed text-muted-foreground">
                    "{highlights[0].text.slice(0, 150)}..."
                  </p>
                </Card>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BookHighlightsTemplate;
