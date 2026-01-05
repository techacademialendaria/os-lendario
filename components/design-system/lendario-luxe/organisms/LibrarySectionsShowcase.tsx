/**
 * LibrarySectionsShowcase - HeroSection, CategoriesBar, ErrorState
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { HeroSection } from '@/components/books/books-library/organisms/HeroSection';
import { CategoriesBar } from '@/components/books/books-library/organisms/CategoriesBar';
import type { BookData } from '@/hooks/useBooks';
import { MOCK_CATEGORIES, MOCK_BOOK } from '../data';

// Type assertion for mock data
const book = MOCK_BOOK as unknown as BookData;

export const LibrarySectionsShowcase: React.FC = () => {
  return (
    <>
      {/* HeroSection */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>HeroSection</CardTitle>
            <CardDescription>
              <code>components/books/books-library/organisms/HeroSection.tsx</code> — Hero banner principal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Usuário autenticado com livro em leitura
              </p>
              <HeroSection
                totalBookCount={1234}
                isAuthenticated={true}
                currentlyReadingBook={book}
                recentBooks={[]}
                popularBooks={[]}
                onContinueReading={() => {}}
                onMyLibrary={() => {}}
                onExploreLibrary={() => {}}
                isLoading={false}
              />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Usuário não autenticado
              </p>
              <HeroSection
                totalBookCount={1234}
                isAuthenticated={false}
                currentlyReadingBook={null}
                recentBooks={[]}
                popularBooks={[]}
                onContinueReading={() => {}}
                onMyLibrary={() => {}}
                onExploreLibrary={() => {}}
                isLoading={false}
              />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Loading state
              </p>
              <HeroSection
                totalBookCount={0}
                isAuthenticated={false}
                currentlyReadingBook={null}
                recentBooks={[]}
                popularBooks={[]}
                onContinueReading={() => {}}
                onMyLibrary={() => {}}
                onExploreLibrary={() => {}}
                isLoading={true}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CategoriesBar */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>CategoriesBar</CardTitle>
            <CardDescription>
              <code>components/books/books-library/organisms/CategoriesBar.tsx</code> — Filtro de categorias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Normal
              </p>
              <CategoriesBar
                categories={MOCK_CATEGORIES}
                onCategoryClick={() => {}}
                onAllClick={() => {}}
                isLoading={false}
              />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Loading
              </p>
              <CategoriesBar
                categories={[]}
                onCategoryClick={() => {}}
                onAllClick={() => {}}
                isLoading={true}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ErrorState Pattern */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>ErrorState Pattern</CardTitle>
            <CardDescription>
              <code>components/books/books-library/organisms/ErrorState.tsx</code> — Padrão de estado de erro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Nota: Componente usa min-h-screen. Mostrando padrão visual:
            </p>
            <div className="flex items-center justify-center rounded-2xl border border-border bg-background p-12">
              <div className="max-w-md space-y-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10">
                  <Icon name="exclamation" className="text-destructive" size="size-8" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Erro ao carregar biblioteca
                  </h2>
                  <p className="font-serif text-base italic text-muted-foreground">
                    Não foi possível carregar os livros. Verifique sua conexão.
                  </p>
                </div>
                <button className="h-14 px-10 rounded-full bg-foreground font-black uppercase tracking-[0.2em] text-sm text-background hover:bg-foreground/90 active:scale-[0.98] transition-all duration-300">
                  Tentar novamente
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

