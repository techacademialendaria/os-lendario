import React from 'react';
import { Section } from '../../../types';
import SalesTopbar from '../SalesTopbar';
import { Icon } from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useSettingsState } from './hooks';
import {
  SettingsHeader,
  IntegrationsTab,
  AIPromptsTab,
  DistributionTab,
  TeamTab,
  CategoriesTab,
  LogsTab,
} from './organisms';
import {
  MOCK_INTEGRATIONS,
  MOCK_TEAM,
  MOCK_LOGS,
  MOCK_OBJECTION_CATEGORIES,
} from './data';
import type { SalesSettingsTemplateProps } from './types';

const SalesSettingsTemplate: React.FC<SalesSettingsTemplateProps> = ({ setSection }) => {
  const { activeTab, setActiveTab } = useSettingsState();

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 font-sans">
      <SalesTopbar currentSection={Section.TEMPLATE_SALES_SETTINGS} setSection={setSection} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 space-y-6 p-6">
        <SettingsHeader />

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="space-y-6">
          <TabsList className="h-auto w-full justify-start overflow-x-auto border border-border bg-card p-1">
            <TabsTrigger value="integrations" className="gap-2">
              <Icon name="plug" size="size-4" /> Integracoes
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Icon name="brain" size="size-4" /> Classificacao & Prompts
            </TabsTrigger>
            <TabsTrigger value="distribution" className="gap-2">
              <Icon name="share" size="size-4" /> Distribuicao
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Icon name="users-alt" size="size-4" /> Time
            </TabsTrigger>
            <TabsTrigger value="objections" className="gap-2">
              <Icon name="shield" size="size-4" /> Categorias
            </TabsTrigger>
            <TabsTrigger value="logs" className="gap-2">
              <Icon name="terminal" size="size-4" /> Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="animate-fade-in">
            <IntegrationsTab integrations={MOCK_INTEGRATIONS} />
          </TabsContent>

          <TabsContent value="ai" className="animate-fade-in">
            <AIPromptsTab />
          </TabsContent>

          <TabsContent value="distribution" className="animate-fade-in">
            <DistributionTab />
          </TabsContent>

          <TabsContent value="team" className="animate-fade-in">
            <TeamTab team={MOCK_TEAM} />
          </TabsContent>

          <TabsContent value="objections" className="animate-fade-in">
            <CategoriesTab categories={MOCK_OBJECTION_CATEGORIES} />
          </TabsContent>

          <TabsContent value="logs" className="animate-fade-in">
            <LogsTab logs={MOCK_LOGS} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SalesSettingsTemplate;
