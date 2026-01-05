import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useBooksByAuthor } from '../../../hooks/useBooksByAuthor';
import { useAuthor } from '../../../hooks/useAuthor';
import { useBooks } from '../../../hooks/useBooks';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useMetaTags } from '../../../hooks/useMetaTags';
import BookCard from '../ui/BookCard';
import BooksTopbar from '../topbar';
import { type SortOption, SORT_OPTIONS } from '../constants';

interface BooksByAuthorProps {
  setSection: (s: Section) => void;
}

const BooksByAuthorTemplate: React.FC<BooksByAuthorProps> = ({ setSection }) => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.APP_BOOKS_LIBRARY);

  const handleSetSection = (section: Section) => {
    setCurrentSection(section);
    setSection(section);
  };
  const { authorSlug } = useParams<{ authorSlug: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const { books, authorName, loading, error } = useBooksByAuthor(authorSlug || '');
  const { author, loading: authorLoading } = useAuthor(authorSlug || null);
  const { books: allBooks } = useBooks();

  usePageTitle(authorName ? `Livros de ${authorName}` : 'Livros do Autor');
  useMetaTags(
    authorName
      ? {
          title: `Livros de ${authorName}`,
          description: author?.shortBio || `Explore os ${books.length} livros de ${authorName} disponíveis na Academia Lendária.`,
          image: author?.avatarUrl,
          type: 'profile',
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

  // Calculate total reading time
  const totalReadingTime = books.reduce((acc, b) => acc + (b.readingTime || 0), 0);

  // Get related books (same category as author's books, excluding author's books)
  const authorBookIds = new Set(books.map((b) => b.id));
  const authorCategories = new Set(books.map((b) => b.categorySlug).filter(Boolean));

  const relatedBooks = allBooks
    .filter((b) => !authorBookIds.has(b.id)) // Exclude author's books
    .filter((b) => authorCategories.has(b.categorySlug)) // Same category
    .slice(0, 4);

  // If not enough related by category, get popular books
  const popularBooks =
    relatedBooks.length < 4
      ? allBooks
          .filter((b) => !authorBookIds.has(b.id))
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 4)
      : relatedBooks;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8">
        <div className="max-w-md space-y-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10">
            <Icon name="exclamation" className="text-destructive" size="size-8" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Autor não encontrado</h2>
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
          {/* Author Avatar with decorative ring */}
          {loading || authorLoading ? (
            <Skeleton className="h-44 w-44 rounded-full" />
          ) : (
            <div className="group relative">
              {/* Aura glow */}
              <div className="absolute -inset-6 bg-primary/0 group-hover:bg-primary/20 rounded-full blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-100" />
              
              {/* Decorative rings */}
              <div className="absolute -inset-2 h-[192px] w-[192px] rounded-full border border-primary/20 transition-all duration-500 group-hover:border-primary/40"></div>
              <div className="absolute -inset-4 h-[208px] w-[208px] rounded-full border border-primary/10 transition-all duration-500 group-hover:border-primary/20"></div>
              
              {/* Main avatar */}
              <Avatar className="relative h-44 w-44 border-4 border-background shadow-2xl ring-2 ring-primary/30 transition-all duration-500 group-hover:ring-primary/50 dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                {author?.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} className="grayscale group-hover:grayscale-0 transition-all duration-1000" />}
                <AvatarFallback className="bg-gradient-to-br from-muted to-muted/50 text-5xl font-bold text-foreground">
                  {(authorName || 'A').substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}

          {/* Author Info */}
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
                  Autor
                </Badge>
                <h1 className="text-5xl font-bold leading-[0.95] tracking-tighter text-foreground md:text-6xl lg:text-7xl">
                  {author?.name || authorName || 'Autor'}
                </h1>
                {author?.metadata?.occupation && author.metadata.occupation.length > 0 && (
                  <p className="font-serif text-xl italic text-muted-foreground">
                    {author.metadata.occupation.join(' • ')}
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
              {author?.metadata?.wikipedia && (
                <Button
                  variant="outline"
                  className="h-14 px-8 rounded-full border-border font-black uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
                  onClick={() => window.open(author.metadata?.wikipedia, '_blank')}
                >
                  <Icon name="globe" className="mr-3" size="size-4" /> Wikipedia
                </Button>
              )}
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

        {/* Author Bio Section */}
        {!loading && author?.shortBio && (
          <div className="mb-16 rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm">
            <h3 className="mb-4 text-[9px] font-black uppercase tracking-[0.4em] text-primary">
              Sobre o Autor
            </h3>
            <p className="font-serif text-xl italic leading-relaxed text-muted-foreground">
              {author.shortBio}
            </p>
            {author.metadata && (
              <div className="mt-6 flex flex-wrap gap-4">
                {author.metadata.wikipedia && (
                  <a
                    href={author.metadata.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon name="globe" size="size-4" /> Wikipedia
                  </a>
                )}
                {author.metadata.website && (
                  <a
                    href={author.metadata.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon name="globe" size="size-4" /> Website
                  </a>
                )}
                {author.metadata.twitter && (
                  <a
                    href={`https://twitter.com/${author.metadata.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon name="x" size="size-4" /> @{author.metadata.twitter}
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {/* Books Grid */}
        <div className="space-y-10">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Biblioteca</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Livros de {authorName || 'este autor'}
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
                Este autor ainda não tem livros cadastrados na biblioteca.
              </p>
            </div>
          )}
        </div>

        {/* Related Books Section */}
        {!loading && popularBooks.length > 0 && (
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
              {popularBooks.map((book) => (
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

export default BooksByAuthorTemplate;
