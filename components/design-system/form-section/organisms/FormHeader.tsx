/**
 * FormHeader - Section title and description
 */

import React from 'react';

export const FormHeader: React.FC = () => {
  return (
    <div>
      <h2 className="mb-4 font-serif text-4xl font-light">Formularios Avancados</h2>
      <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
        De inputs nativos a componentes complexos de upload e verificacao.
      </p>
    </div>
  );
};
