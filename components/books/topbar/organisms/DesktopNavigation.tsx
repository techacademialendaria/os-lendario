import React from 'react';
import { cn } from '@/lib/utils';
import { Section } from '@/types';
import { NAV_ITEMS, type NavItem } from '../types';

interface DesktopNavigationProps {
  currentSection: Section;
  isHighlightsPage: boolean;
  onNavigate: (item: NavItem) => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  currentSection,
  isHighlightsPage,
  onNavigate,
}) => {
  return (
    <nav className="flex items-center gap-8">
      {NAV_ITEMS.map((item) => {
        const isActive =
          currentSection === item.section ||
          (isHighlightsPage && item.section === Section.APP_BOOKS_MY_LIBRARY);
        return (
          <button
            key={item.section}
            onClick={() => onNavigate(item)}
            className={cn(
              'relative text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {item.label}
            {/* Active indicator - hairline */}
            {isActive && (
              <div className="absolute -bottom-[29px] left-0 h-[2px] w-full bg-primary" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
