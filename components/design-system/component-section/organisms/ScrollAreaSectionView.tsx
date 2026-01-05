/**
 * ScrollAreaSectionView
 * Design System - Scroll Area Showcase
 */

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ScrollAreaSectionView() {
  return (
    <section className="space-y-12 border-t border-border pt-12">
      <h3 className="font-sans text-2xl font-semibold">Areas de Rolagem (Scroll Area)</h3>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Terms of Use */}
        <Card>
          <CardHeader>
            <CardTitle>Termos de Uso</CardTitle>
            <CardDescription>Conteudo longo em espaco limitado.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full rounded-md border border-border bg-muted/10 p-4">
              <div className="space-y-4 font-serif text-sm text-muted-foreground">
                <h4 className="font-bold text-foreground">1. Introducao</h4>
                <p>Bem-vindo a Academia Lendaria. Ao acessar este sistema, voce concorda com...</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <h4 className="font-bold text-foreground">2. Propriedade Intelectual</h4>
                <p>
                  Todo o conteudo disponibilizado, incluindo textos, videos e codigos, e propriedade
                  exclusiva...
                </p>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </p>
                <h4 className="font-bold text-foreground">3. Responsabilidades</h4>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur.
                </p>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Tag List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Tags</CardTitle>
            <CardDescription>Lista vertical compacta.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full">
              <div className="space-y-2 pr-4">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded border border-border bg-card p-2"
                  >
                    <span className="text-sm font-medium">Tag #{i + 1}</span>
                    <Badge variant="outline">{100 + i} itens</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
