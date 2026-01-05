import React from 'react';
import { Section } from '../../../../types';
import { cn } from '../../../../lib/utils';
import type { SidebarProps } from './types';
import { useSidebarNavigation, useSidebarTranslations, useSidebarUser } from './hooks';
import { SidebarHeader, SidebarNav, SidebarFooter } from './organisms';
import { useAuth } from '../../../../lib/AuthContext';

const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  setSection,
  isDark,
  toggleTheme,
  isCollapsed,
  toggleCollapse,
  currentLanguage,
  isMobileOpen,
  closeMobileMenu,
  isHidden = false,
}) => {
  // Hooks
  const { isAuthenticated } = useAuth();
  const { expandedMenus, toggleSubmenu, isSubmenuActive } = useSidebarNavigation({
    currentSection,
    isCollapsed,
    toggleCollapse,
  });
  const { t } = useSidebarTranslations(currentLanguage);
  const { userInfo, handleLogout } = useSidebarUser();

  // Handlers
  const handleSectionClick = (section: Section) => {
    setSection(section);
    closeMobileMenu();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 animate-fade-in bg-background/80 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full shrink-0 flex-col overflow-visible border-r border-border bg-card shadow-2xl transition-all duration-300 md:sticky md:top-0 md:h-screen md:shadow-none',
          isCollapsed ? 'md:w-20' : 'md:w-64',
          'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isHidden && 'md:hidden'
        )}
      >
        <SidebarHeader
          isDark={isDark}
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
          closeMobileMenu={closeMobileMenu}
        />

        <SidebarNav
          currentSection={currentSection}
          isCollapsed={isCollapsed}
          expandedMenus={expandedMenus}
          onToggleSubmenu={toggleSubmenu}
          onSectionClick={handleSectionClick}
          t={t}
          isSubmenuActive={isSubmenuActive}
          isAuthenticated={isAuthenticated}
        />

        <SidebarFooter
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
          isDark={isDark}
          toggleTheme={toggleTheme}
          userInfo={userInfo}
          onLogout={handleLogout}
          onSectionClick={handleSectionClick}
          vaultSection={Section.EXTERNAL_VAULT}
        />
      </aside>
    </>
  );
};

export default Sidebar;
