import React from 'react';
import { Section } from '@/types';
import CreatorTopbar from '../CreatorTopbar';
import { Icon } from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useCourseResearchData } from './hooks';
import {
  CourseSidebar,
  ResearchHeader,
  CompetitorsTab,
  MarketGapsTab,
  SourcesTab,
  AIInsightAlert,
} from './organisms';
import type { CourseResearchTemplateProps } from './types';

const CourseResearchTemplate: React.FC<CourseResearchTemplateProps> = ({
  setSection,
  courseTitle,
  onNavigate,
}) => {
  const {
    activeTab,
    setActiveTab,
    competitors,
    gaps,
    sources,
    pipeline,
    isRunningAI,
    handleRunAIResearch,
    handleToggleGap,
  } = useCourseResearchData();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <CreatorTopbar currentSection={Section.APP_CREATOR_COURSES} setSection={setSection} />

      <div className="flex flex-1 overflow-hidden">
        <CourseSidebar
          courseTitle={courseTitle}
          currentStep="research"
          pipeline={pipeline}
          onNavigate={onNavigate}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <ResearchHeader
            isRunningAI={isRunningAI}
            onRunAIResearch={handleRunAIResearch}
            onNavigateToCurriculum={() => onNavigate('curriculum')}
          />

          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-6xl space-y-6">
              <AIInsightAlert />

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-muted/30 p-1">
                  <TabsTrigger value="competitors">
                    <Icon name="users" className="mr-2 size-4" />
                    Concorrentes ({competitors.length})
                  </TabsTrigger>
                  <TabsTrigger value="gaps">
                    <Icon name="target" className="mr-2 size-4" />
                    Gaps de Mercado ({gaps.length})
                  </TabsTrigger>
                  <TabsTrigger value="sources">
                    <Icon name="book-open-cover" className="mr-2 size-4" />
                    Fontes ({sources.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="competitors">
                  <CompetitorsTab competitors={competitors} />
                </TabsContent>

                <TabsContent value="gaps">
                  <MarketGapsTab gaps={gaps} onToggleGap={handleToggleGap} />
                </TabsContent>

                <TabsContent value="sources">
                  <SourcesTab sources={sources} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseResearchTemplate;
