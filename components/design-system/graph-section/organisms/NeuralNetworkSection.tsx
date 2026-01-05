import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { NeuralGraphView } from './NeuralGraphView';

export const NeuralNetworkSection: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h3 className="flex items-center gap-2 font-sans text-2xl font-bold">
            <Icon name="network" /> Rede Neural
          </h3>
          <p className="text-sm text-muted-foreground">
            Para visualizacao de comunidades, conexoes de usuarios ou clusters de dados nao
            hierarquicos.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icon name="refresh" className="mr-2" /> Recalcular
          </Button>
          <Button size="sm">
            <Icon name="expand" className="mr-2" /> Fullscreen
          </Button>
        </div>
      </div>

      <NeuralGraphView />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Interatividade</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Hover nos nos destaca vizinhos imediatos e esmaece o restante (Focus Mode).
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cores</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Use <span className="font-bold text-primary">Primary</span> para hubs centrais e tons
            monocromaticos para nos perifericos.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Uso Recomendado</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Mapas de stakeholders, sugestoes de conexao e analise de influenciadores.
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
