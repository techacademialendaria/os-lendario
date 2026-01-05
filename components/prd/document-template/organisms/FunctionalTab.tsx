// Functional Tab Component
// Tab content for requirements validation

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Requirement } from '../types';
import { RequirementCard } from './RequirementCard';

interface FunctionalTabProps {
  requirements: Requirement[];
  pendingCount: number;
  allCriticalReviewed: boolean;
  onRequirementAction: (id: string, action: 'approve' | 'reject' | 'undo') => void;
  onBack: () => void;
  onNext: () => void;
}

export const FunctionalTab: React.FC<FunctionalTabProps> = ({
  requirements,
  pendingCount,
  allCriticalReviewed,
  onRequirementAction,
  onBack,
  onNext,
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold">Validacao de Requisitos</h3>
        <p className="font-serif text-sm text-muted-foreground">
          O sistema "1-2-3": Aprove, Edite ou Rejeite cada sugestao da IA.
        </p>
      </div>
      <Badge variant="outline" className="h-fit">
        {pendingCount} pendentes
      </Badge>
    </div>

    <div className="space-y-3">
      {requirements.map((req) => (
        <RequirementCard
          key={req.id}
          requirement={req}
          onApprove={() => onRequirementAction(req.id, 'approve')}
          onReject={() => onRequirementAction(req.id, 'reject')}
          onUndo={() => onRequirementAction(req.id, 'undo')}
        />
      ))}
    </div>

    <div className="flex justify-end gap-3 pt-4">
      <Button variant="ghost" onClick={onBack}>
        Voltar
      </Button>
      <Button onClick={onNext} disabled={!allCriticalReviewed}>
        Proximo: Tecnologia <Icon name="arrow-right" className="ml-2" />
      </Button>
    </div>
  </div>
);
