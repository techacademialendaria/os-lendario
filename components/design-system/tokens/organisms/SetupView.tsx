import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import { CodeBlock } from '../../../ui/code-block';
import { globalsCss, tailwindConfig, utilsCode, dependenciesCommand } from '../data';

export const SetupView: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="space-y-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Icon name="rocket" className="text-primary" /> Setup Instantâneo
            </CardTitle>
            <CardDescription>
              Stack necessária: React + TypeScript + TailwindCSS.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* 0. DEPENDENCIES */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-lg font-bold">0. Install Dependencies</h3>
            <Badge variant="outline">Terminal</Badge>
          </div>
          <CodeBlock language="bash">{dependenciesCommand}</CodeBlock>
        </div>

        {/* 1. GLOBALS.CSS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-lg font-bold">1. globals.css</h3>
            <Badge variant="outline">CSS Variables</Badge>
          </div>
          <div className="mb-2 text-xs text-muted-foreground">
            Inclui reset de fontes (Inter + Source Serif) e variáveis do tema.
          </div>
          <CodeBlock language="css" title="src/app/globals.css">
            {globalsCss}
          </CodeBlock>
        </div>

        {/* 2. TAILWIND CONFIG */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-lg font-bold">2. tailwind.config.ts</h3>
            <Badge variant="outline">Configuration</Badge>
          </div>
          <div className="mb-2 text-xs text-muted-foreground">
            Contém TODA a paleta de cores da marca, keyframes personalizados e mapeamentos de
            fonte.
          </div>
          <CodeBlock language="tsx" title="tailwind.config.ts">
            {tailwindConfig}
          </CodeBlock>
        </div>

        {/* 3. LIB UTILS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-lg font-bold">3. lib/utils.ts</h3>
            <Badge variant="outline">Helper Function</Badge>
          </div>
          <CodeBlock language="tsx" title="src/lib/utils.ts">
            {utilsCode}
          </CodeBlock>
        </div>
      </div>
    </div>
  );
};
