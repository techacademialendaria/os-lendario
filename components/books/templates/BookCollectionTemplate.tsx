import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon, type IconName } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useBookCollection, useBookCollections } from '../../../hooks/useBookCollections';
import { usePageTitle } from '../../../hooks/usePageTitle';
import BookCard from '../ui/BookCard';
import SectionHeader from '../ui/SectionHeader';

interface BookCollectionProps {
  setSection: (s: Section) => void;
}

// Map collection slugs to icons and colors
const COLLECTION_STYLES: Record<string, { icon: IconName; color: string }> = {
  mente_alta_performance: { icon: 'brain', color: 'bg-purple-500' },
  visoes_do_futuro: { icon: 'rocket', color: 'bg-blue-500' },
  mentes_brilhantes: { icon: 'bulb', color: 'bg-yellow-500' },
  // Fallback for unknown collections
  default: { icon: 'book-stack', color: 'bg-brand-gold' },
};

const getCollectionStyle = (slug: string) => {
  return COLLECTION_STYLES[slug] || COLLECTION_STYLES.default;
};

const BookCollectionTemplate: React.FC<BookCollectionProps> = ({ setSection }) => {
  const { collectionSlug } = useParams<{ collectionSlug: string }>();
  const navigate = useNavigate();

  // Fetch this collection and its books
  const { collection, books, loading, error } = useBookCollection(collectionSlug || '');

  // Fetch all collections for "Other Collections" section
  const { collections: allCollections } = useBookCollections();

  usePageTitle(collection?.name || 'Coleção');

  // Get style for this collection
  const style = getCollectionStyle(collectionSlug || '');

  // Filter out current collection from "Other Collections"
  const otherCollections = allCollections.filter((c) => c.slug !== collectionSlug);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="space-y-4 text-center">
          <Icon name="exclamation" className="mx-auto text-destructive" size="size-12" />
          <h2 className="text-xl font-bold">Coleção não encontrada</h2>
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
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12 flex flex-col items-start gap-8 md:flex-row md:items-center">
          {/* Collection Icon */}
          {loading ? (
            <Skeleton className="h-32 w-28 rounded-xl" />
          ) : (
            <div className="relative">
              {/* Stack effect */}
              <div className="absolute right-0 top-0 h-32 w-28 translate-x-3 rotate-6 rounded-xl border border-border bg-card shadow-sm"></div>
              <div className="absolute right-0 top-0 h-32 w-28 -rotate-3 translate-x-1.5 rounded-xl border border-border bg-card shadow-sm"></div>
              {/* Main icon */}
              <div
                className={cn(
                  'relative flex h-32 w-28 items-center justify-center rounded-xl text-black shadow-xl',
                  style.color
                )}
              >
                <Icon name={style.icon} size="size-12" />
              </div>
            </div>
          )}

          {/* Collection Info */}
          <div className="flex-1 space-y-4">
            {loading ? (
              <>
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-16 w-full" />
              </>
            ) : collection ? (
              <>
                <Badge
                  variant="outline"
                  className="border-brand-gold/30 bg-brand-gold/10 text-[10px] uppercase tracking-wider text-brand-gold"
                >
                  Coleção
                </Badge>
                <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
                  {collection.name}
                </h1>
                {collection.description && (
                  <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    {collection.description}
                  </p>
                )}
                <div className="flex items-center gap-6 pt-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="book" className="text-muted-foreground" size="size-4" />
                    <span className="font-medium">{books.length} livros</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="clock" className="text-muted-foreground" size="size-4" />
                    <span className="font-medium">
                      ~{books.reduce((acc, b) => acc + (b.readingTime || 0), 0)} min de leitura
                    </span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Action Bar */}
        {!loading && collection && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-4">
              <Button
                className="bg-brand-gold font-bold text-black hover:bg-brand-gold/90"
                onClick={() => books[0] && navigate(`/books/${books[0].slug}`)}
                disabled={books.length === 0}
              >
                <Icon name="play" className="mr-2" size="size-4" /> Começar a Ler
              </Button>
              <Button variant="outline" className="font-bold">
                <Icon name="plus" className="mr-2" size="size-4" /> Adicionar à Lista
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Ordenar por:</span>
              <Button variant="ghost" size="sm" className="font-medium">
                Recomendados <Icon name="chevron-down" className="ml-1" size="size-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Books Grid */}
        <div className="space-y-8">
          <SectionHeader title="Livros nesta Coleção" />

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  variant="grid"
                  onClick={() => navigate(`/books/${book.slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Icon name="book" className="mx-auto mb-4 text-muted-foreground" size="size-12" />
              <h3 className="text-lg font-bold">Nenhum livro nesta coleção</h3>
              <p className="text-muted-foreground">
                Em breve adicionaremos livros a esta coleção.
              </p>
            </div>
          )}
        </div>

        {/* Related Collections */}
        {otherCollections.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <SectionHeader title="Outras Coleções" onViewAll={() => navigate('/books')} />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {otherCollections.slice(0, 3).map((otherCollection) => {
                const otherStyle = getCollectionStyle(otherCollection.slug);
                return (
                  <div
                    key={otherCollection.id}
                    className="group flex cursor-pointer items-center gap-6 rounded-xl border border-border/50 bg-card p-6 transition-colors hover:bg-muted/10"
                    onClick={() => navigate(`/books/collections/${otherCollection.slug}`)}
                  >
                    {/* Stack Effect */}
                    <div className="relative">
                      <div className="absolute right-0 top-0 h-24 w-20 translate-x-2 rotate-6 rounded border border-border bg-card shadow-sm"></div>
                      <div className="absolute right-0 top-0 h-24 w-20 -rotate-3 translate-x-1 rounded border border-border bg-card shadow-sm"></div>
                      <div
                        className={cn(
                          'relative flex h-24 w-20 items-center justify-center rounded text-black shadow-lg',
                          otherStyle.color
                        )}
                      >
                        <Icon name={otherStyle.icon} size="size-8" />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold leading-tight transition-colors group-hover:text-primary">
                        {otherCollection.name}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {otherCollection.bookCount} livros
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookCollectionTemplate;
