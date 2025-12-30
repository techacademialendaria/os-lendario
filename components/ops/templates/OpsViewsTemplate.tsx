import React, { useState, useEffect } from 'react';
import { Section } from '../../../types';
import { Icon } from '../../ui/icon';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import OpsTopbar from '../OpsTopbar';
import ViewsSection from '../sections/ViewsSection';
import { useOpsStats } from '../../../hooks/useOpsStats';
import { useViewsData } from '../../../hooks/useViewsData';

interface OpsViewsTemplateProps {
  setSection: (s: Section) => void;
}

// Navigation structure template
const getNavGroups = (viewsData: any) => [
  {
    title: 'Core Entities',
    items: [
      { id: 'minds', label: 'Minds', icon: 'brain', count: viewsData.minds?.length || 0 },
      { id: 'contents', label: 'Contents', icon: 'file-text', count: viewsData.contents?.length || 0 },
    ]
  },
  {
    title: 'Cognitive Engine',
    items: [
      { id: 'drivers', label: 'Drivers & Traits', icon: 'bolt', count: viewsData.drivers?.length || 0 },
      { id: 'tools', label: 'Tools Catalog', icon: 'settings-sliders', count: viewsData.tools?.length || 0 },
      { id: 'mapping', label: 'Mapping Systems', icon: 'chart-pie', count: viewsData.mappingSystems?.length || 0 },
      { id: 'affinity', label: 'Tool & Driver Affinity', icon: 'network', count: viewsData.toolAffinities?.length || 0 },
    ]
  }
];

const OpsViewsTemplate: React.FC<OpsViewsTemplateProps> = ({ setSection }) => {
  const [activeView, setActiveView] = useState<'tools' | 'drivers' | 'mapping' | 'affinity' | 'minds' | 'contents'>('minds');
  const { stats, loading } = useOpsStats();
  const { data: viewsData, loading: viewsLoading, error: viewsError } = useViewsData();

  const NAV_GROUPS = getNavGroups(viewsData);

  // Hash-based navigation synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && NAV_GROUPS.some(g => g.items.some(i => i.id === hash))) {
        setActiveView(hash as any);
      }
    };

    // Initialize from hash on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleViewChange = (id: string) => {
    setActiveView(id as any);
    window.location.hash = `#${id}`;
  };

  const activeGroup = NAV_GROUPS.find(g => g.items.some(i => i.id === activeView));
  const activeItem = activeGroup?.items.find(i => i.id === activeView);

  return (
    <div className="flex flex-col h-screen bg-background font-sans overflow-hidden">
      {/* Top Bar (Fixed) */}
      <div className="flex-none z-10 bg-background/80 backdrop-blur-md border-b border-border/40">
        <OpsTopbar currentSection={Section.STUDIO_OPS_VIEWS} setSection={setSection} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Fixed Width, Scrollable) */}
        <aside className="w-64 flex-none border-r border-border/40 bg-muted/5 flex flex-col hidden md:flex">
          <div className="p-4 border-b border-border/20">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Table Views</h2>
            <p className="text-[10px] text-muted-foreground/70">Interactive data explorer</p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-6">
            {NAV_GROUPS.map((group, idx) => (
              <div key={idx}>
                <h3 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">{group.title}</h3>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleViewChange(item.id)}
                        className={cn(
                          "w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 group/item text-sm",
                          isActive
                            ? "bg-primary/10 border border-primary/30"
                            : "border border-transparent hover:bg-muted/30"
                        )}
                        aria-label={`View ${item.label}`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon
                          name={item.icon as any}
                          size="size-4"
                          className={cn(
                            "flex-shrink-0 transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground group-hover/item:text-foreground"
                          )}
                        />
                        <span className={cn(
                          "flex-1 truncate",
                          isActive ? "text-primary font-medium" : "text-foreground"
                        )}>
                          {item.label}
                        </span>
                        <span className={cn(
                          "flex-shrink-0 text-[10px] font-mono font-bold rounded px-2 py-1",
                          isActive
                            ? "bg-primary/20 text-primary"
                            : "bg-muted/50 text-muted-foreground"
                        )}>
                          {item.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border/20 bg-muted/10">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Total Views</span>
              <span className="font-mono font-bold">{NAV_GROUPS.reduce((sum, g) => sum + g.items.length, 0)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
              <span>Total Records</span>
              <span className="font-mono font-bold">
                {NAV_GROUPS.reduce((sum, g) => sum + g.items.reduce((itemSum, item) => itemSum + item.count, 0), 0)}
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto bg-background/50">
          <div className="max-w-[1400px] mx-auto p-6 md:p-10 space-y-6 animate-fade-in">

            {/* Context Header */}
            <div className="border-b border-border/30 pb-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Icon name="table" size="size-4" className="opacity-60" />
                    {activeGroup?.title || 'Table Views'}
                  </div>
                  <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                    {activeItem && (
                      <>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10">
                          <Icon
                            name={activeItem.icon as any}
                            size="size-5"
                            className="text-primary"
                          />
                        </div>
                        {activeItem.label}
                      </>
                    )}
                  </h1>
                </div>

                <div className="hidden md:block">
                  <Badge variant="outline" className="text-xs font-mono">
                    {activeItem?.count || 0} Records
                  </Badge>
                </div>
              </div>
            </div>

            {/* Views Content */}
            <div className="min-h-[600px]">
              <ViewsSection
                activeView={activeView as any}
                data={viewsData}
                loading={viewsLoading}
              />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default OpsViewsTemplate;
