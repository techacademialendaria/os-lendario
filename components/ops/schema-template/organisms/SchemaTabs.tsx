import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { SCHEMA_TABS, SchemaTab } from '../types';

interface SchemaTabsProps {
  activeTab: SchemaTab;
  onTabChange: (tab: SchemaTab) => void;
  children: React.ReactNode;
}

export const SchemaTabs: React.FC<SchemaTabsProps> = ({ activeTab, onTabChange, children }) => {
  return (
    <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as SchemaTab)} className="space-y-6">
      <TabsList className="bg-transparent p-0 h-auto gap-2 flex-wrap">
        {SCHEMA_TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "rounded-lg px-4 py-2 font-medium bg-muted/30 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20",
              tab.value === 'gaps' && "data-[state=active]:bg-red-500/10 data-[state=active]:text-red-400"
            )}
          >
            <Icon name={tab.icon} size="size-4" className="mr-2" />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};
