/** BooksLibraryTemplate - Orchestrator (refactored from 527 to ~95 lines) */
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useMetaTags } from '@/hooks/useMetaTags';
import { Section } from '@/types';
import type { BookData } from '@/hooks/useBooks';
import BooksTopbar from '../topbar';
import BookDetailSheet from '../ui/BookDetailSheet';
import { useBooksLibraryData, useLocalFavorites, useInfiniteScroll } from './hooks';
import { HeroSection, CategoriesSection, RecentBooksSection, PopularBooksSection, CollectionsSection, AudiobooksSection, AllBooksSection, ErrorState } from './organisms';
import type { BooksLibraryProps } from './types';

const BooksLibraryTemplate: React.FC<BooksLibraryProps> = ({ setSection, onSelectBook }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  usePageTitle('Biblioteca');
  useMetaTags({
    title: 'Biblioteca de Livros',
    description: 'Academia Lendária: resumos de livros transformadores, frameworks mentais e acesso às mentes dos maiores pensadores da história. Aprenda em minutos o que levou anos para ser escrito.',
    type: 'website',
  });

  const data = useBooksLibraryData();
  const { localFavorites, readingStatusMap, handleToggleFavorite } = useLocalFavorites({
    myBooks: data.myBooks, myBooksLoading: data.myBooksLoading, toggleFavorite: data.toggleFavorite,
  });
  const { loadMoreRef } = useInfiniteScroll({ hasMore: data.hasMore, loadingMore: data.loadingMore, loadMore: data.loadMore });

  const handleBookClick = useCallback((book: BookData) => {
    onSelectBook ? onSelectBook(book.slug) : setSelectedBook(book);
  }, [onSelectBook]);
  const handleReadSummary = useCallback((book: BookData) => onSelectBook?.(book.slug), [onSelectBook]);

  if (data.error) {
    return <ErrorState message={data.error.message} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24 font-sans md:pb-8">
      <BooksTopbar currentSection={Section.APP_BOOKS_LIBRARY} setSection={setSection} visibleBookIds={data.visibleBookIds} />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-16 px-6 py-8 md:space-y-20 md:px-8 md:py-12">
        <HeroSection
          totalBookCount={data.totalBookCount}
          isAuthenticated={isAuthenticated}
          currentlyReadingBook={data.currentlyReadingBook}
          recentBooks={data.recentBooks}
          popularBooks={data.popularBooks}
          onContinueReading={() => data.currentlyReadingBook && navigate(`/books/${data.currentlyReadingBook.slug}/read`)}
          onMyLibrary={() => navigate('/books/my-library')}
          onExploreLibrary={() => { const book = data.recentBooks[0] || data.popularBooks[0]; if (book) handleBookClick(book); }}
          isLoading={data.featuredLoading}
        />
        <RecentBooksSection books={data.recentBooks} onBookClick={handleBookClick} isLoading={data.featuredLoading} />
        <PopularBooksSection books={data.popularBooks} localFavorites={localFavorites} readingStatusMap={readingStatusMap} onBookClick={handleBookClick} onToggleFavorite={handleToggleFavorite} isLoading={data.featuredLoading} />
        <CollectionsSection collections={data.collections} onCollectionClick={(slug) => navigate(`/books/collections/${slug}`)} onViewAll={() => navigate('/books/collections')} isLoading={data.collectionsLoading} />
        <CategoriesSection categories={data.categories} onCategoryClick={(slug) => navigate(`/books/category/${slug}`)} onViewAll={() => navigate('/books')} isLoading={data.categoriesLoading} />
        <AudiobooksSection books={data.audiobookBooks} localFavorites={localFavorites} readingStatusMap={readingStatusMap} onBookClick={handleBookClick} onToggleFavorite={handleToggleFavorite} />
        <AllBooksSection
          books={data.books}
          totalBookCount={data.totalBookCount}
          localFavorites={localFavorites}
          readingStatusMap={readingStatusMap}
          onBookClick={handleBookClick}
          onToggleFavorite={handleToggleFavorite}
          isLoading={data.loading}
          loadingMore={data.loadingMore}
          hasMore={data.hasMore}
          loadMoreRef={loadMoreRef}
          onViewAllBooks={() => navigate('/books')}
        />
      </main>

      <BookDetailSheet book={selectedBook} isOpen={!!selectedBook} onClose={() => setSelectedBook(null)} onReadSummary={handleReadSummary} onBookmark={handleToggleFavorite} isBookmarked={selectedBook ? localFavorites.has(selectedBook.id) : false} />
    </div>
  );
};

export default BooksLibraryTemplate;
