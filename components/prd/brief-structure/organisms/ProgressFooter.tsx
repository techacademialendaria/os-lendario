// ProgressFooter - Footer with completion status and next action
// Shows progress indicator and navigation button

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

interface ProgressFooterProps {
  isComplete: boolean;
  onNext: () => void;
}

export const ProgressFooter: React.FC<ProgressFooterProps> = ({ isComplete, onNext }) => {
  return (
    <div className="flex items-center justify-between border-t pt-4">
      <div className="text-sm text-muted-foreground">
        {isComplete ? (
          <span className="font-medium text-emerald-500">Brief completo</span>
        ) : (
          <span className="text-amber-500">Preencha todas as secoes obrigatorias</span>
        )}
      </div>
      <Button
        onClick={onNext}
        disabled={!isComplete}
        className={isComplete ? 'bg-studio-primary hover:bg-studio-primary/90' : ''}
      >
        Gerar PRD Completo
        <Icon name="arrow-right" className="ml-2 size-4" />
      </Button>
    </div>
  );
};

export default ProgressFooter;
