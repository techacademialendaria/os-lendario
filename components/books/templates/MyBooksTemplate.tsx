import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { LmsStreakCard } from '../../ui/LmsStreakCard';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useMyBooks } from '../../../hooks/useMyBooks';
import { useAllHighlights } from '../../../hooks/useHighlights';
import { usePageTitle } from '../../../hooks/usePageTitle';
import { useAuth } from '../../../lib/AuthContext';
import { useReadingStreak } from '../../../hooks/useReadingStreak';
import BooksTopbar from '../topbar';
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
  { value: 'want_to_read' as FilterValue, label: 'Próximos' },
  { value: 'read' as FilterValue, label: 'Lidos' },
  { value: 'favorite' as FilterValue, label: 'Favoritos' },
  { value: 'notes' as FilterValue, label: 'Notas' },
];

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// ============================================================================
// Luxury Components
// ============================================================================

const LuxuryButton = ({
  children,
  variant = 'primary',
  onClick,
  className,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'h-16 px-12 rounded-[2rem] font-black uppercase tracking-[0.25em] text-[11px] transition-all duration-300 active:scale-[0.98]',
      variant === 'primary'
        ? 'bg-[#FAFAFA] text-[#050505] hover:bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)]'
        : 'bg-transparent text-[#FAFAFA] border border-white/20 hover:border-white/40 hover:bg-white/5',
      className
    )}
  >
    {children}
  </button>
);

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
  const { books: myBooks, stats, isLoading: myBooksLoading, error: myBooksError } = useMyBooks(
    isNotesTab ? undefined : (selectedFilter as 'read' | 'reading' | 'want_to_read' | 'favorite')
  );

  const {
    books: highlightBooks,
    isLoading: highlightsLoading,
    error: highlightsError,
  } = useAllHighlights();

  const books = useMemo(() => {
    if (isNotesTab) {
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

  const currentStreak = streak?.currentStreak ?? 0;
  const streakDays = useMemo(() => {
    if (streak?.weekActivity && streak.weekActivity.length === 7) {
      return streak.weekActivity.map((day, i) => ({
        label: WEEK_DAYS[i],
        isActive: day.completed,
        isToday: day.isToday,
      }));
    }
    const today = new Date().getDay();
    return WEEK_DAYS.map((day, i) => ({
      label: day,
      isActive: false,
      isToday: i === today,
    }));
  }, [streak?.weekActivity]);

  // Get first name from user's full name
  const rawName = user?.fullName?.split(' ')[0] || 'Leitor';
  const userName = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();
  const fullName = user?.fullName || 'Leitor Lendário';

  // Inspirational quote
  const quote = "O conhecimento é o único ativo que não pode ser confiscado.";

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] p-6">
        <div className="space-y-4 text-center">
          <Icon name="exclamation" className="mx-auto text-red-500" size="size-12" />
          <h2 className="text-xl font-bold text-[#FAFAFA]">Erro ao carregar biblioteca</h2>
          <p className="text-[#666666]">{error.message}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="border-white/20 text-[#FAFAFA] hover:bg-white/5">
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pb-32 font-sans selection:bg-primary/30">
      <BooksTopbar currentSection={Section.APP_BOOKS_MY_LIBRARY} setSection={setSection} />

      {/* Hero Section - Luxury Minimal */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">

            {/* Welcome Message - Left */}
            <div className="space-y-8 lg:col-span-7">
              {/* Main Heading */}
              <div className="space-y-1">
                <h1 className="text-5xl font-bold tracking-tight text-[#FAFAFA] md:text-7xl">
                  Bem-vindo,
                </h1>
                <p className="font-serif text-5xl italic text-[#E8DCC4] md:text-7xl">
                  {fullName}.
                </p>
              </div>

              {/* Quote */}
              <p className="font-serif text-lg italic text-[#666666] md:text-xl max-w-lg leading-relaxed">
                "{quote}"
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-5 pt-6">
                <LuxuryButton variant="primary" onClick={() => navigate('/books')}>
                  Continuar Lendo
                </LuxuryButton>
                <LuxuryButton variant="secondary" onClick={() => navigate('/books/library')}>
                  Explorar Acervo
                </LuxuryButton>
              </div>
            </div>

            {/* Streak Card - Luxo 2.0 */}
            <div className="lg:col-span-5">
              <LmsStreakCard count={currentStreak} days={streakDays} />
            </div>
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className="mx-auto max-w-7xl px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Content Section */}
      <main className="mx-auto mt-16 max-w-7xl space-y-12 px-8">
        {/* Luxury Tab Navigation */}
        <nav className="flex items-center gap-12 overflow-x-auto pb-2">
          {FILTERS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedFilter(tab.value)}
              className={cn(
                'relative pb-4 text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-300 whitespace-nowrap',
                selectedFilter === tab.value
                  ? 'text-[#FAFAFA]'
                  : 'text-[#555555] hover:text-[#888888]'
              )}
            >
              {tab.label}
              {/* Active indicator - hairline */}
              {selectedFilter === tab.value && (
                <div className="absolute bottom-0 left-0 h-[2px] w-8 bg-[#E59E3F]" />
              )}
            </button>
          ))}
        </nav>

        {/* Books Grid */}
        {showSkeletons ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <BookCardSkeleton key={i} variant="grid" />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-8 py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-white/10 bg-white/5">
              <Icon name="book-open" className="text-[#555555]" size="size-8" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-[#FAFAFA] tracking-tight">
                Nenhum livro aqui ainda
              </h3>
              <p className="mx-auto max-w-sm text-sm text-[#666666] leading-relaxed">
                Comece uma nova leitura na nossa biblioteca curada de conhecimento lendário.
              </p>
            </div>
            <LuxuryButton variant="secondary" onClick={() => navigate('/books')}>
              Explorar Biblioteca
            </LuxuryButton>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {books.map((book) => {
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
