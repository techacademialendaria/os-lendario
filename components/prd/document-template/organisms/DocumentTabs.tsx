// Document Tabs Component
// Tab navigation and content for the PRD wizard

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { STUDIO_TEAL, Requirement, TechStack, DesignState } from '../types';
import { DesignTab } from './DesignTab';
import { FunctionalTab } from './FunctionalTab';
import { TechTab } from './TechTab';

interface DocumentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  // Design
  design: DesignState;
  onDesignChange: (field: keyof DesignState, value: string) => void;
  // Requirements
  requirements: Requirement[];
  pendingCount: number;
  allCriticalReviewed: boolean;
  onRequirementAction: (id: string, action: 'approve' | 'reject' | 'undo') => void;
  // Tech
  techStack: TechStack;
  onTechStackChange: (field: keyof TechStack, value: string) => void;
  scopeLimits: string;
  onScopeLimitsChange: (value: string) => void;
  // Actions
  isAdvancing: boolean;
  onFinish: () => void;
}

export const DocumentTabs: React.FC<DocumentTabsProps> = ({
  activeTab,
  onTabChange,
  design,
  onDesignChange,
  requirements,
  pendingCount,
  allCriticalReviewed,
  onRequirementAction,
  techStack,
  onTechStackChange,
  scopeLimits,
  onScopeLimitsChange,
  isAdvancing,
  onFinish,
}) => (
  <div className="space-y-6 lg:col-span-7">
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="w-full justify-start gap-6 overflow-x-auto border-b border-border bg-transparent p-0">
        <TabsTrigger
          value="design"
          className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)]"
          style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
        >
          1. Design & UX
        </TabsTrigger>
        <TabsTrigger
          value="functional"
          className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)]"
          style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
        >
          2. Funcionalidades
        </TabsTrigger>
        <TabsTrigger
          value="tech"
          className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-[var(--studio-teal)] data-[state=active]:text-[var(--studio-teal)]"
          style={{ '--studio-teal': STUDIO_TEAL } as React.CSSProperties}
        >
          3. Tecnologia
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="design" className="animate-fade-in space-y-8">
          <DesignTab
            design={design}
            onFieldChange={onDesignChange}
            onNext={() => onTabChange('functional')}
          />
        </TabsContent>

        <TabsContent value="functional" className="animate-fade-in space-y-8">
          <FunctionalTab
            requirements={requirements}
            pendingCount={pendingCount}
            allCriticalReviewed={allCriticalReviewed}
            onRequirementAction={onRequirementAction}
            onBack={() => onTabChange('design')}
            onNext={() => onTabChange('tech')}
          />
        </TabsContent>

        <TabsContent value="tech" className="animate-fade-in space-y-8">
          <TechTab
            techStack={techStack}
            onTechStackChange={onTechStackChange}
            scopeLimits={scopeLimits}
            onScopeLimitsChange={onScopeLimitsChange}
            pendingCount={pendingCount}
            isAdvancing={isAdvancing}
            onBack={() => onTabChange('functional')}
            onFinish={onFinish}
          />
        </TabsContent>
      </div>
    </Tabs>
  </div>
);
