import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import { CircularProgressScore } from '@/components/shared';
import { LegendItem } from '../molecules';

export const ConsciousnessCard: React.FC = () => (
  <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col')}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div>
        <CardTitle className="text-base font-bold">Níveis de Consciência</CardTitle>
        <p className="text-sm text-muted-foreground">Distribuição das personas por funil</p>
      </div>
    </CardHeader>
    <CardContent className="flex flex-1 items-center justify-center gap-8 pt-4">
      <CircularProgressScore score={100} size="lg" />
      <div className="flex flex-col justify-center gap-4">
        <LegendItem color="bg-studio-accent" label="Consciente da Solução" value="40%" />
        <LegendItem color="bg-white/40" label="Consciente do Problema" value="35%" />
        <LegendItem color="bg-white/20" label="Inconsciente" value="25%" />
      </div>
    </CardContent>
  </Card>
);
