import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface BatchEmptyStateProps {
  className?: string;
  onAddBook: () => void;
}

export const BatchEmptyState: React.FC<BatchEmptyStateProps> = ({ className, onAddBook }) => (
  <Card className={cn('border-dashed', className)}>
    <CardContent className="py-12 text-center">
      <Icon name="inbox" size="size-12" className="mx-auto mb-4 text-muted-foreground/50" />
      <h3 className="text-lg font-bold mb-2">Nenhum livro no pipeline</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Adicione livros para iniciar o processamento em lote.
      </p>
      <Button onClick={onAddBook}>
        <Icon name="plus" size="size-4" className="mr-2" />
        Adicionar Livro
      </Button>
    </CardContent>
  </Card>
);
