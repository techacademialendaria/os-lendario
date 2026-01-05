import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import { TriggerItem } from '../molecules';
import type { TagColor } from '../types';

const TRIGGERS_DATA: Array<{
  icon: string;
  title: string;
  description: string;
  tags: string[];
  tagColors: TagColor[];
}> = [
  {
    icon: 'bolt',
    title: 'Foco em Resultados Rápidos',
    description: 'Decision makers buscam ROI imediato. Evitar longas explicações teóricas.',
    tags: ['DISC D', 'Tipo 3'],
    tagColors: ['indigo', 'purple'],
  },
  {
    icon: 'medal',
    title: 'Status & Exclusividade',
    description: 'Valorização de acesso a recursos premium e autoridade da marca.',
    tags: ['Tipo 3'],
    tagColors: ['purple'],
  },
  {
    icon: 'shield-check',
    title: 'Segurança e Garantia',
    description: 'Apresentar garantias, cases validados e suporte técnico robusto.',
    tags: ['Tipo 6'],
    tagColors: ['emerald'],
  },
];

export const TriggersCard: React.FC = () => (
  <Card className={cn(STUDIO_CARD_CLASSES, 'flex flex-col')}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div>
        <CardTitle className="text-base font-bold">Gatilhos em Destaque</CardTitle>
        <p className="text-sm text-muted-foreground">Padrões de persuasão identificados</p>
      </div>
      <Button variant="ghost" size="icon" className="size-8">
        <Icon name="menu-dots" size="size-4" />
      </Button>
    </CardHeader>
    <CardContent className="flex-1 space-y-3 pt-4">
      {TRIGGERS_DATA.map((trigger, i) => (
        <TriggerItem key={i} {...trigger} />
      ))}
    </CardContent>
  </Card>
);
