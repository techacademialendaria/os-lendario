import React, { useState, useEffect, useMemo } from 'react';
import { Section } from '../../../types';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import LearnTopbar from '../../learn/LearnTopbar';
import { GroupsOverview } from '../groups/GroupsOverview';
import { GroupsDashboard } from '../groups/GroupsDashboard';
import { GroupsReports } from '../groups/GroupsReports';
import { useGroups } from '../../../hooks/useGroups';
import { ScrollArea } from '../../ui/scroll-area';

interface GroupsTemplateProps {
  setSection: (s: Section) => void;
}

// Navigation structure for Groups
const NAV_GROUPS = [
  {
    title: 'Visão Geral',
    items: [
      { id: 'overview', label: 'Dashboard', icon: 'layout-dashboard', count: null },
      { id: 'reports', label: 'Relatórios', icon: 'chart-pie', count: null },
    ]
  },
  {
    title: 'Saúde dos Grupos',
    items: [
      { id: 'positive', label: 'Grupos Positivos', icon: 'check-circle', count: 'positive', variant: 'success' },
      { id: 'neutral', label: 'Grupos Neutros', icon: 'minus-circle', count: 'neutral', variant: 'warning' },
      { id: 'negative', label: 'Grupos Negativos', icon: 'exclamation-circle', count: 'negative', variant: 'danger' },
    ]
  },
];

const GroupsTemplate: React.FC<GroupsTemplateProps> = ({ setSection }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { groupsSummary, stats, loading } = useGroups();

  // Filter groups by search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groupsSummary;
    return groupsSummary.filter(g =>
      g.grupo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [groupsSummary, searchQuery]);

  // Get sentiment dot color
  const getSentimentDot = (sentiment: string) => {
    const s = sentiment?.toLowerCase();
    if (s === 'positivo') return 'bg-green-500';
    if (s === 'negativo') return 'bg-red-500';
    return 'bg-amber-500';
  };

  // Hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && NAV_GROUPS.some(g => g.items.some(i => i.id === hash))) {
        setActiveTab(hash);
        setSelectedGroup(null);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setSelectedGroup(null);
    window.location.hash = `#${id}`;
  };

  const handleGroupSelect = (groupName: string) => {
    setSelectedGroup(groupName);
  };

  const handleBackToOverview = () => {
    setSelectedGroup(null);
    setActiveTab('overview');
    window.location.hash = '#overview';
  };

  // Get count based on stats
  const getCount = (key: string | null) => {
    if (!key || !stats) return null;
    return stats[key as keyof typeof stats] ?? null;
  };

  // Filter groups by sentiment (uses lastSentiment from GroupSummary)
  const getFilteredGroups = () => {
    if (!groupsSummary) return [];
    switch (activeTab) {
      case 'positive':
        return groupsSummary.filter((g) => g.lastSentiment === 'positivo');
      case 'neutral':
        return groupsSummary.filter((g) => g.lastSentiment === 'neutro');
      case 'negative':
        return groupsSummary.filter((g) => g.lastSentiment === 'negativo');
      default:
        return groupsSummary;
    }
  };

  const renderContent = () => {
    // If a group is selected, show detail view
    if (selectedGroup) {
      return (
        <GroupsDashboard
          groupName={selectedGroup}
          onBack={handleBackToOverview}
        />
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <GroupsOverview
            onGroupSelect={handleGroupSelect}
            onNavigateToReports={() => handleTabChange('reports')}
          />
        );
      case 'reports':
        return <GroupsReports onBack={handleBackToOverview} />;
      case 'positive':
      case 'neutral':
      case 'negative':
        return (
          <GroupsOverview
            onGroupSelect={handleGroupSelect}
            onNavigateToReports={() => handleTabChange('reports')}
            filterSentiment={activeTab === 'positive' ? 'positivo' : activeTab === 'neutral' ? 'neutro' : 'negativo'}
          />
        );
      default:
        return (
          <GroupsOverview
            onGroupSelect={handleGroupSelect}
            onNavigateToReports={() => handleTabChange('reports')}
          />
        );
    }
  };

  const activeGroup = NAV_GROUPS.find(g => g.items.some(i => i.id === activeTab));
  const activeItem = activeGroup?.items.find(i => i.id === activeTab);

  return (
    <div className="flex flex-col h-screen bg-background font-sans overflow-hidden">
      {/* Top Bar (Fixed) */}
      <div className="flex-none z-10 bg-background/80 backdrop-blur-md border-b border-border/40">
        <LearnTopbar
          currentSection={Section.APP_LEARN_GROUPS}
          setSection={setSection}
          groupsSubNav={{
            activeTab,
            onTabChange: handleTabChange,
            selectedGroup,
          }}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Fixed Width, Scrollable) */}
        <aside className="w-72 flex-none border-r border-border/40 bg-muted/5 flex flex-col hidden md:flex">
          {/* Quick Stats */}
          <div className="px-4 py-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-500/15 rounded-xl p-2.5 text-center border border-green-500/20 transition-all hover:bg-green-500/20">
                <div className="text-xl font-bold text-green-500">{loading ? '...' : stats?.positive ?? 0}</div>
                <div className="text-[10px] text-green-400/70 font-medium uppercase tracking-wide">Positivos</div>
              </div>
              <div className="bg-red-500/15 rounded-xl p-2.5 text-center border border-red-500/20 transition-all hover:bg-red-500/20">
                <div className="text-xl font-bold text-red-500">{loading ? '...' : stats?.negative ?? 0}</div>
                <div className="text-[10px] text-red-400/70 font-medium uppercase tracking-wide">Negativos</div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="px-4 pb-2">
            <div className="relative group">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/40 transition-colors group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Buscar grupo..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 h-9 text-sm rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Groups Header */}
          <div className="px-4 py-2">
            <span className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-widest">
              Grupos ({filteredGroups.length})
            </span>
          </div>

          {/* Groups List */}
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-0.5 pb-4">
              {loading ? (
                <div className="space-y-1 px-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2 px-2.5 py-2">
                      <div className="w-2 h-2 rounded-full bg-muted animate-pulse" />
                      <div className="h-4 flex-1 bg-muted animate-pulse rounded" />
                    </div>
                  ))}
                </div>
              ) : filteredGroups.length === 0 ? (
                <div className="px-2 py-4 text-center">
                  <div className="text-xs text-muted-foreground">
                    {searchQuery ? 'Nenhum resultado' : 'Sem grupos'}
                  </div>
                </div>
              ) : (
                filteredGroups.map(group => (
                  <button
                    key={group.grupo}
                    onClick={() => handleGroupSelect(group.grupo)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group",
                      selectedGroup === group.grupo
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <div className={cn(
                      "w-2.5 h-2.5 rounded-full flex-shrink-0",
                      getSentimentDot(group.lastSentiment)
                    )} />
                    <span className="flex-1 text-sm font-medium truncate">{group.grupo}</span>
                    {group.hasComplaints && (
                      <Icon name="warning-triangle" className="size-3.5 text-amber-500 flex-shrink-0" />
                    )}
                    <Icon name="chevron-right" className={cn(
                      "size-4 flex-shrink-0 transition-opacity duration-200",
                      selectedGroup === group.grupo ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    )} />
                  </button>
                ))
              )}
            </div>
          </ScrollArea>

        </aside>

        {/* Main Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto bg-background/50">
          <div className="max-w-[1400px] mx-auto p-6 md:p-10 space-y-6 animate-fade-in">
            {/* Context Header - Only show when not in detail view */}
            {!selectedGroup && (
              <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    {activeGroup?.title}
                    <Icon name="chevron-right" size="size-3" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <Icon name={activeItem?.icon || 'circle'} className="size-6 text-emerald-400/80" />
                    {activeItem?.label}
                  </h1>
                </div>
                <div className="hidden md:block">
                  {activeItem?.count && (
                    <Badge variant="outline" className="text-xs font-mono border-emerald-500/30 text-emerald-400">
                      {getCount(activeItem.count)} Grupos
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Render Active Section */}
            <div className="min-h-[500px]">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GroupsTemplate;
