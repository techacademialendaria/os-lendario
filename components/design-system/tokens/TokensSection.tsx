import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Icon } from '../../ui/icon';
import type { DensityLevel } from './types';
import {
  TokensHeader,
  PrinciplesView,
  FoundationView,
  LayoutView,
  ComponentsView,
  SetupView,
  ExtensibilityView,
} from './organisms';

const TokensSection: React.FC = () => {
  const [density, setDensity] = useState<DensityLevel>('default');

  return (
    <div className="animate-fade-in space-y-12 pb-20">
      <TokensHeader />

      <Tabs defaultValue="principles" className="w-full">
        <TabsList className="mb-8 h-auto w-full flex-wrap justify-start gap-2 rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="principles"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="diamond" className="mr-2 size-4" /> Princípios & Code
          </TabsTrigger>
          <TabsTrigger
            value="foundation"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="palette" className="mr-2 size-4" /> Cores & Efeitos
          </TabsTrigger>
          <TabsTrigger
            value="layout"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="apps" className="mr-2 size-4" /> Layout & Spacing
          </TabsTrigger>
          <TabsTrigger
            value="components"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="cube" className="mr-2 size-4" /> Componentes & Estados
          </TabsTrigger>
          <TabsTrigger
            value="setup"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent bg-primary/5 px-6 py-3 font-bold text-primary data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="copy" className="mr-2 size-4" /> Setup & Copy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="principles">
          <PrinciplesView />
        </TabsContent>

        <TabsContent value="foundation">
          <FoundationView />
        </TabsContent>

        <TabsContent value="layout">
          <LayoutView />
        </TabsContent>

        <TabsContent value="components">
          <ComponentsView density={density} setDensity={setDensity} />
        </TabsContent>

        <TabsContent value="setup">
          <SetupView />
        </TabsContent>

        <TabsContent value="extensibility">
          <ExtensibilityView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokensSection;
