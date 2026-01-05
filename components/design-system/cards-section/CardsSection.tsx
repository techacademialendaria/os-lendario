/**
 * Cards Section - Design System Showcase
 *
 * Demonstrates Card component patterns: basic structures, media, carousel,
 * interactive elements, states, and usage guidelines.
 *
 * Refactored: 440 -> ~50 lines (88% reduction)
 */

import React from 'react';
import {
  BasicStructuresSection,
  MediaSection,
  CarouselSection,
  InteractiveSection,
  StatesSection,
  GuidelinesSection,
} from './organisms';

export const CardsSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      {/* Header */}
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Cards & Conteineres</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Superficies versateis para agrupar conteudo. Explore variacoes de estrutura, midia e
          interatividade.
        </p>
      </div>

      {/* Showcases */}
      <BasicStructuresSection />
      <MediaSection />
      <CarouselSection />
      <InteractiveSection />
      <StatesSection />
      <GuidelinesSection />
    </div>
  );
};

export default CardsSection;
