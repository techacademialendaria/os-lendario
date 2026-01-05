// ErrorState - Error display with retry option
// Shows when brief generation fails

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface ErrorStateProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <Card className="border-destructive/50 bg-destructive/5 p-6">
      <div className="flex items-center gap-3 text-destructive">
        <Icon name="exclamation" size="size-5" />
        <div>
          <p className="font-medium">Erro ao gerar brief</p>
          <p className="text-sm opacity-80">{error.message}</p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
        Tentar novamente
      </Button>
    </Card>
  );
};

export default ErrorState;
