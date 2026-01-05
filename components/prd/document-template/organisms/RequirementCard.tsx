// Requirement Card Component
// Displays a single requirement with approve/reject actions

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Requirement, CATEGORY_CONFIG } from '../types';

interface RequirementCardProps {
  requirement: Requirement;
  onApprove: () => void;
  onReject: () => void;
  onUndo: () => void;
}

export const RequirementCard: React.FC<RequirementCardProps> = ({
  requirement: req,
  onApprove,
  onReject,
  onUndo,
}) => {
  const cat = CATEGORY_CONFIG[req.category];

  return (
    <Card
      className={cn(
        'border-l-4 transition-all duration-300',
        req.status === 'pending'
          ? 'border-l-blue-500 shadow-sm'
          : req.status === 'approved'
            ? 'border-l-green-500 bg-muted/20 opacity-60'
            : 'border-l-red-500 bg-muted/20 opacity-40'
      )}
    >
      <CardContent className="flex items-start gap-4 p-4">
        <div className="flex-1 space-y-1">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="secondary" className={cn('h-5 text-[10px]', cat.color)}>
              {cat.label}
            </Badge>
            {req.status === 'approved' && (
              <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                <Icon name="check" size="size-3" /> Aprovado
              </span>
            )}
            {req.status === 'rejected' && (
              <span className="flex items-center gap-1 text-xs font-bold text-red-600">
                <Icon name="xmark" size="size-3" /> Rejeitado
              </span>
            )}
          </div>
          <p
            className={cn(
              'text-sm font-medium leading-snug',
              req.status === 'rejected' && 'line-through'
            )}
          >
            {req.text}
          </p>
        </div>

        {req.status === 'pending' ? (
          <div className="flex shrink-0 gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="size-8 text-green-600 hover:bg-green-100 hover:text-green-700"
              onClick={onApprove}
              title="Aprovar"
            >
              <Icon name="check" size="size-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="size-8 text-muted-foreground hover:text-foreground"
              title="Editar"
            >
              <Icon name="edit" size="size-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="size-8 text-red-600 hover:bg-red-100 hover:text-red-700"
              onClick={onReject}
              title="Rejeitar"
            >
              <Icon name="xmark" size="size-4" />
            </Button>
          </div>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            className="size-8 text-muted-foreground"
            onClick={onUndo}
          >
            <Icon name="undo" size="size-3" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
