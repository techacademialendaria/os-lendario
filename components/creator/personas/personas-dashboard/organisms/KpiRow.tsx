import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_KPI_CLASSES, STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import type { PersonasStats } from '../types';

interface KpiRowProps {
  stats: PersonasStats;
}

export const KpiRow: React.FC<KpiRowProps> = ({ stats }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    {/* KPI 1: Total Personas */}
    <Card
      className={cn(
        STUDIO_KPI_CLASSES,
        'group relative overflow-hidden transition-colors hover:border-studio-accent/30'
      )}
    >
      <div className="absolute right-0 top-0 p-6 opacity-5 transition-opacity group-hover:opacity-10">
        <Icon name="users-alt" size="size-16" />
      </div>
      <CardContent className="relative z-10 p-6">
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-studio-accent/50" />
            Total Personas
          </p>
          <p className="text-4xl font-bold tracking-tight">{stats.total}</p>
          <div className="mt-1 flex w-fit items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
            <Icon name="arrow-trend-up" size="size-3" />
            +2 este mês
          </div>
        </div>
      </CardContent>
    </Card>

    {/* KPI 2: Active */}
    <Card
      className={cn(
        STUDIO_CARD_CLASSES,
        'group relative overflow-hidden transition-colors hover:border-studio-accent/30'
      )}
    >
      <div className="absolute right-0 top-0 p-6 opacity-5 transition-opacity group-hover:opacity-10">
        <Icon name="check-circle" size="size-16" />
      </div>
      <CardContent className="relative z-10 p-6">
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-blue-500/50" />
            Personas Ativas
          </p>
          <p className="text-4xl font-bold tracking-tight">{stats.active}</p>
          <p className="mt-1 text-xs text-muted-foreground">Usadas em campanhas ativas</p>
        </div>
      </CardContent>
    </Card>

    {/* KPI 3: Drafts */}
    <Card
      className={cn(
        STUDIO_CARD_CLASSES,
        'group relative overflow-hidden transition-colors hover:border-studio-accent/30'
      )}
    >
      <div className="absolute right-0 top-0 p-6 opacity-5 transition-opacity group-hover:opacity-10">
        <Icon name="document" size="size-16" />
      </div>
      <CardContent className="relative z-10 p-6">
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="size-2 rounded-full bg-orange-500/50" />
            Em Rascunho
          </p>
          <p className="text-4xl font-bold tracking-tight">{stats.drafts}</p>
          <p className="mt-1 text-xs text-muted-foreground">Precisam de revisão</p>
        </div>
      </CardContent>
    </Card>
  </div>
);
