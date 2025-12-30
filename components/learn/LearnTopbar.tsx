import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Section } from '../../types';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';

// Learn Studio Colors (Green/Emerald theme)
const LEARN_PRIMARY = '#10B981'; // Emerald
const LEARN_ACCENT = '#34D399';  // Lighter emerald

interface GroupsSubNav {
  activeTab: string;
  onTabChange: (tab: string) => void;
  selectedGroup: string | null;
}

interface LearnTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
  groupsSubNav?: GroupsSubNav;
}

const LearnTopbar: React.FC<LearnTopbarProps> = ({ currentSection, setSection, groupsSubNav }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're in the Groups section
  const isGroupsSection = currentSection === Section.APP_LEARN_GROUPS;

  // Navigation items - show sub-nav when in Groups section
  const navItems = isGroupsSection && groupsSubNav
    ? [
        { label: 'Dashboard', icon: 'layout-dashboard', section: null, action: () => groupsSubNav.onTabChange('overview'), isActive: groupsSubNav.activeTab === 'overview' && !groupsSubNav.selectedGroup },
        { label: 'Relatórios', icon: 'stats-report', section: null, action: () => groupsSubNav.onTabChange('reports'), isActive: groupsSubNav.activeTab === 'reports' && !groupsSubNav.selectedGroup },
      ]
    : [
        { label: 'Cursos', icon: 'book-open-cover', section: Section.APP_CREATOR_COURSES, path: '/creator/courses' },
        { label: 'Grupos', icon: 'whatsapp', section: Section.APP_LEARN_GROUPS, path: '/learn/groups' },
        { label: 'Desafios', icon: 'trophy', section: Section.EXTERNAL_CHALLENGES, path: '/external/challenges' },
      ];

  const handleNavClick = (item: any) => {
    // Handle action-based items (Groups sub-nav)
    if (item.action) {
      item.action();
      return;
    }
    // Handle section-based items
    if (item.section) {
      setSection(item.section);
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <header className="h-16 border-b border-border/50 bg-[#0A0A0F]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-full max-w-[1600px] mx-auto w-full px-6 md:px-12">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border"
            style={{
              backgroundColor: `${LEARN_ACCENT}15`,
              borderColor: `${LEARN_PRIMARY}30`,
              color: LEARN_ACCENT
            }}
          >
            <Icon name={isGroupsSection ? 'whatsapp' : 'graduation-cap'} size="size-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none tracking-tight" style={{ color: LEARN_ACCENT }}>
              {isGroupsSection ? (
                <>Grupos <span style={{ color: LEARN_PRIMARY }}>WhatsApp</span></>
              ) : (
                <>Academia <span style={{ color: LEARN_PRIMARY }}>Lendária</span></>
              )}
            </h1>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {isGroupsSection ? 'Monitore a saúde da comunidade' : 'Cursos & Comunidade'}
            </p>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center">
          <div
            className="flex items-center rounded-xl p-1.5 border"
            style={{
              backgroundColor: `${LEARN_PRIMARY}10`,
              borderColor: `${LEARN_PRIMARY}30`
            }}
          >
            {navItems.map((item: any, index) => {
              // For sub-nav items, use their isActive prop; for regular items, check section/path
              const isActive = item.isActive !== undefined
                ? item.isActive
                : (currentSection === item.section || (item.path && location.pathname.startsWith(item.path)));
              const isDisabled = !item.section && !item.action;
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  disabled={isDisabled}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-background shadow-sm"
                      : "hover:bg-emerald-500/20",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                  style={{ color: isActive ? LEARN_ACCENT : LEARN_PRIMARY }}
                >
                  <span className="flex items-center gap-2">
                    <Icon name={item.icon} size="size-4" />
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
            style={{
              borderColor: `${LEARN_PRIMARY}30`,
              color: LEARN_PRIMARY
            }}
          >
            <Icon name="refresh" size="size-4" />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground">
          <Icon name="menu-burger" size="size-5" />
        </button>
      </div>
    </header>
  );
};

export default LearnTopbar;
