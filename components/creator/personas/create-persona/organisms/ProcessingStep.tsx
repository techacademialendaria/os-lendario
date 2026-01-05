import React from 'react';
import { Icon } from '@/components/ui/icon';

/**
 * Processing step shown while AI generates the persona
 */
export const ProcessingStep: React.FC = () => {
  return (
    <div className="flex flex-1 animate-fade-in flex-col items-center justify-center py-20">
      <div className="relative mb-8 h-24 w-24">
        <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-studio-primary border-t-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="brain" size="size-8" className="animate-pulse text-studio-primary" />
        </div>
      </div>
      <h3 className="mb-2 font-sans text-xl font-bold">Criando Perfil Psicologico...</h3>
      <p className="text-muted-foreground">A IA esta analisando padroes comportamentais.</p>
    </div>
  );
};
