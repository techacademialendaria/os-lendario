import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import { ValidationBar } from '../molecules';

export const ValidationStatusCard: React.FC = () => (
  <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col')}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div>
        <CardTitle className="text-base font-bold">Status de Validação</CardTitle>
        <p className="text-sm text-muted-foreground">Qualidade e fonte dos insights</p>
      </div>
      <Badge className="border-studio-accent/20 bg-studio-accent/10 text-studio-accent">
        Alta Confiabilidade
      </Badge>
    </CardHeader>
    <CardContent className="flex flex-1 flex-col justify-center gap-6 pt-4">
      <div>
        <p className="mb-1 text-5xl font-bold">85%</p>
        <p className="text-sm text-muted-foreground">
          Média de validação em todas as personas
        </p>
      </div>
      <div className="space-y-4">
        <ValidationBar
          icon="check-circle"
          iconColor="text-emerald-400"
          label="Dados Validados (Humano)"
          value={62}
          barColor="bg-emerald-400"
        />
        <ValidationBar
          icon="robot"
          iconColor="text-studio-accent"
          label="Gerados por IA"
          value={28}
          barColor="bg-studio-accent"
        />
        <ValidationBar
          icon="question"
          iconColor="text-muted-foreground"
          label="Não Testados"
          value={10}
          barColor="bg-muted"
        />
      </div>
    </CardContent>
  </Card>
);
