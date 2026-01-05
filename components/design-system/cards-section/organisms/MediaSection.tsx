import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const MediaSection: React.FC = () => (
  <section className="space-y-8">
    <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
      Imagens & Mídia
    </h3>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Image Cap (Top) */}
      <Card className="overflow-hidden">
        <div className="h-48 w-full bg-muted">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
            alt="Cyberpunk"
            className="h-full w-full object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle>Image Cap</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            A imagem ocupa toda a largura superior, ideal para posts de blog ou vitrines de
            produtos.
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">Atualizado há pouco</p>
        </CardFooter>
      </Card>

      {/* Image Inside Body */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 h-40 w-full overflow-hidden rounded-md bg-muted">
            <img
              src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop"
              alt="Abstract"
              className="h-full w-full object-cover"
            />
          </div>
          <CardTitle className="mb-2">Image Inside</CardTitle>
          <p className="font-serif text-sm text-muted-foreground">
            A imagem respeita o padding do card, criando uma moldura natural. Estilo comum em
            feeds de notícias.
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">Postado hoje</p>
        </CardFooter>
      </Card>

      {/* Horizontal / Row Layout */}
      <Card className="flex flex-row overflow-hidden md:col-span-2 lg:col-span-1">
        <div className="w-1/3 shrink-0 bg-muted">
          <img
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop"
            alt="Side"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-4">
          <h4 className="mb-1 text-lg font-bold">Horizontal</h4>
          <p className="mb-3 font-serif text-xs text-muted-foreground">
            Layout lateral para listas.
          </p>
          <Button size="sm" variant="outline" className="h-8 w-fit text-xs">
            Ver
          </Button>
        </div>
      </Card>
    </div>
  </section>
);
