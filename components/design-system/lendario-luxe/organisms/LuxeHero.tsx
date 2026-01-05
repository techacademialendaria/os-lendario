/**
 * LuxeHero - Hero section for Lendario Luxe showcase
 */

import React from 'react';
import { Badge } from '@/components/ui/badge';

export const LuxeHero: React.FC = () => {
  return (
    <section className="rounded-[2rem] border border-border bg-card/80 p-12 backdrop-blur-xl">
      <Badge
        variant="outline"
        className="mb-6 rounded-full border-primary/20 bg-primary/5 px-6 py-2 text-[9px] font-black uppercase tracking-[0.4em] text-primary"
      >
        Design System
      </Badge>
      <h1 className="text-5xl font-bold tracking-tighter text-foreground md:text-6xl">
        Lendário Luxe
      </h1>
      <p className="mt-4 max-w-xl font-serif text-xl italic text-muted-foreground">
        Componentes reais de{' '}
        <code className="rounded bg-muted px-2 py-0.5 font-mono text-sm text-primary">/books</code>{' '}
        implementando o padrão Luxo Minimalista.
      </p>
    </section>
  );
};
