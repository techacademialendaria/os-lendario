/**
 * EditorSidebar Organism
 * Collapsible sidebar with Index and Audit tabs.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ModuleIndex } from './ModuleIndex';
import { AuditPanel } from './AuditPanel';
import type { EditorSidebarProps } from '../types';

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  collapsed,
  activeTab,
  modules,
  aiAudit,
  onCollapsedChange,
  onTabChange,
}) => {
  const sidebarWidth = collapsed ? 'w-12' : 'w-72';

  if (collapsed) {
    return (
      <div
        className={cn(
          'flex shrink-0 flex-col border-r border-border bg-card/50 transition-all duration-300 ease-in-out',
          sidebarWidth
        )}
      >
        <div className="flex flex-col items-center gap-2 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCollapsedChange(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon name="angle-double-right" size="size-4" />
          </Button>
          <div className="my-1 h-px w-6 bg-border" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  onCollapsedChange(false);
                  onTabChange('index');
                }}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                  activeTab === 'index'
                    ? 'bg-studio-primary/20 text-studio-primary'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                <Icon name="list" size="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Indice do Curso</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  onCollapsedChange(false);
                  onTabChange('audit');
                }}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                  activeTab === 'audit'
                    ? 'bg-studio-primary/20 text-studio-primary'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                <Icon name="magic-wand" size="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Auditoria Didatica</TooltipContent>
          </Tooltip>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex shrink-0 flex-col border-r border-border bg-card/50 transition-all duration-300 ease-in-out',
        sidebarWidth
      )}
    >
      {/* Tab Switcher */}
      <div className="flex border-b border-border">
        <Button
          variant="ghost"
          onClick={() => onTabChange('index')}
          className={cn(
            'flex-1 rounded-none px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
            activeTab === 'index'
              ? 'border-b-2 border-studio-primary text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Indice
        </Button>
        <Button
          variant="ghost"
          onClick={() => onTabChange('audit')}
          className={cn(
            'flex h-auto flex-1 items-center justify-center gap-1.5 rounded-none px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors',
            activeTab === 'audit'
              ? 'border-b-2 border-studio-primary text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Icon name="magic-wand" size="size-3" />
          Auditoria
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapsedChange(true)}
          className="rounded-none border-l border-border px-3 py-3 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon name="angle-double-left" size="size-4" />
        </Button>
      </div>

      {/* Sidebar Content */}
      <ScrollArea className="flex-1">
        {activeTab === 'index' ? (
          <ModuleIndex modules={modules} />
        ) : (
          <div className="space-y-6 p-4">
            <AuditPanel aiAudit={aiAudit} />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
