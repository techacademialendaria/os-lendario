import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useMyBooks } from '../../../hooks/useMyBooks';
import { useAllHighlights } from '../../../hooks/useHighlights';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useAuth } from '../../../lib/AuthContext';
import { useReadingStreak } from '../../../hooks/useReadingStreak';
import BooksTopbar from '../BooksTopbar';
import BookCard from '../ui/BookCard';
import { BookCardSkeleton } from '../ui/BookSkeletons';

// ============================================================================
// Types
// ============================================================================

type FilterValue = 'reading' | 'want_to_read' | 'read' | 'favorite' | 'notes';

// ============================================================================
// Constants
// ============================================================================

const FILTERS = [
  { value: 'reading' as FilterValue, label: 'Lendo' },
  { value: 'want_to_read' as FilterValue, label: 'Quero Ler' },
  { value: 'read' as FilterValue, label: 'Lidos' },
  { value: 'favorite' as FilterValue, label: 'Favoritos' },
  { value: 'notes' as FilterValue, label: 'Notas' },
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
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>('reading');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login', { state: { from: location }, replace: true });
    }
  }, [authLoading, isAuthenticated, navigate, location]);

  // Fetch books based on active filter
  const isNotesTab = selectedFilter === 'notes';

  // For notes tab, use useAllHighlights; for others use useMyBooks
  const {
    books: myBooks,
    stats,
    isLoading: myBooksLoading,
    error: myBooksError,
  } = useMyBooks(
    isNotesTab ? undefined : (selectedFilter as 'read' | 'reading' | 'want_to_read' | 'favorite')
  );

  const {
    books: highlightBooks,
    isLoading: highlightsLoading,
    error: highlightsError,
  } = useAllHighlights();

  // Use the appropriate data based on selected tab
  const books = useMemo(() => {
    if (isNotesTab) {
      // Transform highlight books to MyBook format
      return highlightBooks.map((hb) => ({
        contentId: hb.contentId,
        title: hb.title,
        slug: hb.slug,
        imageUrl: hb.imageUrl,
        author: hb.author,
        readingStatus: 'none' as const,
        isFavorite: false,
        rating: null,
        readAt: null,
        addedAt: hb.lastHighlightAt || new Date().toISOString(),
        highlightCount: hb.highlightCount,
      }));
    }
    return myBooks;
  }, [isNotesTab, highlightBooks, myBooks]);

  const isLoading = isNotesTab ? highlightsLoading : myBooksLoading;
  const error = isNotesTab ? highlightsError : myBooksError;

  usePageTitle('Minha Biblioteca');

  // Reading streak data
  const { streak, isLoading: streakLoading } = useReadingStreak();

  const showSkeletons = authLoading || isLoading;

  // Streak data from hook (with fallback)
  const currentStreak = streak?.currentStreak ?? 0;
  const streakData = useMemo(() => {
    if (streak?.weekActivity && streak.weekActivity.length === 7) {
      return streak.weekActivity.map((day, i) => ({
        label: WEEK_DAYS[i],
        completed: day.completed,
        isToday: day.isToday,
      }));
    }
    // Fallback to default (no activity)
    const today = new Date().getDay();
    return WEEK_DAYS.map((day, i) => ({
      label: day,
      completed: false,
      isToday: i === today,
    }));
  }, [streak?.weekActivity]);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  // Get first name from user's full name (capitalized)
  const rawName = user?.fullName?.split(' ')[0] || 'Leitor';
  const userName = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();

  // Streak message based on current streak
  const getStreakMessage = () => {
    if (streakLoading) {
      return 'Carregando...';
    }
    if (currentStreak === 0) {
      return 'Leia hoje e comece sua ofensiva';
    }
    if (currentStreak === 1) {
      return 'Ofensiva iniciada! Sua jornada lendária acaba de começar';
    }
    if (currentStreak < 7) {
      return `${currentStreak} dias de ofensiva`;
    }
    if (currentStreak < 30) {
      return `${currentStreak} dias de ofensiva. Impressionante!`;
    }
    return `${currentStreak} dias de ofensiva. Lendário!`;
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
    <div className="min-h-screen bg-background pb-32 font-sans">
      <BooksTopbar currentSection={Section.APP_BOOKS_MY_LIBRARY} setSection={setSection} />

      {/* Hero Section with Welcome & Streak */}
      <section className="pb-12 pt-12 md:pt-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Welcome Message */}
            <div className="space-y-4 lg:col-span-7">
              <h1 className="font-serif text-4xl font-bold italic tracking-tight md:text-6xl">
                <span className="text-muted-foreground">{getGreeting()},</span>{' '}
                <span className="text-foreground">{userName}!</span>
              </h1>
              <p className="font-serif text-lg italic text-muted-foreground md:text-xl">
                "{getStreakMessage()}"
              </p>
            </div>

            {/* Streak Card */}
            <div className="lg:col-span-5">
              <div className="group relative overflow-hidden rounded-[2rem] border border-border/60 bg-card p-8 shadow-xl">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-sans text-3xl font-black leading-none text-foreground">
                        {currentStreak} {currentStreak === 1 ? 'dia' : 'dias'}
                      </h3>
                      <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        de ofensiva
                      </p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                      <Icon name="flame" type="solid" size="size-8" />
                    </div>
                  </div>

                  {/* Days Row */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-muted/20 p-4">
                      {streakData.map((day, i) => (
                        <div key={i} className="flex flex-col items-center gap-3">
                          <span
                            className={cn(
                              'text-[10px] font-black uppercase transition-colors',
                              day.isToday ? 'text-orange-500' : 'text-muted-foreground/60'
                            )}
                          >
                            {day.label}
                          </span>
                          <div
                            className={cn(
                              'flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500',
                              day.completed
                                ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(255,149,0,0.3)]'
                                : 'bg-muted text-muted-foreground/30',
                              day.isToday &&
                                !day.completed &&
                                'ring-2 ring-orange-500 ring-offset-4 ring-offset-card'
                            )}
                          >
                            {day.completed ? (
                              <Icon name="check" size="size-3" />
                            ) : (
                              <div className="h-1.5 w-1.5 rounded-full bg-current" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Workspace */}
      <main className="mx-auto mt-8 max-w-6xl space-y-12 px-6">
        {/* Simplified Tabs */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Tabs
            value={selectedFilter}
            onValueChange={(v) => setSelectedFilter(v as FilterValue)}
            className="w-full"
          >
            <TabsList className="h-auto justify-start gap-10 bg-transparent p-0">
              {FILTERS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground transition-all data-[state=active]:border-primary data-[state=active]:text-foreground"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Books Grid - Same pattern as Explorar */}
        {showSkeletons ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <BookCardSkeleton key={i} variant="grid" />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-20 text-center md:py-32">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-border bg-muted/30 md:h-20 md:w-20">
              <Icon name="book-open" className="text-muted-foreground/30" size="size-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold md:text-xl">Nenhum livro aqui ainda</h3>
              <p className="mx-auto max-w-xs text-sm text-muted-foreground md:text-base">
                Comece uma nova leitura na nossa biblioteca curada.
              </p>
            </div>
            <Button
              variant="outline"
              className="h-12 rounded-full px-8 font-bold"
              onClick={() => navigate('/books')}
            >
              Explorar Biblioteca
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {books.map((book) => {
              // Transform MyBook to BookCard format
              const bookData = {
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
                content: null,
                status: 'published' as const,
                readingTime: null,
                wordCount: null,
              };

              // Navigate to highlights if on Notes tab, otherwise to book detail
              const handleBookClick = () => {
                if (selectedFilter === 'notes') {
                  navigate(`/books/${book.slug}/highlights`);
                } else {
                  navigate(`/books/${book.slug}`);
                }
              };

              return (
                <BookCard
                  key={book.contentId}
                  book={bookData}
                  variant="grid"
                  onClick={handleBookClick}
                  isBookmarked={book.isFavorite}
                  readingStatus={book.readingStatus}
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
