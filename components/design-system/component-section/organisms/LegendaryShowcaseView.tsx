/**
 * LegendaryShowcaseView
 * Design System - Spotlight & Liquid Elements
 */

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Spotlight } from '@/components/ui/spotlight';

export function LegendaryShowcaseView() {
  return (
    <section className="space-y-8">
      <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-xl font-semibold">
        <Icon name="diamond" className="text-primary" /> Elementos "Lendarios" (Spotlight & Liquid)
      </h3>
      <p className="font-serif text-sm text-muted-foreground">
        Estes componentes carregam a assinatura visual da marca: profundidade, interacao e textura.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Spotlight Card 1 */}
        <Spotlight className="h-full rounded-xl border border-border bg-card shadow-sm">
          <div className="flex h-full flex-col space-y-4 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon name="microchip" size="size-6" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-bold">IA Generativa</h4>
              <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                Mova o mouse sobre este card. O efeito "Spotlight" revela uma luz sutil, criando a
                sensacao de que a interface esta viva e atenta.
              </p>
            </div>
            <Button variant="link" className="mt-auto justify-start px-0">
              Explorar <Icon name="arrow-right" className="ml-2" size="size-3" />
            </Button>
          </div>
        </Spotlight>

        {/* Spotlight Card 2 */}
        <Spotlight
          className="h-full rounded-xl border border-border bg-card shadow-sm"
          color="rgba(0, 199, 190, 0.15)"
        >
          <div className="flex h-full flex-col space-y-4 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-mint/10 text-brand-mint">
              <Icon name="stats" size="size-6" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-bold">Analytics em Tempo Real</h4>
              <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                Este card usa uma cor de spotlight diferente (Mint). Ideal para categorizar
                visualmente recursos sem sobrecarregar a tela.
              </p>
            </div>
            <Button variant="link" className="mt-auto justify-start px-0 text-brand-mint">
              Ver Dados <Icon name="arrow-right" className="ml-2" size="size-3" />
            </Button>
          </div>
        </Spotlight>

        {/* Liquid Button Showcase */}
        <Card className="flex flex-col items-center justify-center border-zinc-800 bg-zinc-900 p-8">
          <div className="space-y-6 text-center">
            <h4 className="font-bold text-white">Botao "Liquid Gold"</h4>
            <p className="mx-auto max-w-[200px] text-xs text-zinc-400">
              O novo padrao <code className="rounded bg-zinc-800 px-1">variant="default"</code>{' '}
              agora possui um brilho especular animado no hover.
            </p>
            <Button size="lg" className="w-full">
              <Icon name="star" className="mr-2" /> Acao Lendaria
            </Button>
            <Button variant="glowing" size="lg" className="w-full">
              <Icon name="bolt" className="mr-2" /> Glowing Border
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
