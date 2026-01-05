/**
 * StatesSection - Card states and variations demo
 */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export const StatesSection: React.FC = () => (
  <section className="space-y-8">
    <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
      Estados & Variacoes
    </h3>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Centered Body */}
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <CardHeader>
          <CardTitle>Centralizado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-sm text-muted-foreground">
            Texto de apoio centralizado para leads ou anuncios breves.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="link">
            Saiba Mais <Icon name="angle-small-right" />
          </Button>
        </CardFooter>
      </Card>

      {/* Empty State */}
      <Card className="flex flex-col items-center justify-center border-dashed p-8 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Icon name="box-open" size="size-6" />
        </div>
        <h4 className="mb-1 text-lg font-bold">Sem Dados</h4>
        <p className="mb-4 font-serif text-xs text-muted-foreground">
          Nenhum registro encontrado nesta categoria.
        </p>
        <Button size="sm" variant="outline">
          Adicionar Novo
        </Button>
      </Card>

      {/* Top Bordered */}
      <Card className="border-t-4 border-t-brand-blue">
        <CardHeader>
          <CardTitle>Top Bordered</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-sm text-muted-foreground">
            Borda colorida no topo para indicar status ou categoria (ex: Azul para Info).
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="px-0 text-brand-blue">
            Detalhes
          </Button>
        </CardFooter>
      </Card>

      {/* Scrollable Body */}
      <Card>
        <CardHeader>
          <CardTitle>Scrollable</CardTitle>
        </CardHeader>
        <div className="custom-scrollbar h-[150px] overflow-y-auto border-y border-border bg-muted/5 px-6">
          <div className="space-y-2 py-4 font-serif text-sm text-muted-foreground">
            <p>Este e um card com corpo rolavel.</p>
            <p>
              Ideal para termos de uso, logs ou listas longas que nao devem quebrar o layout.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
            <p>Duis aute irure dolor in reprehenderit.</p>
          </div>
        </div>
        <CardFooter className="pt-4">
          <Button size="sm" className="w-full">
            Aceitar Termos
          </Button>
        </CardFooter>
      </Card>
    </div>
  </section>
);
