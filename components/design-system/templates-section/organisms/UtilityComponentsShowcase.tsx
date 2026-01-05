/**
 * UtilityComponentsShowcase - Toggle and Separator component demos
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';

export const UtilityComponentsShowcase: React.FC = () => {
  return (
    <section className="space-y-8 border-t border-border pt-12">
      <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
        Componentes Utilitarios
      </h3>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Toggle & Formatting</CardTitle>
            <CardDescription>Botoes de estado para editores ou filtros.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <div className="flex gap-1 rounded-md border border-border p-1">
              <Toggle aria-label="Toggle bold">
                <Icon name="bold" size="size-4" />
              </Toggle>
              <Toggle aria-label="Toggle italic">
                <Icon name="italic" size="size-4" />
              </Toggle>
              <Toggle aria-label="Toggle underline">
                <Icon name="underline" size="size-4" />
              </Toggle>
            </div>
            <div className="flex gap-2">
              <Toggle variant="outline" aria-label="Toggle bookmark">
                <Icon name="bookmark" className="mr-2 size-4" /> Salvar
              </Toggle>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Separators</CardTitle>
            <CardDescription>Divisores de conteudo semanticos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
              <p className="text-sm text-muted-foreground">
                An open-source UI component library.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
