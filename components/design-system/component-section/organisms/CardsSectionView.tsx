/**
 * CardsSectionView
 * Design System - Cards Showcase
 */

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Symbol } from '@/components/ui/symbol';

export function CardsSectionView() {
  return (
    <section className="space-y-8">
      <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">Cards</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Standard Shadcn Card */}
        <Card className="group cursor-pointer transition-colors hover:border-primary/50">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon name="brain" size="size-5" />
            </div>
            <CardTitle className="transition-colors group-hover:text-primary">
              Conceito Lendario
            </CardTitle>
            <CardDescription>Minimalismo estrutural.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Componentes isolados com responsabilidade unica e estilo encapsulado.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="px-0">
              Saiba mais <Icon name="arrow-right" className="ml-2" size="size-3" />
            </Button>
          </CardFooter>
        </Card>

        {/* Feature Card */}
        <Card className="border-primary">
          <CardHeader>
            <Badge className="mb-2 w-fit">
              <Symbol name="star" className="mr-1" />
              Novo
            </Badge>
            <CardTitle>Inteligencia Artificial</CardTitle>
            <CardDescription>Modulo avancado disponivel.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="clock" size="size-4" />
                120h
              </span>
              <span className="flex items-center gap-1">
                <Icon name="chart-histogram" size="size-4" />
                Avancado
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Inscrever-se</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
