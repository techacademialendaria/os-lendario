import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icon } from '@/components/ui/icon';
import { TemplatesHeader, TemplateView, ChecklistView } from './organisms';
import { TABS_CONFIG } from './data';
import {
  ADVERTORIAL_TEMPLATE,
  ADVERTORIAL_PRINCIPLES,
  SALESPAGE_TEMPLATE,
  SALESPAGE_PRINCIPLES,
  CAPTURE_TEMPLATE,
  CAPTURE_PRINCIPLES,
  VSL_TEMPLATE,
  VSL_PRINCIPLES,
  WEBINAR_TEMPLATE,
  WEBINAR_PRINCIPLES,
  THANKYOU_TEMPLATE,
  THANKYOU_PRINCIPLES,
} from './data';

const MarketingTemplatesPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-12 pb-20">
      <TemplatesHeader />

      <Tabs defaultValue="advertorial" className="w-full">
        <TabsList className="mb-8 h-auto w-full flex-wrap justify-start gap-2 rounded-none border-b border-border bg-transparent p-0">
          {TABS_CONFIG.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50 ${
                tab.isHighlighted
                  ? 'ml-auto bg-primary/5 font-bold text-primary'
                  : ''
              }`}
            >
              <Icon name={tab.icon} className="mr-2 size-4" /> {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="advertorial" className="animate-fade-in space-y-8">
          <TemplateView
            title="Estrutura de Advertorial (Pre-Venda)"
            template={ADVERTORIAL_TEMPLATE}
            principles={ADVERTORIAL_PRINCIPLES}
          />
        </TabsContent>

        <TabsContent value="salespage" className="animate-fade-in space-y-8">
          <TemplateView
            title="Sales Page Long Form (Integrada)"
            template={SALESPAGE_TEMPLATE}
            principles={SALESPAGE_PRINCIPLES}
          />
        </TabsContent>

        <TabsContent value="capture" className="animate-fade-in space-y-8">
          <TemplateView
            title="Pagina de Captura (Squeeze Page)"
            template={CAPTURE_TEMPLATE}
            principles={CAPTURE_PRINCIPLES}
          />
        </TabsContent>

        <TabsContent value="vsl" className="animate-fade-in space-y-8">
          <TemplateView
            title="VSL Page (Video de Vendas)"
            template={VSL_TEMPLATE}
            principles={VSL_PRINCIPLES}
          />
        </TabsContent>

        <TabsContent value="webinar" className="animate-fade-in space-y-8">
          <TemplateView
            title="Registro de Webinario (Event)"
            template={WEBINAR_TEMPLATE}
            principles={WEBINAR_PRINCIPLES}
          />
        </TabsContent>

        <TabsContent value="thankyou" className="animate-fade-in space-y-8">
          <TemplateView
            title="Pagina de Obrigado / Confirmacao"
            template={THANKYOU_TEMPLATE}
            principles={THANKYOU_PRINCIPLES}
          />
        </TabsContent>

        <TabsContent value="checklist" className="animate-fade-in space-y-8">
          <ChecklistView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingTemplatesPage;
