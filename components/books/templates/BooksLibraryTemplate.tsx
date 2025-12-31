import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon, type IconName } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '../../ui/sheet';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useBooks, useBookCategories, type BookData } from '../../../hooks/useBooks';
import { useBookCollections } from '../../../hooks/useBookCollections';
import { usePageTitle } from '../../../hooks/usePageTitle';
import BookCard from '../ui/BookCard';
import BookCardHorizontal from '../ui/BookCardHorizontal';
import CollectionCard, { type Collection } from '../ui/CollectionCard';
import SectionHeader from '../ui/SectionHeader';
import { BookCardSkeleton, HeroSkeleton, CategorySkeleton } from '../ui/BookSkeletons';
import BooksTopbar from '../BooksTopbar';

// Map collection slugs to icons and colors
const COLLECTION_STYLES: Record<string, { icon: IconName; color: string }> = {
  mente_alta_performance: { icon: 'brain', color: 'bg-purple-500' },
  visoes_do_futuro: { icon: 'rocket', color: 'bg-blue-500' },
  mentes_brilhantes: { icon: 'bulb', color: 'bg-yellow-500' },
  default: { icon: 'book-stack', color: 'bg-brand-gold' },
};

const getCollectionStyle = (slug: string) => COLLECTION_STYLES[slug] || COLLECTION_STYLES.default;

interface BooksLibraryProps {
  setSection: (s: Section) => void;
  onSelectBook?: (slug: string) => void;
}

const BooksLibraryTemplate: React.FC<BooksLibraryProps> = ({ setSection, onSelectBook }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

  const { books, loading, error, totalBooks } = useBooks();
  const { categories, loading: categoriesLoading } = useBookCategories();
  const { collections, loading: collectionsLoading } = useBookCollections();

  usePageTitle('Biblioteca');

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory =
        !selectedCategory ||
        book.categorySlug === selectedCategory ||
        book.tags.some((t) => t.slug === selectedCategory);
      const matchesSearch =
        !searchQuery ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [books, selectedCategory, searchQuery]);

  // Group by sections
  const recentBooks = useMemo(
    () =>
      [...books]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 2), // Only 2 for horizontal cards
    [books]
  );

  const popularBooks = useMemo(
    () =>
      [...books]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5),
    [books]
  );

  const booksWithAudio = useMemo(() => books.filter((b) => b.hasAudio).slice(0, 5), [books]);

  const handleBookClick = (book: BookData) => {
    if (onSelectBook) {
      onSelectBook(book.slug);
    } else {
      setSelectedBook(book);
    }
  };

  const handleReadSummary = (book: BookData) => {
    if (onSelectBook) {
      onSelectBook(book.slug);
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="space-y-4 text-center">
          <Icon name="exclamation" className="mx-auto text-destructive" size="size-12" />
          <h2 className="text-xl font-bold">Erro ao carregar biblioteca</h2>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <BooksTopbar
        currentSection={Section.APP_BOOKS_LIBRARY}
        setSection={setSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-12 p-6">
        {/* Hero Section */}
        {loading ? (
          <HeroSkeleton />
        ) : (
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505] p-8 shadow-2xl md:p-12">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            <div className="relative z-10 max-w-2xl space-y-6">
              <Badge
                variant="outline"
                className="border-brand-gold/30 bg-brand-gold/5 text-[10px] uppercase tracking-widest text-brand-gold"
              >
                Biblioteca Lendária
              </Badge>
              <h1 className="text-4xl font-bold leading-none tracking-tight text-white md:text-6xl">
                Expanda sua <br />
                <span className="bg-gradient-to-r from-brand-gold to-yellow-200 bg-clip-text text-transparent">
                  Consciência.
                </span>
              </h1>
              <p className="font-serif text-lg leading-relaxed text-zinc-400">
                {totalBooks} livros curados sobre negócios, filosofia e tecnologia.
              </p>
              <div className="flex gap-4 pt-2">
                {recentBooks[0] && (
                  <Button
                    className="bg-brand-gold font-bold text-black hover:bg-brand-gold/90"
                    onClick={() => handleBookClick(recentBooks[0])}
                  >
                    <Icon name="book-open-cover" className="mr-2" /> Continuar Lendo
                  </Button>
                )}
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Ver Minha Lista
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        {categoriesLoading ? (
          <CategorySkeleton />
        ) : (
          <div className="scrollbar-hide -mx-6 flex gap-2 overflow-x-auto px-6 pb-4 md:mx-0 md:px-0">
            <button
              className={cn(
                'whitespace-nowrap rounded-full border px-6 py-2 text-sm font-medium transition-all',
                !selectedCategory
                  ? 'border-foreground bg-foreground font-bold text-background'
                  : 'border-border bg-card text-muted-foreground hover:border-foreground/50 hover:text-foreground'
              )}
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                className={cn(
                  'whitespace-nowrap rounded-full border px-6 py-2 text-sm font-medium transition-all',
                  selectedCategory === cat.slug
                    ? 'border-foreground bg-foreground font-bold text-background'
                    : 'border-border bg-card text-muted-foreground hover:border-foreground/50 hover:text-foreground'
                )}
                onClick={() => setSelectedCategory(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Lançamentos Section - Horizontal Cards */}
        {!selectedCategory && !searchQuery && recentBooks.length > 0 && (
          <section>
            <SectionHeader
              title="Lançamentos"
              onViewAll={() => {}}
              viewAllVariant="primary"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="h-52 animate-pulse rounded-2xl bg-muted"></div>
                  ))
                : recentBooks.map((book, index) => (
                    <BookCardHorizontal
                      key={book.id}
                      book={book}
                      onClick={() => handleBookClick(book)}
                      progress={Math.random() * 100} // TODO: replace with real progress
                      curator={book.author}
                      accentColor={index === 0 ? 'text-purple-400' : 'text-orange-400'}
                    />
                  ))}
            </div>
          </section>
        )}

        {/* Mais Populares Section */}
        {!selectedCategory && !searchQuery && popularBooks.length > 0 && (
          <section>
            <SectionHeader
              title="Mais Populares"
              onViewAll={() => {}}
            />

            <div className="scrollbar-hide -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-8 md:mx-0 md:px-0">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="min-w-[240px] snap-start">
                      <BookCardSkeleton variant="grid" />
                    </div>
                  ))
                : popularBooks.map((book) => (
                    <div key={book.id} className="min-w-[240px] snap-start">
                      <BookCard book={book} variant="grid" onClick={() => handleBookClick(book)} />
                    </div>
                  ))}
            </div>
          </section>
        )}

        {/* Coleções Section */}
        {!selectedCategory && !searchQuery && collections.length > 0 && (
          <section>
            <SectionHeader
              title="Coleções"
              onViewAll={() => collections[0] && navigate(`/books/collections/${collections[0].slug}`)}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {collectionsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-36 animate-pulse rounded-xl bg-muted"></div>
                  ))
                : collections.slice(0, 3).map((col) => {
                    const style = getCollectionStyle(col.slug);
                    return (
                      <CollectionCard
                        key={col.id}
                        collection={{
                          id: col.id,
                          title: col.name,
                          bookCount: col.bookCount,
                          icon: style.icon,
                          color: style.color,
                        }}
                        onClick={() => navigate(`/books/collections/${col.slug}`)}
                      />
                    );
                  })}
            </div>
          </section>
        )}

        {/* Audiobooks Section */}
        {!selectedCategory && !searchQuery && booksWithAudio.length > 0 && (
          <section>
            <SectionHeader
              title="Com Audiobook"
              icon="headset"
              onViewAll={() => {}}
            />

            <div className="scrollbar-hide -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-8 md:mx-0 md:px-0">
              {booksWithAudio.map((book) => (
                <div key={book.id} className="min-w-[240px] snap-start">
                  <BookCard book={book} variant="grid" onClick={() => handleBookClick(book)} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Books / Filtered */}
        <div className="border-t border-border pt-8">
          <h2 className="mb-6 font-sans text-xl font-bold text-muted-foreground">
            {selectedCategory
              ? categories.find((c) => c.slug === selectedCategory)?.name || 'Categoria'
              : searchQuery
                ? `Resultados para "${searchQuery}"`
                : 'Todos os Livros'}
            <span className="ml-2 text-sm font-normal">({filteredBooks.length})</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} variant="grid" />)
              : filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    variant="grid"
                    onClick={() => handleBookClick(book)}
                  />
                ))}
          </div>

          {!loading && filteredBooks.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <Icon name="search" className="mx-auto mb-4" size="size-8" />
              <p>Nenhum livro encontrado</p>
            </div>
          )}
        </div>
      </main>

      {/* Book Detail Sheet */}
      <Sheet open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-md">
          {selectedBook && (
            <>
              <div className="relative h-48 w-full bg-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                {selectedBook.coverUrl && (
                  <img
                    src={selectedBook.coverUrl}
                    className="h-full w-full object-cover opacity-50"
                    alt=""
                  />
                )}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <Badge className="mb-2 border-none bg-white/20 text-white backdrop-blur-md hover:bg-white/30">
                    {selectedBook.category || 'Livro'}
                  </Badge>
                  <SheetTitle className="font-serif text-3xl font-bold leading-tight text-white">
                    {selectedBook.title}
                  </SheetTitle>
                  <p className="mt-1 text-sm text-white/80">por {selectedBook.author}</p>
                </div>
              </div>

              <div className="space-y-8 p-6">
                <div className="flex gap-4">
                  <Button
                    className="flex-1 bg-brand-gold font-bold text-black hover:bg-brand-gold/90"
                    onClick={() => handleReadSummary(selectedBook)}
                  >
                    <Icon name="book-open-cover" className="mr-2" size="size-4" /> Ler Resumo
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border text-foreground hover:bg-muted"
                  >
                    <Icon name="plus" size="size-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <SheetDescription className="font-serif text-base leading-relaxed text-muted-foreground">
                    {selectedBook.summary || 'Sem descrição disponível.'}
                  </SheetDescription>

                  {selectedBook.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedBook.tags.map((tag) => (
                        <Badge
                          key={tag.slug}
                          variant="secondary"
                          className="bg-muted text-xs text-muted-foreground"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                    {selectedBook.pageCount && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Páginas:</span>
                        <span className="ml-2 font-medium">{selectedBook.pageCount}</span>
                      </div>
                    )}
                    {selectedBook.publishedYear && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Ano:</span>
                        <span className="ml-2 font-medium">{selectedBook.publishedYear}</span>
                      </div>
                    )}
                    {selectedBook.hasAudio && (
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="headset" size="size-4" className="text-brand-gold" />
                        <span>Audiobook disponível</span>
                      </div>
                    )}
                    {selectedBook.rating && (
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="star" type="solid" size="size-4" className="text-brand-gold" />
                        <span>{selectedBook.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BooksLibraryTemplate;
