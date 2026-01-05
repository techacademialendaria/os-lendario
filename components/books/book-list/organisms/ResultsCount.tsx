import React from 'react';

interface ResultsCountProps {
  shown: number;
  total: number;
}

/**
 * ResultsCount - Shows pagination info below the list
 */
export const ResultsCount: React.FC<ResultsCountProps> = ({ shown, total }) => (
  <p className="text-center text-xs text-muted-foreground">
    Mostrando {shown} de {total} livros
  </p>
);
