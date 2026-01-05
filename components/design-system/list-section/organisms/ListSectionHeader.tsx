import React from 'react';
import { Badge } from '@/components/ui/badge';

export const ListSectionHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 border-b border-border pb-8 md:flex-row md:items-end">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Listas & Checklist</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Componentes essenciais para exibir recursos, passos, comparacoes e metadados. Projetados
          para legibilidade e escaneabilidade.
        </p>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline" className="h-8">
          v4.1 System
        </Badge>
      </div>
    </div>
  );
};
