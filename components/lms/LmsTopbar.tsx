import React from 'react';
import { Section } from '../../types';
import { TOPBAR_CONFIGS } from '../shared/topbar-config';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';

interface LmsTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const LmsTopbar: React.FC<LmsTopbarProps> = ({ currentSection, setSection }) => {
  const config = TOPBAR_CONFIGS.lms;

  return (
    <div className="sticky top-0 z-40 h-16 w-full border-b border-border bg-background/90 backdrop-blur-xl font-sans">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6">
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">
              Academia Lendár<span className="text-primary">[IA]</span>
            </span>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {config.navItems.map((item, index) => {
              const isActive = currentSection === item.section;
              return (
                <button
                  key={index}
                  onClick={() => item.section && setSection(item.section as Section)}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon name={item.icon} size="size-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Search */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="search" size="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LmsTopbar;
