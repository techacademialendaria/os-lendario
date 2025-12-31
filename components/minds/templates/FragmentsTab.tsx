import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { cn } from '../../../lib/utils';
import {
  MindFragment,
  MindFragmentsResult,
  FragmentUpdate,
  FragmentCreate,
  FRAGMENT_TYPE_LABELS,
  FRAGMENT_TYPE_ICONS,
  FRAGMENT_TYPE_COLORS,
} from '../../../hooks/useMindFragments';
import { FragmentCard } from '../fragments/FragmentCard';
import { FragmentDetailPanel } from '../fragments/FragmentDetailPanel';
import { FragmentDeleteDialog } from '../fragments/FragmentDeleteDialog';
import { FragmentBulkDeleteDialog } from '../fragments/FragmentBulkDeleteDialog';
import { FragmentCreateSheet } from '../fragments/FragmentCreateSheet';

interface FragmentsTabProps {
  fragmentsData: MindFragmentsResult | null;
  loading: boolean;
  mindId: string;
  onUpdateFragment: (id: string, updates: FragmentUpdate) => Promise<boolean>;
  onDeleteFragment: (id: string) => Promise<boolean>;
  onDeleteFragmentsByContentId: (contentId: string) => Promise<{ success: boolean; count: number }>;
  onCreateFragment: (data: FragmentCreate) => Promise<MindFragment | null>;
}

interface ContentGroup {
  contentId: string;
  contentTitle: string;
  fragmentCount: number;
}

export const FragmentsTab: React.FC<FragmentsTabProps> = ({
  fragmentsData,
  loading,
  mindId,
  onUpdateFragment,
  onDeleteFragment,
  onDeleteFragmentsByContentId,
  onCreateFragment,
}) => {
  // UI state
  const [selectedFragment, setSelectedFragment] = useState<MindFragment | null>(null);
  const [expandedContents, setExpandedContents] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterRelevance, setFilterRelevance] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Dialog/Sheet state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fragmentToDelete, setFragmentToDelete] = useState<MindFragment | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<ContentGroup | null>(null);
  const [createSheetOpen, setCreateSheetOpen] = useState(false);

  // Filter fragments based on search and filters
  const filteredFragments = useMemo(() => {
    if (!fragmentsData?.fragments) return [];

    return fragmentsData.fragments.filter(f => {
      // Search filter
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        const matchesSearch =
          f.content.toLowerCase().includes(lowerQuery) ||
          f.context.toLowerCase().includes(lowerQuery) ||
          f.insight.toLowerCase().includes(lowerQuery) ||
          (f.sourceTitle?.toLowerCase().includes(lowerQuery) ?? false) ||
          (f.contentTitle?.toLowerCase().includes(lowerQuery) ?? false);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (filterType && f.type !== filterType) return false;

      // Relevance filter
      if (filterRelevance !== 'all') {
        if (filterRelevance === 'high' && f.relevance < 8) return false;
        if (filterRelevance === 'medium' && (f.relevance < 5 || f.relevance >= 8)) return false;
        if (filterRelevance === 'low' && f.relevance >= 5) return false;
      }

      return true;
    });
  }, [fragmentsData?.fragments, searchQuery, filterType, filterRelevance]);

  // Group filtered fragments by content (source)
  const groupedByContent = useMemo(() => {
    const grouped: Record<string, MindFragment[]> = {};

    filteredFragments.forEach(f => {
      const contentId = f.contentId || 'unknown';
      if (!grouped[contentId]) {
        grouped[contentId] = [];
      }
      grouped[contentId].push(f);
    });

    return grouped;
  }, [filteredFragments]);

  // Get sorted content IDs (by fragment count)
  const sortedContentIds = useMemo(() => {
    return Object.keys(groupedByContent).sort((a, b) => {
      return groupedByContent[b].length - groupedByContent[a].length;
    });
  }, [groupedByContent]);

  // Get content title for a content ID
  const getContentTitle = useCallback((contentId: string): string => {
    const fragment = groupedByContent[contentId]?.[0];
    return fragment?.contentTitle || fragment?.sourceTitle || 'Conteúdo sem título';
  }, [groupedByContent]);

  // Toggle content expansion
  const toggleContent = (contentId: string) => {
    setExpandedContents(prev => {
      const next = new Set(prev);
      if (next.has(contentId)) {
        next.delete(contentId);
      } else {
        next.add(contentId);
      }
      return next;
    });
  };

  // Expand first 3 contents on initial load
  React.useEffect(() => {
    if (sortedContentIds.length > 0 && expandedContents.size === 0) {
      setExpandedContents(new Set(sortedContentIds.slice(0, 3)));
    }
  }, [sortedContentIds]);

  // Select first fragment if none selected
  React.useEffect(() => {
    if (!selectedFragment && filteredFragments.length > 0) {
      setSelectedFragment(filteredFragments[0]);
    }
  }, [filteredFragments, selectedFragment]);

  // Handle delete request (single fragment)
  const handleDeleteRequest = useCallback((id: string) => {
    const fragment = fragmentsData?.fragments.find(f => f.id === id);
    if (fragment) {
      setFragmentToDelete(fragment);
      setDeleteDialogOpen(true);
    }
  }, [fragmentsData?.fragments]);

  // Handle delete confirmation (single fragment)
  const handleDeleteConfirm = useCallback(async (id: string) => {
    const success = await onDeleteFragment(id);
    if (success) {
      if (selectedFragment?.id === id) {
        const remaining = filteredFragments.filter(f => f.id !== id);
        setSelectedFragment(remaining[0] || null);
      }
      setFragmentToDelete(null);
    }
    return success;
  }, [onDeleteFragment, selectedFragment?.id, filteredFragments]);

  // Handle bulk delete request (all fragments from a content)
  const handleBulkDeleteRequest = useCallback((contentId: string) => {
    const fragments = groupedByContent[contentId];
    if (fragments && fragments.length > 0) {
      setContentToDelete({
        contentId,
        contentTitle: getContentTitle(contentId),
        fragmentCount: fragments.length,
      });
      setBulkDeleteDialogOpen(true);
    }
  }, [groupedByContent, getContentTitle]);

  // Handle bulk delete confirmation
  const handleBulkDeleteConfirm = useCallback(async (contentId: string) => {
    const result = await onDeleteFragmentsByContentId(contentId);
    if (result.success) {
      // If we deleted the content that contains the selected fragment, select another
      if (selectedFragment?.contentId === contentId) {
        const remaining = filteredFragments.filter(f => f.contentId !== contentId);
        setSelectedFragment(remaining[0] || null);
      }
      setContentToDelete(null);
    }
    return result;
  }, [onDeleteFragmentsByContentId, selectedFragment?.contentId, filteredFragments]);

  // Navigate to a fragment (for relationships)
  const handleNavigateToFragment = useCallback((fragmentId: string) => {
    const fragment = fragmentsData?.fragments.find(f => f.id === fragmentId);
    if (fragment) {
      setSelectedFragment(fragment);
      // Expand the content group if not expanded
      if (!expandedContents.has(fragment.contentId)) {
        setExpandedContents(prev => new Set([...prev, fragment.contentId]));
      }
    }
  }, [fragmentsData?.fragments, expandedContents]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!fragmentsData || fragmentsData.fragments.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Icon name="box" size="size-12" className="mx-auto mb-4 opacity-50" />
        <p>Nenhum fragmento extraído para esta mente.</p>
        <p className="text-sm mt-2 opacity-70">
          Execute o pipeline InnerLens para extrair fragmentos dos conteúdos.
        </p>
        <Button
          onClick={() => setCreateSheetOpen(true)}
          className="mt-4 bg-brand-gold hover:bg-brand-gold/90 text-black"
        >
          <Icon name="plus" size="size-4" className="mr-2" />
          Adicionar Fragmento Manual
        </Button>

        <FragmentCreateSheet
          open={createSheetOpen}
          onOpenChange={setCreateSheetOpen}
          mindId={mindId}
          onCreate={onCreateFragment}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full min-h-[600px]">
      {/* Stats Header */}
      <div className="grid grid-cols-4 gap-3">
        <Card className="bg-muted/20 border-white/5">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="box" className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{fragmentsData.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Icon name="arrow-up" className="text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{fragmentsData.byRelevance.high}</div>
              <div className="text-xs text-muted-foreground">Alta Relevância</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Icon name="minus" className="text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{fragmentsData.byRelevance.medium}</div>
              <div className="text-xs text-muted-foreground">Média</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-500/5 border-zinc-500/20">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-500/10 flex items-center justify-center">
              <Icon name="arrow-small-down" className="text-zinc-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-zinc-400">{fragmentsData.byRelevance.low}</div>
              <div className="text-xs text-muted-foreground">Baixa</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters + Create Button */}
      <div className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg border border-white/5">
        <div className="relative flex-1 max-w-md">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            placeholder="Buscar nos fragmentos..."
            className="pl-9 h-9 bg-black/20 border-transparent focus:border-brand-gold/30 text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Relevance Filter */}
        <div className="flex items-center gap-1 bg-black/40 rounded-md p-1 border border-white/5">
          {(['all', 'high', 'medium', 'low'] as const).map((level) => (
            <Button
              key={level}
              variant={filterRelevance === level ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilterRelevance(level)}
              className="h-7 px-2 text-xs"
            >
              {level === 'all' ? 'Todos' : level === 'high' ? 'Alta' : level === 'medium' ? 'Média' : 'Baixa'}
            </Button>
          ))}
        </div>

        {/* Type Filter */}
        {filterType && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterType(null)}
            className="h-7 text-xs gap-1"
          >
            <Icon name={FRAGMENT_TYPE_ICONS[filterType] || 'file'} size="size-3" />
            {FRAGMENT_TYPE_LABELS[filterType] || filterType}
            <Icon name="times" size="size-3" className="ml-1" />
          </Button>
        )}

        {/* Create Button */}
        <Button
          onClick={() => setCreateSheetOpen(true)}
          size="sm"
          className="h-7 ml-auto bg-brand-gold hover:bg-brand-gold/90 text-black text-xs"
        >
          <Icon name="plus" size="size-3" className="mr-1" />
          Novo
        </Button>
      </div>

      {/* Main Content - Detail left, Sidebar right */}
      <div className="flex gap-6">
        {/* Fragment Viewer/Editor - Left side */}
        <FragmentDetailPanel
          fragment={selectedFragment}
          onUpdate={onUpdateFragment}
          onDelete={handleDeleteRequest}
          onNavigateToFragment={handleNavigateToFragment}
        />

        {/* Sidebar - Grouped by Content - Right side */}
        <Card className="w-96 shrink-0 rounded-xl border-border bg-card/50 flex flex-col">
          <CardHeader className="py-3 px-4 border-b border-border">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon name="document" size="size-4" className="text-primary" />
                Por Conteúdo
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
                        onClick={() => toggleContent(contentId)}
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

                      {/* Count Badge - sempre visível, alinhado */}
                      <span className="text-[10px] text-muted-foreground/50 font-mono tabular-nums shrink-0 w-8 text-right">
                        {fragments?.length}
                      </span>

                      {/* Delete All Button - aparece no hover */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBulkDeleteRequest(contentId);
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
                            onClick={() => setSelectedFragment(fragment)}
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
      </div>

      {/* Delete Dialog (single fragment) */}
      <FragmentDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        fragment={fragmentToDelete}
        onConfirm={handleDeleteConfirm}
      />

      {/* Bulk Delete Dialog (all fragments from a content) */}
      <FragmentBulkDeleteDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        contentGroup={contentToDelete}
        onConfirm={handleBulkDeleteConfirm}
      />

      {/* Create Sheet */}
      <FragmentCreateSheet
        open={createSheetOpen}
        onOpenChange={setCreateSheetOpen}
        mindId={mindId}
        onCreate={onCreateFragment}
      />
    </div>
  );
};

export default FragmentsTab;
