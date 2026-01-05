import React, { useCallback, useMemo } from 'react';
import type { Section } from '../../../../../types';
import type { NavItem } from '../types';
import { navStructure } from '../data';
import { NavItemLeaf, NavGroup } from '../molecules';

interface SidebarNavProps {
  currentSection: Section;
  isCollapsed: boolean;
  expandedMenus: string[];
  onToggleSubmenu: (key: string) => void;
  onSectionClick: (section: Section) => void;
  t: (key: string) => string;
  isSubmenuActive: (item: NavItem) => boolean;
  isAuthenticated?: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentSection,
  isCollapsed,
  expandedMenus,
  onToggleSubmenu,
  onSectionClick,
  t,
  isSubmenuActive,
  isAuthenticated = false,
}) => {
  // Filter and group items based on auth status
  const { userItems, teamItems } = useMemo(() => {
    const user = navStructure.filter((item) => item.group === 'user');
    const team = isAuthenticated ? navStructure.filter((item) => item.group === 'team') : [];
    return { userItems: user, teamItems: team };
  }, [isAuthenticated]);

  const renderNavItem = useCallback(
    (item: NavItem, depth = 0): React.ReactNode => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedMenus.includes(item.key);
      const isParentActive = isSubmenuActive(item);

      if (hasChildren) {
        return (
          <NavGroup
            key={item.key}
            item={item}
            depth={depth}
            isCollapsed={isCollapsed}
            isExpanded={isExpanded}
            isParentActive={isParentActive}
            t={t}
            onToggleSubmenu={onToggleSubmenu}
            renderChildren={(children, newDepth) =>
              children.map((child) => renderNavItem(child, newDepth))
            }
          />
        );
      }

      return (
        <NavItemLeaf
          key={item.key}
          item={item}
          depth={depth}
          isCollapsed={isCollapsed}
          currentSection={currentSection}
          t={t}
          onSectionClick={onSectionClick}
        />
      );
    },
    [
      currentSection,
      isCollapsed,
      expandedMenus,
      onToggleSubmenu,
      onSectionClick,
      t,
      isSubmenuActive,
    ]
  );

  return (
    <nav className="custom-scrollbar flex-1 overflow-y-auto px-3 py-4">
      {/* USER Section - Always visible */}
      <ul className="space-y-1">{userItems.map((item) => renderNavItem(item))}</ul>

      {/* TEAM Section - Only when authenticated */}
      {teamItems.length > 0 && (
        <>
          {/* Separator */}
          <div className="my-4 flex items-center gap-2 px-2">
            <div className="h-px flex-1 bg-border" />
            {!isCollapsed && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Team
              </span>
            )}
            <div className="h-px flex-1 bg-border" />
          </div>
          <ul className="space-y-1">{teamItems.map((item) => renderNavItem(item))}</ul>
        </>
      )}
    </nav>
  );
};
