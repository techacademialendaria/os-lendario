import React from 'react';
import { cn } from '../../../lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';

// Phase names for the book summary pipeline
const PHASE_NAMES = [
  'Research',
  'Enrichment',
  'Extraction',
  'Gap Analysis',
  'Curation',
  'Architecture',
  'Commentary',
  'Action Design',
  'Final Writer',
  'Quality Gate',
  'Premium Output',
];

interface PhaseTimelineProps {
  currentPhase: number;
  totalPhases?: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  phasesCompleted?: string;
  className?: string;
  showLabels?: boolean;
}

export const PhaseTimeline: React.FC<PhaseTimelineProps> = ({
  currentPhase,
  totalPhases = 11,
  status,
  phasesCompleted,
  className,
  showLabels = false,
}) => {
  const phases = Array.from({ length: totalPhases }, (_, i) => i + 1);

  // Parse phases_completed string like "1-8" to get completed phases
  const getCompletedPhases = (): number[] => {
    if (status === 'completed') return phases;
    if (!phasesCompleted) return [];

    const completed: number[] = [];
    const parts = phasesCompleted.split(',');

    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        for (let i = start; i <= end; i++) {
          completed.push(i);
        }
      } else {
        completed.push(Number(part));
      }
    }

    return completed;
  };

  const completedPhases = getCompletedPhases();

  const getPhaseStatus = (phase: number): 'completed' | 'current' | 'failed' | 'pending' => {
    if (status === 'completed') return 'completed';
    if (completedPhases.includes(phase)) return 'completed';
    if (phase === currentPhase) {
      return status === 'failed' ? 'failed' : 'current';
    }
    return 'pending';
  };

  const getPhaseColor = (phaseStatus: string) => {
    switch (phaseStatus) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-amber-500 animate-pulse';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-muted-foreground/30';
    }
  };

  return (
    <TooltipProvider>
      <div className={cn('flex flex-col gap-1', className)}>
        <div className="flex gap-0.5">
          {phases.map((phase) => {
            const phaseStatus = getPhaseStatus(phase);
            const phaseName = PHASE_NAMES[phase - 1] || `Fase ${phase}`;

            return (
              <Tooltip key={phase}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full transition-all cursor-help',
                      getPhaseColor(phaseStatus)
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  <div className="font-medium">Fase {phase}: {phaseName}</div>
                  <div className="text-muted-foreground capitalize">{phaseStatus}</div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        {showLabels && currentPhase > 0 && (
          <span className="text-[10px] text-muted-foreground">
            {PHASE_NAMES[currentPhase - 1] || `Fase ${currentPhase}`}
          </span>
        )}
      </div>
    </TooltipProvider>
  );
};

// Compact inline version for table cells
export const PhaseTimelineInline: React.FC<PhaseTimelineProps> = (props) => {
  return <PhaseTimeline {...props} className={cn('inline-flex', props.className)} />;
};

export default PhaseTimeline;
