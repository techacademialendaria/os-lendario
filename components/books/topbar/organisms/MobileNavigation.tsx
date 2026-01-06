import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Section } from '@/types';
import { useAuth } from '@/lib/AuthContext';
import { NAV_ITEMS, type NavItem } from '../types';

interface MobileNavigationProps {
  currentSection: Section;
  isHighlightsPage: boolean;
  onNavigate: (item: NavItem) => void;
  onSearchOpen: () => void;
  onLogout: () => void;
}

const getNavIcon = (section: Section): string => {
  switch (section) {
    case Section.APP_BOOKS_LIBRARY:
      return 'globe';
    case Section.APP_BOOKS_AUTHORS:
      return 'users';
    case Section.APP_BOOKS_ADMIN:
      return 'edit';
    default:
      return 'star';
  }
};

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentSection,
  isHighlightsPage,
  onNavigate,
  onSearchOpen,
  onLogout,
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Mobile navigation doesn't show "Editar" - edit is desktop only
  const navItems = NAV_ITEMS;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl md:hidden">
      <div className="flex h-14 items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive =
            currentSection === item.section ||
            (isHighlightsPage && item.section === Section.APP_BOOKS_MY_LIBRARY);
          return (
            <button
              key={item.section}
              onClick={() => onNavigate(item)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon name={getNavIcon(item.section)} size="size-5" />
            </button>
          );
        })}

        {/* Search button */}
        <button
          onClick={onSearchOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:text-foreground active:scale-95"
        >
          <Icon name="search" size="size-5" />
        </button>

        {/* User/Profile button */}
        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all active:scale-95">
                <Avatar className="h-7 w-7">
                  {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.email || ''} />}
                  <AvatarFallback className="bg-muted text-[9px] font-bold text-foreground">
                    {(user.email || 'U').substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mb-2 w-56 rounded-xl border-border">
              <div className="px-3 py-2">
                <p className="truncate text-sm font-medium text-foreground">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/books/admin')} className="cursor-pointer">
                <Icon name="settings" size="size-4" className="mr-2" />
                Admin
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Icon name="sign-out" size="size-4" className="mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={() => navigate('/auth/login')}
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:text-foreground active:scale-95"
          >
            <Icon name="user" size="size-5" />
          </button>
        )}
      </div>
    </nav>
  );
};
