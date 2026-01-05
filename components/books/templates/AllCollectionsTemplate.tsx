import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Skeleton } from '../../ui/skeleton';
import { cn } from '../../../lib/utils';
import { Section } from '../../../types';
import { useBookCollections } from '../../../hooks/useBookCollections';
import { usePageTitle } from '../../../hooks/usePageTitle';
import BooksTopbar from '../topbar';
import { getCollectionStyle } from '../constants';

interface AllCollectionsProps {
  setSection: (s: Section) => void;
}

const AllCollectionsTemplate: React.FC<AllCollectionsProps> = ({ setSection }) => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.APP_BOOKS_LIBRARY);

  const handleSetSection = (section: Section) => {
    setCurrentSection(section);
    setSection(section);
  };

  const navigate = useNavigate();
  const { collections, loading, error } = useBookCollections();

  usePageTitle('Todas as Coleções');

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8">
        <div className="max-w-md space-y-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10">
            <Icon name="exclamation" className="text-destructive" size="size-8" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Erro ao carregar coleções</h2>
            <p className="font-serif text-base italic text-muted-foreground">{error.message}</p>
          </div>
          <Button 
            onClick={() => window.location.reload()}
            className="h-14 px-10 bg-foreground font-black uppercase tracking-[0.2em] text-sm text-background hover:bg-foreground/90 active:scale-[0.98] transition-all duration-300"
          >
            Tentar novamente
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
        <div className="mb-16">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Biblioteca</p>
          <h1 className="mt-3 text-5xl font-bold leading-[0.95] tracking-tighter text-foreground md:text-6xl lg:text-7xl">
            Coleções
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-muted-foreground">
            Coleções curadas de livros organizados por tema, autor ou objetivo de aprendizado.
          </p>
          {!loading && (
            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              {collections.length} coleções disponíveis
            </p>
          )}
        </div>

        {/* Collections Grid */}
        <div className="space-y-10">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Explorar</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Todas as Coleções</h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-8 rounded-2xl border border-border bg-card/60 p-8"
                >
                  <Skeleton className="h-28 w-24 rounded-xl" />
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-40 rounded-lg" />
                    <Skeleton className="h-4 w-24 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : collections.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => {
                const style = getCollectionStyle(collection.slug);
                return (
                  <div
                    key={collection.id}
                    className="group relative flex cursor-pointer items-center gap-8 rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-card/80 hover:shadow-2xl dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                    onClick={() => navigate(`/books/collections/${collection.slug}`)}
                  >
                    {/* Stack Effect */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute right-0 top-0 h-28 w-24 translate-x-3 rotate-6 rounded-xl border border-border bg-card shadow-md transition-transform duration-500 group-hover:translate-x-4 group-hover:rotate-8"></div>
                      <div className="absolute right-0 top-0 h-28 w-24 translate-x-1.5 -rotate-3 rounded-xl border border-border bg-card shadow-md transition-transform duration-500 group-hover:translate-x-2 group-hover:-rotate-4"></div>
                      <div
                        className={cn(
                          'relative flex h-28 w-24 items-center justify-center rounded-xl text-black shadow-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl',
                          style.color
                        )}
                      >
                        <Icon name={style.icon} size="size-10" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-xl font-bold leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                        {collection.name}
                      </h4>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        {collection.bookCount} livros
                      </p>
                      {collection.description && (
                        <p className="mt-3 line-clamp-2 font-serif text-sm italic text-muted-foreground/70">
                          {collection.description}
                        </p>
                      )}
                    </div>

                    <Icon
                      name="chevron-right"
                      className="flex-shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary"
                      size="size-5"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-border bg-muted/30">
                <Icon name="book-stack" className="text-muted-foreground/50" size="size-8" />
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">Nenhuma coleção disponível</h3>
              <p className="mt-2 font-serif text-base italic text-muted-foreground">Em breve adicionaremos coleções curadas.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllCollectionsTemplate;
