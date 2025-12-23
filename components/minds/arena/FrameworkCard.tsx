import React from 'react';
import { DebateFramework, frameworkService } from '../../../services/frameworkService';
import { Users, Clock, Target, Info } from 'lucide-react';

interface FrameworkCardProps {
  framework: DebateFramework;
  onSelect?: (framework: DebateFramework) => void;
  onViewDetails?: (framework: DebateFramework) => void;
}

const FrameworkCardComponent: React.FC<FrameworkCardProps> = ({
  framework,
  onSelect,
  onViewDetails,
}) => {
  const participantsRange = frameworkService.getParticipantsRange(framework);
  const complexity = framework.framework_schema.complexity || 'Média';
  const complexityColor = frameworkService.getComplexityColor(complexity);
  const rounds = framework.framework_schema.rounds || 0;
  const bestFor = framework.framework_schema.best_for || framework.description;

  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {framework.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{framework.description}</p>
        </div>

        {/* Complexity Badge */}
        <span
          className={`ml-4 rounded-full border px-3 py-1 text-xs font-medium ${complexityColor} whitespace-nowrap`}
        >
          {complexity}
        </span>
      </div>

      {/* Metadata Row */}
      <div className="mb-4 grid grid-cols-3 gap-4">
        {/* Participants */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 text-primary" />
          <span>{participantsRange}</span>
        </div>

        {/* Rounds */}
        {rounds > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{rounds} rounds</span>
          </div>
        )}

        {/* Best For Icon */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Target className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Best For */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Melhor para:</span> {bestFor}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {onSelect && (
          <button
            onClick={() => onSelect(framework)}
            className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Usar Framework
          </button>
        )}

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(framework)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-accent"
          >
            <Info className="h-4 w-4" />
            Detalhes
          </button>
        )}
      </div>

      {/* Hover Indicator */}
      <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-primary opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};

/**
 * FrameworkCard with memoization to prevent unnecessary re-renders in lists
 * Memoized to prevent re-render when parent list updates other items
 */
export const FrameworkCard = React.memo(FrameworkCardComponent);
