import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

export const PricingSection: React.FC = () => (
  <section className="relative overflow-hidden px-4 py-24">
    <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/5 blur-[100px]" />

    <div className="mx-auto max-w-4xl space-y-12 text-center">
      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Seu Investimento Hoje</h2>

      <Card className="relative overflow-hidden border-2 border-primary bg-card shadow-2xl">
        <div className="absolute top-0 h-2 w-full bg-gradient-to-r from-primary via-brand-yellow to-primary" />
        <CardContent className="space-y-8 p-10 md:p-16">
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground line-through">
              Valor de Referencia: R$ 8.400/ano
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-6xl font-black tracking-tighter text-foreground md:text-8xl">
                12x R$ 98
              </span>
            </div>
            <p className="text-sm text-muted-foreground">ou R$ 1.176 a vista</p>
          </div>

          <Button
            size="lg"
            className="h-16 w-full max-w-md animate-pulse-slow text-xl font-bold uppercase tracking-wide shadow-xl shadow-primary/25"
          >
            Quero Entrar na Comunidade Lendaria
          </Button>

          <div className="flex flex-col items-center justify-center gap-6 text-sm text-muted-foreground md:flex-row">
            <span className="flex items-center gap-2">
              <Icon name="check-circle" className="text-success" /> Acesso Imediato
            </span>
            <span className="flex items-center gap-2">
              <Icon name="shield-check" className="text-success" /> Garantia de 30 Dias
            </span>
            <span className="flex items-center gap-2">
              <Icon name="lock" className="text-success" /> Pagamento Seguro
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 rounded-xl border border-border bg-muted/5 p-6 md:flex-row">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-background text-3xl shadow-sm">
          <span role="img" aria-label="shield">
            &#128737;
          </span>
        </div>
        <div className="space-y-2 text-left">
          <h4 className="text-lg font-bold">Garantia Anti-Tedio de 30 Dias</h4>
          <p className="font-serif text-sm leading-relaxed text-muted-foreground">
            Entre. Use. Aplique. Se em 30 dias voce nao sentir que valeu, pede o dinheiro de
            volta. 100%. Sem perguntas. Sem burocracia.
          </p>
        </div>
      </div>
    </div>
  </section>
);
