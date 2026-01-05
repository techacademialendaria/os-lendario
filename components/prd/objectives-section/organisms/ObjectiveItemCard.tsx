/**
 * ObjectiveItemCard
 * Individual objective card with edit, status, and actions
 */

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PRD_PRIMARY, PRD_BLUE, PRD_GRAY } from '../../prd-tokens';
import type { ObjectiveItemCardProps, ApprovalStatus } from '../types';
import { APPROVAL_CONFIG } from '../types';

const TYPE_CONFIG = {
  main: { label: 'Principal', color: PRD_PRIMARY, icon: 'bullseye' },
  secondary: { label: 'Secundario', color: PRD_BLUE, icon: 'target' },
  non: { label: 'Nao-Objetivo', color: PRD_GRAY, icon: 'ban' },
} as const;

export const ObjectiveItemCard: React.FC<ObjectiveItemCardProps> = ({
  item,
  type,
  onUpdate,
  onStatusChange,
  onDelete,
  onRegenerate,
  isRegenerating,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const statusConfig = APPROVAL_CONFIG[item.status];
  const config = TYPE_CONFIG[type];

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(item.text);
    setIsEditing(false);
  };

  return (
    <Card
      className={cn('p-4 transition-all', statusConfig.bgColor, 'border-l-4')}
      style={{ borderLeftColor: config.color }}
    >
      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <Icon name={config.icon} size="size-4" style={{ color: config.color }} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {type === 'main' && (
            <Badge
              variant="outline"
              className="mb-2 text-[10px]"
              style={{ borderColor: config.color, color: config.color }}
            >
              {config.label}
            </Badge>
          )}

          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="min-h-[60px] resize-none"
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>
                  Salvar
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <p
              className="cursor-pointer text-sm transition-colors hover:text-primary"
              onClick={() => setIsEditing(true)}
            >
              {item.text || (
                <span className="italic text-muted-foreground">Clique para editar...</span>
              )}
            </p>
          )}

          {/* Status & Actions */}
          {!isEditing && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {/* Approval Buttons */}
              <div className="flex gap-1">
                {(['approved', 'adjust', 'rejected'] as ApprovalStatus[]).map((status) => {
                  const cfg = APPROVAL_CONFIG[status];
                  const isActive = item.status === status;
                  return (
                    <Button
                      key={status}
                      variant={isActive ? 'default' : 'ghost'}
                      size="sm"
                      className={cn('h-7 px-2', isActive && cfg.bgColor, isActive && cfg.color)}
                      onClick={() => onStatusChange(status)}
                    >
                      <Icon name={cfg.icon} size="size-3" className="mr-1" />
                      <span className="text-xs">{cfg.label}</span>
                    </Button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="ml-auto flex gap-1">
                {onRegenerate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-muted-foreground"
                    onClick={onRegenerate}
                    disabled={isRegenerating}
                  >
                    <Icon
                      name={isRegenerating ? 'spinner' : 'refresh'}
                      size="size-3"
                      className={cn(isRegenerating && 'animate-spin')}
                    />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-muted-foreground hover:text-destructive"
                    onClick={onDelete}
                  >
                    <Icon name="trash" size="size-3" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
