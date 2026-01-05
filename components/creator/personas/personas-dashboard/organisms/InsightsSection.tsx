import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { STUDIO_CARD_CLASSES } from '@/components/creator/studio-tokens';
import { InsightItem } from '../molecules';

const INSIGHTS_DATA = [
  {
    icon: 'brain',
    iconBg: 'bg-studio-accent/10',
    iconColor: 'text-studio-accent',
    title: 'Otimizar copy para Persona Marina',
    description: 'Eneagrama 3 identificado • Focar em status e prestígio profissional',
    tag: 'Psicografia',
    tagColor: 'studio-accent',
    highlighted: true,
  },
  {
    icon: 'lightbulb-alt',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    title: 'Gerar temas para 2 personas',
    description: 'Persona: Gerente de Marketing • Novos interesses identificados',
    tag: 'Oportunidade',
    tagColor: 'blue-400',
  },
  {
    icon: 'exclamation',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
    title: 'Priorizar validação de 3 dores',
    description: 'Persona: CEO Tech Enterprise • Baixa confiança detectada',
    tag: 'Alta Prioridade',
    tagColor: 'red-400',
  },
];

export const InsightsSection: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold">Insights e Ações Recomendadas</h3>
      <Button variant="link" className="text-studio-accent">
        Ver todos
      </Button>
    </div>
    <Card className={cn(STUDIO_CARD_CLASSES, 'divide-y divide-border/50 overflow-hidden')}>
      {INSIGHTS_DATA.map((insight, i) => (
        <InsightItem key={i} {...insight} />
      ))}
    </Card>
  </div>
);
