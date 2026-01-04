import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent } from '../../ui/card';
import { Separator } from '../../ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Section } from '../../../types';
import { useHighlights, Highlight } from '../../../hooks/useHighlights';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useAuth } from '../../../lib/AuthContext';
import { toast } from '../../../hooks/use-toast';
import BooksTopbar from '../BooksTopbar';

// ============================================================================
// Helpers
// ============================================================================

function formatHighlightDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// ============================================================================
// Note Editor Component
// ============================================================================

interface NoteEditorProps {
  initialNote: string;
  onSave: (note: string) => Promise<void>;
  onCancel: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ initialNote, onSave, onCancel }) => {
  const [note, setNote] = useState(initialNote);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(note);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Adicione sua nota sobre este trecho..."
        className="w-full resize-none rounded-lg border border-border/50 bg-background/50 p-3 font-serif text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        rows={3}
        autoFocus
      />
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={isSaving}>
          Cancelar
        </Button>
        <Button size="sm" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  );
};

// ============================================================================
// Share Image Modal Component
// ============================================================================

interface ShareImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlight: {
    text: string;
    note?: string;
  };
  bookTitle: string;
  bookAuthor: string;
  bookCover?: string;
}

const ShareImageModal: React.FC<ShareImageModalProps> = ({
  isOpen,
  onClose,
  highlight,
  bookTitle,
  bookAuthor,
  bookCover,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      // Dynamic import of html2canvas
      const html2canvas = (await import('html2canvas')).default;
      // html2canvas v1.4+ options (types are outdated)
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        useCORS: true,
      } as any);

      const link = document.createElement('a');
      link.download = `highlight-${bookTitle.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: 'Imagem salva!',
        description: 'Agora você pode compartilhar nas redes sociais.',
      });
    } catch (err) {
      console.error('Failed to generate image:', err);
      toast({
        title: 'Erro',
        description: 'Não foi possível gerar a imagem.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = async () => {
    const shareText = highlight.note
      ? `"${highlight.text}"\n\n— ${highlight.note}\n\n📚 ${bookTitle} por ${bookAuthor}`
      : `"${highlight.text}"\n\n📚 ${bookTitle} por ${bookAuthor}`;

    await navigator.clipboard.writeText(shareText);
    toast({ title: 'Copiado!', description: 'Texto copiado para compartilhar.' });
  };

  const handleNativeShare = async () => {
    const shareText = highlight.note
      ? `"${highlight.text}"\n\n— ${highlight.note}\n\n📚 ${bookTitle} por ${bookAuthor}`
      : `"${highlight.text}"\n\n📚 ${bookTitle} por ${bookAuthor}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Destaque de ${bookTitle}`,
          text: shareText,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyText();
        }
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-border p-6">
          <DialogTitle className="text-lg font-bold">Compartilhar Destaque</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          {/* Preview Card - This will be converted to image */}
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-6"
            style={{ aspectRatio: '1/1', maxWidth: '400px', margin: '0 auto' }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col">
              {/* Header with Logo */}
              <div className="mb-4 flex items-center gap-2.5">
                <img
                  src="https://academialendaria.ai/wp-content/uploads/2025/11/Silhueta-AL-32.svg"
                  alt=""
                  className="h-6 w-6"
                />
                <span className="text-[11px] font-bold tracking-widest text-zinc-400">
                  BIBLIOTECA LENDÁRIA
                </span>
              </div>

              {/* Quote */}
              <div className="flex-1">
                <p className="font-serif text-lg leading-relaxed text-white/90">
                  "
                  {highlight.text.length > 220
                    ? `${highlight.text.slice(0, 220)}...`
                    : highlight.text}
                  "
                </p>
                {highlight.note && (
                  <p className="mt-4 border-l-2 border-brand-gold/30 pl-3 font-serif text-sm italic text-zinc-500">
                    {highlight.note.length > 100
                      ? `${highlight.note.slice(0, 100)}...`
                      : highlight.note}
                  </p>
                )}
              </div>

              {/* Book Info */}
              <div className="mt-4 flex items-center gap-3 border-t border-zinc-800/50 pt-4">
                {bookCover && (
                  <img src={bookCover} alt="" className="h-12 w-8 rounded object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{bookTitle}</p>
                  <p className="truncate text-xs text-zinc-500">{bookAuthor}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 gap-2" onClick={handleNativeShare}>
              <Icon name="share" size="size-4" />
              Compartilhar
            </Button>
            <Button
              className="h-12 gap-2 bg-brand-gold text-black hover:bg-brand-gold/90"
              onClick={handleDownloadImage}
              disabled={isGenerating}
            >
              <Icon name="download" size="size-4" />
              {isGenerating ? 'Gerando...' : 'Baixar Imagem'}
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Baixe a imagem para postar no Instagram, Twitter ou LinkedIn
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ============================================================================
// Highlight Card Component
// ============================================================================

interface HighlightCardProps {
  highlight: Highlight;
  bookTitle: string;
  bookAuthor: string;
  bookCover?: string;
  onCopy: (text: string) => void;
  onDelete: (id: string) => void;
  onUpdateNote: (id: string, note: string) => Promise<void>;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  highlight,
  bookTitle,
  bookAuthor,
  bookCover,
  onCopy,
  onDelete,
  onUpdateNote,
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleSaveNote = async (note: string) => {
    await onUpdateNote(highlight.id, note);
    setIsEditingNote(false);
  };

  return (
    <>
      <Card className="group relative border-none bg-muted/20 shadow-none transition-colors hover:bg-muted/30">
        {/* Left Accent Bar */}
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-border/40 transition-colors group-hover:bg-primary" />

        <CardContent className="p-6 pr-8">
          {/* Share Button - Always Visible */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Destaque
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-2 rounded-full border-brand-gold/30 bg-brand-gold/10 px-4 text-xs font-bold text-brand-gold hover:bg-brand-gold/20 hover:text-brand-gold"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Icon name="share" size="size-3" />
              Compartilhar
            </Button>
          </div>

          <p className="font-serif text-lg leading-relaxed text-foreground/80">
            "{highlight.text}"
          </p>

          {/* Note Display (when not editing) */}
          {highlight.note && !isEditingNote && (
            <p className="mt-4 border-l-2 border-primary/30 pl-4 font-serif text-sm italic text-muted-foreground">
              {highlight.note}
            </p>
          )}

          {/* Chapter & Date */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            {highlight.chapter && (
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                — {highlight.chapter}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Destacado em: {formatHighlightDate(highlight.createdAt)}
            </p>
          </div>

          {/* Notes Section */}
          <div className="mt-4 border-t border-border/20 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">Suas Notas</span>
              {!isEditingNote && (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="text-sm font-medium italic text-primary hover:text-primary/80"
                >
                  {highlight.note ? 'Editar nota' : 'Adicionar nota'}
                </button>
              )}
            </div>

            {isEditingNote ? (
              <NoteEditor
                initialNote={highlight.note || ''}
                onSave={handleSaveNote}
                onCancel={() => setIsEditingNote(false)}
              />
            ) : highlight.note ? null : (
              <p className="mt-2 text-sm italic text-muted-foreground/60">
                Nenhuma nota adicionada
              </p>
            )}
          </div>

          {/* Secondary Actions - Hidden until hover */}
          <div className="mt-4 flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onCopy(highlight.text)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-all hover:border-border hover:bg-background hover:text-primary"
              title="Copiar texto"
            >
              <Icon name="copy" size="size-4" />
            </button>
            <button
              onClick={() => onDelete(highlight.id)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-all hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
              title="Remover destaque"
            >
              <Icon name="trash" size="size-4" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Share Modal */}
      <ShareImageModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        highlight={{ text: highlight.text, note: highlight.note }}
        bookTitle={bookTitle}
        bookAuthor={bookAuthor}
        bookCover={bookCover}
      />
    </>
  );
};

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
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="space-y-4 text-center">
            <Icon name="exclamation" className="mx-auto text-destructive" size="size-12" />
            <h2 className="text-xl font-bold">Erro ao carregar highlights</h2>
            <p className="text-muted-foreground">{error?.message || 'Livro não encontrado'}</p>
            <Button onClick={() => navigate('/books')}>Voltar para Biblioteca</Button>
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
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="space-y-6 text-center">
            <Icon name="lock" className="mx-auto text-muted-foreground" size="size-16" />
            <h2 className="text-2xl font-bold">Faça login para ver seus highlights</h2>
            <p className="text-muted-foreground">Seus destaques são salvos na sua conta.</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => navigate(`/books/${bookSlug}`)}>
                Ver Livro
              </Button>
              <Button
                onClick={() =>
                  navigate('/auth/login', {
                    state: { from: { pathname: `/books/${bookSlug}/highlights` } },
                  })
                }
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
    <div className="min-h-screen animate-fade-in bg-background pb-32 font-sans">
      <BooksTopbar currentSection={Section.APP_BOOKS_HIGHLIGHTS} setSection={setSection} />

      {/* Breadcrumb */}
      <div className="container mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <span
            className="cursor-pointer transition-colors hover:text-primary"
            onClick={() => navigate('/books/my-library')}
          >
            Minha Biblioteca
          </span>
          <Icon name="angle-small-right" size="size-3" />
          <span
            className="cursor-pointer transition-colors hover:text-primary"
            onClick={() => navigate(`/books/${bookSlug}`)}
          >
            {book.title}
          </span>
          <Icon name="angle-small-right" size="size-3" />
          <span className="text-foreground">Highlights</span>
        </div>
      </div>

      <main className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* LEFT COLUMN: HIGHLIGHTS LIST */}
          <div className="space-y-12 lg:col-span-8">
            {/* Book Info */}
            <div className="space-y-4">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {book.title}
              </h1>
              <p className="text-sm font-bold text-foreground">{book.author}</p>
              {book.subtitle && (
                <p className="max-w-2xl font-serif text-xl leading-relaxed text-muted-foreground">
                  {book.subtitle}
                </p>
              )}
            </div>

            <Separator className="bg-border/60" />

            {/* Highlights Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-sans text-2xl font-bold">
                  Seus Highlights
                  {highlights.length > 0 && (
                    <span className="ml-3 text-base font-normal text-muted-foreground">
                      ({highlights.length})
                    </span>
                  )}
                </h2>
                {highlights.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto gap-2 p-0 font-bold text-primary hover:text-primary/80"
                    onClick={handleCopyAll}
                  >
                    <Icon name="copy" size="size-4" /> Copiar todos
                  </Button>
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
            <div className="relative mb-12 flex aspect-square w-full items-center justify-center">
              {/* Background Glow */}
              <div className="absolute inset-0 scale-90 animate-pulse-slow rounded-full bg-primary/10 blur-[80px]" />

              {/* The Book */}
              <div className="relative z-10 w-48 rotate-[-4deg] transform overflow-hidden rounded-lg border border-white/10 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:rotate-0">
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="aspect-[2/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[2/3] w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 text-center text-white">
                    <Icon name="book" size="size-12" className="mb-4 opacity-30" />
                    <h3 className="font-serif text-sm font-bold leading-tight">{book.title}</h3>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full space-y-6">
              <Button
                className="h-14 w-full rounded-lg bg-primary font-bold text-primary-foreground shadow-xl hover:bg-primary/90"
                onClick={() => navigate(`/books/${bookSlug}/read`)}
              >
                <Icon name="book-open" size="size-5" className="mr-2" />
                Continuar Leitura
              </Button>

              <Button
                variant="outline"
                className="h-12 w-full rounded-lg"
                onClick={() => navigate(`/books/${bookSlug}`)}
              >
                Ver Detalhes do Livro
              </Button>

              {highlights.length > 0 && (
                <Card className="border-dashed border-border bg-muted/10 p-6 text-center">
                  <p className="font-serif text-xs italic leading-relaxed text-muted-foreground">
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
