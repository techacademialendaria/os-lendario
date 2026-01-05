import React from 'react';
import { RadialGraphView } from './RadialGraphView';

export const RadialTaxonomySection: React.FC = () => {
  return (
    <section className="space-y-6 border-t border-border pt-12">
      <h3 className="flex items-center gap-2 font-sans text-2xl font-bold">
        Taxonomia Radial
      </h3>
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <RadialGraphView />
        </div>
        <div className="order-1 space-y-6 md:order-2">
          <p className="font-serif text-lg leading-relaxed text-muted-foreground">
            A visualizacao radial e ideal para <strong>hierarquias profundas</strong> onde o
            contexto central e vital. Diferente da arvore tradicional, ela aproveita melhor o
            espaco em telas retangulares.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-brand-blue"></div>
              <span className="text-sm font-bold">Categoria A: Tecnologia</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-brand-green"></div>
              <span className="text-sm font-bold">Categoria B: Negocios</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-brand-red"></div>
              <span className="text-sm font-bold">Categoria C: Pessoas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
