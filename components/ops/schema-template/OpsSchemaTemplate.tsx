import React from 'react';
import { Section } from '@/types';
import OpsTopbar from '../OpsTopbar';
import { useTabs } from '@/components/shared/hooks';
import { useSchemaData } from './hooks';
import {
  SchemaHeader,
  SchemaStatsGrid,
  SchemaTabs,
  OverviewTab,
  ModulesTab,
  GapsTab,
  PoliciesTab,
  EnumsTab,
} from './organisms';
import type { SchemaTab } from './types';

interface OpsSchemaTemplateProps {
  setSection: (s: Section) => void;
}

const OpsSchemaTemplate: React.FC<OpsSchemaTemplateProps> = ({ setSection }) => {
  const { activeTab, setActiveTab } = useTabs<SchemaTab>('overview');
  const { stats, modules, policies, criticalIssues, loading, schemaLoading, refetch } = useSchemaData();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <OpsTopbar currentSection={Section.STUDIO_OPS_SCHEMA} setSection={setSection} />

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-12">
        <div className="space-y-6 animate-fade-in">
          <SchemaHeader
            tables={stats.tables}
            lastUpdated={stats.lastUpdated}
            criticalIssues={criticalIssues}
            loading={loading}
            onRefresh={refetch}
          />

          <SchemaStatsGrid stats={stats} />

          <SchemaTabs activeTab={activeTab} onTabChange={setActiveTab}>
            <OverviewTab modules={modules} />
            <ModulesTab modules={modules} />
            <GapsTab />
            <PoliciesTab policies={policies} loading={schemaLoading} />
            <EnumsTab />
          </SchemaTabs>
        </div>
      </main>
    </div>
  );
};

export default OpsSchemaTemplate;
