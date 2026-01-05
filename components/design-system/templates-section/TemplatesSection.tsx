/**
 * TemplatesSection - Templates & Layouts Showcase
 *
 * Demonstrates complete page compositions using Design System components.
 * Includes authentication and chat interface templates.
 *
 * Refactored: 409 -> ~50 lines (88% reduction)
 */

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TemplatesHero,
  AuthTemplateShowcase,
  ChatInterfaceShowcase,
  UtilityComponentsShowcase,
} from './organisms';

export const TemplatesSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      <TemplatesHero />

      <Tabs defaultValue="auth" className="w-full">
        <div className="mb-8 flex items-center justify-between">
          <TabsList className="h-auto rounded-lg bg-muted/50 p-1">
            <TabsTrigger value="auth" className="px-4 py-2">
              Autenticacao
            </TabsTrigger>
            <TabsTrigger value="chat" className="px-4 py-2">
              Interface Chat (Lendario GPT)
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="auth">
          <AuthTemplateShowcase />
        </TabsContent>

        <TabsContent value="chat">
          <ChatInterfaceShowcase />
        </TabsContent>
      </Tabs>

      <UtilityComponentsShowcase />
    </div>
  );
};

export default TemplatesSection;
