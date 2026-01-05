/**
 * ObjectivesListView
 * Displays all objectives in organized sections
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { ObjectiveItemCard } from './ObjectiveItemCard';
import type { ObjectivesContent, ApprovalStatus } from '../types';

interface ObjectivesListViewProps {
  objectives: ObjectivesContent;
  mainStatus: ApprovalStatus;
  secondaryStatuses: Record<string, ApprovalStatus>;
  nonStatuses: Record<string, ApprovalStatus>;
  onMainUpdate: (text: string) => void;
  onMainStatusChange: (status: ApprovalStatus) => void;
  onSecondaryUpdate: (index: number, text: string) => void;
  onSecondaryStatusChange: (index: number, status: ApprovalStatus) => void;
  onSecondaryDelete: (index: number) => void;
  onSecondaryAdd: () => void;
  onNonUpdate: (index: number, text: string) => void;
  onNonStatusChange: (index: number, status: ApprovalStatus) => void;
  onNonDelete: (index: number) => void;
  onNonAdd: () => void;
  onNotesUpdate: (notes: string) => void;
}

export const ObjectivesListView: React.FC<ObjectivesListViewProps> = ({
  objectives,
  mainStatus,
  secondaryStatuses,
  nonStatuses,
  onMainUpdate,
  onMainStatusChange,
  onSecondaryUpdate,
  onSecondaryStatusChange,
  onSecondaryDelete,
  onSecondaryAdd,
  onNonUpdate,
  onNonStatusChange,
  onNonDelete,
  onNonAdd,
  onNotesUpdate,
}) => {
  return (
    <div className="space-y-6">
      {/* Main Objective */}
      <div>
        <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Objetivo Principal
        </h4>
        <ObjectiveItemCard
          item={{ id: 'main', text: objectives.mainObjective, status: mainStatus }}
          type="main"
          onUpdate={onMainUpdate}
          onStatusChange={onMainStatusChange}
        />
      </div>

      {/* Secondary Objectives */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Objetivos Secundarios
          </h4>
          <Button variant="ghost" size="sm" onClick={onSecondaryAdd}>
            <Icon name="plus" className="mr-1 size-3" />
            Adicionar
          </Button>
        </div>
        <div className="space-y-3">
          {objectives.secondaryObjectives.map((obj, index) => (
            <ObjectiveItemCard
              key={index}
              item={{
                id: `secondary-${index}`,
                text: obj,
                status: secondaryStatuses[index] || 'pending',
              }}
              type="secondary"
              onUpdate={(text) => onSecondaryUpdate(index, text)}
              onStatusChange={(status) => onSecondaryStatusChange(index, status)}
              onDelete={() => onSecondaryDelete(index)}
            />
          ))}
        </div>
      </div>

      {/* Non-Objectives */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Nao-Objetivos (Fora do Escopo)
          </h4>
          <Button variant="ghost" size="sm" onClick={onNonAdd}>
            <Icon name="plus" className="mr-1 size-3" />
            Adicionar
          </Button>
        </div>
        <div className="space-y-3">
          {objectives.nonObjectives.map((obj, index) => (
            <ObjectiveItemCard
              key={index}
              item={{
                id: `non-${index}`,
                text: obj,
                status: nonStatuses[index] || 'pending',
              }}
              type="non"
              onUpdate={(text) => onNonUpdate(index, text)}
              onStatusChange={(status) => onNonStatusChange(index, status)}
              onDelete={() => onNonDelete(index)}
            />
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Notas e Feedback
        </h4>
        <Textarea
          value={objectives.notes || ''}
          onChange={(e) => onNotesUpdate(e.target.value)}
          placeholder="Adicione notas ou feedback sobre os objetivos..."
          className="min-h-[80px] resize-none"
        />
      </div>
    </div>
  );
};
