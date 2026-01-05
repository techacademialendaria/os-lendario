import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '../../../studio-tokens';
import type { PainPointsListProps, EmptyStateProps } from '../types';
import { PainPointItem } from './PainPointItem';
import { AddPainPointForm } from './AddPainPointForm';
import type { PainPoint } from '../types';

const EmptyState: React.FC<EmptyStateProps> = ({ onAddFirst }) => (
  <Card className={cn(STUDIO_CARD_CLASSES, 'border-dashed')}>
    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted/30">
        <Icon name="exclamation" size="size-6" className="text-muted-foreground" />
      </div>
      <h4 className="mb-2 font-semibold text-foreground">Nenhuma dor cadastrada</h4>
      <p className="mb-4 max-w-sm text-sm text-muted-foreground">
        Adicione dores para entender melhor os problemas do seu cliente ideal.
      </p>
      <Button onClick={onAddFirst} className="gap-2 bg-studio-accent text-background">
        <Icon name="plus" size="size-4" />
        Adicionar Primeira Dor
      </Button>
    </CardContent>
  </Card>
);

interface PainPointsListInternalProps extends PainPointsListProps {
  newPainPoint: Omit<PainPoint, 'id'>;
  onNewPainPointChange: React.Dispatch<React.SetStateAction<Omit<PainPoint, 'id'>>>;
  onAddPainPoint: () => void;
}

export const PainPointsList: React.FC<PainPointsListInternalProps> = ({
  painPoints,
  editingId,
  isAdding,
  onSetEditingId,
  onUpdatePainPoint,
  onDeletePainPoint,
  onSetIsAdding,
  newPainPoint,
  onNewPainPointChange,
  onAddPainPoint,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Dores Identificadas ({painPoints.length})
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSetIsAdding(true)}
          className="gap-2"
          disabled={isAdding}
        >
          <Icon name="plus" size="size-4" />
          Adicionar Dor
        </Button>
      </div>

      {/* Empty State */}
      {painPoints.length === 0 && !isAdding && (
        <EmptyState onAddFirst={() => onSetIsAdding(true)} />
      )}

      {/* Pain Points */}
      {painPoints.map((painPoint, index) => (
        <PainPointItem
          key={painPoint.id}
          painPoint={painPoint}
          index={index + 1}
          isEditing={editingId === painPoint.id}
          onEdit={() => onSetEditingId(editingId === painPoint.id ? null : painPoint.id)}
          onUpdate={(updates) => onUpdatePainPoint(painPoint.id, updates)}
          onDelete={() => onDeletePainPoint(painPoint.id)}
        />
      ))}

      {/* Add New Form */}
      {isAdding && (
        <AddPainPointForm
          newPainPoint={newPainPoint}
          onNewPainPointChange={onNewPainPointChange}
          onAdd={onAddPainPoint}
          onCancel={() => onSetIsAdding(false)}
        />
      )}
    </div>
  );
};
