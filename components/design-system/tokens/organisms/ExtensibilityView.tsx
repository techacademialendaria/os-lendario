import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../../../ui/alert';
import { Icon } from '../../../ui/icon';

export const ExtensibilityView: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Adicionando Novos Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal space-y-4 pl-4 text-sm text-muted-foreground">
                <li>
                  <strong>Definir em globals.css:</strong>
                  <div className="mt-2 rounded border border-border bg-muted p-2 font-mono text-xs">
                    --brand-new: 270 50% 50%;
                    <br />
                    --brand-new-foreground: 0 0% 100%;
                  </div>
                </li>
                <li>
                  <strong>Adicionar ao tailwind.config.ts:</strong>
                  <div className="mt-2 rounded border border-border bg-muted p-2 font-mono text-xs">
                    colors: &#123;
                    <br />
                    &nbsp;&nbsp;brand: &#123;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;DEFAULT: 'hsl(var(--brand-new))',
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;foreground: 'hsl(var(--brand-new-foreground))'
                    <br />
                    &nbsp;&nbsp;&#125;
                    <br />
                    &#125;
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regras de Dark Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Icon name="moon" className="size-4" />
                <AlertTitle>NUNCA USE HARDCODED</AlertTitle>
                <AlertDescription className="text-xs">
                  <code>bg-white</code> ou <code>text-black</code> quebram o tema escuro. Use
                  sempre tokens semânticos: <code>bg-background</code>,{' '}
                  <code>text-foreground</code>.
                </AlertDescription>
              </Alert>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Contraste:</strong> Verifique sempre WCAG AA em ambos os modos.
                </p>
                <p>
                  <strong>Shadows:</strong> São automaticamente mais intensas no modo escuro via
                  variáveis CSS.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Checklist de Validação (IA)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
              {[
                'Usa token semântico?',
                'Cor de fundo tem foreground pareado?',
                'Elemento interativo tem focus ring?',
                'Funciona em dark mode?',
                'Spacing está na escala?',
                'Usa cn() para merge?',
              ].map((check, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon name="check" className="text-green-500" /> {check}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
