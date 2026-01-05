import React from 'react';
import { Icon } from '@/components/ui/icon';

interface MockDataIndicatorProps {
  isUsingMockData: boolean;
}

export const MockDataIndicator: React.FC<MockDataIndicatorProps> = ({ isUsingMockData }) => {
  if (!isUsingMockData) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-500">
      <Icon name="info" size="size-4" />
      <span>Usando dados de demonstracao (Supabase nao configurado)</span>
    </div>
  );
};
