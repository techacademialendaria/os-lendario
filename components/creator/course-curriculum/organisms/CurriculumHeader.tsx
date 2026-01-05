import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import type { CurriculumHeaderProps } from '../types';

export const CurriculumHeader: React.FC<CurriculumHeaderProps> = ({
  modulesCount,
  totalLessons,
  totalDuration,
  onAddModule,
  onNavigate,
}) => {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div>
        <h1 className="text-lg font-bold">Estrutura do Curriculo</h1>
        <p className="text-xs text-muted-foreground">
          Organize modulos e licoes (arraste para reordenar)
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="mr-4 flex items-center gap-4 text-sm">
          <div className="text-center">
            <p className="font-mono font-bold">{modulesCount}</p>
            <p className="text-[10px] text-muted-foreground">Modulos</p>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="text-center">
            <p className="font-mono font-bold">{totalLessons}</p>
            <p className="text-[10px] text-muted-foreground">Licoes</p>
          </div>
          <Separator orientation="vertical" className="h-8" />
          <div className="text-center">
            <p className="font-mono font-bold">
              {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
            </p>
            <p className="text-[10px] text-muted-foreground">Duracao</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onAddModule}>
          <Icon name="plus" className="mr-2 size-4" /> Modulo
        </Button>
        <Button
          onClick={() => onNavigate('lessons')}
          className="bg-studio-primary text-white hover:bg-studio-primary/90"
        >
          Gerar Licoes
          <Icon name="arrow-right" className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
};
