import React, { useState, useMemo } from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '../../ui/sheet';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useBooks, useBookCategories, type BookData } from '../../../hooks/useBooks';
import { usePageTitle } from '../../../hooks/usePageTitle';
import BookCard from '../ui/BookCard';
import { BookCardSkeleton, HeroSkeleton, CategorySkeleton } from '../ui/BookSkeletons';

interface BooksLibraryProps {
  setSection: (s: Section) => void;
  onSelectBook?: (slug: string) => void;
}

const BooksLibraryTemplate: React.FC<BooksLibraryProps> = ({ setSection, onSelectBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

  const { books, loading, error, totalBooks } = useBooks();
  const { categories, loading: categoriesLoading } = useBookCategories();

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
          <Icon name="exclamation-circle" className="mx-auto text-destructive" size="size-12" />
          <h2 className="text-xl font-bold">Erro ao carregar biblioteca</h2>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in bg-background pb-20 font-sans text-foreground">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/90 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <Icon name="book-open" className="text-brand-gold" /> Biblioteca
            </span>

            {/* Desktop Nav */}
            <nav className="ml-8 hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
              <button
                className={cn(
                  'flex h-16 items-center transition-colors',
                  !selectedCategory && 'border-b-2 border-foreground font-bold text-foreground'
                )}
                onClick={() => setSelectedCategory(null)}
              >
                Explorar
              </button>
              <button className="transition-colors hover:text-foreground">Meus Livros</button>
              <button
                className="transition-colors hover:text-foreground"
                onClick={() => {
                  // Filter to audiobooks
                }}
              >
                Audiobooks
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden w-64 md:block">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size="size-3"
              />
              <Input
                placeholder="Título, autor ou ISBN..."
                className="h-9 rounded-full border-border bg-muted/30 pl-9 text-xs focus:border-brand-gold/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl space-y-12 px-6 py-8">
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
                    <Icon name="book-open" className="mr-2" /> Continuar Lendo
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

        {/* Recent Books */}
        {!selectedCategory && !searchQuery && (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-sans text-2xl font-bold">Adicionados Recentemente</h2>
              <Button
                size="sm"
                variant="outline"
                className="h-7 rounded-full border-muted-foreground/30 px-4 text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                Ver todos <Icon name="angle-small-right" className="ml-1" />
              </Button>
            </div>

            <div className="scrollbar-hide -mx-6 flex snap-x gap-6 overflow-x-auto px-6 pb-8 md:mx-0 md:px-0">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="min-w-[240px] snap-start">
                      <BookCardSkeleton variant="grid" />
                    </div>
                  ))
                : recentBooks.map((book) => (
                    <div key={book.id} className="min-w-[240px] snap-start">
                      <BookCard book={book} variant="grid" onClick={() => handleBookClick(book)} />
                    </div>
                  ))}
            </div>
          </section>
        )}

        {/* Audiobooks Section */}
        {!selectedCategory && !searchQuery && booksWithAudio.length > 0 && (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-sans text-2xl font-bold">
                <Icon name="headphones" className="text-brand-gold" /> Com Audiobook
              </h2>
              <Button
                size="sm"
                variant="outline"
                className="h-7 rounded-full border-muted-foreground/30 px-4 text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                Ver todos <Icon name="angle-small-right" className="ml-1" />
              </Button>
            </div>

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
                    <Icon name="book-open" className="mr-2" size="size-4" /> Ler Resumo
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
                        <Icon name="headphones" size="size-4" className="text-brand-gold" />
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
