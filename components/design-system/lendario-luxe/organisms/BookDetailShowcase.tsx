/**
 * BookDetailShowcase - BookCover, BookMetadata, and PhaseTimeline demos
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCover } from '@/components/books/book-detail/organisms/BookCover';
import { BookMetadata } from '@/components/books/book-detail/organisms/BookMetadata';
import { PhaseTimeline } from '@/components/books/ui/PhaseTimeline';
import { MOCK_BOOK } from '../data';

export const BookDetailShowcase: React.FC = () => {
  return (
    <>
      {/* BookCover */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BookCover 3D</CardTitle>
            <CardDescription>
              <code>components/books/book-detail/organisms/BookCover.tsx</code> — Levitação, glow ambient, shimmer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="max-w-[200px]">
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Com capa (hover para efeito 3D)
                </p>
                <BookCover
                  book={{ title: MOCK_BOOK.title, coverUrl: MOCK_BOOK.coverUrl }}
                  loading={false}
                  fallbackGradient="from-amber-600 to-orange-500"
                />
              </div>
              <div className="max-w-[200px]">
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Fallback gradient
                </p>
                <BookCover
                  book={{ title: 'Sem Capa', coverUrl: null }}
                  loading={false}
                  fallbackGradient="from-primary/80 to-primary/40"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* BookMetadata */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BookMetadata</CardTitle>
            <CardDescription>
              <code>components/books/book-detail/organisms/BookMetadata.tsx</code> — Display inline de metadados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookMetadata pageCount={320} publishedYear={2018} hasAudio={true} />
          </CardContent>
        </Card>
      </section>

      {/* PhaseTimeline */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>PhaseTimeline</CardTitle>
            <CardDescription>
              <code>components/books/ui/PhaseTimeline.tsx</code> — Indicador de fases do pipeline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Completo (11 fases)
              </p>
              <PhaseTimeline currentPhase={11} status="completed" showLabels />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Em progresso (fase 6)
              </p>
              <PhaseTimeline currentPhase={6} status="in_progress" phasesCompleted="1-5" showLabels />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Com erro (fase 4)
              </p>
              <PhaseTimeline currentPhase={4} status="failed" phasesCompleted="1-3" showLabels />
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};
