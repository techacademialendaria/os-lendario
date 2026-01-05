import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { PhaseTimeline } from '../ui/PhaseTimeline';
import type { BatchBook } from '../../../hooks/useBatchProgress';

interface BatchActiveIndicatorProps {
  activeBook: BatchBook | null | undefined;
}

export const BatchActiveIndicator: React.FC<BatchActiveIndicatorProps> = ({ activeBook }) => {
  if (!activeBook) return null;

  return (
    <Card className="border-warning/50 bg-warning/5">
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-warning opacity-75 animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-warning" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Processando:</span>
              <span className="text-warning font-semibold">{activeBook.title}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Fase {activeBook.current_phase}/11{' '}
              {activeBook.next_action
                ? `— ${activeBook.next_action.replace(/\s*\(fase\s*\d+\)/gi, '')}`
                : ''}
            </div>
          </div>
          <PhaseTimeline
            currentPhase={activeBook.current_phase || 0}
            status={activeBook.status}
            phasesCompleted={activeBook.phases_completed}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchActiveIndicator;
