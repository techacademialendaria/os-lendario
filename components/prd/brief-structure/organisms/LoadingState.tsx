// LoadingState - Loading indicator while generating brief
// Shows spinner and progress bar

import React from 'react';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

interface LoadingStateProps {
  progress: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ progress }) => {
  return (
    <Card className="p-12 text-center">
      <Icon name="refresh" className="mx-auto mb-4 size-12 animate-spin text-studio-primary" />
      <h3 className="mb-2 text-lg font-bold">Gerando Brief...</h3>
      <p className="text-muted-foreground">Analisando contexto e estruturando o brief</p>
      {progress > 0 && (
        <div className="mx-auto mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-studio-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </Card>
  );
};

export default LoadingState;
