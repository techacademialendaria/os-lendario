import React from 'react';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';

export const TokensHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="pointer-events-none absolute right-0 top-0 p-12 opacity-5">
        <Icon name="palette" className="-rotate-12 text-[12rem]" />
      </div>
      <div className="relative z-10 space-y-6 p-8 md:p-12">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="border-primary/50 bg-background/50 text-primary backdrop-blur-sm"
          >
            v2.0.0
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">Tailwind + Shadcn</span>
        </div>
        <h2 className="max-w-4xl font-sans text-4xl font-bold tracking-tight md:text-6xl">
          Tokenização: <span className="text-primary">Guia Técnico</span>.
        </h2>
        <p className="max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground">
          Referência definitiva de implementação. Define a única fonte de verdade para cores,
          tipografia, layout e comportamento.
        </p>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-primary via-background to-primary/20"></div>
    </div>
  );
};
