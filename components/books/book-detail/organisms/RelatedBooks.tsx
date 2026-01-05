import React from 'react';
import { Icon } from '@/components/ui/icon';

interface RelatedBooksProps {
  books: Array<{
    id: string;
    slug: string;
    title: string;
    author: string;
    coverUrl?: string | null;
  }>;
  onBookClick: (slug: string) => void;
}

export const RelatedBooks: React.FC<RelatedBooksProps> = ({ books, onBookClick }) => {
  if (books.length === 0) return null;

  return (
    <>
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <section className="space-y-8">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Recomendados</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Livros similares</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {books.map((related) => (
            <button
              key={related.id}
              className="group text-left"
              onClick={() => onBookClick(related.slug)}
            >
              <div className="relative">
                {/* Aura */}
                <div className="absolute -inset-2 bg-primary/0 group-hover:bg-primary/15 rounded-2xl blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-border shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  {related.coverUrl ? (
                    <img
                      src={related.coverUrl}
                      alt={related.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <Icon name="book" className="text-muted-foreground" size="size-6" />
                    </div>
                  )}
                  {/* Spine */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/20 via-white/10 to-white/5" />
                </div>
              </div>
              <h4 className="mt-4 line-clamp-2 text-sm font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                {related.title}
              </h4>
              <p className="mt-1 truncate font-serif text-xs italic text-muted-foreground">
                {related.author}
              </p>
            </button>
          ))}
        </div>
      </section>
    </>
  );
};
