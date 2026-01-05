import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { PeriodFilter } from '../types';

interface ObjectionsHeaderProps {
  period: PeriodFilter;
  onPeriodChange: (p: PeriodFilter) => void;
}

export const ObjectionsHeader: React.FC<ObjectionsHeaderProps> = ({
  period,
  onPeriodChange,
}) => {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Analise de Objecoes
        </h2>
        <div className="hidden h-6 w-px bg-border md:block"></div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-1">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
          <span className="font-mono text-xs font-bold">842 Ocorrencias</span>
        </div>
      </div>

      <Tabs value={period} onValueChange={(v) => onPeriodChange(v as PeriodFilter)} className="w-auto">
        <TabsList className="grid h-9 w-full grid-cols-4">
          <TabsTrigger value="7d" className="text-xs">7d</TabsTrigger>
          <TabsTrigger value="30d" className="text-xs">30d</TabsTrigger>
          <TabsTrigger value="90d" className="text-xs">90d</TabsTrigger>
          <TabsTrigger value="custom" className="text-xs">Custom</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
