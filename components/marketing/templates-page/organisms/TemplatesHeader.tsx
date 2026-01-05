import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { HEADER_MASTERS } from '../data';

export const TemplatesHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="pointer-events-none absolute right-0 top-0 p-12 opacity-5">
        <Icon name="document" className="rotate-12 text-[12rem]" />
      </div>
      <div className="relative z-10 space-y-6 p-8 md:p-12">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="border-primary/50 bg-background/50 text-primary backdrop-blur-sm"
          >
            Templates v2.0
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">
            Otimizados com Metodologias Cientificas
          </span>
          <Badge variant="success" className="ml-auto">
            Score: 93.3%
          </Badge>
        </div>
        <h2 className="max-w-4xl font-sans text-4xl font-bold tracking-tight md:text-6xl">
          Guia de <span className="text-primary">Copywriting</span>.
        </h2>
        <p className="max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground">
          Estruturas validadas baseadas em Hopkins, Reeves, Schwartz, Hormozi, Georgi e Dunford.
          Copie, cole e preencha para alta conversao.
        </p>

        <div className="flex flex-wrap gap-2 pt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <span>Mestres:</span>
          {HEADER_MASTERS.map((master, index) => (
            <React.Fragment key={master}>
              <span className="text-foreground">{master}</span>
              {index < HEADER_MASTERS.length - 1 && ' •'}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-primary via-background to-primary/20"></div>
    </div>
  );
};

export default TemplatesHeader;
