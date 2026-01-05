import React, { useState } from 'react';
import { Card } from '../../../../ui/card';
import { Button } from '../../../../ui/button';
import { Icon } from '../../../../ui/icon';
import { Textarea } from '../../../../ui/textarea';
import { Badge } from '../../../../ui/badge';
import { cn } from '../../../../../lib/utils';
import { WOWCardProps, CATEGORY_CONFIG } from '../types';

const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'agora';
  if (diffMins < 60) return `ha ${diffMins} min`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `ha ${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  return `ha ${diffDays}d`;
};

export const WOWCard: React.FC<WOWCardProps> = ({ wow, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(wow.text);
  const config = CATEGORY_CONFIG[wow.category];

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(wow.text);
    setIsEditing(false);
  };

  return (
    <Card className={cn('animate-fade-in p-4 transition-all', config.bgColor, 'border-transparent')}>
      <div className="flex items-start gap-3">
        {/* Category Icon */}
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
            'bg-background/50'
          )}
        >
          <Icon name={config.icon} size="size-4" className={config.color} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="min-h-[60px] resize-none bg-background"
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} disabled={!editText.trim()}>
                  Salvar
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-foreground">{wow.text}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline" className={cn('text-[10px]', config.color)}>
                  {config.label}
                </Badge>
                <span className="text-xs text-muted-foreground">{timeAgo(wow.createdAt)}</span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setIsEditing(true)}
              title="Editar"
            >
              <Icon name="edit" size="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={onDelete}
              title="Remover"
            >
              <Icon name="trash" size="size-3" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
