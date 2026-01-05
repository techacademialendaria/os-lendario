import React from 'react';
import {
  NeuralNetworkSection,
  RadialTaxonomySection,
  DigitalBrainSection,
} from './organisms';

/**
 * GraphSection - Design System Graph Visualizations
 *
 * Orchestrator component that composes all graph visualization sections.
 * Each section demonstrates a different graph visualization pattern:
 * - Neural Network: Community/cluster visualization
 * - Radial Taxonomy: Hierarchical data in radial layout
 * - Digital Brain: Dark mode concept map (Obsidian style)
 */
export const GraphSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      {/* Header */}
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Grafos & Redes</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Visualizacao de dados relacionais complexos. Nossos grafos seguem a regra de{' '}
          <strong>densidade elegante</strong>: mostrar a complexidade sem perder a clareza.
        </p>
      </div>

      {/* Section 1: Neural Network */}
      <NeuralNetworkSection />

      {/* Section 2: Radial Taxonomy */}
      <RadialTaxonomySection />

      {/* Section 3: Digital Brain (Obsidian Style) */}
      <DigitalBrainSection />
    </div>
  );
};

export default GraphSection;
