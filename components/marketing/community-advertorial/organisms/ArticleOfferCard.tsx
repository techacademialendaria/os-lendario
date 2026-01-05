import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

export const ArticleOfferCard: React.FC = () => (
  <Card className="not-prose relative my-12 overflow-hidden border-primary shadow-2xl">
    <div className="absolute left-0 right-0 top-0 h-2 bg-gradient-to-r from-primary via-brand-yellow to-primary" />
    <CardContent className="p-8 text-center md:p-12">
      <h3 className="mb-4 font-sans text-3xl font-bold">O Proximo Passo</h3>
      <p className="mx-auto mb-8 max-w-xl font-sans font-medium text-muted-foreground">
        Alan Nicolas abriu vagas para a <strong>Comunidade Lendar[IA]</strong> - o
        ecossistema completo de treinamento + ferramentas + comunidade.
      </p>

      <div className="mx-auto mb-10 grid max-w-2xl grid-cols-1 gap-6 text-left sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">Investimento</p>
          <p className="text-lg font-bold">12x de R$98</p>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">Garantia</p>
          <p className="text-lg font-bold">30 dias Anti-Tedio</p>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">Bonus</p>
          <p className="text-lg font-bold">Super Chat IA</p>
        </div>
      </div>

      <Button
        size="lg"
        className="h-16 w-full animate-pulse-slow px-12 text-lg font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(201,178,152,0.3)] md:w-auto"
      >
        Quero Conhecer a Comunidade Lendaria <Icon name="arrow-right" className="ml-2" />
      </Button>

      <p className="mt-4 text-xs text-muted-foreground opacity-70">
        Inclui acesso a GPT-5, Claude Sonnet 4 e Grok 3 (Valor de R$8.400/ano).
      </p>
    </CardContent>
  </Card>
);
