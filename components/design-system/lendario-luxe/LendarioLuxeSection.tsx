/**
 * Lendário Luxe - Design System Showcase
 *
 * Esta página demonstra os componentes Luxe usando os componentes REAIS de /books.
 * Não recria - apenas importa e exibe.
 *
 * Total: 15 showcases cobrindo ~60 componentes de /books
 */

import React from 'react';
import {
  LuxeHero,
  BookCardsShowcase,
  AuthorsCollectionsShowcase,
  NavigationShowcase,
  InputsButtonsShowcase,
  BookDetailShowcase,
  ReaderShowcase,
  TokensShowcase,
  LuxeFooter,
  // New showcases
  UIComponentsShowcase,
  BookListShowcase,
  LibrarySectionsShowcase,
  HighlightsShowcase,
  BatchProgressShowcase,
  TopbarComponentsShowcase,
} from './organisms';

// Section divider component
const SectionDivider: React.FC<{ title: string; count: number }> = ({ title, count }) => (
  <div className="flex items-center gap-4 py-8">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{title}</span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
        {count}
      </span>
    </div>
    <div className="h-px flex-1 bg-gradient-to-r from-border via-border to-transparent" />
  </div>
);

const LendarioLuxeSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8 pb-16">
      <LuxeHero />

      {/* UI Components */}
      <SectionDivider title="UI Components" count={4} />
      <BookCardsShowcase />
      <AuthorsCollectionsShowcase />
      <UIComponentsShowcase />

      {/* Library Sections */}
      <SectionDivider title="Library Sections" count={3} />
      <LibrarySectionsShowcase />

      {/* Book List & Admin */}
      <SectionDivider title="Book List & Admin" count={4} />
      <BookListShowcase />

      {/* Batch Progress Pipeline */}
      <SectionDivider title="Batch Progress" count={5} />
      <BatchProgressShowcase />

      {/* Highlights & Reader */}
      <SectionDivider title="Highlights & Reader" count={4} />
      <HighlightsShowcase />
      <ReaderShowcase />
      <BookDetailShowcase />

      {/* Navigation & Topbar */}
      <SectionDivider title="Navigation & Topbar" count={8} />
      <TopbarComponentsShowcase />
      <NavigationShowcase />

      {/* Inputs, Buttons & Tokens */}
      <SectionDivider title="Patterns & Tokens" count={6} />
      <InputsButtonsShowcase />
      <TokensShowcase />

      <LuxeFooter />
    </div>
  );
};

export default LendarioLuxeSection;
