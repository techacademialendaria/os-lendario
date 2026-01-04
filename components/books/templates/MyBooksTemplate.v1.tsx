import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useMyBooks } from '../../../hooks/useMyBooks';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useAuth } from '../../../lib/AuthContext';
import { toast } from '../../../hooks/use-toast';
import BookCard from '../ui/BookCard';
import { BookCardSkeleton } from '../ui/BookSkeletons';
import BooksTopbar from '../BooksTopbar';

// ============================================================================
// Types
// ============================================================================

type FilterValue = 'reading' | 'want_to_read' | 'read' | 'favorite';

interface FilterConfig {
  value: FilterValue;
  label: string;
  icon: string;
}

// ============================================================================
// Constants
// ============================================================================

const FILTERS: FilterConfig[] = [
  { value: 'reading', label: 'Lendo', icon: 'play-circle' },
  { value: 'want_to_read', label: 'Quero Ler', icon: 'clock' },
  { value: 'read', label: 'Lidos', icon: 'check-circle' },
  { value: 'favorite', label: 'Favoritos', icon: 'heart' },
];

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// ============================================================================
// Component
// ============================================================================

interface MyBooksTemplateProps {
  setSection: (s: Section) => void;
}

const MyBooksTemplate: React.FC<MyBooksTemplateProps> = ({ setSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>('reading');
  const [yearlyGoal] = useState(50); // TODO: get from user preferences
  const currentYear = new Date().getFullYear();

  // Redirect to login if not authenticated (after auth check completes)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login', { state: { from: location }, replace: true });
    }
  }, [authLoading, isAuthenticated, navigate, location]);

  // Fetch books based on active filter
  const { books, stats, isLoading, error, toggleFavorite } = useMyBooks(
    selectedFilter as 'read' | 'reading' | 'want_to_read' | 'favorite'
  );

  usePageTitle('Minha Biblioteca');

  // Show loading skeletons while auth is checking OR while data is loading
  const showSkeletons = authLoading || isLoading;

  // Mock streak data (TODO: implement real tracking)
  const streakData = useMemo(() => {
    const today = new Date().getDay();
    return WEEK_DAYS.map((day, i) => ({
      label: day,
      completed: i < today,
      isToday: i === today,
    }));
  }, []);

  const longestStreak = 12; // TODO: get from database
  const totalBooksRead = stats?.booksRead ?? 0;
  const readMinutesToday = 0; // TODO: implement real tracking

  // All books for this filter
  const displayBooks = books;

  // Get count for each filter
  const getFilterCount = (filter: FilterValue): number => {
    if (!stats) return 0;
    switch (filter) {
      case 'reading':
        return stats.booksReading ?? 0;
      case 'want_to_read':
        return stats.booksWantToRead ?? 0;
      case 'read':
        return stats.booksRead ?? 0;
      case 'favorite':
        return stats.booksFavorited ?? 0;
      default:
        return 0;
    }
  };

  // Handlers
  const handleToggleFavorite = async (contentId: string) => {
    try {
      await toggleFavorite(contentId);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
      toast({
        title: 'Erro ao favoritar',
        description: 'Não foi possível salvar. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  // Transform MyBook to BookCard format
  const transformToBookData = (book: (typeof books)[0]) => ({
    id: book.contentId,
    slug: book.slug,
    title: book.title,
    author: book.author,
    coverUrl: book.imageUrl,
    category: null,
    categorySlug: null,
    summary: null,
    rating: book.rating,
    duration: null,
    pageCount: null,
    hasAudio: false,
    publishedYear: null,
    isbn: null,
    authorSlug: null,
    tags: [],
    createdAt: book.addedAt,
    readingStatus: book.readingStatus,
    isFavorite: book.isFavorite,
    content: null,
    status: 'published' as const,
    readingTime: null,
    wordCount: null,
  });

  const currentFilter = FILTERS.find((f) => f.value === selectedFilter) || FILTERS[0];

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
    <div className="min-h-screen bg-background pb-24 font-sans md:pb-8">
      <BooksTopbar currentSection={Section.APP_BOOKS_MY_LIBRARY} setSection={setSection} />

      {/* Performance Hub - Dark Section */}
      <div className="relative overflow-hidden border-b border-border bg-[#0A0A0A] py-6 md:py-16">
        <div className="relative z-10 mx-auto max-w-7xl space-y-4 px-4 md:space-y-8 md:px-6">
          {/* Mobile: Compact stats row */}
          <div className="flex gap-3 md:hidden">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
                <Icon name="flame" size="size-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                  Sequência
                </p>
                <p className="text-lg font-bold">{longestStreak} dias</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Icon name="target" size="size-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                  Meta {currentYear}
                </p>
                <p className="text-lg font-bold">
                  {totalBooksRead}
                  <span className="text-sm font-normal text-zinc-500">/{yearlyGoal}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Mobile: Week progress (compact) */}
          <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/10 p-4 md:hidden">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold">Sua sequência</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {readMinutesToday}/10 min
              </span>
            </div>
            <div className="flex justify-between gap-1">
              {streakData.map((day, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs transition-all',
                      day.completed
                        ? 'border-brand-gold bg-brand-gold text-black'
                        : day.isToday
                          ? 'border-dashed border-brand-gold'
                          : 'border-zinc-700 bg-zinc-800/50'
                    )}
                  >
                    {day.completed ? <Icon name="check" size="size-3" /> : day.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-brand-gold transition-all duration-1000"
                style={{ width: `${(readMinutesToday / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Desktop: Full Stats Grid */}
          <div className="hidden items-stretch gap-6 md:grid md:grid-cols-12">
            {/* Streak Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-brand-gold/20 bg-brand-gold/10 p-8 shadow-xl shadow-brand-gold/5 md:col-span-8">
              <div className="absolute right-4 top-4 opacity-20 transition-opacity group-hover:opacity-40">
                <Icon name="flame" size="size-10" />
              </div>
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold tracking-tight">Comece sua sequência</h3>
              </div>

              {/* Week days */}
              <div className="mb-8 mt-6 flex gap-4">
                {streakData.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                        day.completed
                          ? 'border-brand-gold bg-brand-gold text-black'
                          : day.isToday
                            ? 'border-dashed border-brand-gold bg-transparent'
                            : 'border-zinc-700 bg-zinc-800/50'
                      )}
                    >
                      {day.completed && <Icon name="check" size="size-4" />}
                      {day.isToday && !day.completed && (
                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-gold" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-xs font-bold uppercase',
                        day.completed
                          ? 'text-brand-gold'
                          : day.isToday
                            ? 'text-white'
                            : 'text-zinc-600'
                      )}
                    >
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <span>Leia 10 minutos para manter sua sequência</span>
                  <span className="font-mono text-white">{readMinutesToday}/10 min</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-brand-gold transition-all duration-1000"
                    style={{ width: `${(readMinutesToday / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-col gap-4 md:col-span-4">
              <div className="flex flex-1 items-center justify-between rounded-xl border border-brand-gold/10 bg-brand-gold/5 p-6 transition-colors hover:bg-brand-gold/10">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Maior sequência
                  </p>
                  <h4 className="text-2xl font-bold">{longestStreak} dias</h4>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(255,149,0,0.2)]">
                  <Icon name="flame" type="solid" size="size-6" />
                </div>
              </div>

              <div className="flex flex-1 items-center justify-between rounded-xl border border-brand-gold/10 bg-brand-gold/5 p-6 transition-colors hover:bg-brand-gold/10">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Meta {currentYear}
                  </p>
                  <h4 className="text-2xl font-bold">
                    {totalBooksRead}
                    <span className="text-lg font-normal text-zinc-500">/{yearlyGoal} livros</span>
                  </h4>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-[0_0_15px_rgba(83,128,150,0.2)]">
                  <Icon name="target" size="size-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Clean Single Column */}
      <main className="relative z-10 mx-auto -mt-4 max-w-7xl px-4 pb-8 md:-mt-8 md:px-6 md:pb-12">
        {/* Filter Tabs - Floating */}
        <div className="mb-8 md:mb-12">
          <div className="scrollbar-hide inline-flex gap-1 overflow-x-auto rounded-full border border-border/30 bg-card/80 p-1 backdrop-blur-sm">
            {FILTERS.map((filter) => {
              const count = getFilterCount(filter.value);
              const isActive = selectedFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={cn(
                    'flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon
                    name={filter.icon}
                    size="size-4"
                    className={filter.value === 'favorite' && !isActive ? 'text-brand-gold' : ''}
                  />
                  {filter.label}
                  {count > 0 && (
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-bold',
                        isActive ? 'bg-background/20' : 'bg-muted'
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Books Grid - Full Width */}
        {showSkeletons ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <BookCardSkeleton key={i} variant="grid" />
            ))}
          </div>
        ) : displayBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center md:py-32">
            <div className="mb-6 rounded-full bg-muted/50 p-6">
              <Icon name={currentFilter.icon} size="size-12" className="text-muted-foreground/50" />
            </div>
            <h3 className="mb-2 text-xl font-semibold md:text-2xl">
              Nenhum livro {currentFilter.label.toLowerCase()}
            </h3>
            <p className="mb-8 max-w-md text-muted-foreground">
              Explore nossa biblioteca e adicione livros à sua coleção pessoal.
            </p>
            <Button
              size="lg"
              className="h-12 bg-brand-gold px-6 font-bold text-black hover:bg-brand-gold/90"
              onClick={() => navigate('/books')}
            >
              <Icon name="compass" className="mr-2" size="size-5" />
              Explorar Biblioteca
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {displayBooks.map((book) => {
              const bookData = transformToBookData(book);
              return (
                <BookCard
                  key={book.contentId}
                  book={bookData}
                  variant="grid"
                  onClick={() => navigate(`/books/${book.slug}`)}
                  isBookmarked={book.isFavorite}
                  readingStatus={book.readingStatus}
                  onBookmark={() => handleToggleFavorite(book.contentId)}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBooksTemplate;
