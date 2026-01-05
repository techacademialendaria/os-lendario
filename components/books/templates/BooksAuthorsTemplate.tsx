import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useAuthors, type Author } from '../../../hooks/useAuthors';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useMetaTags } from '../../../hooks/useMetaTags';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Separator } from '../../ui/separator';
import BooksTopbar from '../topbar';
import { generateGradient, getInitials } from '../utils';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface BooksAuthorsProps {
  setSection: (s: Section) => void;
}

const BooksAuthorsTemplate: React.FC<BooksAuthorsProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const { authors, loading, error } = useAuthors();

  usePageTitle('Autores');
  useMetaTags({
    title: 'Autores',
    description: 'Conheça os autores e mentores cujas obras transformaram o mundo. Explore suas ideias e aprenda com os grandes pensadores.',
    type: 'website',
  });

  // Filter authors by search and selected letter (desktop only uses selectedLetter)
  const filteredAuthors = useMemo(() => {
    let result = authors.filter((author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedLetter) {
      result = result.filter(
        (author) => author.name[0].toUpperCase() === selectedLetter
      );
    }

    return result.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [authors, searchTerm, selectedLetter]);

  // Group authors by initial letter (for mobile view)
  const authorsByLetter = useMemo(() => {
    const grouped: Record<string, Author[]> = {};
    const sortedAuthors = [...authors].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

    sortedAuthors.forEach((author) => {
      const letter = author.name[0].toUpperCase();
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(author);
    });

    return grouped;
  }, [authors]);

  // Get sorted letters that have authors
  const sortedLetters = useMemo(() => {
    return Object.keys(authorsByLetter).sort();
  }, [authorsByLetter]);

  // Check which letters have authors
  const lettersWithAuthors = useMemo(() => {
    const letters = new Set<string>();
    authors.forEach((author) => {
      letters.add(author.name[0].toUpperCase());
    });
    return letters;
  }, [authors]);

  const handleAuthorClick = (slug: string) => {
    navigate(`/books/author/${slug}`);
  };

  const handleLetterClick = (letter: string) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null);
    } else {
      setSelectedLetter(letter);
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <BooksTopbar currentSection={Section.APP_BOOKS_AUTHORS} setSection={setSection} />
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <Icon name="exclamation" className="text-destructive" size="size-12" />
          <h2 className="mt-4 font-serif text-xl font-bold">Erro ao carregar autores</h2>
          <p className="mt-2 text-muted-foreground">{error.message}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  // Author Card Component (reused in both views)
  const AuthorCard: React.FC<{ author: Author; compact?: boolean }> = ({ author, compact }) => (
    <div
      className={cn(
        "group cursor-pointer",
        compact
          ? "flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
          : "relative flex flex-col items-center text-center space-y-6 md:space-y-8"
      )}
      onClick={() => handleAuthorClick(author.slug)}
    >
      {compact ? (
        // Compact list view (mobile search results)
        <>
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border">
            {author.avatar_url ? (
              <img src={author.avatar_url} alt={author.name} className="h-full w-full object-cover" />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center text-sm font-bold text-white"
                style={{ background: generateGradient(author.name) }}
              >
                {getInitials(author.name)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground truncate">{author.name}</h3>
            <p className="text-xs text-muted-foreground">
              {author.book_count} {author.book_count === 1 ? 'obra' : 'obras'}
            </p>
          </div>
          <Icon name="angle-small-right" size="size-5" className="text-muted-foreground" />
        </>
      ) : (
        // Full card view (grid)
        <>
          <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-4">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border/10 group-hover:border-primary/40 transition-all z-10 p-1.5 md:p-2 bg-background">
              <div className="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                {author.avatar_url ? (
                  <img src={author.avatar_url} alt={author.name} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-2xl md:text-3xl font-bold text-white"
                    style={{ background: generateGradient(author.name) }}
                  >
                    {getInitials(author.name)}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2 md:space-y-3 z-10">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {author.name}
            </h3>
            <Separator className="w-8 mx-auto bg-border group-hover:w-16 transition-all duration-500" />
            <div className="flex flex-col items-center pt-1 md:pt-2">
              <span className="text-sm md:text-base font-mono font-bold text-muted-foreground">
                {author.book_count}
              </span>
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
                {author.book_count === 1 ? 'Obra' : 'Obras'}
              </span>
            </div>
          </div>
          <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
            <Button variant="ghost" className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground">
              Ver Obras <Icon name="arrow-right" className="ml-2" size="size-2.5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-32 font-sans text-foreground selection:bg-primary/30">
      {/* BooksTopbar FORA do container animado para não quebrar position:fixed */}
      <BooksTopbar currentSection={Section.APP_BOOKS_AUTHORS} setSection={setSection} />

      <main className="mx-auto max-w-7xl px-4 py-8 space-y-12 md:px-8 md:py-20 md:space-y-24 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/5 text-primary uppercase tracking-[0.4em] text-[9px] font-black px-6 py-2 rounded-full"
          >
            Curadoria de Mentes
          </Badge>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tighter leading-none">
            Autores <br className="md:hidden" />
            <span className="text-muted-foreground font-serif italic font-light tracking-normal">
              & Mentores.
            </span>
          </h1>
          <p className="text-muted-foreground font-serif text-base md:text-xl leading-relaxed italic opacity-80 max-w-xl mx-auto hidden md:block">
            "Caminhe entre gigantes e herde a visão daqueles que moldaram o mundo."
          </p>

          {/* Search Input */}
          <div className="relative max-w-md mx-auto pt-2 md:pt-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-primary/0 group-focus-within:bg-primary/10 rounded-2xl blur-xl transition-all duration-500 opacity-0 group-focus-within:opacity-100" />
              <div className="relative">
                <Icon
                  name="search"
                  className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary/70 transition-colors duration-300"
                  size="size-4"
                />
                <Input
                  placeholder="Buscar autor..."
                  className="h-12 md:h-14 pl-12 md:pl-14 pr-12 md:pr-14 bg-muted/30 dark:bg-muted/10 border border-border hover:border-border/80 focus:border-primary/30 focus:bg-muted/50 dark:focus:bg-muted/20 rounded-xl md:rounded-2xl text-foreground text-base font-light tracking-wide placeholder:text-muted-foreground placeholder:font-light transition-all duration-300 outline-none ring-0 focus:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Icon name="xmark" size="size-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP: Alphabet Navigation - Hidden on mobile */}
        <div className="sticky top-20 z-40 hidden md:flex justify-center">
          <div className="flex bg-card/60 backdrop-blur-2xl rounded-full border border-border p-2 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-x-auto scrollbar-hide max-w-full">
            <button
              className={cn(
                'px-4 h-10 flex items-center justify-center rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 whitespace-nowrap',
                !selectedLetter
                  ? 'bg-foreground text-background shadow-xl'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => setSelectedLetter(null)}
            >
              Todos
            </button>
            {ALPHABET.map((letter) => {
              const hasAuthors = lettersWithAuthors.has(letter);
              return (
                <button
                  key={letter}
                  disabled={!hasAuthors}
                  className={cn(
                    'w-10 h-10 flex items-center justify-center rounded-full text-[10px] font-black transition-all duration-500',
                    selectedLetter === letter
                      ? 'bg-foreground text-background shadow-xl scale-110'
                      : hasAuthors
                        ? 'text-muted-foreground hover:text-foreground'
                        : 'text-muted-foreground/20 cursor-not-allowed'
                  )}
                  onClick={() => hasAuthors && handleLetterClick(letter)}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Authors Gallery */}
        <section className="space-y-8">
          {/* Results count - Desktop only */}
          {!loading && (
            <p className="hidden md:block text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              {filteredAuthors.length} {filteredAuthors.length === 1 ? 'Autor' : 'Autores'}
              {selectedLetter && ` com "${selectedLetter}"`}
              {searchTerm && ` para "${searchTerm}"`}
            </p>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-20">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-4 md:space-y-6 animate-pulse">
                  <div className="w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-muted" />
                  <div className="space-y-2 md:space-y-3 text-center">
                    <div className="h-2 w-16 mx-auto rounded bg-muted" />
                    <div className="h-4 md:h-5 w-24 md:w-32 mx-auto rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAuthors.length === 0 && searchTerm ? (
            /* Empty Search State */
            <div className="flex min-h-[40vh] flex-col items-center justify-center space-y-6 px-4 text-center">
              <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full border border-dashed border-border bg-muted/30">
                <Icon name="users" className="text-muted-foreground/50" size="size-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
                  Nenhum autor corresponde a "{searchTerm}"
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Tente buscar por outro nome
                </p>
              </div>
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Limpar Busca
              </Button>
            </div>
          ) : (
            <>
              {/* MOBILE: Search Results as List */}
              {searchTerm && (
                <div className="md:hidden space-y-2">
                  <p className="text-xs font-medium text-muted-foreground px-1">
                    {filteredAuthors.length} resultado{filteredAuthors.length !== 1 && 's'}
                  </p>
                  <div className="space-y-1">
                    {filteredAuthors.map((author) => (
                      <AuthorCard key={author.id} author={author} compact />
                    ))}
                  </div>
                </div>
              )}

              {/* MOBILE: Grouped by Letter (when not searching) */}
              {!searchTerm && (
                <div className="md:hidden space-y-8">
                  {sortedLetters.map((letter) => (
                    <div key={letter} className="space-y-3">
                      {/* Letter Header */}
                      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm py-2 border-b border-border">
                        <h2 className="text-2xl font-bold text-primary">{letter}</h2>
                      </div>
                      {/* Authors List */}
                      <div className="space-y-1">
                        {authorsByLetter[letter].map((author) => (
                          <AuthorCard key={author.id} author={author} compact />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* DESKTOP: Grid View */}
              <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-24">
                {filteredAuthors.map((author) => (
                  <AuthorCard key={author.id} author={author} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      {/* Bottom Gradient - Desktop only */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10 hidden md:block" />
    </div>
  );
};

export default BooksAuthorsTemplate;
