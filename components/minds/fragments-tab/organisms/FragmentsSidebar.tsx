import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { FragmentCard } from '../../fragments/FragmentCard';
import type { MindFragment } from '../types';

interface FragmentsSidebarProps {
  sortedContentIds: string[];
  groupedByContent: Record<string, MindFragment[]>;
  expandedContents: Set<string>;
  selectedFragment: MindFragment | null;
  onToggleContent: (contentId: string) => void;
  onSelectFragment: (fragment: MindFragment) => void;
  onBulkDeleteRequest: (contentId: string) => void;
  getContentTitle: (contentId: string) => string;
}

export const FragmentsSidebar: React.FC<FragmentsSidebarProps> = ({
  sortedContentIds,
  groupedByContent,
  expandedContents,
  selectedFragment,
  onToggleContent,
  onSelectFragment,
  onBulkDeleteRequest,
  getContentTitle,
}) => {
  return (
    <Card className="w-96 shrink-0 rounded-xl border-border bg-card/50 flex flex-col">
      <CardHeader className="py-3 px-4 border-b border-border">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Icon name="document" size="size-4" className="text-primary" />
            Por Conteudo
          </span>
          <Badge variant="secondary" className="text-xs font-mono">
            {sortedContentIds.length} fonte{sortedContentIds.length !== 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {sortedContentIds.length === 0 && (
            <div className="p-4 text-center text-xs text-muted-foreground">
              Nenhum fragmento encontrado.
            </div>
          )}
          {sortedContentIds.map(contentId => {
            const fragments = groupedByContent[contentId];
            const contentTitle = getContentTitle(contentId);
            const isExpanded = expandedContents.has(contentId);

            return (
              <div key={contentId} className="mb-1">
                {/* Content Header */}
                <div className="flex items-center gap-1 group px-2 py-1.5 rounded-md hover:bg-muted/20 transition-colors">
                  <button
                    onClick={() => onToggleContent(contentId)}
                    className="flex items-center gap-2 flex-1 min-w-0 text-left"
                  >
                    <Icon
                      name={isExpanded ? 'angle-down' : 'angle-right'}
                      size="size-3"
                      className="text-muted-foreground opacity-70 shrink-0"
                    />
                    <Icon
                      name="document"
                      size="size-3"
                      className={cn(
                        "transition-colors shrink-0",
                        isExpanded ? "text-brand-gold" : "text-muted-foreground"
                      )}
                    />
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground flex-1 min-w-0 truncate">
                      {contentTitle}
                    </span>
                  </button>

                  {/* Count Badge */}
                  <span className="text-[10px] text-muted-foreground/50 font-mono tabular-nums shrink-0 w-8 text-right">
                    {fragments?.length}
                  </span>

                  {/* Delete All Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBulkDeleteRequest(contentId);
                    }}
                    className="h-6 w-6 p-0 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:bg-red-500/20 hover:text-red-400"
                    title={`Excluir todos os ${fragments?.length} fragmentos`}
                  >
                    <Icon name="trash" size="size-3" />
                  </Button>
                </div>

                {/* Content Items (Fragments) */}
                {isExpanded && (
                  <div className="ml-2 pl-2 border-l border-border mt-0.5 space-y-0.5">
                    {fragments?.map(fragment => (
                      <FragmentCard
                        key={fragment.id}
                        fragment={fragment}
                        isSelected={selectedFragment?.id === fragment.id}
                        onClick={() => onSelectFragment(fragment)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};
