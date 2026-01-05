import React from 'react';
import { Icon } from '../../../ui/icon';
import { Button } from '../../../ui/button';

interface UsersPageHeaderProps {
  onRefresh: () => void;
  onCreateUser: () => void;
}

export const UsersPageHeader: React.FC<UsersPageHeaderProps> = ({
  onRefresh,
  onCreateUser,
}) => {
  return (
    <div className="flex flex-col gap-4 border-b border-border/30 pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground">
          <Icon name="users" className="size-6 text-primary/80" />
          Administração de Usuários
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie usuários e seus vínculos com Minds
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <Icon name="refresh" className="mr-2 size-4" />
          Atualizar
        </Button>
        <Button size="sm" onClick={onCreateUser}>
          <Icon name="user-add" className="mr-2 size-4" />
          Novo Usuário
        </Button>
      </div>
    </div>
  );
};
