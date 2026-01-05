// EpicsFooter Organism
// Footer with actions for PRD Epics

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { STUDIO_TEAL } from '../types';

interface EpicsFooterProps {
  epicsCount: number;
  isAdvancing: boolean;
  onRefine: () => void;
  onValidate: () => void;
}

export const EpicsFooter: React.FC<EpicsFooterProps> = ({
  epicsCount,
  isAdvancing,
  onRefine,
  onValidate,
}) => (
  <div className="sticky bottom-0 z-10 flex items-center justify-between border-t border-border bg-background/95 py-4 backdrop-blur">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon name="check-circle" className="text-green-500" size="size-4" />
      <span>QA Automatico: Verbos de acao validados.</span>
    </div>
    <div className="flex gap-4">
      <Button variant="outline" onClick={onRefine}>
        Refinar com IA
      </Button>
      <Button
        size="lg"
        onClick={onValidate}
        disabled={epicsCount === 0 || isAdvancing}
        className="px-8 font-bold text-white shadow-lg"
        style={{ backgroundColor: STUDIO_TEAL }}
      >
        {isAdvancing ? (
          <>
            <Icon name="refresh" className="mr-2 size-4 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            Aprovar e Exportar <Icon name="arrow-right" className="ml-2 size-4" />
          </>
        )}
      </Button>
    </div>
  </div>
);
