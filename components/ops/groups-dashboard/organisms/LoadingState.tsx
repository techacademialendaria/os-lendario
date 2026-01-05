import React from 'react';
import { Card } from '../../../ui/card';
import { Icon } from '../../../ui/icon';

interface LoadingStateProps {
  groupName: string;
  onBack: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ groupName, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans animate-fade-in p-4 md:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="arrow-left" className="size-4" />
          Voltar
        </button>
        <h1 className="text-2xl font-bold">{groupName}</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-48 rounded-3xl animate-pulse bg-muted/50" />
        ))}
      </div>
    </div>
  );
};
