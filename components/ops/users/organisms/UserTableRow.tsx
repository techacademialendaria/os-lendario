import React from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Icon } from '../../../ui/icon';
import { UserAvatar } from '../atoms/UserAvatar';
import { RoleBadge } from '../molecules/RoleBadge';
import { AreasTags } from '../molecules/AreasTags';
import type { UserManagementView } from '../types';

interface UserTableRowProps {
  user: UserManagementView;
  onEditClick: (user: UserManagementView) => void;
}

export const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onEditClick,
}) => {
  return (
    <tr className="group transition-colors hover:bg-muted/30">
      {/* User */}
      <td className="py-3 pr-4">
        <div className="flex items-center gap-3">
          <UserAvatar
            src={user.mind_avatar_url || user.avatar_url}
            name={user.mind_name || user.full_name}
            size="md"
          />
          <div>
            <p className="font-medium">{user.mind_name || user.full_name || 'Sem nome'}</p>
            <p className="text-xs text-muted-foreground">{user.email || '-'}</p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="py-3 pr-4">
        <RoleBadge roleId={user.role_id} />
      </td>

      {/* Areas */}
      <td className="py-3 pr-4">
        <AreasTags areas={user.areas} maxVisible={2} />
      </td>

      {/* Mind */}
      <td className="py-3 pr-4">
        {user.mind_id ? (
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm font-medium">{user.mind_name}</p>
              <p className="text-xs text-muted-foreground">@{user.mind_slug}</p>
            </div>
          </div>
        ) : (
          <Badge variant="outline" className="text-amber-500">
            <Icon name="exclamation-circle" className="mr-1 size-3" />
            Sem vínculo
          </Badge>
        )}
      </td>

      {/* Last Login */}
      <td className="py-3 pr-4 text-sm text-muted-foreground">
        {user.last_sign_in_at
          ? new Date(user.last_sign_in_at).toLocaleDateString('pt-BR')
          : 'Nunca'}
      </td>

      {/* Actions */}
      <td className="py-3 text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEditClick(user)}
          title="Editar usuário"
        >
          <Icon name="pencil" className="size-4" />
        </Button>
      </td>
    </tr>
  );
};
