/**
 * NavigationShowcase - SectionHeader, Tabs, and Skeletons demos
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SectionHeader from '@/components/books/ui/SectionHeader';
import { BookCardSkeleton, HeroSkeleton, CategorySkeleton } from '@/components/books/ui/BookSkeletons';

export const NavigationShowcase: React.FC = () => {
  return (
    <>
      {/* SectionHeader */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>SectionHeader</CardTitle>
            <CardDescription>
              <code>components/books/ui/SectionHeader.tsx</code> — Título + ação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <SectionHeader title="Destaques" icon="flame" onViewAll={() => {}} />
            <SectionHeader title="Coleções" icon="apps" viewAllVariant="primary" onViewAll={() => {}} />
          </CardContent>
        </Card>
      </section>

      {/* Skeletons */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
            <CardDescription>
              <code>components/books/ui/BookSkeletons.tsx</code>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Hero Skeleton
              </p>
              <HeroSkeleton />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Category Skeleton
              </p>
              <CategorySkeleton />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Book Card Skeletons
              </p>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                <BookCardSkeleton variant="grid" />
                <BookCardSkeleton variant="horizontal" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tab Navigation */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Tab Navigation</CardTitle>
            <CardDescription>Indicador hairline de 2px</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-8 border-b border-border">
              {['Explorar', 'Autores', 'Meus Livros'].map((tab, i) => (
                <button
                  key={tab}
                  className={`relative pb-4 text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-300 ${
                    i === 0 ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/70'
                  }`}
                >
                  {tab}
                  {i === 0 && <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary" />}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};
