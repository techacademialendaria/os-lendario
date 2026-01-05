import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Usage rules section showing Do's and Don'ts for icon usage
 */
export const UsageRulesView: React.FC = () => {
  return (
    <section className="space-y-8">
      <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
        <Icon name="check-circle" /> Regras de Uso
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
            <div className="flex items-center gap-4 rounded-lg border border-brand-green/20 bg-background p-3">
              <div className="flex gap-2">
                <Icon name="home" />
                <Icon name="user" />
                <Icon name="settings" />
              </div>
              <div className="text-sm">
                <span className="block font-bold text-brand-green">Consistencia de Estilo</span>
                <span className="text-xs text-muted-foreground">
                  Use sempre o estilo "Regular Rounded".
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-brand-green/20 bg-background p-3">
              <Button size="sm" className="gap-2">
                <Icon name="download" size="size-3" /> Download
              </Button>
              <div className="text-sm">
                <span className="block font-bold text-brand-green">Alinhamento Optico</span>
                <span className="text-xs text-muted-foreground">
                  Icones centralizados verticalmente com o texto.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-brand-green/20 bg-background p-3">
              <Icon
                name="trash"
                className="cursor-pointer text-muted-foreground transition-colors hover:text-destructive"
              />
              <div className="text-sm">
                <span className="block font-bold text-brand-green">Feedback de Estado</span>
                <span className="text-xs text-muted-foreground">
                  Mude a cor no hover para indicar interatividade.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DON'TS */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Icon name="cross" /> O que nao fazer (Don't)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border border-destructive/20 bg-background p-3">
              <div className="flex items-end gap-2">
                <Icon name="home" size="size-4" />
                <Icon name="user" size="size-6" />
                <Icon name="settings" size="size-8" />
              </div>
              <div className="text-sm">
                <span className="block font-bold text-destructive">Tamanhos Inconsistentes</span>
                <span className="text-xs text-muted-foreground">
                  Evite misturar escalas sem proposito hierarquico.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-destructive/20 bg-background p-3">
              <div className="flex gap-2">
                <Icon name="home" />
                <Icon name="user" />
              </div>
              <div className="text-sm">
                <span className="block font-bold text-destructive">Mistura de Familias</span>
                <span className="text-xs text-muted-foreground">
                  Nao misture icones de diferentes bibliotecas na mesma secao.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-destructive/20 bg-background p-3">
              <div className="flex gap-2 text-primary/30">
                <Icon name="check" />
              </div>
              <div className="text-sm">
                <span className="block font-bold text-destructive">Baixo Contraste</span>
                <span className="text-xs text-muted-foreground">
                  Icones funcionais devem ter contraste suficiente para leitura.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
