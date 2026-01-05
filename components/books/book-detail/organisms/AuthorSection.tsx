import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AuthorSectionProps {
  book: {
    author: string;
    authorSlug?: string | null;
  };
  author: {
    name?: string;
    avatarUrl?: string | null;
    shortBio?: string | null;
    bookCount?: number;
  } | null;
  authorLoading: boolean;
  displayedAuthorBio: string;
  shouldTruncateAuthorBio: boolean;
  isAuthorBioExpanded: boolean;
  onToggleBio: () => void;
  onNavigateToAuthor: () => void;
}

export const AuthorSection: React.FC<AuthorSectionProps> = ({
  book,
  author,
  authorLoading,
  displayedAuthorBio,
  shouldTruncateAuthorBio,
  isAuthorBioExpanded,
  onToggleBio,
  onNavigateToAuthor,
}) => {
  return (
    <section className="space-y-8">
      <p className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground">A Mente por Tras da Obra</p>

      <div className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card/80 to-card/40 p-8 md:p-10 shadow-xl transition-all duration-500 hover:border-border/80 hover:shadow-2xl">
        {/* Decorative Icon */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[12rem] text-foreground pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]">
          <Icon name="brain" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Author Avatar */}
          <div className="shrink-0 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Avatar
                className={cn(
                  'relative h-28 w-28 border-4 border-background shadow-2xl ring-2 ring-primary/20 transition-all duration-500',
                  book.authorSlug && 'cursor-pointer'
                )}
                onClick={onNavigateToAuthor}
              >
                {author?.avatarUrl && (
                  <AvatarImage
                    src={author.avatarUrl}
                    alt={author.name}
                    className="grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                )}
                <AvatarFallback className="text-2xl font-bold bg-muted">
                  {book.author.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <Badge className="bg-primary text-primary-foreground font-black text-[8px] uppercase tracking-[0.3em] px-4 py-1.5 border-none shadow-lg">
              Verified Mind
            </Badge>
          </div>

          {/* Author Info */}
          <div className="flex-1 min-w-0 text-center md:text-left space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <button
                  className="text-2xl md:text-3xl font-bold tracking-tight text-foreground transition-colors duration-300 hover:text-primary"
                  onClick={onNavigateToAuthor}
                >
                  {author?.name || book.author}
                </button>
                {author && author.bookCount && author.bookCount > 0 && (
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                    {author.bookCount} {author.bookCount === 1 ? 'obra na biblioteca' : 'obras na biblioteca'}
                  </p>
                )}
              </div>

              {/* View Author Button - Desktop */}
              {book.authorSlug && (
                <Button
                  className="hidden md:flex h-12 shrink-0 rounded-full bg-foreground text-background hover:opacity-90 px-8 text-[9px] font-black uppercase tracking-[0.3em] shadow-lg transition-all"
                  onClick={onNavigateToAuthor}
                >
                  Ver Perfil Completo
                </Button>
              )}
            </div>

            {/* Author bio */}
            {authorLoading ? (
              <Skeleton className="h-20 w-full rounded-xl" />
            ) : displayedAuthorBio ? (
              <div>
                <p className="font-serif text-base md:text-lg italic leading-relaxed text-muted-foreground">
                  {displayedAuthorBio}
                  {shouldTruncateAuthorBio && !isAuthorBioExpanded && '...'}
                </p>
                {shouldTruncateAuthorBio && (
                  <button
                    onClick={onToggleBio}
                    className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:text-primary mx-auto md:mx-0"
                  >
                    {isAuthorBioExpanded ? 'Mostrar menos' : 'Ler mais'}
                    <Icon
                      name="chevron-down"
                      size="size-3"
                      className={cn('transition-transform duration-300', isAuthorBioExpanded && 'rotate-180')}
                    />
                  </button>
                )}
              </div>
            ) : (
              <p className="font-serif text-sm italic text-muted-foreground/60">
                Biografia nao disponivel.
              </p>
            )}

            {/* View Author Button - Mobile */}
            {book.authorSlug && (
              <Button
                className="md:hidden w-full h-12 rounded-full bg-foreground text-background hover:opacity-90 text-[9px] font-black uppercase tracking-[0.3em] shadow-lg transition-all"
                onClick={onNavigateToAuthor}
              >
                Ver Perfil Completo
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
