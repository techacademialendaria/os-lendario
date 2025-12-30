import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useBook, useBooks } from '../../../hooks/useBooks';
import { usePageTitle } from '../../../hooks/usePageTitle';
import BookCard from '../ui/BookCard';

interface BookDetailProps {
  setSection: (s: Section) => void;
}

const BookDetailTemplate: React.FC<BookDetailProps> = ({ setSection }) => {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();
  const { book, loading, error } = useBook(bookSlug || '');
  const { books: allBooks } = useBooks();

  usePageTitle(book?.title || 'Carregando...');

  // Get related books (same category, excluding current)
  const relatedBooks = allBooks
    .filter((b) => b.id !== book?.id && b.categorySlug === book?.categorySlug)
    .slice(0, 4);

  // Fallback cover gradient
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
          <Icon name="exclamation-circle" className="mx-auto text-destructive" size="size-12" />
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
      <header className="sticky top-0 z-40 h-16 border-b border-border bg-background/90 backdrop-blur-md transition-all duration-300">
        <div className="container mx-auto flex h-full max-w-5xl items-center justify-between px-6">
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
            <Button variant="ghost" size="icon">
              <Icon name="bookmark" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16 flex flex-col gap-12 md:flex-row">
          {/* Left: Info */}
          <div className="flex-1 space-y-6">
            {loading ? (
              <>
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-4 py-6">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </>
            ) : book ? (
              <>
                <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
                  {book.title}
                </h1>
                <p className="text-lg font-medium text-foreground/80">{book.author}</p>
                {book.summary && (
                  <p className="font-serif text-xl leading-relaxed text-muted-foreground">
                    {book.summary}
                  </p>
                )}

                {/* Metadata Grid */}
                <div className="flex flex-wrap gap-6 border-y border-border/50 py-6">
                  {book.rating && (
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Icon name="star" type="solid" className="text-brand-gold" />
                      <span>{book.rating.toFixed(1)}</span>
                    </div>
                  )}
                  {book.duration && (
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Icon name="clock" className="text-foreground" />
                      <span>{book.duration}</span>
                    </div>
                  )}
                  {book.hasAudio && (
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Icon name="headphones" className="text-foreground" />
                      <span>Áudio & Texto</span>
                    </div>
                  )}
                  {book.pageCount && (
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Icon name="document" className="text-foreground" />
                      <span>{book.pageCount} páginas</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                  <Button
                    size="lg"
                    className="h-12 bg-foreground px-8 font-bold text-background hover:bg-foreground/90"
                    onClick={() => navigate(`/books/${bookSlug}/read`)}
                  >
                    <Icon name="book-open" className="mr-2" /> Ler Resumo
                  </Button>
                  {book.hasAudio && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 border-foreground/20 px-8 font-bold hover:bg-muted"
                    >
                      <Icon name="play" className="mr-2" /> Ouvir
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    className="h-12 font-bold text-primary hover:bg-primary/10"
                  >
                    <Icon name="plus" className="mr-2" /> Salvar na Lista
                  </Button>
                </div>
              </>
            ) : null}
          </div>

          {/* Right: Cover */}
          <div className="flex w-full shrink-0 justify-center md:w-[320px] md:justify-end">
            {loading ? (
              <Skeleton className="aspect-[2/3] w-[260px] rounded-lg md:w-[300px]" />
            ) : (
              <div className="group relative aspect-[2/3] w-[260px] overflow-hidden rounded-lg shadow-2xl md:w-[300px]">
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
                {/* Sheen Effect */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />

                {/* Category Badge */}
                {book?.category && (
                  <div className="absolute right-4 top-4 rounded bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-black shadow-md">
                    {book.category}
                  </div>
                )}

                {/* Audio Icon */}
                {book?.hasAudio && (
                  <div className="absolute bottom-4 right-4 text-white opacity-80">
                    <Icon name="headphones" size="size-6" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        {!loading && book && (
          <div className="space-y-8">
            {/* Tags */}
            {book.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <Badge
                    key={tag.slug}
                    variant="secondary"
                    className="cursor-pointer bg-muted text-muted-foreground hover:text-foreground"
                    onClick={() => navigate(`/books?category=${tag.slug}`)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Book Info */}
            <div className="grid gap-8 border-t border-border/50 pt-8 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="text-lg font-bold">Informações</h4>
                <dl className="space-y-3 text-sm">
                  {book.author && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Autor</dt>
                      <dd className="font-medium">{book.author}</dd>
                    </div>
                  )}
                  {book.publishedYear && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Ano</dt>
                      <dd className="font-medium">{book.publishedYear}</dd>
                    </div>
                  )}
                  {book.pageCount && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Páginas</dt>
                      <dd className="font-medium">{book.pageCount}</dd>
                    </div>
                  )}
                  {book.isbn && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">ISBN</dt>
                      <dd className="font-mono text-xs font-medium">{book.isbn}</dd>
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

              {/* Quick Actions */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold">Ações Rápidas</h4>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="h-12 w-full justify-start"
                    onClick={() => navigate(`/books/${bookSlug}/read`)}
                  >
                    <Icon name="book-open" className="mr-3" /> Ler Resumo Completo
                  </Button>
                  {book.hasAudio && (
                    <Button variant="outline" className="h-12 w-full justify-start">
                      <Icon name="headphones" className="mr-3" /> Ouvir Audiobook
                    </Button>
                  )}
                  <Button variant="outline" className="h-12 w-full justify-start">
                    <Icon name="bookmark" className="mr-3" /> Adicionar à Lista
                  </Button>
                  <Button variant="outline" className="h-12 w-full justify-start">
                    <Icon name="share" className="mr-3" /> Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mt-20 border-t border-border pt-12">
            <h3 className="mb-8 text-2xl font-bold">Leituras Similares</h3>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {relatedBooks.map((related) => (
                <BookCard
                  key={related.id}
                  book={related}
                  variant="compact"
                  onClick={() => navigate(`/books/${related.slug}`)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookDetailTemplate;
