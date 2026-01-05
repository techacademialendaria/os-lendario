import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { cn } from '../../../../lib/utils';
import { UserTableRow } from './UserTableRow';
import type { UserManagementView, UserSortKey, SortOrder } from '../types';

interface UsersTableProps {
  users: UserManagementView[];
  loading: boolean;
  searchTerm: string;
  sortBy: UserSortKey;
  sortOrder: SortOrder;
  onSort: (key: UserSortKey) => void;
  onLinkClick: (user: UserManagementView) => void;
  onRoleClick: (user: UserManagementView) => void;
  onCreateUser: () => void;
}

interface SortableHeaderProps {
  label: string;
  sortKey: UserSortKey;
  currentSortBy: UserSortKey;
  sortOrder: SortOrder;
  onSort: (key: UserSortKey) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  sortKey,
  currentSortBy,
  sortOrder,
  onSort,
}) => {
  const isActive = currentSortBy === sortKey;

  return (
    <th
      className={cn(
        'cursor-pointer select-none pb-3 pr-4 transition-colors hover:text-foreground',
        isActive && 'text-foreground'
      )}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1.5">
        {label}
        <Icon
          name={isActive ? (sortOrder === 'asc' ? 'arrow-up' : 'arrow-down') : 'sort-alt'}
          className={cn('size-3', isActive ? 'opacity-100' : 'opacity-40')}
        />
      </div>
    </th>
  );
};

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  loading,
  searchTerm,
  sortBy,
  sortOrder,
  onSort,
  onLinkClick,
  onRoleClick,
  onCreateUser,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon name="list" className="size-5" />
          Usuários ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center">
            <Icon name="users" className="mx-auto mb-4 size-12 text-muted-foreground/30" />
            <p className="text-muted-foreground">
              {searchTerm ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
            </p>
            {!searchTerm && (
              <Button variant="outline" size="sm" className="mt-4" onClick={onCreateUser}>
                <Icon name="user-add" className="mr-2 size-4" />
                Convidar primeiro usuário
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <SortableHeader
                    label="Usuário"
                    sortKey="user"
                    currentSortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={onSort}
                  />
                  <SortableHeader
                    label="Role"
                    sortKey="role"
                    currentSortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={onSort}
                  />
                  <th className="pb-3 pr-4">Áreas</th>
                  <th className="pb-3 pr-4">Mind</th>
                  <SortableHeader
                    label="Último Login"
                    sortKey="last_login"
                    currentSortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={onSort}
                  />
                  <th className="pb-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {users.map((user) => (
                  <UserTableRow
                    key={user.user_id}
                    user={user}
                    onLinkClick={onLinkClick}
                    onRoleClick={onRoleClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
