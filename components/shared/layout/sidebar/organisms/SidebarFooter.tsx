import React from 'react';
import { Icon } from '../../../../ui/icon';
import { Button } from '../../../../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../ui/dropdown-menu';
import type { Section } from '../../../../../types';
import type { UserInfo } from '../types';
import { UserAvatar } from '../molecules';

interface SidebarFooterProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  userInfo: UserInfo;
  onLogout: () => void;
  onSectionClick: (section: Section) => void;
  vaultSection: Section;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  isCollapsed,
  toggleCollapse,
  isDark,
  toggleTheme,
  userInfo,
  onLogout,
  onSectionClick,
  vaultSection,
}) => {
  if (isCollapsed) {
    return (
      <div className="flex-none border-t border-border bg-card p-4">
        <div className="flex flex-col items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="hidden h-8 w-8 rounded-md bg-transparent text-muted-foreground hover:bg-muted md:flex"
          >
            <Icon name="angle-double-right" size="size-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="group relative h-auto rounded-full bg-transparent p-0 hover:bg-transparent"
              >
                <div className="relative border-2 border-border transition-colors group-hover:border-primary rounded-full overflow-hidden">
                  <UserAvatar userInfo={userInfo} size="lg" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" className="ml-2 w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userInfo.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{userInfo.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="user" className="mr-2 h-4 w-4" /> Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSectionClick(vaultSection)}>
                <Icon name="lock" className="mr-2 h-4 w-4" /> Acessos e Senhas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleTheme}>
                <Icon name={isDark ? 'sun' : 'moon'} className="mr-2 h-4 w-4" />
                Tema: {isDark ? 'Escuro' : 'Claro'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={onLogout}
              >
                <Icon name="sign-out-alt" className="mr-2 h-4 w-4" /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-none border-t border-border bg-card p-4">
      <div className="flex w-full items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="group flex h-auto w-full items-center justify-start gap-3 rounded-xl bg-transparent p-2 text-left font-normal transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              <div className="relative border border-border transition-colors group-hover:border-primary/50 rounded-full overflow-hidden">
                <UserAvatar userInfo={userInfo} size="md" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-bold transition-colors group-hover:text-primary">
                  {userInfo.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {userInfo.email || 'Minha Conta'}
                </p>
              </div>
              <Icon
                name="angle-small-up"
                className="text-muted-foreground opacity-50 transition-opacity group-hover:opacity-100"
                size="size-4"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="mb-2 w-56" side="top">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userInfo.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{userInfo.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon name="user" className="mr-2 h-4 w-4" /> Minha Conta
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSectionClick(vaultSection)}>
              <Icon name="lock" className="mr-2 h-4 w-4" /> Acessos e Senhas
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="settings" className="mr-2 h-4 w-4" /> Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={onLogout}
            >
              <Icon name="sign-out-alt" className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8 shrink-0 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
          title={isDark ? 'Mudar para Claro' : 'Mudar para Escuro'}
        >
          <Icon name={isDark ? 'sun' : 'moon'} size="size-4" />
        </Button>
      </div>
    </div>
  );
};
