import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../../ui/tabs';
import { Icon } from '../../../../ui/icon';
import { PsychometricsTab } from '../../../psychometrics';
import { WritingStylesTab } from '../../../writing-styles';
import { HistoryTab } from '../../HistoryTab';
import { ArtifactsTab } from '../../ArtifactsTab';
import { ContentsTab } from '../../ContentsTab';
import { FragmentsTab } from '../../../fragments-tab';
import { RecommendedToolsTab } from '../../RecommendedToolsTab';
import { OverviewTab } from './OverviewTab';
import { PromptsTab } from './PromptsTab';
import { MOCK_COMMUNICATION_DATA } from '../../../data/mock-communication';
import { MOCK_HISTORY_DATA, PROFESSIONAL_ACHIEVEMENTS } from '../../../data/mock-history';
import type { MindProfile as Mind } from '../../../../../hooks/useMind';
import type { MindArtifactsResult } from '../../../../../hooks/useMindArtifacts';
import type { PsychometricData } from '../../../../../hooks/useMindPsychometrics';
import type { MindHistoryResult } from '../../../../../hooks/useMindHistory';
import type { MindContentsResult } from '../../../../../hooks/useMindContents';
import type {
  MindFragmentsResult,
  FragmentUpdate,
  FragmentCreate,
  MindFragment,
} from '../../../../../hooks/useMindFragments';

interface MindProfileTabsProps {
  mind: Mind;
  mindSlug: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  // Data
  artifactsData: MindArtifactsResult | null;
  artifactsLoading: boolean;
  psychometrics: PsychometricData | null;
  psychometricsLoading: boolean;
  historyData: MindHistoryResult | null;
  historyLoading: boolean;
  contentsData: MindContentsResult | null;
  contentsLoading: boolean;
  fragmentsData: MindFragmentsResult | null;
  fragmentsLoading: boolean;
  // Fragment actions
  onUpdateFragment: (id: string, updates: FragmentUpdate) => Promise<boolean>;
  onDeleteFragment: (id: string) => Promise<boolean>;
  onDeleteFragmentsByContentId: (contentId: string) => Promise<{ success: boolean; count: number }>;
  onCreateFragment: (data: FragmentCreate) => Promise<MindFragment | null>;
}

export const MindProfileTabs: React.FC<MindProfileTabsProps> = ({
  mind,
  mindSlug,
  activeTab,
  onTabChange,
  artifactsData,
  artifactsLoading,
  psychometrics,
  psychometricsLoading,
  historyData,
  historyLoading,
  contentsData,
  contentsLoading,
  fragmentsData,
  fragmentsLoading,
  onUpdateFragment,
  onDeleteFragment,
  onDeleteFragmentsByContentId,
  onCreateFragment,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-8">
      <TabsList className="bg-transparent w-full justify-start p-0 h-auto gap-2 flex-wrap">
        <TabsTrigger
          value="overview"
          className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30"
        >
          <Icon name="grid" size="size-4" className="mr-1.5" /> Geral
        </TabsTrigger>
        <TabsTrigger
          value="psychometrics"
          className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30"
        >
          <Icon name="chart-pie" size="size-4" className="mr-1.5" /> DNA
        </TabsTrigger>
        <TabsTrigger
          value="communication"
          className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30"
        >
          <Icon name="comment-alt" size="size-4" className="mr-1.5" /> Comunicacao
        </TabsTrigger>
        <TabsTrigger
          value="history"
          className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30"
        >
          <Icon name="time-past" size="size-4" className="mr-1.5" /> Historia
        </TabsTrigger>
        <TabsTrigger
          value="artifacts"
          className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30"
        >
          <Icon name="box" size="size-4" className="mr-1.5" /> Artefatos{' '}
          {artifactsData?.artifacts.length ? `(${artifactsData.artifacts.length})` : ''}
        </TabsTrigger>
        <TabsTrigger
          value="contents"
          className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30"
        >
          <Icon name="document" size="size-4" className="mr-1.5" /> Conteudos
        </TabsTrigger>
        <TabsTrigger
          value="fragments"
          className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30"
        >
          <Icon name="box" size="size-4" className="mr-1.5" /> Fragmentos{' '}
          {fragmentsData?.total ? `(${fragmentsData.total})` : ''}
        </TabsTrigger>
        <TabsTrigger
          value="prompts"
          className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30"
        >
          <Icon name="terminal" size="size-4" className="mr-1.5" /> Prompts{' '}
          {artifactsData?.prompts.length ? `(${artifactsData.prompts.length})` : ''}
        </TabsTrigger>
        <TabsTrigger
          value="recommended-tools"
          className="rounded-md data-[state=active]:bg-studio-primary/10 data-[state=active]:text-studio-primary px-4 py-2 font-medium bg-muted/30"
        >
          <Icon name="box" size="size-4" className="mr-1.5" /> Ferramentas
        </TabsTrigger>
      </TabsList>

      {/* TAB 1: OVERVIEW */}
      <TabsContent value="overview" className="animate-fade-in">
        <OverviewTab mind={mind} />
      </TabsContent>

      {/* TAB 2: PSYCHOMETRICS / DNA MENTAL */}
      <TabsContent value="psychometrics" className="animate-fade-in">
        <PsychometricsTab psychometrics={psychometrics} loading={psychometricsLoading} />
      </TabsContent>

      {/* TAB 3: ARTIFACTS */}
      <TabsContent value="artifacts" className="animate-fade-in">
        <ArtifactsTab artifactsData={artifactsData} loading={artifactsLoading} />
      </TabsContent>

      {/* TAB 4: SYSTEM PROMPTS */}
      <TabsContent value="prompts" className="animate-fade-in">
        <PromptsTab artifactsData={artifactsData} loading={artifactsLoading} />
      </TabsContent>

      {/* TAB 5: COMMUNICATION */}
      <TabsContent value="communication" className="animate-fade-in">
        <WritingStylesTab profile={{ ...mind, ...MOCK_COMMUNICATION_DATA }} />
      </TabsContent>

      {/* TAB 6: HISTORY */}
      <TabsContent value="history" className="animate-fade-in">
        <HistoryTab
          history={historyData?.events.length ? historyData.events : MOCK_HISTORY_DATA}
          quote={historyData?.quote}
          achievements={
            historyData?.achievements?.length ? historyData.achievements : PROFESSIONAL_ACHIEVEMENTS
          }
          loading={historyLoading}
        />
      </TabsContent>

      {/* TAB 7: CONTENTS */}
      <TabsContent value="contents" className="animate-fade-in">
        <ContentsTab contentsData={contentsData} loading={contentsLoading} />
      </TabsContent>

      {/* TAB: FRAGMENTS */}
      <TabsContent value="fragments" className="animate-fade-in">
        <FragmentsTab
          fragmentsData={fragmentsData}
          loading={fragmentsLoading}
          mindId={mind.id}
          onUpdateFragment={onUpdateFragment}
          onDeleteFragment={onDeleteFragment}
          onDeleteFragmentsByContentId={onDeleteFragmentsByContentId}
          onCreateFragment={onCreateFragment}
        />
      </TabsContent>

      {/* TAB: RECOMMENDED TOOLS */}
      <TabsContent value="recommended-tools" className="animate-fade-in">
        <RecommendedToolsTab
          psychometrics={psychometrics}
          loading={psychometricsLoading}
          mindSlug={mindSlug}
        />
      </TabsContent>
    </Tabs>
  );
};
