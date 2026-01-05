import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import type { EmptyStateProps } from '../types';

/**
 * EmptyState - Shown when no books match current filters
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onCreate }) => (
  <Card className="border-dashed">
    <CardContent className="p-12 text-center">
      <Icon
        name="book"
        size="size-12"
        className="mx-auto mb-4 text-muted-foreground/50"
      />
      <h3 className="mb-2 text-lg font-bold">Nenhum livro encontrado</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        {hasFilters
          ? 'Tente ajustar os filtros de busca.'
          : 'Comece adicionando seu primeiro livro ao acervo.'}
      </p>
      <Button onClick={onCreate}>
        <Icon name="plus" size="size-3" /> Adicionar Livro
      </Button>
    </CardContent>
  </Card>
);
