import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export const BasicStructuresSection: React.FC = () => (
  <section className="space-y-8">
    <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
      Estruturas Básicas
    </h3>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Body Only */}
      <Card>
        <CardHeader>
          <CardTitle>Título do Card</CardTitle>
          <CardDescription>SUBTÍTULO</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-sm text-muted-foreground">
            Exemplo de texto rápido para compor o conteúdo principal do card. Estrutura limpa
            focada em leitura.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="px-0">
            Link de Ação <Icon name="angle-small-right" />
          </Button>
        </CardFooter>
      </Card>

      {/* With Heading Feature */}
      <Card>
        <div className="border-b border-border bg-muted/20 px-6 py-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Destaque
          </span>
        </div>
        <CardHeader>
          <CardTitle>Título Especial</CardTitle>
          <CardDescription>SUBTÍTULO</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-sm text-muted-foreground">
            Este card possui um cabeçalho dedicado para categorização ou metadados antes do
            conteúdo principal.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="px-0">
            Ver Detalhes <Icon name="angle-small-right" />
          </Button>
        </CardFooter>
      </Card>

      {/* With Complex Footer */}
      <Card>
        <CardHeader>
          <CardTitle>Atualizações</CardTitle>
          <CardDescription>STATUS DO SISTEMA</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-serif text-sm text-muted-foreground">
            Conteúdo que requer uma validação temporal ou informação de rodapé contextual.
          </p>
        </CardContent>
        <CardFooter className="mt-auto border-t border-border bg-muted/10">
          <p className="w-full text-center text-xs text-muted-foreground">
            Última atualização: 5 min atrás
          </p>
        </CardFooter>
      </Card>
    </div>
  </section>
);
