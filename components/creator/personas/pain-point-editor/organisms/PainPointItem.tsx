import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES, INPUT_CLASSES, TEXTAREA_CLASSES } from '../../../studio-tokens';
import type { PainPointItemProps } from '../types';
import { getRelevanceColor, getRelevanceLabel } from '../types';

export const PainPointItem: React.FC<PainPointItemProps> = ({
  painPoint,
  index,
  isEditing,
  onEdit,
  onUpdate,
  onDelete,
}) => {
  return (
    <Card
      className={cn(
        STUDIO_CARD_CLASSES,
        'group transition-all duration-200',
        isEditing && 'border-studio-accent/30 ring-1 ring-studio-accent/20'
      )}
    >
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted/30 text-sm font-bold text-muted-foreground">
                {index}
              </div>
              <div className="flex flex-col">
                <Badge
                  variant="outline"
                  className={cn('w-fit text-xs', getRelevanceColor(painPoint.relevance))}
                >
                  {painPoint.relevance}% - {getRelevanceLabel(painPoint.relevance)}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="ghost" size="icon" className="size-8" onClick={onEdit}>
                <Icon
                  name={isEditing ? 'check' : 'edit'}
                  size="size-4"
                  className={isEditing ? 'text-studio-accent' : ''}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-red-400 hover:text-red-500"
                onClick={onDelete}
              >
                <Icon name="trash" size="size-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">Dor Superficial</Label>
                <Input
                  className={INPUT_CLASSES}
                  value={painPoint.superficial}
                  onChange={(e) => onUpdate({ superficial: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-xs font-medium text-muted-foreground">Dor Profunda</Label>
                <Textarea
                  className={TEXTAREA_CLASSES}
                  value={painPoint.deep}
                  onChange={(e) => onUpdate({ deep: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-muted-foreground">Relevancia</Label>
                  <span
                    className={cn('text-xs font-medium', getRelevanceColor(painPoint.relevance))}
                  >
                    {painPoint.relevance}%
                  </span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={painPoint.relevance}
                  onChange={(e) => onUpdate({ relevance: parseInt(e.target.value, 10) })}
                  className="accent-studio-accent"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pl-11">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  O que dizem
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  {painPoint.superficial || '-'}
                </p>
              </div>
              {painPoint.deep && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    O que sentem
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {painPoint.deep}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
