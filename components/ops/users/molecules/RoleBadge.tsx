import React from 'react';
import { Badge } from '../../../ui/badge';
import { Icon } from '../../../ui/icon';
import type { RoleId } from '../types';
import { ROLE_CONFIG } from '../types';

interface RoleBadgeProps {
  roleId: RoleId | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const roleIcons: Record<RoleId, string> = {
  owner: 'crown',
  admin: 'shield',
  collaborator: 'briefcase',
  student: 'academic-cap',
  free_user: 'user',
};

const sizeClasses = {
  sm: 'text-xs py-0.5 px-1.5',
  md: '',
  lg: 'text-sm py-1 px-2.5',
};

const iconSizes = {
  sm: 'size-2.5',
  md: 'size-3',
  lg: 'size-4',
};

export const RoleBadge: React.FC<RoleBadgeProps> = ({ roleId, size = 'md', className }) => {
  const sizeClass = sizeClasses[size];
  const iconSize = iconSizes[size];

  if (!roleId) {
    return (
      <Badge variant="outline" className={`text-muted-foreground ${sizeClass} ${className || ''}`}>
        <Icon name="question-mark-circle" className={`mr-1 ${iconSize}`} />
        Sem role
      </Badge>
    );
  }

  const config = ROLE_CONFIG[roleId];
  const icon = roleIcons[roleId];

  return (
    <Badge
      variant="outline"
      className={`${config.bgColor} ${config.color} border-transparent ${sizeClass} ${className || ''}`}
    >
      <Icon name={icon} className={`mr-1 ${iconSize}`} />
      {config.label}
    </Badge>
  );
};
