import React, { useState, useMemo } from 'react';
import { marked } from 'marked';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { cn } from '../../../lib/utils';
import {
  MindContent,
  MindContentsResult,
  categorizeContent,
  CONTENT_CATEGORY_LABELS,
  CONTENT_CATEGORY_ICONS,
} from '../../../hooks/useMindContents';
import { YamlViewer, JsonViewer, isYamlContent, isJsonContent } from '../ui/yaml-viewer';

interface ContentsTabProps {
  contentsData: MindContentsResult | null;
  loading: boolean;
}

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Helper: Convert markdown to HTML
const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';
  try {
    return marked.parse(markdown, { async: false }) as string;
  } catch {
    return markdown;
  }
};

// Category order for display
const CATEGORY_ORDER = ['courses', 'newsletter', 'multimedia', 'articles', 'other'];

// Helper to get file type info
const getContentType = (filename: string | null, format?: string) => {
  if (format)
    return {
      label: format.toUpperCase(),
      icon: 'file',
      color: 'text-zinc-400',
      bg: 'bg-zinc-400/10',
    };

  if (!filename)
    return { label: 'TXT', icon: 'document', color: 'text-zinc-400', bg: 'bg-zinc-400/10' };
  const ext = filename.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'yaml':
    case 'yml':
      return {
        label: 'YAML',
        icon: 'database',
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
      };
    case 'md':
    case 'markdown':
      return { label: 'MD', icon: 'file-text', color: 'text-blue-400', bg: 'bg-blue-400/10' };
    case 'json':
      return { label: 'JSON', icon: 'code', color: 'text-amber-400', bg: 'bg-amber-400/10' };
    default:
      return {
        label: ext?.toUpperCase() || 'FILE',
        icon: 'document',
        color: 'text-zinc-400',
        bg: 'bg-zinc-400/10',
      };
  }
};

export const ContentsTab: React.FC<ContentsTabProps> = ({ contentsData, loading }) => {
  const [selectedContent, setSelectedContent] = useState<MindContent | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['courses', 'articles'])
  );
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter contents based on search
  const filteredContents = useMemo(() => {
    if (!contentsData?.contents) return [];
    if (!searchQuery) return contentsData.contents;

    const lowerQuery = searchQuery.toLowerCase();
    return contentsData.contents.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.content.toLowerCase().includes(lowerQuery)
    );
  }, [contentsData?.contents, searchQuery]);

  // Group filtered contents by category
  const categorizedContents = useMemo(() => {
    const grouped: Record<string, MindContent[]> = {};

    filteredContents.forEach((item) => {
      const category = categorizeContent(item);
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });

    // Sort contents within each category by title
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    });

    return grouped;
  }, [filteredContents]);

  // Get sorted categories that have contents
  const sortedCategories = useMemo(() => {
    return CATEGORY_ORDER.filter((cat) => categorizedContents[cat]?.length > 0);
  }, [categorizedContents]);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Select first content on initial load (only in list mode if nothing selected)
  React.useEffect(() => {
    if (viewMode === 'list' && !selectedContent && sortedCategories.length > 0 && !searchQuery) {
      const firstCategory = sortedCategories[0];
      const firstContent = categorizedContents[firstCategory]?.[0];
      if (firstContent) {
        setSelectedContent(firstContent);
        setExpandedCategories((prev) => new Set([...prev, firstCategory]));
      }
    }
  }, [sortedCategories, categorizedContents, selectedContent, viewMode, searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!contentsData || contentsData.contents.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <Icon name="document" size="size-12" className="mx-auto mb-4 opacity-50" />
        <p>Nenhum conteúdo disponível para esta mente.</p>
      </div>
    );
  }

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 gap-4 pb-20 md:grid-cols-2 lg:grid-cols-3">
      {sortedCategories.map((category) => (
        <React.Fragment key={category}>
          <div className="col-span-full mb-2 mt-4 flex items-center gap-2 border-b border-white/5 pb-2">
            <Icon name={CONTENT_CATEGORY_ICONS[category]} className="text-studio-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {CONTENT_CATEGORY_LABELS[category]}
            </span>
          </div>
          {categorizedContents[category]?.map((item) => {
            const typeInfo = getContentType(item.sourceFile, item.format);

            return (
              <Card
                key={item.id}
                className="group relative flex h-[180px] cursor-pointer flex-col overflow-hidden border-white/5 bg-zinc-900/40 transition-all hover:border-studio-primary/30 hover:bg-zinc-900/60"
                onClick={() => {
                  setSelectedContent(item);
                  setViewMode('list');
                }}
              >
                <CardHeader className="flex-none pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2 flex-1 text-sm font-medium leading-relaxed">
                      {item.title}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={cn(
                        'h-5 shrink-0 border-0 px-1.5 text-[10px]',
                        typeInfo.bg,
                        typeInfo.color
                      )}
                    >
                      {typeInfo.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    {item.sourceFile && (
                      <span className="max-w-[150px] truncate opacity-70">
                        {item.sourceFile.split('/').pop()}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="relative flex-1 overflow-hidden">
                  <div className="mask-linear-fade h-full font-mono text-xs leading-relaxed text-muted-foreground/60">
                    {item.content.slice(0, 300)}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-900/90 to-transparent" />
                </CardContent>
              </Card>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="h-full min-h-[600px] space-y-4">
      {/* Toolbox Header */}
      <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-muted/20 p-1">
        <div className="relative max-w-md flex-1">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Buscar nos conteúdos..."
            className="h-9 border-transparent bg-black/20 pl-9 text-xs focus:border-studio-primary/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 rounded-md border border-white/5 bg-black/40 p-1">
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-7 px-2"
          >
            <Icon name="columns" size="size-3" className="mr-1.5" /> Split
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="h-7 px-2"
          >
            <Icon name="grid" size="size-3" className="mr-1.5" /> Grid
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <GridView />
      ) : (
        <div className="flex h-[calc(100vh-350px)] min-h-[500px] gap-6">
          {/* Sidebar */}
          <Card className="flex w-80 shrink-0 flex-col rounded-xl border-border bg-card/50">
            <CardHeader className="border-b border-border px-4 py-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium">
                <span className="flex items-center gap-2">
                  <Icon name="folder" size="size-4" className="text-primary" />
                  Índice
                </span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {filteredContents.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {sortedCategories.length === 0 && (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    Nenhum conteúdo encontrado.
                  </div>
                )}
                {sortedCategories.map((category) => (
                  <div key={category} className="mb-1">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-white/5"
                    >
                      <Icon
                        name={expandedCategories.has(category) ? 'angle-down' : 'angle-right'}
                        size="size-3"
                        className="text-muted-foreground opacity-70"
                      />
                      <Icon
                        name={CONTENT_CATEGORY_ICONS[category] || 'folder'}
                        size="size-3"
                        className={cn(
                          'transition-colors',
                          expandedCategories.has(category)
                            ? 'text-studio-primary'
                            : 'text-muted-foreground group-hover:text-studio-primary/70'
                        )}
                      />
                      <span className="flex-1 text-xs font-medium text-muted-foreground group-hover:text-foreground">
                        {CONTENT_CATEGORY_LABELS[category] || category}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground/40">
                        {categorizedContents[category]?.length}
                      </span>
                    </button>

                    {/* Category Items */}
                    {expandedCategories.has(category) && (
                      <div className="ml-2 mt-0.5 space-y-0.5 border-l border-white/5 pl-2">
                        {categorizedContents[category]?.map((item) => {
                          const typeInfo = getContentType(item.sourceFile, item.format);
                          return (
                            <button
                              key={item.id}
                              onClick={() => setSelectedContent(item)}
                              className={cn(
                                'group/item relative flex w-full items-center gap-2 overflow-hidden rounded-md px-3 py-2 text-left text-xs transition-all',
                                selectedContent?.id === item.id
                                  ? 'bg-studio-primary/10 font-medium text-studio-primary hover:bg-studio-primary/15'
                                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                              )}
                            >
                              {selectedContent?.id === item.id && (
                                <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-studio-primary" />
                              )}

                              <span className="line-clamp-1 flex-1">{item.title}</span>

                              <Badge
                                variant="outline"
                                className={cn(
                                  'h-4 shrink-0 border-0 px-1 text-[8px] leading-none opacity-50 grayscale transition-all group-hover/item:opacity-100 group-hover/item:grayscale-0',
                                  typeInfo.bg,
                                  typeInfo.color
                                )}
                              >
                                {typeInfo.label}
                              </Badge>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Content Viewer */}
          <Card className="bg-studio-card flex flex-1 flex-col overflow-hidden rounded-xl border-border">
            {selectedContent ? (
              <>
                <div className="flex shrink-0 items-start justify-between border-b border-border/50 bg-black/20 px-5 py-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <Icon
                        name={CONTENT_CATEGORY_ICONS[categorizeContent(selectedContent)]}
                        size="size-3"
                      />
                      <span>{CONTENT_CATEGORY_LABELS[categorizeContent(selectedContent)]}</span>
                      {selectedContent.sourceFile && (
                        <>
                          <span className="opacity-30">|</span>
                          <span className="opacity-70">
                            {selectedContent.sourceFile.split('/').pop()}
                          </span>
                        </>
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold text-white/90">
                      {selectedContent.title}
                    </CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs hover:bg-studio-primary/10 hover:text-studio-primary"
                    >
                      <Icon name="copy" size="size-3" className="mr-1.5" /> Copy
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <CardContent className="mx-auto max-w-4xl pb-20 pt-6">
                    {isYamlContent(selectedContent.content || '', selectedContent.sourceFile) ? (
                      <YamlViewer content={selectedContent.content || ''} />
                    ) : isJsonContent(selectedContent.content || '', selectedContent.sourceFile) ? (
                      <JsonViewer content={selectedContent.content || ''} />
                    ) : (
                      <article
                        className="prose prose-invert prose-sm prose-headings:text-foreground prose-headings:font-semibold prose-h1:text-2xl prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-2 prose-h1:mb-6 prose-h1:mt-2 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-studio-primary/90 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-white/80 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4 prose-a:text-studio-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-strong:font-semibold prose-code:text-studio-primary/90 prose-code:bg-studio-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:p-4 prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-studio-primary/50 prose-blockquote:border-l-studio-primary/50 prose-blockquote:bg-studio-primary/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r prose-blockquote:text-muted-foreground prose-blockquote:italic prose-hr:border-white/10 max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: markdownToHtml(selectedContent.content || ''),
                        }}
                      />
                    )}
                  </CardContent>
                </ScrollArea>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/5">
                    <Icon name="document" size="size-8" className="opacity-30" />
                  </div>
                  <p className="text-sm font-medium text-white/50">
                    Selecione um conteúdo para visualizar
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
