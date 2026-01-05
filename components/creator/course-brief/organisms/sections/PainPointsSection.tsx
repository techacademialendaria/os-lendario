import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { INPUT_CLASSES } from '../../../studio-tokens';
import type { PainPoint } from '../../types';

interface PainPointsSectionProps {
  painPoints: PainPoint[];
  onAdd: () => void;
  onRemove: (id: number) => void;
  onChange: (painPoints: PainPoint[]) => void;
}

export const PainPointsSection: React.FC<PainPointsSectionProps> = ({
  painPoints,
  onAdd,
  onRemove,
  onChange,
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <Label>Principais dores do público</Label>
      <Button variant="outline" size="sm" onClick={onAdd}>
        <Icon name="plus" className="mr-2 size-3" /> Adicionar
      </Button>
    </div>
    <div className="space-y-3">
      {painPoints.map((point, index) => (
        <div
          key={point.id}
          className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 p-4"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-studio-primary/10 text-xs font-bold text-studio-primary">
            {index + 1}
          </span>
          <div className="flex-1 space-y-3">
            <Input
              placeholder="Descreva a dor..."
              className={INPUT_CLASSES}
              value={point.text}
              onChange={(e) => {
                const newPoints = [...painPoints];
                newPoints[index].text = e.target.value;
                onChange(newPoints);
              }}
            />
            <div className="flex items-center gap-4">
              <Label className="text-xs text-muted-foreground">Intensidade:</Label>
              <input
                type="range"
                min="1"
                max="10"
                value={point.intensity}
                className="flex-1 accent-studio-primary"
                onChange={(e) => {
                  const newPoints = [...painPoints];
                  newPoints[index].intensity = Number(e.target.value);
                  onChange(newPoints);
                }}
              />
              <Badge variant="outline" className="font-mono">
                {point.intensity}/10
              </Badge>
            </div>
          </div>
          {painPoints.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(point.id)}
            >
              <Icon name="trash" size="size-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  </div>
);
