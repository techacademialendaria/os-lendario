import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { users } from '../data';

export const UserListView: React.FC = () => {
  return (
    <section className="space-y-6">
      <h3 className="font-sans text-xl font-semibold">Lista de Usuários</h3>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="text-muted-foreground">Usuário</TableHead>
              <TableHead className="w-[100px] text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/20">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === 'active' ? 'active' : 'inactive'}
                    className="px-2 text-[10px] font-normal"
                  >
                    {user.status === 'active' ? 'Ativo' : 'Offline'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu
                    align="right"
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="menu-dots-vertical" size="size-4" />
                      </Button>
                    }
                  >
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Icon name="user" className="mr-2 h-4 w-4" /> Ver Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="pencil" className="mr-2 h-4 w-4" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem destructive>
                      <Icon name="trash" className="mr-2 h-4 w-4" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
