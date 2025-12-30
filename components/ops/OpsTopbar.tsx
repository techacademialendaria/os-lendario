import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Section } from '../../types';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { OPS_PRIMARY, OPS_ACCENT } from './ops-tokens';

interface OpsTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const OpsTopbar: React.FC<OpsTopbarProps> = ({ currentSection, setSection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Database', icon: 'database', section: Section.STUDIO_OPS_DB, path: '/studio/ops/db' },
    { label: 'Views', icon: 'table', section: Section.STUDIO_OPS_VIEWS, path: '/studio/ops/views' },
    { label: 'Schema', icon: 'sitemap', section: Section.STUDIO_OPS_SCHEMA, path: '/studio/ops/schema' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
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
              backgroundColor: `${OPS_ACCENT}15`,
              borderColor: `${OPS_PRIMARY}30`,
              color: OPS_ACCENT
            }}
          >
            <Icon name="settings-sliders" size="size-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none tracking-tight" style={{ color: OPS_ACCENT }}>
              Ops <span style={{ color: OPS_PRIMARY }}>Studio</span>
            </h1>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Infrastructure & Data
            </p>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center">
          <div
            className="flex items-center rounded-xl p-1.5 border"
            style={{
              backgroundColor: `${OPS_PRIMARY}10`,
              borderColor: `${OPS_PRIMARY}30`
            }}
          >
            {navItems.map((item, index) => {
              const isActive = currentSection === item.section ||
                (item.path && location.pathname.startsWith(item.path));
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  disabled={!item.section}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-background shadow-sm"
                      : "hover:bg-[#64748B]/20",
                    !item.section && "opacity-50 cursor-not-allowed"
                  )}
                  style={{ color: isActive ? OPS_ACCENT : OPS_PRIMARY }}
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
              borderColor: `${OPS_PRIMARY}30`,
              color: OPS_PRIMARY
            }}
          >
            <Icon name="refresh" size="size-4" />
            <span className="hidden sm:inline">Refresh</span>
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

export default OpsTopbar;
