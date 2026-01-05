import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

interface BatchCompletionCardProps {
  total: number;
  onAddBook: () => void;
}

export const BatchCompletionCard: React.FC<BatchCompletionCardProps> = ({ total, onAddBook }) => (
  <Card className="border-success/50 bg-success/10">
    <CardContent className="pt-6 pb-6 text-center">
      <div className="text-4xl mb-2">
        <span role="img" aria-label="celebration">&#127881;</span>
      </div>
      <h3 className="text-xl font-bold text-success">
        Todos os {total} livros foram processados!
      </h3>
      <p className="text-muted-foreground mt-1">Pipeline concluido com sucesso</p>
      <Button variant="outline" size="sm" onClick={onAddBook} className="mt-4">
        <Icon name="plus" size="size-4" className="mr-2" />
        Adicionar mais livros
      </Button>
    </CardContent>
  </Card>
);
