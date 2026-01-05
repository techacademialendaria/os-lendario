/**
 * CarouselSection - Card carousel demo
 */

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Icon } from '@/components/ui/icon';

export const CarouselSection: React.FC = () => (
  <section className="space-y-8">
    <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
      Carrossel de Conteudo
    </h3>
    <p className="font-serif text-sm text-muted-foreground">
      Utilizado para navegacao horizontal de cards ou imagens.
    </p>

    <Carousel>
      {Array.from({ length: 5 }).map((_, i) => (
        <CarouselItem key={i}>
          <Card className="h-full">
            <div className="flex h-32 items-center justify-center rounded-t-xl bg-muted/30">
              <Icon name="image" className="text-muted-foreground opacity-30" size="size-8" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Curso Destaque {i + 1}</CardTitle>
              <CardDescription>Modulo Intensivo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-serif text-sm text-muted-foreground">
                Aprenda as tecnicas avancadas de IA para escalar seus resultados.
              </p>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </Carousel>
  </section>
);
