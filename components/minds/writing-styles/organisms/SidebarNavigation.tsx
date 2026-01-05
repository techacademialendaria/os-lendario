import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { SidebarNavigationProps, SidebarSection } from '../types';
import { MENU_ITEMS } from '../types';

/**
 * SidebarNavigation - Section navigation sidebar
 *
 * Displays navigation buttons for switching between sections,
 * plus a quality indicator.
 */
export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeSection,
  onSectionChange,
}) => (
  <div className="w-full shrink-0 lg:w-[240px]">
    <div className="sticky top-4 space-y-2">
      {MENU_ITEMS.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          className={cn(
            'h-10 w-full justify-start gap-3 font-normal',
            activeSection === item.id
              ? 'bg-white/10 font-medium text-white'
              : 'text-zinc-500 hover:text-white'
          )}
          onClick={() => onSectionChange(item.id as SidebarSection)}
        >
          <Icon name={item.icon as any} size="size-4" /> {item.label}
        </Button>
      ))}

      <div className="mt-4 border-t border-white/5 px-3 pt-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
          Qualidade
        </p>
        <div className="mb-1 flex items-center gap-2 text-xs text-zinc-500">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Voz Ativa
        </div>
      </div>
    </div>
  </div>
);
