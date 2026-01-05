import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { ModuleCard } from './ModuleCard';
import type { ModuleStats } from '../types';

interface ModulesTabProps {
  modules: ModuleStats[];
}

export const ModulesTab: React.FC<ModulesTabProps> = ({ modules }) => {
  return (
    <TabsContent value="modules" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((module, i) => (
          <ModuleCard key={i} module={module} />
        ))}
      </div>
    </TabsContent>
  );
};
