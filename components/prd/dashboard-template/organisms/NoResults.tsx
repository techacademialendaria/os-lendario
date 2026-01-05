import React from 'react';
import { Icon } from '@/components/ui/icon';
import type { NoResultsProps } from '../types';

export const NoResults: React.FC<NoResultsProps> = ({ hasProjects }) => {
  if (!hasProjects) return null;

  return (
    <div className="py-12 text-center text-muted-foreground">
      <Icon name="search" size="size-8" className="mx-auto mb-4 opacity-50" />
      <p>Nenhum projeto encontrado com os filtros atuais</p>
    </div>
  );
};
