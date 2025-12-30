import React, { useState, useEffect } from 'react';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { cn } from '../../../lib/utils';
import OpsTopbar from '../OpsTopbar';
import { PipelineSection } from '../sections/PipelineSection';
import { MIUSection } from '../sections/MIUSection';
import { DriversSection } from '../sections/DriversSection';
import { MappingSection } from '../sections/MappingSection';
import { ToolsSection } from '../sections/ToolsSection';
import { ToolStackMappingSection } from '../sections/ToolStackMappingSection';
import { ToolStacksGridSection } from '../sections/ToolStacksGridSection';
import { GapsSection } from '../sections/GapsSection';
import { ExampleSection } from '../sections/ExampleSection';
import { MindsSection } from '../sections/MindsSection';
import { ContentsSection } from '../sections/ContentsSection';
import { JobsSection } from '../sections/JobsSection';
import { RelationshipsSection, AssessmentSystemsSection, InferenceBridgeSection } from '../sections';
import MentalModelsSection from '../sections/MentalModelsSection';
import { useOpsStats } from '../../../hooks/useOpsStats';
import { OPS_KPI_CLASSES, OPS_CARD_CLASSES } from '../ops-tokens';

interface OpsDBTemplateProps {
  setSection: (s: Section) => void;
}

// Grouped Navigation Structure
const NAV_GROUPS = [
  {
    title: 'Architecture',
    items: [
      { id: 'pipeline', label: 'Pipeline View', icon: 'code-branch', count: null },
    ]
  },
  {
    title: 'Core Entities',
    items: [
      { id: 'minds', label: 'Minds', icon: 'brain', count: 'minds' },
      { id: 'contents', label: 'Contents', icon: 'file-edit', count: 'contents' },
      { id: 'miu', label: 'MIUs & Fragments', icon: 'puzzle', count: 'fragments' },
    ]
  },
  {
    title: 'Cognitive Engine',
    items: [
      { id: 'bridge', label: 'The Inference Bridge', icon: 'git-branch', count: null },
      { id: 'drivers', label: 'Drivers (Scientific)', icon: 'bolt', count: 'drivers' },
      { id: 'relationships', label: 'Driver Relationships', icon: 'network', count: 'driverRels' },
      { id: 'mapping', label: 'Mapping Systems', icon: 'chart-pie', count: 'systems' },
      { id: 'assessment', label: 'Assessment Systems', icon: 'layers', count: 'systems' },
      { id: 'tools', label: 'Tools & Models', icon: 'settings-sliders', count: 'tools' },
      { id: 'tool-stacks', label: 'Tool Stacks x Mapping', icon: 'grid-3x3', count: null },
      { id: 'stacks-grid', label: 'Tool Stacks Grid', icon: 'layout-grid', count: null },
      { id: 'mental-models', label: 'Mental Models', icon: 'lightbulb', count: null },
    ]
  },
  {
    title: 'Operations',
    items: [
      { id: 'jobs', label: 'Jobs & Queue', icon: 'list-check', count: 'jobExecutions' },
      { id: 'gaps', label: 'Critical Gaps', icon: 'exclamation', count: null, critical: true },
      { id: 'example', label: 'Live Example', icon: 'eye', count: null },
    ]
  }
];

// Helper to get count safely
const getCount = (stats: any, key: string | null) => {
  if (!key || !stats) return null;
  // Handle special composite counts if needed, but for now direct mapping
  if (key === 'driverRels') return stats.driverRels + stats.fragmentRels + stats.toolRels;
  return stats[key];
}

const OpsDBTemplate: React.FC<OpsDBTemplateProps> = ({ setSection }) => {
  const [activeTab, setActiveTab] = useState('pipeline');
  const { stats, loading } = useOpsStats();

  // Hash-based navigation synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && NAV_GROUPS.some(g => g.items.some(i => i.id === hash))) {
        setActiveTab(hash);
      }
    };

    // Initialize from hash on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    window.location.hash = `#${id}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'pipeline': return <PipelineSection />;
      case 'minds': return <MindsSection />;
      case 'contents': return <ContentsSection />;
      case 'miu': return <MIUSection />;
      case 'bridge': return <InferenceBridgeSection />;
      case 'drivers': return <DriversSection />;
      case 'relationships': return <RelationshipsSection />;
      case 'mapping': return <MappingSection />;
      case 'assessment': return <AssessmentSystemsSection />;
      case 'tools': return <ToolsSection />;
      case 'tool-stacks': return <ToolStackMappingSection />;
      case 'stacks-grid': return <ToolStacksGridSection />;
      case 'jobs': return <JobsSection />;
      case 'gaps': return <GapsSection stats={stats} loading={loading} />;
      case 'example': return <ExampleSection />;
      case 'mental-models': return <MentalModelsSection />;
      default: return <PipelineSection />;
    }
  };

  const activeGroup = NAV_GROUPS.find(g => g.items.some(i => i.id === activeTab));
  const activeItem = activeGroup?.items.find(i => i.id === activeTab);

  return (
    <div className="flex flex-col h-screen bg-background font-sans overflow-hidden">
      {/* Top Bar (Fixed) */}
      <div className="flex-none z-10 bg-background/80 backdrop-blur-md border-b border-border/40">
        <OpsTopbar currentSection={Section.STUDIO_OPS_DB} setSection={setSection} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Fixed Width, Scrollable) */}
        <aside className="w-64 flex-none border-r border-border/40 bg-muted/5 flex flex-col hidden md:flex">
          <div className="p-4 border-b border-border/20">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Explorer</h2>
            <p className="text-[10px] text-muted-foreground/70">Navigate architectural layers</p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-6">
            {NAV_GROUPS.map((group, idx) => (
              <div key={idx}>
                <h3 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">{group.title}</h3>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = activeTab === item.id;
                    const count = getCount(stats, item.count);

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        className={cn(
                          "w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                          item.critical && !isActive && "text-red-400/80 hover:text-red-400 hover:bg-red-500/5"
                        )}
                      >
                        <Icon
                          name={item.icon}
                          size="size-4"
                          className={cn(
                            "opacity-70",
                            isActive && "opacity-100",
                            item.critical && "text-red-400"
                          )}
                        />
                        <span className="flex-1 truncate">{item.label}</span>
                        {count !== null && (
                          <span className={cn(
                            "text-[10px] font-mono px-1.5 py-0.5 rounded-full",
                            isActive
                              ? "bg-primary/20 text-primary"
                              : "bg-muted/50 text-muted-foreground group-hover:bg-muted/80"
                          )}>
                            {loading ? '...' : count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border/20 bg-muted/10">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Total Tables</span>
              <span className="font-mono font-bold">{loading ? '...' : stats.tables}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
              <span>Affinities</span>
              <span className={cn("font-mono font-bold", stats.toolAffinities === 0 && "text-red-400")}>
                {loading ? '...' : stats.toolAffinities}
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto bg-background/50">
          <div className="max-w-[1200px] mx-auto p-6 md:p-10 space-y-6 animate-fade-in">

            {/* Context Header */}
            <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  {activeGroup?.title}
                  <Icon name="chevron-right" size="size-3" />
                </div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <Icon name={activeItem?.icon || 'circle'} className="size-6 text-primary/80" />
                  {activeItem?.label}
                </h1>
              </div>
              <div className="hidden md:block">
                {/* Context Stats or Actions could go here */}
                {activeItem?.count && (
                  <Badge variant="outline" className="text-xs font-mono">
                    {getCount(stats, activeItem.count)} Records
                  </Badge>
                )}
              </div>
            </div>

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

export default OpsDBTemplate;
