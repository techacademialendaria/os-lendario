import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ListItem } from './ListItem';
import {
  pricingFeatures,
  projectSetupCompleted,
  projectSetupPending,
  prosItems,
  consItems,
} from '../data';

export const RealWorldView: React.FC = () => {
  return (
    <section className="space-y-8">
      <h3 className="flex items-center gap-2 font-sans text-xl font-semibold">
        <Icon name="layout-fluid" className="text-primary" /> Aplicacao Real
      </h3>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* USE CASE: PRICING CARD (Solid/Primary) */}
        <PricingCard />

        {/* USE CASE: FEATURE BREAKDOWN (Soft/Blue) */}
        <ProjectSetupCard />

        {/* USE CASE: PROS & CONS (Semantic) */}
        <ComparisonCard />
      </div>
    </section>
  );
};

// Sub-components for clarity

const PricingCard: React.FC = () => (
  <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-b from-card to-primary/5 shadow-lg">
    <div className="pointer-events-none absolute right-0 top-0 p-4 opacity-10">
      <Icon name="crown" className="-rotate-12 text-8xl" />
    </div>
    <CardHeader>
      <Badge className="mb-2 w-fit">Recomendado</Badge>
      <CardTitle className="text-2xl">Lendario Pro</CardTitle>
      <CardDescription>Para quem busca o topo.</CardDescription>
      <div className="flex items-baseline gap-1 pt-4">
        <span className="text-4xl font-bold text-primary">R$ 97</span>
        <span className="text-muted-foreground">/mes</span>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <Separator className="bg-primary/20" />
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        O que esta incluso:
      </p>
      <div className="space-y-3">
        {pricingFeatures.map((feature) => (
          <ListItem
            key={feature}
            label={feature}
            style="solid"
            color="primary"
            shape="circle"
          />
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full shadow-lg shadow-primary/20">Assinar Agora</Button>
    </CardFooter>
  </Card>
);

const ProjectSetupCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon name="settings" /> Configuracao do Projeto
      </CardTitle>
      <CardDescription>Checklist de lancamento.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="space-y-3">
          {projectSetupCompleted.map((item) => (
            <ListItem
              key={item}
              label={item}
              style="soft"
              color="blue"
              shape="rounded"
            />
          ))}
        </div>
        <Separator />
        <div className="space-y-3 opacity-60">
          {projectSetupPending.map((item) => (
            <ListItem
              key={item}
              label={item}
              style="outlined"
              color="gray"
              shape="rounded"
            />
          ))}
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">
        Gerenciar
      </Button>
    </CardFooter>
  </Card>
);

const ComparisonCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Analise Comparativa</CardTitle>
      <CardDescription>Pontos fortes e fracos.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div>
        <h4 className="text-success mb-3 flex items-center gap-2 text-sm font-bold">
          <Icon name="thumbs-up" /> Vantagens
        </h4>
        <div className="space-y-2">
          {prosItems.map((item) => (
            <ListItem key={item} label={item} style="standard" color="green" />
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-destructive">
          <Icon name="thumbs-down" /> Desvantagens
        </h4>
        <div className="space-y-2">
          {consItems.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <Icon name="cross" className="mt-0.5 h-4 w-4 text-destructive" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);
