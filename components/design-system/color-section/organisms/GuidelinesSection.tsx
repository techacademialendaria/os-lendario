import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const GuidelinesSection: React.FC = () => {
  return (
    <>
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
          <Icon name="check-circle" /> Diretrizes de Cores
        </h3>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-brand-green/20 bg-brand-green/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-green">
                <Icon name="check" /> O que fazer (Do)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Regra dos 8%</span>
                <p className="text-xs text-muted-foreground">
                  Aplique a cor primaria apenas em botoes principais e elementos de destaque maximo.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Icon name="cross" /> O que nao fazer (Don't)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Cores Vibrantes em Texto</span>
                <p className="text-xs text-muted-foreground">
                  Evite usar cores neon para texto corrido em fundo branco.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <div className="flex items-start gap-4 rounded-xl border border-dashed border-border bg-card p-8">
          <div className="shrink-0 rounded-full bg-primary/10 p-3 text-primary">
            <Icon name="exclamation" size="size-6" />
          </div>
          <div>
            <h4 className="mb-2 font-sans text-lg font-bold">Atencao sobre Complementares</h4>
            <p className="font-serif leading-relaxed text-muted-foreground">
              As cores complementares (shades) devem ser usadas estritamente para estados de
              interacao (hover, active, focus). Elas <strong>nunca</strong> devem dominar a
              hierarquia visual.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
