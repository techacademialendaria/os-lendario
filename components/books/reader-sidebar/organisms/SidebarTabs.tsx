import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChaptersList } from './ChaptersList';
import { ReadingStatusCard } from './ReadingStatusCard';
import { QuotesSection } from './QuotesSection';
import { ActionPlanCard } from './ActionPlanCard';
import { TagsSection } from './TagsSection';
import type { SidebarTabsProps } from '../types';

/**
 * SidebarTabs - Tabs container with Chapters and Insights tabs
 */
export const SidebarTabs: React.FC<SidebarTabsProps> = ({
  activeTab,
  chapters,
  keyQuotes,
  book,
  interactions,
  interactionsLoading,
  isMarkingRead,
  onTabChange,
  onScrollToChapter,
  onSetReadingStatus,
  onMarkAsRead,
  onNavigateToCategory,
}) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <div className="shrink-0 border-b border-border px-4 pt-2">
        <TabsList className="h-auto w-full justify-start gap-6 bg-transparent p-0">
          <TabsTrigger
            value="chapters"
            className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
          >
            Capitulos
          </TabsTrigger>
          <TabsTrigger
            value="insights"
            className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
          >
            Insights
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="h-0 flex-1 overflow-y-auto">
        {/* Chapters Tab */}
        <TabsContent value="chapters" className="m-0 p-0">
          <ChaptersList
            chapters={chapters}
            onScrollToChapter={onScrollToChapter}
          />
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="m-0 space-y-4 p-6">
          <ReadingStatusCard
            readingStatus={interactions?.readingStatus || 'none'}
            isMarkingRead={isMarkingRead}
            interactionsLoading={interactionsLoading}
            onSetReadingStatus={onSetReadingStatus}
            onMarkAsRead={onMarkAsRead}
          />

          <QuotesSection quotes={keyQuotes} book={book} />

          <ActionPlanCard />

          {book.tags.length > 0 && (
            <TagsSection
              tags={book.tags}
              onNavigateToCategory={onNavigateToCategory}
            />
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default SidebarTabs;
