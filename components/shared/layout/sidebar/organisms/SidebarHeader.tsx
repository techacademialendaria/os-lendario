import React from 'react';
import { Icon } from '../../../../ui/icon';
import { Button } from '../../../../ui/button';
import { cn } from '../../../../../lib/utils';

interface SidebarHeaderProps {
  isDark: boolean;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  closeMobileMenu: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isDark,
  isCollapsed,
  toggleCollapse,
  closeMobileMenu,
}) => {
  return (
    <div
      className={cn(
        'relative flex h-16 flex-none items-center border-b border-border bg-card transition-all duration-300',
        isCollapsed ? 'justify-center px-2' : 'justify-between px-4'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2 overflow-hidden whitespace-nowrap',
          isCollapsed ? 'w-full justify-center' : ''
        )}
      >
        <img
          src={
            isDark
              ? 'https://academialendaria.ai/wp-content/uploads/2025/11/Silhueta-AL-32.svg'
              : 'https://academialendaria.ai/wp-content/uploads/2025/12/Silhueta-AL-32-Black.svg'
          }
          alt="Academia Lendária"
          className={cn('h-8 w-8 shrink-0 object-contain transition-all duration-300')}
        />
        <div
          className={cn(
            'flex font-sans text-xl font-bold leading-none tracking-tight transition-all duration-300',
            isCollapsed ? 'hidden w-0 opacity-0' : 'opacity-100'
          )}
        >
          Lendár<span className="text-primary">[IA]</span>OS
        </div>
      </div>

      {/* Mobile close button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={closeMobileMenu}
        className="absolute right-4 text-muted-foreground hover:text-foreground md:hidden"
      >
        <Icon name="cross" size="size-4" />
      </Button>

      {/* Desktop collapse button */}
      {!isCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="absolute right-4 hidden text-muted-foreground hover:text-foreground md:flex"
        >
          <Icon name="angle-small-left" size="size-5" />
        </Button>
      )}
    </div>
  );
};
