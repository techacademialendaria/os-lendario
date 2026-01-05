import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { ModuleCard } from './ModuleCard';
import type { ModuleStats } from '../types';

interface OverviewTabProps {
  modules: ModuleStats[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ modules }) => {
  return (
    <TabsContent value="overview" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* Critical Paths First */}
          <ModuleCard module={modules[1]} /> {/* Drivers */}
          <ModuleCard module={modules[3]} /> {/* Tools */}
        </div>
        <div className="lg:col-span-1 space-y-6">
          <ModuleCard module={modules[2]} /> {/* Mapping */}
          <ModuleCard module={modules[4]} /> {/* Mind Mappings */}
        </div>
        <div className="lg:col-span-1 space-y-6">
          <ModuleCard module={modules[6]} /> {/* Fragments */}
          <ModuleCard module={modules[5]} /> {/* Creator OS */}
        </div>
      </div>
    </TabsContent>
  );
};
