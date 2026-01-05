import React from 'react';

/**
 * Header for the Icon Section page
 * Displays title and description
 */
export const IconSectionHeader: React.FC = () => {
  return (
    <div>
      <h2 className="mb-4 font-serif text-4xl font-light">Icones & Simbolos</h2>
      <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
        A linguagem visual da Academia Lendaria e composta por tres camadas de iconografia. Cada
        uma tem um proposito semantico especifico para manter a consistencia e a performance.
      </p>
    </div>
  );
};
