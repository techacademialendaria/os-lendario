import React, { useState } from 'react';
import Sidebar from './components/shared/layout/Sidebar';
import { Language } from './types';
import { ThemeName } from './lib/theme';
import { Icon } from './components/ui/icon';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { cn } from './lib/utils';
import AppRoutes from './components/AppRoutes';
import useAppSection from './hooks/useAppSection';

const App: React.FC = () => {
  // Section & theme management via custom hook
  const {
    currentSection,
    isDark,
    currentTheme,
    setSection,
    toggleDark,
    setCurrentTheme,
    isFullWidthPage,
  } = useAppSection();

  // UI state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false); // For focus/reader modes
  const [language, setLanguage] = useState<Language>('pt');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Lendár[IA]</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-muted-foreground"
            aria-label="Abrir menu"
          >
            <Icon name="menu-burger" size="size-5" />
          </button>
        </header>

        {/* Sidebar */}
        <Sidebar
          currentSection={currentSection}
          setSection={setSection}
          isDark={isDark}
          toggleTheme={toggleDark}
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          currentThemeName={currentTheme}
          setThemeName={setCurrentTheme as (t: ThemeName) => void}
          currentLanguage={language}
          setLanguage={setLanguage}
          isMobileOpen={isMobileMenuOpen}
          closeMobileMenu={() => setIsMobileMenuOpen(false)}
          isHidden={isSidebarHidden}
        />

        {/* Main Content */}
        <main className="flex-1 transition-all duration-300 ease-in-out h-screen overflow-y-auto custom-scrollbar">
          <div className={cn(
            isFullWidthPage
              ? "h-full p-0 w-full"
              : "max-w-[1920px] mx-auto p-6 md:p-12"
          )}>
            <AppRoutes
              setSection={setSection}
              currentTheme={currentTheme}
              language={language}
              setSidebarCollapsed={setIsSidebarCollapsed}
              setSidebarHidden={setIsSidebarHidden}
            />
          </div>
        </main>

        <Toaster />
      </div>
    </TooltipProvider>
  );
};

export default App;
