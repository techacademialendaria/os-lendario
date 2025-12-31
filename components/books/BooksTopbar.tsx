import React from 'react';
import { Section } from '../../types';
import { TOPBAR_CONFIGS } from '../shared/topbar-config';
import { Input } from '../ui/input';
import { Icon } from '../ui/icon';

interface BooksTopbarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const BooksTopbar: React.FC<BooksTopbarProps> = ({
  currentSection,
  setSection,
  searchQuery = '',
  onSearchChange,
}) => {
  const config = TOPBAR_CONFIGS.books;

  return (
    <div className="sticky top-0 z-40 h-16 w-full border-b border-border bg-background/90 backdrop-blur-xl font-sans">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6">
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-gold/50 bg-brand-gold/20 text-brand-gold font-bold shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              <Icon name={config.icon} size="size-5" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-sm font-bold leading-none tracking-tight text-brand-gold">
                {config.title}
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {config.subtitle}
              </p>
            </div>
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
                      ? 'bg-brand-gold/10 text-brand-gold'
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
          {onSearchChange && (
            <div className="relative hidden w-64 md:block">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size="size-3"
              />
              <Input
                placeholder="Título, autor ou ISBN..."
                className="h-9 rounded-full border-border bg-muted/30 pl-9 text-xs focus:border-brand-gold/50"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooksTopbar;
