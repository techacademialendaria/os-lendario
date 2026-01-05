import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { BriefNavigationProps } from '../types';

export const BriefNavigation: React.FC<BriefNavigationProps> = ({
  activeSection,
  totalSections,
  onPrevious,
  onNext,
  onComplete,
}) => {
  return (
    <div className="flex justify-between border-t border-border pt-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={activeSection === 1}
      >
        <Icon name="arrow-left" className="mr-2 size-4" />
        Anterior
      </Button>

      {activeSection < totalSections ? (
        <Button onClick={onNext}>
          Próxima Seção
          <Icon name="arrow-right" className="ml-2 size-4" />
        </Button>
      ) : (
        <Button
          onClick={onComplete}
          className="shadow-lg shadow-studio-primary/20"
        >
          Concluir Brief e Iniciar Research
          <Icon name="search-alt" className="ml-2 size-4" />
        </Button>
      )}
    </div>
  );
};
