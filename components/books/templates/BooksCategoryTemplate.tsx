import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useBooksByCategory } from '../../../hooks/useBooksByCategory';
import { useBooks } from '../../../hooks/useBooks';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useMetaTags } from '../../../hooks/useMetaTags';
import BookCard from '../ui/BookCard';
import BooksTopbar from '../topbar';
import { getCategoryStyle, type SortOption, SORT_OPTIONS } from '../constants';

interface BooksCategoryProps {
  setSection: (s: Section) => void;
}

const BooksCategoryTemplate: React.FC<BooksCategoryProps> = ({ setSection }) => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.APP_BOOKS_LIBRARY);

  const handleSetSection = (section: Section) => {
    setCurrentSection(section);
    setSection(section);
  };

  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const { books, category, loading, error } = useBooksByCategory(categorySlug || '');
  const { books: allBooks } = useBooks();

  usePageTitle(category?.name || 'Categoria');
  useMetaTags(
    category
      ? {
          title: category.name,
          description: category.description || `Explore os ${books.length} livros de ${category.name} disponíveis na Academia Lendária.`,
          type: 'website',
        }
      : null
  );

  // Sort books
  const sortedBooks = useMemo(() => {
    const sorted = [...books];
    switch (sortBy) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'recent':
      default:
        return sorted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [books, sortBy]);

  // Get related books from other categories
  const categoryBookIds = new Set(books.map((b) => b.id));
  const relatedBooks = allBooks
    .filter((b) => !categoryBookIds.has(b.id))
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  // Calculate total reading time
  const totalReadingTime = books.reduce((acc, b) => acc + (b.readingTime || 0), 0);

  // Get category style
  const style = getCategoryStyle(categorySlug || '');

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8">
        <div className="max-w-md space-y-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10">
            <Icon name="exclamation" className="text-destructive" size="size-8" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Categoria não encontrada</h2>
            <p className="font-serif text-base italic text-muted-foreground">{error.message}</p>
          </div>
          <Button 
            onClick={() => navigate('/books')}
            className="h-14 px-10 bg-foreground font-black uppercase tracking-[0.2em] text-sm text-background hover:bg-foreground/90 active:scale-[0.98] transition-all duration-300"
          >
            Voltar à Biblioteca
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 font-sans text-foreground">
      {/* BooksTopbar FORA do container animado para não quebrar position:fixed */}
      <BooksTopbar currentSection={currentSection} setSection={handleSetSection} />

      <main className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20 animate-fade-in">
        {/* Hero Section */}
        <div className="mb-16 flex flex-col items-start gap-12 md:flex-row md:items-center">
          {/* Category Icon */}
          {loading ? (
            <Skeleton className="h-36 w-32 rounded-2xl" />
          ) : (
            <div className="group relative">
              {/* Aura */}
              <div className="absolute -inset-4 bg-primary/0 group-hover:bg-primary/20 rounded-3xl blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-100" />
              
              {/* Stack effect */}
              <div className="absolute right-0 top-0 h-36 w-32 translate-x-4 rotate-6 rounded-2xl border border-border bg-card shadow-lg transition-transform duration-500 group-hover:translate-x-5 group-hover:rotate-8"></div>
              <div className="absolute right-0 top-0 h-36 w-32 translate-x-2 -rotate-3 rounded-2xl border border-border bg-card shadow-lg transition-transform duration-500 group-hover:translate-x-3 group-hover:-rotate-4"></div>
              {/* Main icon */}
              <div
                className={cn(
                  'relative flex h-36 w-32 items-center justify-center rounded-2xl text-black shadow-2xl transition-all duration-500 group-hover:-translate-y-2',
                  style.color
                )}
              >
                <Icon name={style.icon} size="size-14" />
              </div>
            </div>
          )}

          {/* Category Info */}
          <div className="flex-1 space-y-6">
            {loading ? (
              <>
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-14 w-3/4 rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </>
            ) : (
              <>
                <Badge
                  variant="outline"
                  className="rounded-full border-primary/20 bg-primary/5 px-6 py-2 text-[9px] font-black uppercase tracking-[0.4em] text-primary"
                >
                  Categoria
                </Badge>
                <h1 className="text-5xl font-bold leading-[0.95] tracking-tighter text-foreground md:text-6xl lg:text-7xl">
                  {category?.name || categorySlug}
                </h1>
                {category?.description && (
                  <p className="max-w-2xl font-serif text-xl italic leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                )}
                <div className="flex items-center gap-8 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Livros</span>
                    <span className="text-2xl font-bold text-foreground">{books.length}</span>
                  </div>
                  {totalReadingTime > 0 && (
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Leitura</span>
                      <span className="text-2xl font-bold text-foreground">~{totalReadingTime} min</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Bar */}
        {!loading && books.length > 0 && (
          <div className="mb-12 flex flex-wrap items-center justify-between gap-6 border-b border-border pb-8">
            <div className="flex items-center gap-4">
              <Button
                className="h-14 px-10 bg-foreground font-black uppercase tracking-[0.15em] text-sm text-background shadow-lg hover:bg-foreground/90 hover:shadow-xl active:scale-[0.98] transition-all duration-300"
                onClick={() => books[0] && navigate(`/books/${books[0].slug}`)}
              >
                <Icon name="book-open-cover" className="mr-3" size="size-4" /> Começar a Ler
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Ordenar</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-10 rounded-full px-4 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-muted">
                    {SORT_OPTIONS[sortBy]}{' '}
                    <Icon name="chevron-down" className="ml-2" size="size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl border-border">
                  {(Object.keys(SORT_OPTIONS) as SortOption[]).map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={cn('transition-colors', sortBy === option ? 'bg-muted' : '')}
                    >
                      {SORT_OPTIONS[option]}
                      {sortBy === option && <Icon name="check" className="ml-auto text-primary" size="size-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}

        {/* Books Grid */}
        <div className="space-y-10">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Explorar</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Livros de {category?.name || 'esta categoria'}
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                  <Skeleton className="h-3 w-1/2 rounded-lg" />
                </div>
              ))}
            </div>
          ) : sortedBooks.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {sortedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onClick={() => navigate(`/books/${book.slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-border bg-muted/30">
                <Icon name="book" className="text-muted-foreground/50" size="size-8" />
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">Nenhum livro encontrado</h3>
              <p className="mt-2 font-serif text-base italic text-muted-foreground">
                Esta categoria ainda não tem livros cadastrados na biblioteca.
              </p>
            </div>
          )}
        </div>

        {/* Related Books Section */}
        {!loading && relatedBooks.length > 0 && (
          <div className="mt-20 pt-16">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />
            
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Recomendados</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Você também pode gostar</h2>
              </div>
              <button 
                onClick={() => navigate('/books')}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                Ver todos
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {relatedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onClick={() => navigate(`/books/${book.slug}`)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BooksCategoryTemplate;
