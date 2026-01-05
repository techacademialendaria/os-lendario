/**
 * GuidelinesSectionView
 * Design System - Component Guidelines (Do's & Don'ts)
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

export function GuidelinesSectionView() {
  return (
    <section className="space-y-8 border-t border-border pt-12">
      <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
        <Icon name="check-circle" /> Diretrizes de Componentes
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
              <span className="text-sm font-bold text-foreground">Hierarquia de Botoes</span>
              <p className="text-xs text-muted-foreground">
                Use apenas <strong>um</strong> botao primario (Gold) por secao ou card. Use
                variantes 'Secondary', 'Outline' ou 'Ghost' para acoes secundarias.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-foreground">Rotulos Claros</span>
              <p className="text-xs text-muted-foreground">
                Use verbos de acao nos botoes (ex: "Salvar", "Criar", "Enviar"). Evite termos vagos
                como "Ok" ou "Sim".
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-foreground">Badges Semanticas</span>
              <p className="text-xs text-muted-foreground">
                Use Badges para status (Ativo/Pendente) ou categorias. Nao use para botoes
                clicaveis.
              </p>
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
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-destructive">Excesso de Primarios</span>
              <p className="text-xs text-muted-foreground">
                Nao coloque varios botoes 'Default' (Gold) lado a lado. O usuario nao sabera onde
                clicar.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-destructive">Icones Isolados</span>
              <p className="text-xs text-muted-foreground">
                Em botoes com texto, o icone deve servir de apoio, nao substituir o rotulo (exceto em
                toolbars).
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-destructive">Tamanhos Misturados</span>
              <p className="text-xs text-muted-foreground">
                Nao misture botoes de tamanho 'sm' e 'lg' na mesma linha de acao.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
