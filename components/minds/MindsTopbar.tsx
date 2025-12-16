
import React from 'react';
import { Section } from '../../types';
import { Icon } from '../ui/icon';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface MindsTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const MindsTopbar: React.FC<MindsTopbarProps> = ({ currentSection, setSection }) => {

  const navItems = [
    { label: 'Mentes', icon: 'grid', section: Section.APP_MINDS_GALLERY },
    { label: 'Arena', icon: 'bolt', section: Section.APP_MINDS_ARENA },
    { label: 'Pipeline', icon: 'process', section: Section.APP_MINDS_PROFILE },
    { label: 'DNA Mental', icon: 'scale', section: Section.APP_MINDS_MATRIX },
  ];

  return (
    <div className="border-b border-border bg-card sticky top-0 z-40 shadow-sm font-sans w-full">
      <div className="flex items-center justify-between px-6 h-16 max-w-[1400px] mx-auto w-full">
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 border border-primary/50 rounded-md flex items-center justify-center text-primary font-bold shadow-[0_0_10px_rgba(48,176,199,0.2)]">
              <Icon name="brain" size="size-5" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm font-bold leading-none tracking-tight">Mentes Sintéticas</h1>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Cognitive Core</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isActive = currentSection === item.section;
              return (
                <button
                  key={index}
                  onClick={() => item.section && setSection(item.section)}
                  disabled={!item.section}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    !item.section && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Icon name={item.icon} size="size-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted-foreground hover:text-primary transition-colors relative rounded-md hover:bg-muted">
              <Icon name="bell" size="size-5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindsTopbar;
