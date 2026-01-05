import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import type { BriefHeaderProps } from '../types';

export const BriefHeader: React.FC<BriefHeaderProps> = ({
  progressPercent,
  isSaving,
  onSave,
}) => {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div>
        <h1 className="text-lg font-bold">Briefing Estratégico</h1>
        <p className="text-xs text-muted-foreground">Defina a base do seu curso</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Progresso:</span>
          <Progress value={progressPercent} className="h-2 w-24" />
          <span className="font-mono text-xs">{progressPercent}%</span>
        </div>
        <Button variant="outline" size="sm" onClick={onSave} disabled={isSaving}>
          {isSaving ? (
            <Icon name="refresh" className="mr-2 size-4 animate-spin" />
          ) : (
            <Icon name="disk" className="mr-2 size-4" />
          )}
          Salvar
        </Button>
      </div>
    </div>
  );
};
