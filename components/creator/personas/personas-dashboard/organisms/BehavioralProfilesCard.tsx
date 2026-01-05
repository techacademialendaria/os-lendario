import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import type { PersonasStats } from '../types';

interface BehavioralProfilesCardProps {
  stats: PersonasStats;
}

export const BehavioralProfilesCard: React.FC<BehavioralProfilesCardProps> = ({ stats }) => (
  <Card className={cn(STUDIO_CARD_CLASSES, 'relative overflow-hidden')}>
    <div className="pointer-events-none absolute right-0 top-0 p-6 opacity-5">
      <Icon name="brain" size="size-20" />
    </div>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div>
        <CardTitle className="text-base font-bold">Perfis Comportamentais</CardTitle>
        <p className="text-sm text-muted-foreground">Distribuição DISC e Eneagrama</p>
      </div>
      <Badge className="border-studio-accent/20 bg-studio-accent/10 text-studio-accent">
        <Icon name="magic-wand" size="size-3" className="mr-1" />
        Psicografia
      </Badge>
    </CardHeader>
    <CardContent className="space-y-6 pt-4">
      <div className="flex items-end gap-3">
        <span className="text-5xl font-bold tracking-tight">{stats.withDisc}</span>
        <span className="mb-1 text-xs text-muted-foreground">
          Personas com perfil completo
        </span>
      </div>

      <div className="space-y-5">
        <div>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="font-medium text-foreground">Perfil DISC Definido</span>
            <span className="text-muted-foreground">
              {stats.withDisc}/{stats.total} Personas
            </span>
          </div>
          <Progress value={(stats.withDisc / stats.total) * 100} className="h-2" />
        </div>
        <div>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="font-medium text-foreground">Eneagrama Identificado</span>
            <span className="text-muted-foreground">
              {stats.withEnneagram}/{stats.total} Personas
            </span>
          </div>
          <Progress value={(stats.withEnneagram / stats.total) * 100} className="h-2" />
        </div>
      </div>

      <div className="flex gap-2 border-t border-border/50 pt-4">
        <Badge variant="secondary" className="text-xs">
          Dominante: <span className="font-semibold text-foreground">DISC D</span>
        </Badge>
        <Badge variant="secondary" className="text-xs">
          Recorrente:{' '}
          <span className="font-semibold text-foreground">Tipo 3 (Realizador)</span>
        </Badge>
      </div>
    </CardContent>
  </Card>
);
