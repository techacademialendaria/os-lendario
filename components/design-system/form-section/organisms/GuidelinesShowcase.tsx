/**
 * GuidelinesShowcase - Form guidelines (Do's and Don'ts)
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';

export const GuidelinesShowcase: React.FC = () => {
  return (
    <section className="space-y-8 border-t border-border pt-12">
      <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
        <Icon name="check-circle" /> Diretrizes de Formularios
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
              <span className="text-sm font-bold text-foreground">Labels Visiveis</span>
              <p className="text-xs text-muted-foreground">
                Sempre use labels visiveis acima do input. Placeholders desaparecem ao digitar e
                prejudicam a acessibilidade.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-foreground">Feedback Imediato</span>
              <p className="text-xs text-muted-foreground">
                Valide campos (como email) assim que o usuario terminar de digitar (onBlur), nao
                apenas no submit.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-foreground">Agrupamento Logico</span>
              <p className="text-xs text-muted-foreground">
                Agrupe campos relacionados (Endereco, Dados Pessoais) usando espacamento ou
                divisores sutis.
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
              <span className="text-sm font-bold text-destructive">Formularios Longos</span>
              <p className="text-xs text-muted-foreground">
                Evite formularios com mais de 5-7 campos em uma unica etapa. Use Steppers ou Tabs
                para dividir a carga cognitiva.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-destructive">Botoes Vagos</span>
              <p className="text-xs text-muted-foreground">
                Evite "Enviar" generico. Use "Criar Conta", "Atualizar Perfil", etc.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-destructive">Placeholders como Label</span>
              <p className="text-xs text-muted-foreground">
                Nunca use o placeholder como unica instrucao. Se o usuario esquecer o que esta
                digitando, tera que apagar o texto.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
