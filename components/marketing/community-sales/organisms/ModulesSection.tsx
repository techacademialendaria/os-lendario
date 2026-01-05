import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { MODULES } from '../data';

export const ModulesSection: React.FC = () => (
  <section className="bg-background px-4 py-20">
    <div className="mx-auto max-w-6xl">
      <div className="mb-16 space-y-4 text-center">
        <Badge variant="outline" className="border-primary text-primary">
          O Ecossistema Completo
        </Badge>
        <h2 className="text-4xl font-bold md:text-5xl">Comunidade Lendar[IA]</h2>
        <p className="mx-auto max-w-2xl font-serif text-xl text-muted-foreground">
          Treinamento Estruturado + Ferramentas Premium + Tribo de Executores.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((mod, i) => (
          <Card key={i} className="group transition-colors hover:border-primary/50">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <Icon name={mod.icon} size="size-6" />
              </div>
              <CardTitle className="text-lg">{mod.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                {mod.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);
