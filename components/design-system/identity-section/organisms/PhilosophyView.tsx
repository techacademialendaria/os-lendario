import React from 'react';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { beliefs, enemies, allies } from '../data';

export const PhilosophyView: React.FC = () => (
  <section className="space-y-8">
    <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
      <Icon name="columns" /> 2. Filosofia & Valores
    </h3>

    <Tabs defaultValue="beliefs" className="w-full">
      <TabsList className="mb-6 h-auto flex-wrap gap-2">
        <TabsTrigger value="beliefs" className="min-w-[140px] flex-1">
          Crencas Fundamentais
        </TabsTrigger>
        <TabsTrigger value="enemies" className="min-w-[140px] flex-1">
          Inimigos Conceituais
        </TabsTrigger>
        <TabsTrigger value="allies" className="min-w-[140px] flex-1">
          Aliados Conceituais
        </TabsTrigger>
      </TabsList>

      <TabsContent value="beliefs">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {beliefs.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
            >
              <Badge variant="outline" className="mt-0.5">
                {i + 1}
              </Badge>
              <span className="text-sm font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="enemies">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {enemies.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-destructive"
            >
              <Icon name="cross-circle" size="size-4" />
              <span className="text-sm font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="allies">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allies.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-success/20 bg-success/5 p-4 text-success-foreground"
            >
              <Icon name="check-circle" size="size-4" />
              <span className="text-sm font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  </section>
);
