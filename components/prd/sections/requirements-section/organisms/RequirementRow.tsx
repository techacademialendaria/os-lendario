import React, { useState } from 'react';
import { Button } from '../../../../ui/button';
import { Icon } from '../../../../ui/icon';
import { Input } from '../../../../ui/input';
import { Badge } from '../../../../ui/badge';
import { cn } from '../../../../../lib/utils';
import { RequirementRowProps, TYPE_CONFIG, PRIORITY_CONFIG } from '../types';

export const RequirementRow: React.FC<RequirementRowProps> = ({
  requirement,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDesc, setEditDesc] = useState(requirement.description);

  const typeConfig = TYPE_CONFIG[requirement.type];
  const priorityConfig = PRIORITY_CONFIG[requirement.priority];

  const handleSave = () => {
    onUpdate({ ...requirement, description: editDesc });
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border p-3 transition-all',
        requirement.status === 'approved' && 'border-emerald-500/30 bg-emerald-500/5',
        requirement.status === 'rejected' && 'border-red-500/30 bg-red-500/5'
      )}
    >
      {/* Code */}
      <Badge
        variant="outline"
        className="shrink-0 font-mono text-xs"
        style={{ borderColor: typeConfig.color, color: typeConfig.color }}
      >
        {requirement.code}
      </Badge>

      {/* Description */}
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <div className="flex gap-2">
            <Input
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button size="sm" onClick={handleSave}>
              Salvar
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
          </div>
        ) : (
          <p
            className="cursor-pointer text-sm hover:text-primary"
            onClick={() => setIsEditing(true)}
          >
            {requirement.description}
          </p>
        )}
      </div>

      {/* Priority */}
      <Badge className={cn('shrink-0 text-xs', priorityConfig.bgColor, priorityConfig.color)}>
        {priorityConfig.label}
      </Badge>

      {/* Actions */}
      {!isEditing && (
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant={requirement.status === 'approved' ? 'default' : 'ghost'}
            size="icon"
            className={cn('h-7 w-7', requirement.status === 'approved' && 'bg-emerald-600')}
            onClick={() =>
              onUpdate({
                ...requirement,
                status: requirement.status === 'approved' ? 'pending' : 'approved',
              })
            }
          >
            <Icon name="check" size="size-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={onDelete}
          >
            <Icon name="trash" size="size-3" />
          </Button>
        </div>
      )}
    </div>
  );
};
