/**
 * GuidelinesSection - Card usage guidelines (Do's and Don'ts)
 */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

export const GuidelinesSection: React.FC = () => (
  <section className="space-y-8 border-t border-border pt-12">
    <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
      <Icon name="check-circle" /> Diretrizes de Cards
    </h3>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* DO'S */}
      <Card className="border-brand-green/20 bg-brand-green/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-brand-green">
            <Icon name="check" /> O que fazer (Do)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-foreground">Conteudo Agrupado</span>
            <p className="text-xs text-muted-foreground">
              Use Cards para agrupar informacoes relacionadas que devem ser consumidas como uma
              unidade unica.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-foreground">Acoes Claras</span>
            <p className="text-xs text-muted-foreground">
              Coloque botoes e links no rodape (CardFooter) para separar a acao do conteudo.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-foreground">Imagens Otimizadas</span>
            <p className="text-xs text-muted-foreground">
              Em layouts de grade, garanta que as imagens tenham a mesma proporcao (aspect
              ratio).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* DON'TS */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Icon name="cross" /> O que nao fazer (Dont)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-destructive">Sobrecarga</span>
            <p className="text-xs text-muted-foreground">
              Evite colocar conteudo demais em um unico card. Se necessario, use um link Ver
              Mais ou expanda em um modal.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-destructive">Ninhamento Excessivo</span>
            <p className="text-xs text-muted-foreground">
              Evite colocar Cards dentro de Cards, a menos que visualmente distintos (ex:
              backgrounds diferentes).
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-destructive">Alturas Inconsistentes</span>
            <p className="text-xs text-muted-foreground">
              Em grids, tente alinhar a altura dos cards para evitar espacos em branco estranhos
              (use flex-grow ou grid).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);
