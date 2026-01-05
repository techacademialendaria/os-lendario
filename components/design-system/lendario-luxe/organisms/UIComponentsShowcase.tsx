/**
 * UIComponentsShowcase - BookDetailSheet, BookSkeletons, PhaseTimeline, SectionHeader
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BookDetailSheet from '@/components/books/ui/BookDetailSheet';
import { BookCardSkeleton, HeroSkeleton, CategorySkeleton } from '@/components/books/ui/BookSkeletons';
import { PhaseTimeline } from '@/components/books/ui/PhaseTimeline';
import SectionHeader from '@/components/books/ui/SectionHeader';
import type { BookData } from '@/hooks/useBooks';
import { MOCK_BOOK } from '../data';

// Type assertion for mock data
const book = MOCK_BOOK as unknown as BookData;

export const UIComponentsShowcase: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      {/* BookDetailSheet */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BookDetailSheet</CardTitle>
            <CardDescription>
              <code>components/books/ui/BookDetailSheet.tsx</code> — Slide-out panel com hero blur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setIsSheetOpen(true)}
              className="h-14 bg-foreground px-10 text-sm font-black uppercase tracking-[0.25em] text-background shadow-lg transition-all duration-300 hover:bg-foreground/90"
            >
              Abrir Book Detail Sheet
            </Button>
            <BookDetailSheet
              book={book}
              isOpen={isSheetOpen}
              onClose={() => setIsSheetOpen(false)}
              onReadSummary={() => setIsSheetOpen(false)}
              onBookmark={() => {}}
              isBookmarked={false}
            />
          </CardContent>
        </Card>
      </section>

      {/* SectionHeader */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>SectionHeader</CardTitle>
            <CardDescription>
              <code>components/books/ui/SectionHeader.tsx</code> — Título + ação com ícone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <SectionHeader title="Destaques" icon="flame" onViewAll={() => {}} />
            <SectionHeader title="Coleções" icon="apps" viewAllVariant="primary" onViewAll={() => {}} />
            <SectionHeader title="Autores" icon="user" viewAllLabel="Explorar" onViewAll={() => {}} />
          </CardContent>
        </Card>
      </section>

      {/* PhaseTimeline */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>PhaseTimeline</CardTitle>
            <CardDescription>
              <code>components/books/ui/PhaseTimeline.tsx</code> — Indicador de fases do pipeline (11 fases)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Completo (11/11 fases)
              </p>
              <PhaseTimeline currentPhase={11} status="completed" showLabels />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Em progresso (fase 6 - Architecture)
              </p>
              <PhaseTimeline currentPhase={6} status="in_progress" phasesCompleted="1-5" showLabels />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Com erro (fase 4 - Gap Analysis)
              </p>
              <PhaseTimeline currentPhase={4} status="failed" phasesCompleted="1-3" showLabels />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Pendente (início)
              </p>
              <PhaseTimeline currentPhase={0} status="pending" showLabels />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* BookSkeletons */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>BookSkeletons</CardTitle>
            <CardDescription>
              <code>components/books/ui/BookSkeletons.tsx</code> — Loading states (3 variantes)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                HeroSkeleton
              </p>
              <HeroSkeleton />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                CategorySkeleton
              </p>
              <CategorySkeleton />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                BookCardSkeleton (grid, horizontal, compact)
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Grid</p>
                  <BookCardSkeleton variant="grid" />
                </div>
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Horizontal</p>
                  <BookCardSkeleton variant="horizontal" />
                </div>
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Compact</p>
                  <div className="w-24">
                    <BookCardSkeleton variant="compact" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

