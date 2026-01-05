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
import { useAuth } from '@/lib/AuthContext';

interface DesktopUserMenuProps {
  onLogout: () => void;
}

export const DesktopUserMenu: React.FC<DesktopUserMenuProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <button
        onClick={() => navigate('/auth/login')}
        className="flex items-center gap-2 rounded-full border border-border px-5 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground"
      >
        <Icon name="user" size="size-4" />
        Entrar
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-3 rounded-full transition-all duration-300 hover:opacity-80">
          <Avatar className="h-10 w-10 ring-2 ring-border ring-offset-2 ring-offset-background transition-all duration-300 group-hover:ring-primary/40">
            {user.avatarUrl && (
              <AvatarImage src={user.avatarUrl} alt={user.email || ''} />
            )}
            <AvatarFallback className="bg-muted text-sm font-bold text-foreground">
              {(user.email || 'U').substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl border-border">
        <div className="px-3 py-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            Conectado como
          </p>
          <p className="mt-1 truncate text-sm font-medium text-foreground">
            {user.email}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate('/books/my-library')}
          className="cursor-pointer"
        >
          <Icon name="star" size="size-4" className="mr-2" />
          Meus Livros
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate('/books/admin')}
          className="cursor-pointer"
        >
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
  );
};
