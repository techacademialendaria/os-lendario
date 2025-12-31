import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Separator } from '../../ui/separator';
import { cn } from '../../../lib/utils';
import { FavoriteButton } from '../../shared';
import { Section } from '../../../types';
import { useBook, useBooks } from '../../../hooks/useBooks';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useBookInteractions, ReadingStatus } from '../../../hooks/useMyBooks';
import BookCard from '../ui/BookCard';

interface BookDetailProps {
  setSection: (s: Section) => void;
}

const BookDetailTemplate: React.FC<BookDetailProps> = ({ setSection }) => {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();
  const { book, loading, error } = useBook(bookSlug || '');
  const { books: allBooks } = useBooks();

  // Book interactions (favorites, reading status)
  const {
    interactions,
    isLoading: interactionsLoading,
    toggleFavorite,
    setReadingStatus,
  } = useBookInteractions(book?.id || '');

  // Local state
  const [activeTab, setActiveTab] = useState('overview');
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  usePageTitle(book?.title || 'Carregando...');

  // Handlers
  const handleToggleFavorite = async () => {
    if (!book?.id || isTogglingFavorite) return;
    setIsTogglingFavorite(true);
    try {
      await toggleFavorite();
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  // Related books (same category, excluding current)
  const relatedBooks = allBooks
    .filter((b) => b.id !== book?.id && b.categorySlug === book?.categorySlug)
    .slice(0, 3);

  // Fallback gradient for cover
  const coverGradients = [
    'from-amber-600 to-orange-800',
    'from-blue-600 to-indigo-800',
    'from-emerald-600 to-teal-800',
    'from-purple-600 to-violet-800',
    'from-rose-600 to-pink-800',
  ];
  const gradientIndex = (bookSlug?.charCodeAt(0) || 0) % coverGradients.length;
  const fallbackGradient = coverGradients[gradientIndex];

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="space-y-4 text-center">
          <Icon name="exclamation" className="mx-auto text-destructive" size="size-12" />
          <h2 className="text-xl font-bold">Livro não encontrado</h2>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => navigate('/books')}>Voltar à Biblioteca</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in bg-background pb-20 font-sans text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/books')}
          >
            <Icon name="arrow-left" size="size-4" /> Voltar à Biblioteca
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="share" />
            </Button>
            <FavoriteButton
              isFavorite={interactions?.isFavorite || false}
              onToggle={handleToggleFavorite}
              isLoading={isTogglingFavorite}
              disabled={interactionsLoading}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* LEFT COLUMN: Cover & Actions (Sticky) */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-4">
            {/* Book Cover */}
            {loading ? (
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            ) : (
              <div className="group relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-white/10 shadow-2xl">
                {book?.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={cn(
                      'flex h-full w-full flex-col items-center justify-center bg-gradient-to-br p-6',
                      fallbackGradient
                    )}
                  >
                    <Icon name="book" className="mb-4 text-white/30" size="size-12" />
                    <span className="text-center font-serif text-lg font-bold text-white">
                      {book?.title}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent"></div>
              </div>
            )}

            {/* Action Buttons */}
            {!loading && book && (
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="h-12 w-full bg-brand-gold text-base font-bold text-black shadow-lg shadow-brand-gold/10 hover:bg-brand-gold/90"
                  onClick={() => navigate(`/books/${bookSlug}/read`)}
                >
                  <Icon name="book-open-cover" className="mr-2" /> Ler Resumo
                </Button>
                {book.hasAudio && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 w-full border-border font-bold hover:bg-muted"
                  >
                    <Icon name="play" className="mr-2" /> Ouvir Áudio
                  </Button>
                )}
              </div>
            )}

            {/* Info Card */}
            {!loading && book && (
              <div className="space-y-4 rounded-xl border border-border bg-card p-6">
                {book.duration && (
                  <div className="flex items-center justify-between border-b border-border/50 pb-3 text-sm">
                    <span className="text-muted-foreground">Tempo de Leitura</span>
                    <span className="flex items-center gap-2 font-bold">
                      <Icon name="clock" size="size-3" /> {book.duration}
                    </span>
                  </div>
                )}
                {book.pageCount && (
                  <div className="flex items-center justify-between border-b border-border/50 pb-3 text-sm">
                    <span className="text-muted-foreground">Páginas</span>
                    <span className="flex items-center gap-2 font-bold">
                      <Icon name="document" size="size-3" /> {book.pageCount}
                    </span>
                  </div>
                )}
                {book.rating && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avaliação</span>
                    <span className="flex items-center gap-1 font-bold text-brand-gold">
                      <Icon name="star" type="solid" size="size-3" /> {book.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="space-y-10 lg:col-span-8">
            {/* Header Info */}
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : book ? (
              <div className="space-y-4">
                {book.category && (
                  <Badge
                    variant="outline"
                    className="mb-2 border-brand-gold/30 bg-brand-gold/10 text-[10px] uppercase tracking-wider text-brand-gold"
                  >
                    {book.category}
                  </Badge>
                )}
                <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
                  {book.title}
                </h1>
                {book.summary && (
                  <p className="text-xl font-light leading-relaxed text-muted-foreground">
                    {book.summary.substring(0, 150)}...
                  </p>
                )}

                <div className="flex items-center gap-4 pt-2">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback>{book.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-foreground">{book.author}</p>
                    <p className="text-xs text-muted-foreground">Autor</p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Tabs */}
            {!loading && book && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-8 h-auto w-full justify-start gap-8 overflow-x-auto border-b border-border bg-transparent p-0">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-base font-bold text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-brand-gold data-[state=active]:text-foreground"
                  >
                    Visão Geral
                  </TabsTrigger>
                  <TabsTrigger
                    value="learning"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-base font-bold text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-brand-gold data-[state=active]:text-foreground"
                  >
                    O que você vai aprender
                  </TabsTrigger>
                  <TabsTrigger
                    value="author"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-base font-bold text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-brand-gold data-[state=active]:text-foreground"
                  >
                    Sobre o Autor
                  </TabsTrigger>
                  <TabsTrigger
                    value="info"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-base font-bold text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-brand-gold data-[state=active]:text-foreground"
                  >
                    Informações
                  </TabsTrigger>
                </TabsList>

                {/* TAB 1: Visão Geral */}
                <TabsContent value="overview" className="animate-fade-in space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-sans text-lg font-bold">Sinopse</h3>
                    <p className="font-serif text-lg leading-relaxed text-muted-foreground">
                      {book.summary || 'Sem descrição disponível.'}
                    </p>
                  </div>
                  {book.tags.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-sans text-lg font-bold">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {book.tags.map((tag) => (
                          <Badge
                            key={tag.slug}
                            variant="secondary"
                            className="cursor-pointer bg-muted px-3 py-1 text-muted-foreground hover:text-foreground"
                            onClick={() => navigate(`/books?category=${tag.slug}`)}
                          >
                            #{tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* TAB 2: O que você vai aprender */}
                <TabsContent value="learning" className="animate-fade-in space-y-8">
                  <div className="grid gap-4">
                    {/* Mock learning points - TODO: get from book metadata */}
                    {[
                      'Os conceitos fundamentais apresentados pelo autor.',
                      'Como aplicar os ensinamentos no seu dia a dia.',
                      'Estratégias práticas para implementação imediata.',
                      'Insights sobre os temas centrais do livro.',
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand-gold/30"
                      >
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-green/20 bg-brand-green/10 text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
                          <Icon name="check" size="size-3" />
                        </div>
                        <span className="font-serif text-lg font-medium leading-relaxed text-foreground/90">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* TAB 3: Sobre o Autor */}
                <TabsContent value="author" className="animate-fade-in space-y-8">
                  <div className="rounded-xl border border-border bg-card p-8">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20 border-2 border-background shadow-lg">
                          <AvatarFallback className="text-2xl">
                            {book.author.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-2xl font-bold text-foreground">{book.author}</h2>
                          <p className="text-sm font-bold uppercase tracking-wider text-primary">
                            Autor
                          </p>
                        </div>
                      </div>
                      <p className="font-serif text-base leading-relaxed text-muted-foreground">
                        Informações detalhadas sobre o autor serão exibidas aqui quando disponíveis
                        no banco de dados.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* TAB 4: Informações */}
                <TabsContent value="info" className="animate-fade-in space-y-8">
                  <div className="rounded-xl border border-border bg-card p-6">
                    <dl className="space-y-4">
                      <div className="flex justify-between border-b border-border/50 pb-3">
                        <dt className="text-muted-foreground">Título</dt>
                        <dd className="font-medium">{book.title}</dd>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-3">
                        <dt className="text-muted-foreground">Autor</dt>
                        <dd className="font-medium">{book.author}</dd>
                      </div>
                      {book.publishedYear && (
                        <div className="flex justify-between border-b border-border/50 pb-3">
                          <dt className="text-muted-foreground">Ano de Publicação</dt>
                          <dd className="font-medium">{book.publishedYear}</dd>
                        </div>
                      )}
                      {book.pageCount && (
                        <div className="flex justify-between border-b border-border/50 pb-3">
                          <dt className="text-muted-foreground">Páginas</dt>
                          <dd className="font-medium">{book.pageCount}</dd>
                        </div>
                      )}
                      {book.isbn && (
                        <div className="flex justify-between border-b border-border/50 pb-3">
                          <dt className="text-muted-foreground">ISBN</dt>
                          <dd className="font-mono text-sm font-medium">{book.isbn}</dd>
                        </div>
                      )}
                      {book.category && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Categoria</dt>
                          <dd className="font-medium">{book.category}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {/* Related Books */}
            {!loading && relatedBooks.length > 0 && (
              <>
                <Separator />
                <div className="space-y-8">
                  <h3 className="font-sans text-2xl font-bold">Você também pode gostar</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {relatedBooks.map((related) => (
                      <div
                        key={related.id}
                        className="group flex cursor-pointer items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand-gold/30"
                        onClick={() => navigate(`/books/${related.slug}`)}
                      >
                        <div className="h-24 w-16 shrink-0 overflow-hidden rounded border border-border shadow-md">
                          {related.coverUrl ? (
                            <img
                              src={related.coverUrl}
                              alt={related.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                              <Icon name="book" className="text-muted-foreground" size="size-4" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            {related.category || 'Geral'}
                          </p>
                          <h4 className="mb-1 truncate text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                            {related.title}
                          </h4>
                          <p className="truncate font-serif text-xs text-muted-foreground">
                            Por {related.author}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetailTemplate;
