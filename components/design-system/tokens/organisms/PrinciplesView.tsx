import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Icon } from '../../../ui/icon';
import { Alert, AlertDescription, AlertTitle } from '../../../ui/alert';
import { CodeBlock } from '../../../ui/code-block';
import { classOrderRules } from '../data';

export const PrinciplesView: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Principles Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <Icon name="database" className="mb-2 size-6 text-primary" />
            <CardTitle className="text-base">Single Source</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Tokens definidos em UM lugar (globals.css). Nunca duplique valores.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <Icon name="label" className="mb-2 size-6 text-brand-blue" />
            <CardTitle className="text-base">Semantic First</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Use significado (<code>bg-primary</code>), não valor (<code>bg-gray-900</code>).
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <Icon name="moon" className="mb-2 size-6 text-brand-indigo" />
            <CardTitle className="text-base">Theme Aware</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Toda cor deve ter variante light/dark. Estrutura é fixa.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <Icon name="link" className="mb-2 size-6 text-brand-green" />
            <CardTitle className="text-base">Predictable Pairing</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <code>bg-primary</code> sempre exige <code>text-primary-foreground</code>.
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Class Order */}
        <Card>
          <CardHeader>
            <CardTitle>Ordem de Classes Tailwind</CardTitle>
            <CardDescription>Convenção obrigatória para consistência.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {classOrderRules.map((rule, i) => (
                <div
                  key={i}
                  className="border-b border-border/50 pb-1 font-mono text-sm text-muted-foreground last:border-0"
                >
                  {rule}
                </div>
              ))}
            </div>
            <Alert variant="destructive" className="mt-4">
              <Icon name="cross-circle" className="size-4" />
              <AlertTitle>ERRADO</AlertTitle>
              <AlertDescription className="font-mono text-xs">
                className="hover:bg-primary p-4 flex text-white"
              </AlertDescription>
            </Alert>
            <Alert variant="success">
              <Icon name="check-circle" className="size-4" />
              <AlertTitle>CORRETO</AlertTitle>
              <AlertDescription className="font-mono text-xs">
                className="flex p-4 text-white hover:bg-primary"
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Utility CN */}
        <Card>
          <CardHeader>
            <CardTitle>Utilitário cn()</CardTitle>
            <CardDescription>Merge de classes obrigatório.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="tsx" title="lib/utils.ts">
              {`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
            </CodeBlock>
            <div className="space-y-2">
              <p className="text-sm font-bold">Regras de Uso:</p>
              <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                <li><strong>Base primeiro:</strong> Estilos fixos vêm antes.</li>
                <li><strong>Condicionais no meio:</strong> Variantes e estados.</li>
                <li><strong>className por último:</strong> Permite override externo.</li>
                <li><strong>NUNCA concatenar:</strong> Use sempre <code>cn()</code>.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
