import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { cn } from '../../../../lib/utils';

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'size-6',
  md: 'size-9',
  lg: 'size-10',
};

const fallbackSizeClasses = {
  sm: 'text-[10px]',
  md: 'text-sm',
  lg: 'text-base',
};

function getInitials(name: string | null | undefined): string {
  if (!name) return '??';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name,
  size = 'md',
  className,
}) => {
  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={src || undefined} />
      <AvatarFallback className={fallbackSizeClasses[size]}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};
