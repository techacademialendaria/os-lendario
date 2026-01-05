// ClassificationCard - Shows project classification and complexity
// Displays task/project type and complexity level

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { BriefClassification, BriefComplexity } from '../types';
import { COMPLEXITY_LABELS } from '../types';

interface ClassificationCardProps {
  classification: BriefClassification;
  complexity: BriefComplexity;
}

export const ClassificationCard: React.FC<ClassificationCardProps> = ({
  classification,
  complexity,
}) => {
  return (
    <Card className="bg-muted/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-studio-primary/20">
            <Icon name="chart-pie" size="size-6" className="text-studio-primary" />
          </div>
          <div>
            <p className="font-bold text-foreground">
              {classification === 'task' ? 'Tarefa Simples' : 'Projeto Completo'}
            </p>
            <p className={cn('text-sm', COMPLEXITY_LABELS[complexity].color)}>
              Complexidade: {COMPLEXITY_LABELS[complexity].label}
            </p>
          </div>
        </div>
        <Badge
          variant={classification === 'task' ? 'secondary' : 'default'}
          className="text-sm"
        >
          {classification === 'task' ? 'Task' : 'Project'}
        </Badge>
      </div>
    </Card>
  );
};

export default ClassificationCard;
